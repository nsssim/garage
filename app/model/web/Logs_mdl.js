let promise_qry = require('../../helper/promise_qry');
let {dd} = require('../../helper/logger');

exports.get_user_clients_logs = (req) => {

	
	let customer_id = req.userId
	let filters = {}
	
	filters.limit = req.query._limit
	filters.offset = req.query._start

	filters.username = req.query._username
	if(filters.username == "" )
		filters.username = '%'
	

	filters.datestart = req.query._datestart
	if(filters.datestart == "")
	filters.datestart = "1970-01-01"

	filters.datefinisht = req.query._datefinish
	if(filters.datefinisht == "")
	filters.datefinisht = "2500-01-01"

	
	let sql = `	
	SELECT
		"public".log.user_id,
		TO_CHAR("public".log.log_time, 'dd/mm/yyyy hh12:mi:ss AM') AS log_time,
		"public".roles.role_name AS door_name,
		"public".users.first_name AS firstname,
		"public".users.last_name AS lastname,
		"public".users.user_name AS username,
		"public".users.e_mail AS email 
	FROM
		"public".log
		INNER JOIN "public".roles ON "public".log.role_id = "public".roles."id"
		INNER JOIN "public".users ON "public".log.user_id = "public".users."id" 
	WHERE
		"public".log.user_rank_id = ${customer_id} 
		AND "public".users.user_name LIKE '${filters.username}' 
		AND "public".log.log_time <= '${filters.datefinisht}' 
		AND "public".log.log_time >= '${filters.datestart}' 
	ORDER BY
		"public".log.log_time DESC 
		LIMIT ${filters.limit} OFFSET ${filters.offset} `  

	dd('Logs_mdl.js ','get_user_clients_logs','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}


exports.get_user_clients_logs_count = (req) => {

	
	let customer_id = req.userId
	let filters = {}
	
	filters.limit = req.query._limit
	filters.offset = req.query._start

	filters.username = req.query._username
	if(filters.username == "" )
		filters.username = '%'
	

	filters.datestart = req.query._datestart
	if(filters.datestart == "")
	filters.datestart = "1970-01-01"

	filters.datefinisht = req.query._datefinish
	if(filters.datefinisht == "")
	filters.datefinisht = "2500-01-01"

	let sql = `	
	SELECT
		Count("public".log.user_id)
	FROM
		"public".log
		INNER JOIN "public".roles ON "public".log.role_id = "public".roles."id"
		INNER JOIN "public".users ON "public".log.user_id = "public".users."id" 
	WHERE
		"public".log.user_rank_id = ${customer_id} 
		AND "public".users.user_name LIKE '${filters.username}' 
		AND "public".log.log_time <= '${filters.datefinisht}' 
		AND "public".log.log_time >= '${filters.datestart}' `  

	dd('Logs_mdl.js ','get_user_clients_logs','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}


exports.autoclean_log = (n_months_ago) => {

	let sql = `	DELETE	FROM "public".log WHERE "public".log.log_time < '${n_months_ago}' `  
	console.log(sql)
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}







































































































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
	let sql = ` SELECT "public".users."id"	FROM users 	WHERE users.phone_number = '${client.phone}' AND users.id !=${client.id} AND users.user_rank ='CLIENT' `  
	//dd('User_mdl.js ','check_other_phone','sql---------------',sql )
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}




exports.reset_client_password = (client) => {

	let sql = `UPDATE "public"."users" SET 	"password" = '${client.password0}' WHERE "id" = ${client.id} `
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.update_user_password = (user_id,new_password)=>{
	
	let sql = `UPDATE "public"."users" SET 	"password" = '${new_password}' WHERE "id" = ${user_id} `
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}

exports.find_user = (user_id) => {
	
	let sql = `SELECT *	FROM "public".users	WHERE "public".users.id = '${user_id}' and users.user_rank = 'USER'  and users.status = 'ACTIVE' ` 
	dd('User_mdl.js ','find_user','sql',sql )
	return promise_qry.run(sql).catch(e=>{console.log(e);})
}




