let {dd} = require('../../helper/logger');
const User_mdl = require('../../model/web/User_mdl');
const Admin_mdl = require('../../model/web/Admin_mdl');
const Door_mdl = require('../../model/web/Door_mdl');


exports.get_user_dashboard = async(req,res)=>{
	
	console.log("exports.get_dashboard_clients_doors -> req", req.userId) // userLang:
	
	let user_clients = await User_mdl.get_user_clients(req.userId)
	let user_doors   = await Door_mdl.get_user_doors(req.userId)
	
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


exports.get_admin_dashboard = async(req,res)=>{
	
	let admin_id = req.userId 

	dd('DashboardWebController.js ','get_admin_dashboard','admin_id',admin_id )

	let admin_users_count 		= await Admin_mdl.get_admin_users_count(admin_id)
	let admin_clients_count 	= await Admin_mdl.get_admin_clients_count(admin_id)
	let admin_devices_count 	= await Admin_mdl.get_admin_devices_count(admin_id)
	let admin_doors_count 		= await Admin_mdl.get_admin_doors_count(admin_id)
	
	dd('DashboardWebController.js ','get_admin_dashboard','admin_users_count'	, admin_users_count )
	dd('DashboardWebController.js ','get_admin_dashboard','admin_devices_count'	, admin_devices_count )
	dd('DashboardWebController.js ','get_admin_dashboard','admin_doors_count'	, admin_doors_count )
	dd('DashboardWebController.js ','get_admin_dashboard','admin_clients_count',admin_clients_count )
	

	 let dashboard_data = {}

	 dashboard_data.admin_users_count = admin_users_count[0].users_count;
	 dashboard_data.admin_devices_count = admin_devices_count[0].devices_count;
	 dashboard_data.admin_doors_count = admin_doors_count[0].doors_count;
	 dashboard_data.admin_clients_count = admin_clients_count[0].clients_count;

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "dashboard_data" ,
		payload: dashboard_data 
	}
	
	
	return res.status(200).send( response );
	 
}