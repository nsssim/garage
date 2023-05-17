const jwt = require('jsonwebtoken');
const config = require('../config/jwt.config');


verifyToken = (req, res, next) => {
	let token = req.headers['x-access-token'];
    // console.log("verifyToken -> token", token)
	
	if (token == "undefined" ) {

		
		let response = {
			auth:0,
			code: 0,
			meta : "no token",
		}
		
		//console.log("verifyToken -> token == undefined --->  response", response)
		
		return res.status(403).send(response);
	}

	jwt.verify(token, config.secret, (err, decoded) => {
		if (err){
			let response = {
				auth:0,
				code: 1,
				meta : "Failed to authentificate ! ",
			}
			return res.status(401).send( response );
		}

		req.userId 		= 		decoded.id;
		req.userLang 	= 		decoded.lang;

		// console.log(decoded)
		next();
	});
}


verifyTokenAdmin = (req, res, next) => {
	let token = req.headers['x-access-token'];
	
	console.log("verifyTokenAdmin -> token", token)
	
	
    
	
	if (token == "undefined" ) {

		let response = {
			auth:0,
			code: 0,
			meta : "no token",
		}
		
		//console.log("verifyToken -> token == undefined --->  response", response)
		
		return res.status(403).send(response);
	}

	let admin_secret = config.secret + "_admin" 
	jwt.verify(token, admin_secret, (err, decoded) => {
		if (err){
			let response = {
				auth:0,
				code: 1,
				meta : "Failed to authentificate ! ",
			}
			return res.status(401).send( response );
		}

		req.userId 		= 		decoded.id;
		req.userLang 	= 		decoded.lang;

		// console.log(decoded)
		next();
	});
}

const authJwt = {};
authJwt.verifyToken 		= verifyToken;
authJwt.verifyTokenAdmin 	= verifyTokenAdmin
//authJwt.isAdmin = isAdmin;
//authJwt.isPmOrAdmin = isPmOrAdmin;

module.exports = authJwt;