var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

let {dd} = require('../../helper/logger');

const config = require('../../config/jwt.config')

const Login_mdl = require('../../model/web/Login_mdl');

//1st step login
exports.login = async(req,res)=>{

   let user_name = req.body.username
   let password  = req.body.password
   let lang  	 = req.body.lang
   
   console.log("exports.login -> lang:", lang)
      
   let user_info  = await Login_mdl.find_user(user_name).catch(e=>{console.log(e) })
   console.log("exports.login -> user_info", user_info)

   // check if user Exists
   if(user_info.length<1)
   {
	   let response = {
		   auth:0,
		   code: 0,
		   meta : "user not found",
		   token: null
	   }
	   return res.status(200).send( response );
   }
   // check if password is correct 
   let passwordIsValid = bcrypt.compareSync(password, user_info[0].password);
	if (!passwordIsValid)
	{
		let response = {
			auth:0,
			code: 1,
			meta : "wrong password",
			token: null
		}
		return res.status(200).send( response );
	}

	//login user 
	//we generate a token using his id , email  , google linked email and alexa linked email
	let user = user_info[0]
	
	let jwt_data = {
		id: user.id,
		email: user.email,
		lang:lang
	}

    console.log("exports.login -> config.secret", config.secret)

	let token = jwt.sign(jwt_data, config.secret, {
		expiresIn: 86400 * 5 // expires in 24 hours * 5 
		// expiresIn: 31536000 // expires in 1 year
	});

	let response = {
		auth:1,
		code: 200,
		meta : "ok",
		token: token
	}
	return res.status(200).send( response );

}



exports.loginAdmin = async(req,res)=>{

	let user_name = req.body.username
	let password  = req.body.password
	let lang  	 = req.body.lang
	   
	let user_info  = await Login_mdl.find_admin(user_name).catch(e=>{console.log(e) })
	
	dd('LoginWebController.js ','','user_info',user_info )
 
	// check if user Exists
	if(user_info.length<1)
	{
		let response = {
			auth:0,
			code: 0,
			meta : "user not found",
			token: null
		}
		return res.status(200).send( response );
	}
	// check if password is correct 
	let passwordIsValid = bcrypt.compareSync(password, user_info[0].password);
	 if (!passwordIsValid)
	 {
		let response = {
			auth:0,
			code: 1,
			meta : "wrong password",
			token: null
		}
		
		return res.status(200).send( response );
	 }
 
	 //login user 
	 //we generate a token using his id , email  , google linked email and alexa linked email
	 let user = user_info[0]
	 
	 let jwt_data = {
		 id: user.id,
		 email: user.email,
		 lang:lang
	 }
 
	 let admin_secret = config.secret+"_admin"
	 let token = jwt.sign(jwt_data, admin_secret , {
		 expiresIn: 86400 * 30 // expires in 24 hours x 30
		 // expiresIn: 31536000 // expires in 1 year
	 });
 
	 let response = {
		 auth:1,
		 code: 200,
		 meta : "ok",
		 token: token
	 }
	 return res.status(200).send( response );
 
 }


//should be cought  by middleware if no or wrong token 
exports.check_token = async(req,res)=>{

   let response = 
    {
		auth:1,
		code: 200,
		meta : "okay",
	}
	
    console.log("exports.check_token -> req.userId 	", req.userId 	)
   // console.log("exports.check_token -> req.userLang  ", req.userLang  )
	return res.status(200).send( response );
	 
}
