var tcpp = require('tcp-ping');
let promise_qry = require('../../helper/promise_qry');
let {dd} = require('../../helper/logger');



exports.get_user_devices = (user_id) => {

	let sql = `
	SELECT
		"public".devices."id",
		"public".devices.deice_ip AS ip,
		"public".devices.deice_name AS dev_name
	FROM
		"public".devices
	WHERE
		"public".devices.user_id = ${user_id} `  
	
	// dd('User_mdl.js ','get_user_clients','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}

exports.get_device_relays = (device_id) => 
{
	// return [
	// 	{"id":1,"name":"Jaymee","type":"barrier","number":1,"timer":27,"status":false},
	// 	{"id":2,"name":"Kiersten","type":"barrier","number":2,"timer":86,"status":false},
	// 	{"id":3,"name":"Padriac","type":"barrier","number":3,"timer":28,"status":false},{"id":4,"name":"Orlando","type":"shutter","number":4,"timer":35,"status":false},{"id":5,"name":"Bancroft","type":"barrier","number":5,"timer":22,"status":false},{"id":6,"name":"Hakim","type":"shutter","number":6,"timer":17,"status":false},{"id":7,"name":"Walsh","type":"shutter","number":7,"timer":57,"status":false},{"id":8,"name":"Betta","type":"shutter","number":8,"timer":60,"status":true},{"id":9,"name":"Doralyn","type":"barrier","number":9,"timer":75,"status":true},{"id":10,"name":"Illa","type":"shutter","number":10,"timer":58,"status":true}]
	
	let sql = `
	SELECT
		"public".roles."id",
		"public".roles.role_name AS name,
		"public".roles.role_num AS number,
		"public".roles.role_status AS status,
		"public".roles.role_time AS timer,
		"public".roles.role_type AS type
	FROM
		"public".roles
	WHERE
		"public".roles.device_id = ${device_id} `  
	
	// dd('User_mdl.js ','get_user_clients','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}


exports.ping = (device) =>
{

	return new Promise((resolve,reject)=>{

		let parts = (device.ip).split(":"); 
		ip = parts[0]
		port = parts[1]

		tcpp.probe(ip, port , function(err, available) {
			if(err)
			{
				console.log(err);
				reject(err)
			}
			console.log("available -> : " , available);
			resolve(available) // true or false 
			
		});

	})

}

exports.get_dip_switch_state = (device) => 
{
	console.log("device", device)


	return new Promise((resolve,reject)=>{

		////////////////////// axios start
		var axios    = require("axios");

		var config = {
		method: 'get',
		url: `http://${device.ip}/?RstatesOfDipSwitch!@`,
		//timeout: 3000 , 
		headers: {
			'Content-Type': 'application/json'
		}
		
		};

		axios(config)
		.then(response => {
            //console.log("response.data", response.data)
			let resp = {
				status: true,
				payload : response.data
			}
			resolve(resp)
		})
		.catch( error => {
			let resp = {
				status: false,
				payload : error
			}
			resolve(resp)
		});
		////////////////////// axios start  stop
	
	}) // end promise


}



exports.delete_device = (device_id) => {

	let sql = `DELETE FROM "public".devices	WHERE devices."id" = ${device_id} `  

	dd('Device_mdl.js ','device_id','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}














//**********scroll down ******* */









































































//***************** */


// TODO old code below to delete 
exports.get_user_clients = (user_id) => {

	let sql = `
	SELECT 
		users."id",
		users.first_name,
		users.last_name,
		users.status,
		users.user_name,
		users.e_mail AS email,
		users.log_status,
		users.phone_number,
		users.project_name	
	FROM users 
	WHERE users.rank_user_id = '${user_id}' 
	and users.status = 'ACTIVE' `  
	
	// dd('User_mdl.js ','get_user_clients','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}



exports.get_user_clients_all = (user_id) => {

	let sql = `
	SELECT 
		"public".users."id",
		"public".users.first_name AS fname,
		"public".users.last_name AS lname,
		"public".users.rank_user_id,
		"public".users.status,
		"public".users.token,
		"public".users.user_name AS username,
		"public".users.user_rank,
		"public".users.e_mail AS email,
		"public".users.log_status,
		"public".users.phone_number AS phone,
		"public".users.project_name,
		"public".users.sms_code,
		"public".users.sms_time,
		"public".users.user_size	
	FROM users 
	WHERE users.rank_user_id = '${user_id}' 
	ORDER BY
	"public".users."id" DESC
	`  
	
	 dd('User_mdl.js ','get_user_clients','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.update_client_status = (user_id,status) => {

	// dd('User_mdl.js ','update_client_status','user_id',user_id )

	let sql = `	UPDATE "public"."users" SET "status" = '${status}' WHERE "id" = '${user_id}'	`
	// dd('User_mdl.js ','update_client_status','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.check_username = (username) => {

	let sql = ` SELECT "public".users."id"	FROM users 	WHERE users.user_name = '${username}'`  
	// dd('User_mdl.js ','check_username','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.check_email = (email) => {

	let sql = ` SELECT "public".users."id"	FROM users 	WHERE users.e_mail = '${email}'`  
	// dd('User_mdl.js ','check_email','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.add_client = (client) => {

	// dd('User_mdl.js ','add_client','client',client )

	
	let sql = `INSERT INTO "public"."users" (
		"first_name",
		"last_name",
		"password",
		"rank_user_id",
		"status",
		"user_name",
		"user_rank",
		"e_mail",
		"phone_number"
	)
	VALUES
	(
		'${client.fname}',
		'${client.lname}',
		'${client.password0}',
		${client.rank_user_id},
		'ACTIVE',
		'${client.username}',
		'CLIENT',
		'${client.email}',
		'${client.phone}'
	);

	`
	// dd('User_mdl.js ','update_client_status','sql',sql )
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}


exports.get_last_client_id = () => {

	let sql = `SELECT last_value FROM users_serial_seq `
	
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}




exports.delete_client = (client_id) => {

	let sql = `DELETE FROM "public".users 	WHERE users."id" = '${client_id}'`  
	 dd('User_mdl.js ','delete_client','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}


exports.update_client = (client) => {


	let sql = `UPDATE "public"."users" SET 
	"first_name" 	= '${client.fname}'		,
	"last_name" 	= '${client.lname}'		,
	"user_name" 	= '${client.username}'	,
	"e_mail" 		= '${client.email}'		,
	"phone_number" 	= '${client.phone}'
 
	WHERE "id" = ${client.id};`

	dd('User_mdl.js ','update_client_status','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}
/**
 * check if an other user has already this username
 * */
exports.check_other_username = (client) => {
	
	let sql = ` SELECT "public".users."id"	FROM users 	WHERE users.user_name = '${client.username}' AND users.id !=${client.id} `  
	
	// dd('User_mdl.js ','check_other_username','sql',sql ) 

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ; 
}

/**
 * check if an other user has already this email
 */
exports.check_other_email = (client) => {
	let sql = ` SELECT "public".users."id"	FROM users 	WHERE users.e_mail = '${client.email}' AND users.id !=${client.id} `  
	// dd('User_mdl.js ','check_other_email','sql',sql )
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.check_other_phone = (client) => {
	let sql = ` SELECT "public".users."id"	FROM users 	WHERE users.phone_number = '${client.phone}' AND users.id !=${client.id} `  
	// dd('User_mdl.js ','check_other_phone','sql',sql )
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}




exports.reset_client_password = (client) => {

	let sql = `UPDATE "public"."users" SET 	"password" = '${client.password0} ' WHERE "id" = ${client.id} `
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}


exports.add_device = (device,user_id) =>{

	let sql = `INSERT INTO "public"."devices"(
		"deice_ip",
		"deice_name",
		"deice_port",
		"project_name",
		"user_id"
		) 
		VALUES ( 
		'${device.ip}',
		'${device.dev_name}',
		'0',
		'${device.project}',
		${user_id} ) ;`
		
		dd('Device_mdl.js ','add_device','sql',sql )
	
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}

exports.get_last_device_id = () => {

	
	let sql = `SELECT last_value FROM devices_serial_seq `

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}

/**
 * add relays with logic  ask Omer for more info :D 
 */
exports.add_relays = (last_device_id, dipsw_state) => {


	dd('Device_mdl.js ','add_relays','dipsw_state',dipsw_state )

	let ds = dipsw_state
	let a  = ds.split('').map(i=>+i);
	let aa = a.reduce(function (res, current ) {
		return res.concat([current, current]);
	}, []);


	let sql = ``

	console.log("---------------------");

	//add shutters
	for(i = 0 ; i < 6  ; i++ )
	{

		if(a[i] == 0 )
		{
			console.log("shutter:",i+1); 

			sql += ` INSERT INTO "public"."roles"(
					"role_name",
					"role_num",
					"role_status",
					"role_time",
					"role_time_status",
					"role_type",
					"device_id") 
				VALUES 
				(
					'---',
					${i+1},
					'PASSIVE',
					0,
					'TRUE',
					'SHUTTER',
					${last_device_id}
				) ; `
		}
	}
	
	console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

	//add barriers
	for(i = 0 ; i < 12  ; i++ )
	{
		//console.log(aa[i]);
		if(aa[i] == 1 )
		{
			console.log("barrier:",i+1);

			sql += ` INSERT INTO "public"."roles"(
				"role_name",
				"role_num",
				"role_status",
				"role_time",
				"role_time_status",
				"role_type",
				"device_id") 
			VALUES 
			(
				'---',
				${i+1},
				'PASSIVE',
				1,
				'FALSE',
				'BARRIER',
				${last_device_id}
			) ; `

		}

	}

	
	//dd('Device_mdl.js ','add_relays','sql',sql )


	return promise_qry.run(sql).catch(e=>{
		
		let response = {
			auth: 1 ,
			code: 408 ,
			meta: "error adding relays " ,
			payload: e
		}

		return response ; 

	
	}) ;

}



exports.check_port_ip = (device_data) => {

	
	let sql = `SELECT "public".devices."id" FROM "public".devices WHERE "public".devices.deice_ip = '${device_data.ip}' `
	
	dd('Device_mdl.js ','check_port_ip','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}

exports.check_port_ip_for_update = (device_data) => {

	
	let sql = `SELECT "public".devices."id" FROM "public".devices WHERE "public".devices.deice_ip = '${device_data.ip}' AND "public".devices.id != ${device_data.id} `
	
	dd('Device_mdl.js ','check_port_ip_for_update','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}

exports.update_device = (device_data) => {

	let sql = `UPDATE "public"."devices" SET
		"deice_ip" = '${device_data.ip}',
		"deice_name" = '${device_data.dev_name}',
		"project_name" = '${device_data.dev_name}'
	WHERE 
		"id" = ${device_data.id} ; `
	
	dd('Device_mdl.js ','update_device','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}


exports.update_relay = (relay_data) => {

	let sql = ``;
	if(relay_data.type == "BARRIER")
	{
		sql = `UPDATE "public"."roles" 
		SET 
			"role_name" 		= '${relay_data.name}' ,
			"role_time" 		=  ${relay_data.timer} 
		WHERE 
			"id" 				= ${relay_data.id} ;`
	}
	else
	{
		sql = `UPDATE "public"."roles" 
		SET 
			"role_name" 		= '${relay_data.name}' 
		WHERE 
			"id" 				= ${relay_data.id} ;`

	}
	
	
	dd('Device_mdl.js ','update_relay','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}


exports.update_relay_status = (relay_data) => {

	let status = "PASSIVE"
	if(relay_data.status)	status = "ACTIVE"

	let 
		sql = `UPDATE "public"."roles" 
		SET 
			"role_status" 		= '${status}' 
		WHERE 
			"id" 				= ${relay_data.id} ;`
	
	dd('Device_mdl.js ','update_relay_status','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}



