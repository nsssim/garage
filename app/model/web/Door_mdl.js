let promise_qry = require('../../helper/promise_qry');
let {dd} = require('../../helper/logger');


exports.get_user_doors = (user_id) => {
	
	let sql = `
	SELECT
		roles."id",
		roles.role_name AS name,
		roles.role_type AS type
		FROM
		devices
		INNER JOIN roles ON roles.device_id = devices."id" AND roles.role_status = 'ACTIVE'
		AND roles.role_status = 'ACTIVE'
	WHERE
	"public".devices.user_id = '${user_id}' `  
	
	dd('Door_mdl.js ','get_user_doors','sql',sql )
	
	
	//console.log("exports.get_user_info -> sql", sql)

	


	return promise_qry.run(sql).catch(e=>{console.log(e);})

}