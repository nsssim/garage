const Logs_mdl = require('../../model/web/Logs_mdl');
let {dd} = require('../../helper/logger');
var bcrypt = require('bcryptjs');
const sms = require('../../helper/sms') 

var CronJob = require('cron').CronJob;
var dateFormat = require("dateformat");



//customer logs
exports.get_user_clients_logs = async(req,res)=>{
	
	let logs = await Logs_mdl.get_user_clients_logs(req)
	
	dd('LogWebController.js ','get_user_clients_logs','logs',logs )

	dd('LogWebController.js ','','reqparams',req.query )

	let logs_count = await Logs_mdl.get_user_clients_logs_count(req)

	
	dd('LogWebController.js ','get_user_clients_logs','logs_count',logs_count[0].count )
	let total_rows = logs_count[0].count
	
	
	let payload = {}
	payload.logs = logs
	payload.total = total_rows

	let response = {
		auth: 1 ,
		code: 200 ,
		meta: "get_user_clients_logs" ,
		payload: payload
	}
	
	return res.status(200).send( response ); 
	
}


exports.autoclean_log = async(req,res)=>{

	console.log("housekeeping  is running everyday at 4 : 00 AM  starting ...")

	var job = new CronJob('0 0 4 * * *', async function () { // at 4:00

		let n = 3
		date = new Date();
		date.setMonth(date.getMonth() - n);
		n_months_ago  = dateFormat(date, "yyyy-mm-dd hh:mm:ss");
        console.log(" 🚀 ~  clearing logs for records older than ", n_months_ago)
		
		await Logs_mdl.autoclean_log(n_months_ago); 

	})

	job.start();
	
	

}
