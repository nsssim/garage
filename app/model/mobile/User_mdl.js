let promise_qry = require('../../helper/promise_qry');

exports.check_token = (tiny_token) => {

	let sql = `SELECT id FROM users WHERE users.token = '${tiny_token}'` 
	
	return promise_qry.run(sql).catch(e=>{console.log(e);})

}

exports.get_user_info = (tiny_token) => {

	//let sql = `SELECT * FROM users WHERE users.token = '${tiny_token}'` 
	
	let sql = `SELECT
	u1.user_name,
	u2.log_status AS customer_logstatus,
	u1."id",
	u1.first_name,
	u1.last_name,
	u1.status,
	u1.token,
	u1.user_rank,
	u1.e_mail,
	u1.log_status,
	u1.phone_number,
	u1.project_name,
	u1.sms_code,
	u1.sms_time,
	u1.user_size,
	u1.rank_user_id
	FROM
	"public".users AS u1
	INNER JOIN "public".users AS u2 ON u1.rank_user_id = u2."id"
	WHERE
	u1.token = '${tiny_token}'` 

	
	console.log("exports.get_user_info -> sql", sql)

	return promise_qry.run(sql).catch(e=>{console.log(e);})

}