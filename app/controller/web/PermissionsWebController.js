const Permissions_mdl = require('../../model/web/Permissions_mdl');
let {dd} = require('../../helper/logger');

exports.get_client_permissions = async(req,res)=>{
	
	let client_id = req.query.client_id
	let customer_id = req.userId 
	
	dd('PermissionsWebController.js ','','customer_id',customer_id )

	let customer_doors 		= await Permissions_mdl.get_customer_doors(customer_id  )
	dd('PermissionsWebController.js ','','customer_doors',customer_doors )
	let client_permissions 	= await Permissions_mdl.get_client_permissions(client_id )
	dd('PermissionsWebController.js ','','client_permissions',client_permissions )
        
    if((customer_doors.length < 1) )
    {
		let response = {
			auth: 1 ,
			code: 204 ,
			meta: "nothing found" ,
			payload: null
		}
		
        return res.status(204).send( response );  
	}

	let payload = {}
	
	payload.customer_doors = customer_doors
	payload.client_permissions = client_permissions
	
	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "get_client_permissions" ,
		payload: payload 
	}
	
	return res.status(200).send( response );
	 
}

exports.set_client_permissions = async(req,res)=>{
	
	//dd('PermissionsWebController.js ','set_client_permissions','req.body',req.body )
	let client_id = req.body.client_id
	let permissions = req.body.permissions


	//1st remove all permissions for client
	let clear_client_permissions_res 	= await Permissions_mdl.clear_client_permissions(client_id)

	dd('PermissionsWebController.js ','set_client_permissions','clear_client_permissions_res',clear_client_permissions_res )

	if(clear_client_permissions_res.length > 0)
	{
		let response = {
			auth: 1 ,
			code: 4031 ,
			meta: "update_error" ,
			payload: null
		}
		
        return res.status(403).send( response );
	}
	
	let set_client_permissions_res 	= await Permissions_mdl.set_client_permissions(client_id, permissions )
	
	dd('PermissionsWebController.js ','','set_client_permissions_res',set_client_permissions_res )
        
    if(set_client_permissions_res)
    {
		let response = {
			auth: 1 ,
			code: 4032 ,
			meta: "set_client_permissions" ,
			payload: null
		}
		
		dd('PermissionsWebController.js ','set_client_permissions','response',response )
		
		return res.status(403).send( response );  
	}
		
	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "set_client_permissions" ,
		payload: true 
	}
	dd('PermissionsWebController.js ','set_client_permissions','response',response )
	
	return res.status(200).send( response );
	 
}
