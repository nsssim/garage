const {db} = require('../config/db.config');

exports.run = (sql) => {
	return new Promise(function (resolve, reject) {
		db.query(sql, (err, query_result) => 
		{
			//db.end()
			if(err) 
			{
				console.log("connection error with the database");
				reject("connection " + err) //  connect EHOSTUNREACH
			}
			else
			{
				resolve(query_result.rows)
			}
		})
	})
}
