let promise_qry = require('../../helper/promise_qry');

exports.save = (data) => {
	
	let sql = `INSERT INTO "log" ( "log_time", "send_type", "role_id", "user_id", "user_rank_id") VALUES
	(
		NOW(),
		'DEFAULT',
		${data.role_id},
		${data.user_id},
		${data.user_rank_id}
		); `  
	
	// console.log("exports.save -> sql", sql)
	
	return promise_qry.run(sql).catch(e=>{console.log(e);})

}
