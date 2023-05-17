const User_mdl = require('../../model/web/User_mdl');
let {dd} = require('../../helper/logger');
var bcrypt = require('bcryptjs');
const sms = require('../../helper/sms') 


exports.get_user_dashboard = async(req,res)=>{
	
	console.log("exports.get_dashboard_clients_doors -> req", req.userId) // userLang:
	
	let user_clients = await User_mdl.get_user_clients(req.userId)
	
    dd('DashboardWebController.js ','get_user_dashboard','user_doors',user_doors )
    
    if(user_clients.length < 1)
    {
		let response = {
			auth: 1 ,
			code: 204 ,
			meta: "user not found" ,
			payload: null
        }
        
        return res.status(204).send( response );  
	}

	let dashboard_data = {}
	dashboard_data.user_doors = user_doors;
	dashboard_data.user_clients = user_clients ;
	dd('DashboardWebController.js ','get_user_dashboard','dashboard_data',dashboard_data )

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "dashboard_data" ,
		payload: dashboard_data 
	}
	
	return res.status(200).send( response );
	 
}


exports.get_user_clients_all = async(req,res)=>{
	
	let user_clients = await User_mdl.get_user_clients_all(req.userId)
    
    if(user_clients.length < 1)
    {
		let response = {
			auth: 1 ,
			code: 204 ,
			meta: "user not found" ,
			payload: null
        }
        
        return res.status(204).send( response );  
	}
	
	let payload_data = {}
	
	payload_data.user_clients = user_clients ;	
	dd('DashboardWebController.js ','get_user_clients_all','user_clients',user_clients )
	

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "dashboard_data" ,
		payload: payload_data 
	}
	
	return res.status(200).send( response );
	 
}

exports.update_client_status = async(req,res)=>{
	
	let client_id = req.body.id
	let client_status = "ACTIVE"
	if(req.body.status){
		client_status = "PASSIVE"
	}
	
	dd('UserWebController.js ','','client_status',client_status )
	
	let user_status = await User_mdl.update_client_status(client_id,client_status)

	dd('UserWebController.js ','update_client_status','user_status',user_status )

	payload_data = false
	if(user_status.length == 0)
	{
		payload_data = true
	}

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "update_user_status" ,
		payload: payload_data 
	}
	
	return res.status(200).send( response );
	 
}


exports.add_client = async(req,res)=>{
	
	dd('UserWebController.js ','add_client','req.body',req.body )
	let username = req.body.username
	let email    = req.body.email
	let user_id = req.userId ; 

	

	//1 check if username already exists
	let res_username = await User_mdl.check_username(username);
	dd('UserWebController.js ','username_already_registred','res_username',res_username[0] )

	if(res_username.length > 0 ){
		let response = {
			auth: 1 ,
			code: 1,
			meta: "username_already_registred",
			payload: false
		}
		return res.status(200).send( response );
	}
	
	//2 check if email already exists
	let res_email = await User_mdl.check_email(email);
	dd('UserWebController.js ','email_already_registred','res_email',res_email )

	if(res_email.length > 0 ){
		let response = {
			auth: 1 ,
			code: 2,
			meta: "email_already_registred",
			payload: false
		}
		return res.status(200).send( response );
	}

	//3 add client
	let client = req.body
	client.rank_user_id= user_id
	client.password0 = bcrypt.hashSync("0000",8);
	dd('UserWebController.js ','add_client0','client',client )
	let add_result = await User_mdl.add_client(client)
	dd('UserWebController.js ','add_client','add_result', add_result )

	let last_id = await User_mdl.get_last_client_id()
	dd('UserWebController.js ','add_client','last_id',last_id )
	

	if(add_result == undefined)
	{
		let response = 
			{
				auth: 1 ,
				code: 3 ,
				meta: "error_add" ,
				payload: false 
			}
			return res.status(200).send( response );

	}

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: last_id[0].last_value ,
		payload: true 
	}
	
	return res.status(200).send( response );
	 
},

exports.delete_client = async(req,res)=>{
	
	let client_id = req.body.client_id
	let delete_status = await User_mdl.delete_client(client_id)
	dd('UserWebController.js ','delete_client','delete_status',delete_status )

	
	 payload_data = false
	 if(delete_status != undefined && delete_status.length == 0)
	 {
		payload_data = true
		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "delete_client" ,
			payload: payload_data 
		}
		return res.status(200).send( response );
	 }

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "delete_client" ,
		payload: payload_data
	}
	
	return res.status(200).send( response );
	 
}



exports.update_client = async(req,res)=>{
	
	let client 		= req.body
	
	dd('UserWebController.js ','update_client','client',client )

	//1 check if username is taken by another client
	let res_other_username = await User_mdl.check_other_username(client);
	dd('UserWebController.js ','update_client','res_other_username',res_other_username[0] )

	if(res_other_username.length > 0 ){
		let response = {
			auth: 1 ,
			code: 1,
			meta: "username_already_registred",
			payload: false
		}
		return res.status(200).send( response );
	}

	//2 check if email is taken by another client
	let res_email = await User_mdl.check_other_email(client);

	// dd('UserWebController.js ','email_already_registred','res_email',res_email )

	if(res_email.length > 0 ){
		let response = {
			auth: 1 ,
			code: 2,
			meta: "email_already_registred",
			payload: false
		}
		return res.status(200).send( response );
	}

	//3 check phone number 
	let res_phone = await User_mdl.check_other_phone(client);

	// dd('UserWebController.js ','email_already_registred','res_email',res_email )

	if(res_phone.length > 0 ){
		let response = {
			auth: 1 ,
			code: 3,
			meta: "phone_already_registred",
			payload: false
		}
		return res.status(200).send( response );
	}

	//4 update client
	let update_status = await User_mdl.update_client(client)
	dd('UserWebController.js ','update_client','update_client',update_status )

	
	 payload_data = false
	 if(update_status != undefined && update_status.length == 0)
	 {
		//ok
		payload_data = true
		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "update_client" ,
			payload: payload_data 
		}
		return res.status(200).send( response );
	 }

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "update_client" ,
		payload: payload_data
	}
	
	return res.status(200).send( response );
	 
}



exports.reset_client_password = async(req,res)=>{
	
	let client = req.body
	client.password0 = bcrypt.hashSync("0000", 10);
	
	let reset_status = await User_mdl.reset_client_password(client)
	dd('UserWebController.js ','reset_client_password','reset_status',reset_status )

	
	 payload_data = false
	 if(reset_status != undefined && reset_status.length == 0)
	 {
		payload_data = true
		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "reset_client_password" ,
			payload: payload_data 
		}
		return res.status(200).send( response );
	 }

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "reset_client_password" ,
		payload: payload_data
	}
	
	return res.status(200).send( response );
	 
}


exports.update_user_password = async(req,res)=>{
	
	let old_password 			= 	req.body.old_password ;
	let new_password 			= 	req.body.new_password ;
	let encrypted_new_password  = 	bcrypt.hashSync(new_password,8);
	let user_id 				= 	req.userId

	//1 check if old password is correct  <-------- im here 

	dd('UserWebController.js ','update_user_password','old_password',old_password )
	let user_info  = await User_mdl.find_user(user_id).catch(e=>{console.log(e) })

	dd('UserWebController.js ','update_user_password','user_info',user_info )
	
 
	// check if user Exists
	if(user_info.length<1)
	{
		let response = {
			auth: 1 ,
			code: 4061 ,
			meta: "user_not_found" ,
			payload: false
		}
		return res.status(406).send( response );
	}

	let OldPasswordIsValid = bcrypt.compareSync(old_password, user_info[0].password);
	
	dd('UserWebController.js ','','OldPasswordIsValid',OldPasswordIsValid )

	if(!OldPasswordIsValid)
	{
		let response = {
			auth: 1 ,
			code: 4062 ,
			meta: "wrong_password" ,
			payload: false
		}
		return res.status(406).send( response );

	}
	
	dd('UserWebController.js ','update_user_password','OldPasswordIsValid',OldPasswordIsValid )

	
	
	// let res_other_username = await User_mdl.check_other_username(client);
	let update_status = await User_mdl.update_user_password(user_id,encrypted_new_password)
	
	dd('UserWebController.js ','update_user_password','update_status',update_status )
		

	if(update_status.length > 0 )
	{
		let response = 
		{
			auth: 1 ,
			code: 4063 ,
			meta: "update_user_password_error" ,
			payload: false
		}
		
		return res.status(406).send( response );
	}

	let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "update_user_password_ok" ,
			payload: true
		}
		dd('UserWebController.js ','update_user_password','response',response )
	
	return res.status(200).send( response );
	 
},




exports.get_user_info = async(req,res)=>{
	
	
	let user_id = 	req.userId
	let user_info = await User_mdl.get_user_info(user_id)
	
	 if(user_info.length < 1 )
	 {

		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "get_user_info" ,
			payload: null 
		}
		return res.status(200).send( response );
	 }

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "i" ,
		payload: user_info
	}
	
	return res.status(200).send( response );
	 
}



exports.update_geolocation = async(req,res)=>{
	
	let customer_id = 	req.userId
	
	let latitude  = req.body.latitude
	let longitude = req.body.longitude
	
	let update_geolocation_res = await User_mdl.update_geolocation(customer_id,latitude,longitude)
	
	if(update_geolocation_res.length < 1 )
	{
		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "update_geolocation" ,
			payload: null
		}
		return res.status(200).send( response );
	}

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "update_geolocation" ,
		payload: true
	}
	
	return res.status(200).send( response );
	 
}