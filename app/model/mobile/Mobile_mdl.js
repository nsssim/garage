let promise_qry = require('../../helper/promise_qry');

exports.select_all_cus = () => {

	let sql = `SELECT * FROM "users"` 
	return promise_qry.run(sql).catch(e=>{console.log(e);
	})
}

exports.get_cus_devices = (cus_id) => {

	let sql = `SELECT
	"public".devices.deice_ip,
	"public".devices.deice_name,
	"public".devices.deice_port,
	"public".devices."id",
	"public".devices.project_name
	FROM
	"public".devices
	INNER JOIN "public".users ON "public".devices.user_id = "public".users."id"
	WHERE
	"public".devices.user_id = ` + cus_id
	
	return promise_qry.run(sql)	

}


//-------------------------------------------------------- start 



exports.find_user = (user_name) => {

	let sql = `SELECT *	FROM "public".users	WHERE "public".users.user_name = '${user_name}' and "public".users.status = 'ACTIVE' ` 
	return promise_qry.run(sql).catch(e=>{console.log(e);})
}

exports.find_user_by_tkn = (tiny_token) => {

	let sql = `SELECT *	FROM "public".users	WHERE "public".users.token = '${tiny_token}' and "public".users.status = 'ACTIVE' ` 
	return promise_qry.run(sql).catch(e=>{console.log(e);})
}


exports.save_sms_code = (user_id,sms_code) => {
	let sql = `update users SET sms_code  = ${sms_code} WHERE id = ${user_id} ` 
	return promise_qry.run(sql).catch(e=>{console.log(e);})
}

exports.update_user_token = (user_info,tiny_token) => {
	let user_id = user_info[0].id
	let sql = `update users SET token  = '${tiny_token}' WHERE id = ${user_id} ` 
	
	//console.log("exports.update_user_token -> sql", sql)

	return promise_qry.run(sql).catch(e=>{console.log(e);})
}

exports.check_token = (tiny_token) => {
	
	let sql = `select id from users WHERE token = '${tiny_token}' `
	//console.log("exports.check_token -> sql", sql)
	return promise_qry.run(sql).catch(e=>{console.log(e);})
}

exports.get_rank_user_id = (tiny_token) =>{
	//why he didnt use the id for linking tables ? 
	let sql = `SELECT rank_user_id 	FROM users WHERE users.token = '${tiny_token}' `
    //console.log("get_rank_user_id -> sql", sql)

	return promise_qry.run(sql).catch(e=>{console.log(e);})
}

exports.get_door_list = (rank_user_id) => {

	let sql = `SELECT roles."id", roles.role_name AS "roleName", roles.role_type AS "roleType",	devices.project_name AS "projectName" 
	FROM devices INNER JOIN roles ON roles.device_id = devices."id"  WHERE	devices.user_id = ${rank_user_id}  AND roles.role_status = 'ACTIVE' 
	ORDER BY
	"public".devices.deice_name ASC,
	"roleName" ASC	 `

    //console.log("get_door_list -> sql", sql)

	return promise_qry.run(sql).catch(e=>{console.log(e);})

}

exports.update_password = (user_info,new_password) => {

	let user_id = user_info[0].id
	let sql = `update users SET password  = '${new_password}' WHERE id = ${user_id} ` 
	
	//console.log("exports.update_user_token -> sql", sql)

	return promise_qry.run(sql).catch(e=>{console.log(e);})
}





