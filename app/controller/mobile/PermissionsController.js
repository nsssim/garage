const Permissions_mdl = require('../../model/mobile/Permissions_mdl');
let {dd} = require('../../helper/logger');

exports.check_client_door_permission = async(user_info,door_id) =>{

	let client_id = user_info[0].id
	let client_door_permissions = await Permissions_mdl.get_client_door_permissions(client_id,door_id).catch(e=>{console.log(e);	})
	
	
	let permission = {} 
	permission.status = true 
	
	if(client_door_permissions.length < 1)
	{
		permission.status = false 
		permission.meta = "no permission"
		console.log(permission.meta);
		return permission 
	}

	process.env.TZ = 'Europe/Istanbul'
	var d = new Date();
	
	var today =  d.getDay(); var hr    =  d.getHours();	var min   =  d.getMinutes()
	console.log("~~~~~~~~~~~~~~~> Today : " + today + ", H: " + hr + ", M: " + min ) ;
	
	dd('PermissionsController.js ','check_client_door_permission','client_door_permissions',client_door_permissions )

	//d  =>    Su = 0,  Mo = 1 , Tu = 2 , We = 3 , Th = 4, Fr = 5 , Sa = 6  
	//today => [             0,       1,       2,       3,      4,       5,       6  ] 

	
	dd('PermissionsController.js ','check_client_door_permission','client_door_permissions[0].days',client_door_permissions[0].days )
	
	//check todays permission
	let todays_permission = 0
	if(d == 0)  // handle sunday idx = 0   
		todays_permission = client_door_permissions[0].days[6]
	else //other days 
		todays_permission = client_door_permissions[0].days[today-1]

	if(todays_permission == 0)
	{
		permission.status = false 
		permission.meta = "not allowed today"
		console.log(permission.meta);
		return permission 
	}

	//check time now 

	//check if start_time null 
	if(!client_door_permissions[0].start_time)
	{
		permission.status = false 
		permission.meta = "start time null"
		console.log(permission.meta);
		return permission 
	}
	
	//check if finish_time null 
	if(!client_door_permissions[0].finish_time)
	{
		permission.status = false 
		permission.meta = "finish time null"
		console.log(permission.meta);
		return permission 
	}

    let time_now = hr+":"+min+":00"
	let timestart  = client_door_permissions[0].start_time
	let timefinish = client_door_permissions[0].finish_time 
	
	if(timestart == timefinish){
		permission.status = true 
		permission.meta = "all_time_access_true"
		console.log(permission.meta); 
		return permission 
	}

	let ref_date = "01/01/2000 " 
	let too_early = (Date.parse(ref_date+" "+time_now) < Date.parse(ref_date+" "+timestart))
	let too_late = (Date.parse(ref_date+" "+time_now) > Date.parse(ref_date+" "+timefinish))
	
	console.log("exports.check_client_door_permission -> too_early", too_early)
	console.log("exports.check_client_door_permission -> too_late", too_late)

	if(too_early) //<-------------need more tesing here 
	{
		console.log("exports.check_client_door_permission -> time_now :" , time_now)
		console.log("exports.check_client_door_permission -> time_db  :" , client_door_permissions[0].start_time)
		permission.status = false 
		permission.meta = "time_too_early"
		console.log(permission.meta);
		
		return permission 	
	}

	if(too_late) //<-------------need more tesing here 
	{
		console.log("exports.check_client_door_permission -> time_now", time_now)
		console.log("exports.check_client_door_permission -> time_db  :" , client_door_permissions[0].finish_time)
		permission.status = false 
		permission.meta = "time_too_late"
		console.log(permission.meta);
		
		return permission 	
	}

	dd('PermissionsController.js ','check_client_door_permission','todays_permission',todays_permission )

	return permission 

}
