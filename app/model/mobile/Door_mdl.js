let promise_qry = require('../../helper/promise_qry');

exports.get_door = (door_id) => {

	let sql = `SELECT
		roles.role_name,roles.role_num,	roles.role_status,	roles.role_time, roles.role_time_status,
		roles.role_type, roles.device_id, devices.user_id, devices.deice_ip AS device_ip_port , devices.deice_name AS device_name ,
		devices.deice_port, devices.project_name
	FROM
		roles
	INNER JOIN devices ON roles.device_id = devices."id"
	WHERE
		roles."id" = ${door_id} ` 

	return promise_qry.run(sql).catch(e=>{console.log(e);})
}
