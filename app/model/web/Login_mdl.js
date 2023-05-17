let promise_qry = require('../../helper/promise_qry');
let {dd} = require('../../helper/logger');





exports.find_user = (user_name) => {
	
	let sql = `SELECT *	FROM "public".users	WHERE "public".users.user_name = '${user_name}' and users.user_rank = 'USER'  and users.status = 'ACTIVE' ` 
	
    console.log("exports.find_user ---------> sql", sql)
	return promise_qry.run(sql).catch(e=>{console.log(e);})
}


exports.find_admin = (user_name) => {
	
	let sql = `SELECT *	FROM "public".users	WHERE "public".users.user_name = '${user_name}' and users.user_rank = 'ADMIN'  ` 
	dd('Login_mdl.js ','find_admin','sql',sql )
	
    
	return promise_qry.run(sql).catch(e=>{console.log(e);})
}

