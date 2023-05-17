const Admin_mdl = require('../../model/web/Admin_mdl');
const User_mdl = require('../../model/web/User_mdl');

let {dd} = require('../../helper/logger');
var bcrypt = require('bcryptjs');
const sms = require('../../helper/sms') 
const emailer = require('../../helper/email')

exports.get_admin_customers_all = async(req,res)=>{
	
	let admin_customers = await Admin_mdl.get_admin_customers_all(req.userId)
    
    if(admin_customers.length < 1)
    {
		let response = {
			auth: 1 ,
			code: 204 ,
			meta: "no customers" ,
			payload: null
        }
        
        return res.status(204).send( response );  
	}
	
	let payload_data = {}
	
	payload_data.admin_customers = admin_customers ;

	//dd('AdminWebController.js ','get_admin_customers_all','admin_customers',admin_customers )
	
	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "customers_data" ,
		payload: payload_data 
	}
	
	return res.status(200).send( response );
	 
}


exports.delete_customer = async(req,res)=>{
	
	let customer_id = req.body.customer_id
	let delete_status = await Admin_mdl.delete_customer(customer_id)

	dd('AdminWebController.js ','delete_customer','delete_status',delete_status )
	

	
	 payload_data = false
	 if(delete_status != undefined && delete_status.length == 0)
	 {
		payload_data = true
		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "delete_customer" ,
			payload: payload_data 
		}
		return res.status(200).send( response );
	 }

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "delete_customer" ,
		payload: payload_data
	}
	
	return res.status(200).send( response );
	 
}



exports.add_customer = async(req,res)=>{
	
	let username = req.body.username
	let email    = req.body.email
	let user_id = req.userId ; 

	//1 check if username already exists
	let res_username = await User_mdl.check_username(username);
	dd('AdminWebController.js ','add_customer','res_username',res_username[0] )

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
	dd('AdminWebController.js ','add_customer','res_email',res_email )

	if(res_email.length > 0 ){
		let response = {
			auth: 1 ,
			code: 2,
			meta: "email_already_registred",
			payload: false
		}
		return res.status(200).send( response );
	}

	//new send email 
	let usr = {}
	usr.email = email
	usr.username = username
	usr.password = "admin"

	let email_was_sent = await emailer.WelcomeEmail(usr).catch(e=>{console.log(e); })
	if(!email_was_sent)
	{
		let response = {
			auth: 1 ,
			code: 4,
			meta: "email_send_error",
			payload: false
		}
		return res.status(200).send( response );

	}

	//3 add customer
	let customer = req.body
	customer.rank_user_id= user_id
	customer.password0 = bcrypt.hashSync("admin",8);
	
	dd('AdminWebController.js ','add_customer','customer',customer )

	let add_result = await Admin_mdl.add_customer(customer)
	
	dd('AdminWebController.js ','add_customer','add_result', add_result )

	let last_id = await Admin_mdl.get_last_admin_id()

	dd('AdminWebController.js ','add_customer','last_id',last_id )
	
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
	 
}

exports.update_customer = async(req,res)=>{  // <------------- ok update need to test it a bit more here
	
	let customer 		= req.body
	
	dd('AdminWebController.js ','update_customer','customer',customer )

	//1 check if username is taken by another customer
	let res_other_username = await User_mdl.check_other_username(customer);
	dd('AdminWebController.js ','update_customer','res_other_username',res_other_username[0] )

	if(res_other_username.length > 0 ){
		let response = {
			auth: 1 ,
			code: 1,
			meta: "username_already_registred",
			payload: false
		}
		return res.status(200).send( response );
	}

	//2 check if email is taken by another customer
	let res_email = await User_mdl.check_other_email(customer);

	// dd('AdminWebController.js ','email_already_registred','res_email',res_email )

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
	let res_phone = await Admin_mdl.check_other_phone(customer);

	// dd('AdminWebController.js ','email_already_registred','res_email',res_email )

	if(res_phone.length > 0 ){
		let response = {
			auth: 1 ,
			code: 3,
			meta: "phone_already_registred",
			payload: false
		}
		return res.status(200).send( response );
	}

	//4 update customer
	let update_status = await Admin_mdl.update_customer(customer)
	dd('AdminWebController.js ','update_customer','update_customer',update_status )

	
	 payload_data = false
	 if(update_status != undefined && update_status.length == 0)
	 {
		//ok
		payload_data = true
		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "update_customer" ,
			payload: payload_data 
		}
		return res.status(200).send( response );
	 }

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "update_customer" ,
		payload: payload_data
	}
	
	return res.status(200).send( response );
	 
}

exports.update_customer_status = async(req,res)=>{
	
	let customer_id = req.body.id
	let customer_status = "ACTIVE"
	if(req.body.status){
		customer_status = "PASSIVE"
	}
	
	let update_customer_status_res = await Admin_mdl.update_customer_status(customer_id,customer_status)


	payload_data = false
	if(update_customer_status_res.length == 0)
	{
		payload_data = true
	}

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "update_customer_status" ,
		payload: payload_data 
	}
	
	return res.status(200).send( response );
	 
}

exports.update_customer_logs_status = async(req,res)=>{
	
	let customer_id = req.body.id

	
	let customer_log_status = "ACTIVE"
	if(req.body.log_status){
		customer_log_status = "PASSIVE"
	}
	
	let update_customer_log_status_res = await Admin_mdl.update_customer_log_status(customer_id,customer_log_status)


	payload_data = false
	if(update_customer_log_status_res.length == 0)
	{
		payload_data = true
	}

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "update_customer_logs_status" ,
		payload: payload_data 
	}
	
	return res.status(200).send( response );
	 
}

exports.reset_customer_password = async(req,res)=>{
	
	let customer = req.body
	customer.password0 = bcrypt.hashSync("admin", 10);
	
	let reset_status = await Admin_mdl.reset_customer_password(customer)

	payload_data = false
	
	if(reset_status != undefined && reset_status.length == 0)
	{
		payload_data = true
		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "reset_customer_password" ,
			payload: payload_data 
		}
		return res.status(200).send( response );
	}

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "reset_customer_password" ,
		payload: payload_data
	}
	
	return res.status(200).send( response );
	 
}

