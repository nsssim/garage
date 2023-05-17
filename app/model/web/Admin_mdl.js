let promise_qry = require('../../helper/promise_qry');
let {dd} = require('../../helper/logger');

// users = customers
exports.get_admin_users_count = (admin_id) => {

	let sql = `SELECT
	Count("public".users."id") AS users_count
	FROM
	"public".users
	WHERE
	"public".users.rank_user_id = ${admin_id} `  
	
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.get_admin_clients_count = (admin_id) => {

	let sql = `SELECT
	Count(u2."id") AS clients_count
	FROM
	"public".users AS u1
	INNER JOIN "public".users AS u2 ON u1."id" = u2.rank_user_id
	WHERE
	u1.rank_user_id = ${admin_id} AND
	u2.user_rank = 'CLIENT' `  
	
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.get_admin_devices_count = (admin_id) => {

	let sql = `SELECT
	Count("public".devices.deice_name) AS devices_count
	FROM
	"public".users
	INNER JOIN "public".devices ON "public".devices.user_id = "public".users."id"
	WHERE
	"public".users.rank_user_id = ${admin_id} `  
	
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.get_admin_doors_count = (admin_id) => {

	let sql = `SELECT
	Count("public".roles."id") AS doors_count
		FROM
	"public".users
	INNER JOIN "public".devices ON "public".devices.user_id = "public".users."id"
	INNER JOIN "public".roles ON "public".roles.device_id = "public".devices."id"
		WHERE
	"public".users.rank_user_id = ${admin_id} `  
	
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.get_admin_customers_all = (admin_id) => {

	let sql = `SELECT
	"public".users."id",
	"public".users.user_name AS username,
	"public".users.first_name AS fname,
	"public".users.last_name AS lname,
	"public".users.e_mail AS email,
	"public".users.phone_number AS phone,
	"public".users.log_status AS log_status,
	"public".users.status AS status
	FROM
	"public".users
	WHERE
	"public".users.rank_user_id = ${admin_id}
	ORDER BY
	"public".users."id" DESC`  
	
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}


exports.delete_customer = (customer_id) => {

	let sql = `DELETE FROM "public".users WHERE users."id" = '${customer_id}' ` //  <------ here 

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}

exports.add_customer = (customer) => {

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
		'${customer.fname}',
		'${customer.lname}',
		'${customer.password0}',
		${customer.rank_user_id},
		'ACTIVE',
		'${customer.username}',
		'USER',
		'${customer.email}',
		'${customer.phone}'
	);

	`
	// dd('User_mdl.js ','update_client_status','sql',sql )
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.get_last_admin_id = () => {

	let sql = `SELECT last_value FROM users_serial_seq `
	
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;

}


exports.check_other_phone = (client) => {
	let sql = ` SELECT "public".users."id"	FROM users 	WHERE users.phone_number = '${client.phone}' AND users.id !=${client.id} AND users.user_rank ='USER' `  
	//dd('User_mdl.js ','check_other_phone','sql---------------',sql )
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}



exports.update_customer = (customer) => {


	let sql = `UPDATE "public"."users" SET 
	"first_name" 	= '${customer.fname}'		,
	"last_name" 	= '${customer.lname}'		,
	"user_name" 	= '${customer.username}'	,
	"e_mail" 		= '${customer.email}'		,
	"phone_number" 	= '${customer.phone}'
 
	WHERE "id" = ${customer.id};`

	dd('Admin_mdl.js ','update_customer','sql',sql )

	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}



exports.update_customer_status = (customer_id,status) => {

	let sql = `	UPDATE "public"."users" SET "status" = '${status}' WHERE "id" = '${customer_id}' `
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}



exports.update_customer_log_status = (customer_id,customer_log_status) => {

	let sql = `	UPDATE "public"."users" SET "log_status" = '${customer_log_status}' WHERE "id" = '${customer_id}' `
	dd('Admin_mdl.js ','update_customer_log_status','sql',sql )
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}

exports.reset_customer_password = (customer) => {

	let sql = `UPDATE "public"."users" SET 	"password" = '${customer.password0}' WHERE "id" = ${customer.id} `
	return promise_qry.run(sql).catch(e=>{console.log(e);}) ;
}




























































































// TODO delte below old code

exports.get_admin_users = (admin_id) => {

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




