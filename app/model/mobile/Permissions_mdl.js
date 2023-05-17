let promise_qry = require('../../helper/promise_qry');


exports.get_client_door_permissions = ( client_id, door_id ) => {

	
	let sql = `SELECT
	"public".permissions.days,
	"public".permissions.start_time,
	"public".permissions.finish_time
	FROM
	"public".permissions
	WHERE
	"public".permissions.user_id = ${client_id} AND
	"public".permissions.relay_id = ${door_id} `

	console.log("exports.get_client_door_permission -> sql", sql)
	
	return promise_qry.run(sql).catch(e=>{console.log(e);})

}
