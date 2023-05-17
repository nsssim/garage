let promise_qry = require('../../helper/promise_qry');
let {dd} = require('../../helper/logger');

// exports.get_client_permissions = (customer_id , client_id ) => {
	
// 	// let user_id = 1852 
// 	// let client_id = 2357

// 	let sql = `SELECT
// 	"public".devices.deice_name,
// 	"public".roles."id",
// 	"public".roles.role_name
// 	FROM
// 	"public".roles
// 	INNER JOIN "public".devices ON "public".roles.device_id = "public".devices."id"
// 	WHERE
// 	"public".devices.user_id = ${customer_id};
	
// 	SELECT
// 	"public".roles."id",
// 	"public".roles.role_name,
// 	"public".permissions.relay_id,
// 	"public".permissions.days,
// 	"public".permissions.start_time,
// 	"public".permissions.finish_time,
// 	"public".permissions.user_id AS client_id
// 	FROM
// 	"public".roles
// 	INNER JOIN "public".permissions ON "public".permissions.relay_id = "public".roles."id"
// 	WHERE
// 	"public".permissions.user_id = ${client_id}	; `  
	
// 	console.log("exports.get_client_permissions -> sql", sql)
	
// 	return promise_qry.run(sql).catch(e=>{console.log(e);})

// }


exports.get_customer_doors = (customer_id) => {
	
	let sql = `SELECT
	"public".devices.deice_name,
	"public".roles."id" AS relay_id,
	"public".roles.role_name
	FROM
	"public".roles
	INNER JOIN "public".devices ON "public".roles.device_id = "public".devices."id"
	WHERE
	"public".devices.user_id = ${customer_id};	 `  

    // console.log("exports.get_customer_doors -> sql", sql)
	
	return promise_qry.run(sql).catch(e=>{console.log(e);})

}


exports.get_client_permissions = ( client_id ) => {

	let sql = `
	SELECT
	"public".roles.role_name,
	"public".permissions.relay_id,
	"public".permissions.days,
	"public".permissions.start_time,
	TO_CHAR("public".permissions.start_time, 'hh24:mi') AS start_time,
	TO_CHAR("public".permissions.finish_time, 'hh24:mi') AS finish_time,
	"public".permissions.user_id AS client_id
	FROM
	"public".roles
	INNER JOIN "public".permissions ON "public".permissions.relay_id = "public".roles."id"
	WHERE
	"public".permissions.user_id = ${client_id}	; `
	
	 console.log("exports.get_client_permissions -> sql", sql)
	
	return promise_qry.run(sql).catch(e=>{console.log(e);})

}




exports.clear_client_permissions = ( client_id ) => {

	let sql = `DELETE from "public"."permissions" WHERE "user_id" = ${client_id} `

	dd('Permissions_mdl.js ','clear_client_permissions','sql',sql )
	
	return promise_qry.run(sql).catch(e=>{console.log(e);})

}

exports.set_client_permissions = ( client_id, permissions ) => {

	
	let sql = ``
	for( i in permissions)
	{
		if((permissions[i].days == '0000000') ) 
			sql += `INSERT INTO "public"."permissions"("user_id", "relay_id", "days", "start_time", "finish_time") VALUES (${client_id}, ${permissions[i].relay_id}, '${permissions[i].days}', NULL, NULL);`
		else
			sql += `INSERT INTO "public"."permissions"("user_id", "relay_id", "days", "start_time", "finish_time") VALUES (${client_id}, ${permissions[i].relay_id}, '${permissions[i].days}', '${permissions[i].start_time}', '${permissions[i].finish_time}');`



	}

	 console.log("exports.get_client_permissions -> sql", sql)
	
	return promise_qry.run(sql).catch(e=>{console.log(e);})

}