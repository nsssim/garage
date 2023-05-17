const Device_mdl = require('../../model/web/Device_mdl');
let {dd} = require('../../helper/logger');

exports.get_user_devices = async(req,res)=>{

	let user_devices = await Device_mdl.get_user_devices(req.userId)
	if(user_devices.length < 1)
    {
		let response = {
			auth: 1 ,
			code: 204 ,
			meta: "no devices" ,
			payload: null
        }
        
        return res.status(204).send( response );  
	}
	dd('DeviceWebController.js ','get_user_devices','user_devices',user_devices )

	let response = {
		auth: 1 ,
		code: 200 ,
		meta: "ok" ,
		payload: user_devices
	}
	
	return res.status(200).send( response ); 

}

exports.get_device_relays = async (req,res)=>{
	let device_id = req.query.device_id
	dd('DeviceWebController.js ','get_device_relays','device_id',device_id )

	let devices_relays = await Device_mdl.get_device_relays(device_id)

	let response = {
		auth: 1 ,
		code: 200 ,
		meta: "ok" ,
		payload: devices_relays
	}
	
	return res.status(200).send( response ); 

}


exports.add_device = async (req,res)=>{


	let device_data = req.body
	let user_id = req.userId ; 

	dd('DeviceWebController.js ','add_device','user_id---->',user_id )
	console.log("--------");
	

	
	//0 check if ip and  port are already registred
	let check_port_ip_resp = await Device_mdl.check_port_ip(device_data)
	dd('DeviceWebController.js ','','check_port_ip_resp ----->>>>>>>>>>>>',check_port_ip_resp )
	if(check_port_ip_resp.length > 0){
		
		let response = {
			auth: 1 ,
			code: 4082 ,
			meta: "socket_alredy_in_use" ,
			payload: false
		}
		return res.status(408).send(response); 
	}
	
	
	//1 ping device check if it is connected 
	let ping_res = await Device_mdl.ping(device_data).catch(e=>
		{
			console.log(e);
			let response = {
				auth: 1 ,
				code: 4081 ,
				meta: "not_connected" ,
				payload: false
			}
			return res.status(408).send(  response ); 
		})
		
		dd('DeviceWebController.js ','','ping_res',ping_res )
		
		if(!ping_res)
		{
			let response = {
				auth: 1 ,
				code: 4081 ,
				meta: "not_connected" ,
				payload: false
			}

			return res.status(408).send(  response ); 
		}
		

	// 2 read device dip switch status
	let dip_switch_state_res = await Device_mdl.get_dip_switch_state(device_data).catch(e=>{
		console.log(e);	
		let response = {
			auth: 1 ,
			code: 4081 ,
			meta: "not_connected" ,
			payload: false
		}

		return res.status(408).send(  response ); 
	
	})

	dd('DeviceWebController.js ','add_device','dip_switch_state_res',dip_switch_state_res )
	
	if(!dip_switch_state_res.status ) 
	{
		let response = {
			auth: 1 ,
			code: 4081 ,
			meta: "not_connected" ,
			payload: false
		}

		return res.status(408).send(  response ); 

	}
	

	//3 add device 
	let add_device_res = await Device_mdl.add_device(device_data,user_id)
	
	dd('DeviceWebController.js ','add_device','add_device_res',add_device_res )
	
	if(add_device_res.length > 1)
	{
		let response = {
			auth: 1 ,
			code: 4083 ,
			meta: "can not add" ,
			payload: false
		}
		return res.status(408).send(  response ); 
	}

	//3 get last device id 
	let last_device_id_res = await Device_mdl.get_last_device_id()
	dd('DeviceWebController.js ','add_device','last_device_id',last_device_id_res )
	if(last_device_id_res.length < 0 )
	{
		let response = {
			auth: 1 ,
			code: 4084 ,
			meta: "error last device id " ,
			payload: false
		}

		return res.status(408).send(response); 

	}

	//4 add device relays with logic  // <-------- here 
	let dipsw_state = dip_switch_state_res.payload.DipSwitchState

	let last_device_id = last_device_id_res[0].last_value
		
	let add_relays_res = await Device_mdl.add_relays(last_device_id, dipsw_state).catch(e=>{  
		
		console.log(e);
	
		let response = {
			auth: 1 ,
			code: 4085 ,
			meta: "error adding relays" ,
			payload: e
		}

		return res.status(408).send(response); 
		 
	})

	if(add_relays_res != undefined )
	{
		let response = {
			auth: 1 ,
			code: 4085 ,
			meta: "error adding relays" ,
			payload: false
		}

	 	return res.status(408).send(response); 
	 }

	//5 all is good
	let payload = {}

	payload.last_device_id 	= 	last_device_id
	payload.device_data 	= 	device_data
	let response = 
	{
		auth: 1 ,
		code: 200 ,
		meta: "ok" ,
		payload: payload
	}
	
	return res.status(200).send( response ); 

}


exports.update_device = async (req,res)=>{

	let device_data 	= 	req.body
	let user_id 		= 	req.userId ; 

	dd('DeviceWebController.js ','update_device','device_data',device_data )

		//2 check if ip and  port are already registred 
		let check_port_ip_resp = await Device_mdl.check_port_ip_for_update(device_data)
		dd('DeviceWebController.js ','update_device','check_port_ip_resp',check_port_ip_resp )
		if(check_port_ip_resp.length > 0) 
		{
			let response = {
				auth: 1 ,
				code: 4082 ,
				meta: "socket_alredy_in_use" ,
				payload: false
			}
			return res.status(408).send(response); 
		}
		
	
	//1 ping device check if it is connected 
	let ping_res = await Device_mdl.ping(device_data).catch(e=>
		{
			console.log(e);
			let response = {
				auth: 1 ,
				code: 4081 ,
				meta: "not_connected" ,
				payload: false
			}
			return res.status(408).send(  response ); 
		})
		
		dd('DeviceWebController.js ','','ping_res',ping_res )
		
		if(!ping_res)
		{
			let response = {
				auth: 1 ,
				code: 4081 ,
				meta: "not_connected" ,
				payload: false
			}

			return res.status(408).send(  response ); 
		}

	//1 read device dip switch status
	let dip_switch_state_res = await Device_mdl.get_dip_switch_state(device_data)

	dd('DeviceWebController.js ','update_device','dip_switch_state_res',dip_switch_state_res )

	if(!dip_switch_state_res.status ) 
	{
		let response = {
			auth: 1 ,
			code: 4081 ,
			meta: "not_connected" ,
			payload: false
		}
		
		return res.status(408).send(  response ); 
	}
	

	//3 update device
		
	let update_device_res = await Device_mdl.update_device(device_data)
	
	dd('DeviceWebController.js ','update_device','update_device_res',update_device_res )
	
	if(update_device_res.length > 1)
	{
		let response = {
			auth: 1 ,
			code: 4083 ,
			meta: "can not update" ,
			payload: false
		}
		return res.status(408).send(  response ); 
	}

	//4 all is good
	let payload = {}

	payload.device_data 	= 	device_data

	let response = 
	{
		auth: 1 ,
		code: 200 ,
		meta: "ok" ,
		payload: payload
	}


		
	return res.status(200).send( response ); 

}


exports.delete_device = async(req,res)=>{
	
	let device_id = req.body.id
	let delete_device_status = await Device_mdl.delete_device(device_id)
	dd('DeviceWebController.js ','delete_device','delete_device_status',delete_device_status )

	
	 payload_data = true
	 if(delete_device_status != undefined && delete_device_status.length > 0)
	 {
		payload_data = false
		let response = 
		{
			auth: 1 ,
			code: 200 ,
			meta: "delete_device" ,
			payload: payload_data 
		}
		dd('DeviceWebController.js ','delete_device','response',response )
		return res.status(200).send( response );
	 }

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "delete_device" ,
		payload: payload_data
	}
	dd('DeviceWebController.js ','delete_device','response',response )
	return res.status(200).send( response );
	 
}


exports.update_relay = async(req,res)=>{
	
	let relay 		= req.body
	
	dd('DeviceWebController.js ','update_relay','relay',relay )
	
	let update_relay_res = await Device_mdl.update_relay(relay);
	
	if(update_relay_res.length > 0 ){
		let response = {
			auth: 1 ,
			code: 4083,
			meta: "error_updating_relay",
			payload: false
		}
		return res.status(408).send( response );
	}

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "update_relay" ,
		payload: true
	}
	
	return res.status(200).send( response );
	
	
	 
}

exports.update_relay_status = async(req,res)=>{
	
	let relay 		= req.body
	
	dd('DeviceWebController.js ','update_relay_status','relay',relay )
	
	let update_relay_res = await Device_mdl.update_relay_status(relay);
	
	if(update_relay_res.length > 0 ){
		let response = {
			auth: 1 ,
			code: 4083,
			meta: "error_updating_relay",
			payload: false
		}
		return res.status(408).send( response );
	}

	let response = 
    {
		auth: 1 ,
		code: 200 ,
		meta: "update_relay" ,
		payload: true
	}
	
	return res.status(200).send( response );
	
	
	 
}

