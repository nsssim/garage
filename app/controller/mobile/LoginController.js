var bcrypt = require('bcryptjs');

const Mobile_mdl = require('../../model/mobile/Mobile_mdl');
const sms = require('../../helper/sms')
const email = require('../../helper/email')

//1st step login
exports.login = async(req,res)=>{
    console.log(req.body);
    
    let user_name = req.body.userName
    let password  = req.body.password
   
	let user_info  = await Mobile_mdl.find_user(user_name).catch(e=>{console.log(e) })
	console.log("exports.login -> user_info", user_info)
	
   //1st check username
   //1st if user not found
   if(user_info.length < 1)
   {
		console.log("exports.login -> user not found")
		let response = {
			"userName": user_name,
			"password": password,
			"token": null,
			"status": "FALSE",
			"smsCode": null,
			"projectName": null
		}
		return res.status(200).send( response );
   }
   //2nd if password
   let db_password = user_info[0].password
	let password_is_correct = bcrypt.compareSync(password, db_password);
	
	console.log("exports.login -> password_is_correct", password_is_correct)
	
	if(!password_is_correct)
	{
	 let response ={
		"userName": user_name,
		"password": password,
		"token": null,
		"status": "FALSE",
		"smsCode": null,
		"projectName": null
	 }
 
	 return res.status(200).send( response );
	}
   
   //3rd if user exists and password is correct send sms 
   let user_phone = user_info[0].phone_number;
   console.log("exports.login -> user_phone", user_phone)
   

	var is_turkish = true
	var country_code = user_phone.substring(0, 3);
	if(country_code != "+90") {	is_turkish = false }  
   //------------------------
   if(is_turkish)
   {

		//3.5 sms for demo user static 000000
		if(user_name == "beta"){
			console.log("~~~~~~~~~~~~beta user~~~~~~~~~~~~");
			console.log("is turkish  : " ,  is_turkish);
		
			
			//4th if sms was sent save the code in database
			Mobile_mdl.save_sms_code(user_info[0].id , "12345").catch(e=>{console.log(e) })  
			
			//return to client with the good news 
			let response = {
			"userName": user_name,
			"password": password,
			"token": null,
			"status": "SEND_SMS",
			"smsCode": null,
			"projectName": null
			}
		
			return res.status(200).send( response );

		}

		// --------------------------------  end beta tester 
		
		// is turkish then send sms
		console.log("is turkish  : " ,  is_turkish);
		let sms_answer = await sms.send_code_via_sms(user_phone).catch(e=>{console.log(e)})
		console.log("exports.login -> sms_ans", sms_answer)
		
		//if sms was not sent
		if(!sms_answer.status)
		{
			 let response ={
			 "userName": user_name,
			 "password": password,
			 "token": null,
			 "status": "FALSE",
			 "smsCode": null,
			 "projectName": null
		 }
		 return res.status(200).send( response );
		}
	 
		
		//4th if sms was sent save the code in database
		Mobile_mdl.save_sms_code(user_info[0].id , sms_answer.code).catch(e=>{console.log(e) })  
		
		//return to client with the good news 
		let response = {
		 "userName": user_name,
		 "password": password,
		 "token": null,
		 "status": "SEND_SMS",
		 "smsCode": null,
		 "projectName": null
		 }
	 
		return res.status(200).send( response );
		///////////////////// end sms
		
   }
   else{
	   // is NOT turkish then send email
	   console.log("is turkish  : " ,  is_turkish);
	   let user_email = user_info[0].e_mail  

	   //generate code 
	   var min = 10000;
       var max = 99999;
	   let email_code = Math.floor(Math.random() * (max - min + 1)) + min;
			
	   let email_was_sent = await email.sendEmail(user_email,email_code).catch(e=>{console.log(e); })

	   if(email_was_sent){
		   	//4th if sms was sent save the code in database
			Mobile_mdl.save_sms_code(user_info[0].id , email_code).catch(e=>{console.log(e) }) 
			//return to client with the good news 
			//TODO from mobile side change SEND_SMS to SEND_EMAIL ----------------------------------------- NOTE 
			let response = {
			"userName": user_name,
			"password": password,
			"token": null,
			"status": "SEND_SMS",
			"smsCode": null,
			"projectName": null
			}
		
		   return res.status(200).send( response );

	   }
	   else
	   {
		
			//if email was not sent
			 let response ={
			 "userName": user_name,
			 "password": password,
			 "token": null,
			 "status": "FALSE",
			 "smsCode": null,
			 "projectName": null
			}
			return res.status(200).send( response );

	   }

	   //////////////////////////////////end email 

   }

  
    
}




//2ns step
exports.login_sms_control = async(req,res)=>{
	console.log(req.body);

	let user_name = req.body.userName
    let password  = req.body.password
	let sms_code  = req.body.smsCode

	let user_info  = await Mobile_mdl.find_user(user_name).catch(e=>{console.log(e) })
    //console.log("exports.login_sms_control -> user_info", user_info)
	
	///~~~~~~~~~~~~~~ check username and password  (same as in step 1)
	//1st if user
	if(user_info.length < 1)
	{
		 console.log("exports.login -> user not found")
		 let response = {
			 "userName": user_name,
			 "password": password,
			 "token": null,
			 "status": "FALSE",
			 "smsCode": sms_code,
			 "projectName": null
		 }
		 return res.status(200).send( response );
	}
	//2nd if password
	let db_password = user_info[0].password
	let password_is_correct = bcrypt.compareSync(password, db_password);
	 
	 console.log("exports.login -> password_is_correct", password_is_correct)
	 
	 if(!password_is_correct)
	 {
	  let response ={
		 "userName": user_name,
		 "password": password,
		 "token": null,
		 "status": "FALSE",
		 "smsCode": sms_code,
		 "projectName": null
	  }
  
	  return res.status(200).send( response );
	 }
	 ///~~~~~~~~~~~~~~ end check username and password (same as in step 1)

	 //check sms if correct
	 let db_sms_code = user_info[0].sms_code
	  
	 console.log("exports.login_sms_control -> db_sms_code", db_sms_code)

	 if(db_sms_code != sms_code){
		 
		 console.log("exports.login -> sms_is_correct :", !(db_sms_code != sms_code))
		 
		 let response =
		 {
			"userName": user_name,
			"password": password,
			"token": null,
			"status": "FALSE",
			"smsCode": sms_code,
			"projectName": null
		 }
		 return res.status(200).send( response );
	 }
	 
	 // generate 5 letters token and save it to database 
	 let tiny_token =  makeid(32)
  	 console.log("exports.login_sms_control -> tiny_token", tiny_token)
	 await Mobile_mdl.update_user_token(user_info,tiny_token).catch(e=>{console.log(e) })

	 let response = 
	 {
		"userName": user_name,
		"password": password,
		"token": tiny_token,
		"status": "TRUE",
		"smsCode": sms_code,
		"projectName": null
	 }
	 return res.status(200).send( response );
}


exports.password_update = async(req,res)=>{

	let tiny_token = req.body.token
    let old_password = req.body.oldPassword
	let new_password = req.body.newPassword

	//1 get userdata from token 
	let user_info  = await Mobile_mdl.find_user_by_tkn(tiny_token).catch(e=>{console.log(e) })
	if(user_info.length < 1)
	{
		let response = {
			"reqStatus": "WRONG",
			"message": "Şifre Hatalı"
		}
		 return res.status(200).send( response );
	}
	
	// //2 check password if correct
	let db_password = user_info[0].password
	let password_is_correct = bcrypt.compareSync(old_password, db_password);
	if(!password_is_correct)
	{
		let response = {
			"reqStatus": "WRONG",
			"message": "Şifre Hatalı"
		}
		return res.status(200).send( response );
	}
	
	//3 update password
	let new_password_bcrypted = bcrypt.hashSync(new_password , 10);
	let update_result  = await Mobile_mdl.update_password(user_info, new_password_bcrypted).catch(e=>{console.log(e) })
    //console.log("password_update -> update_result", update_result)
	
	let response = {
		"reqStatus": "TRUE",
		"message": "Şifre Güncellendi"
	}

	return res.status(200).send( response );
    
    
    
}



//common functions 
function makeid(length) {
	var result           = '';
	var characters       = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }




