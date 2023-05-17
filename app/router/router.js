

//const OauthAlexa = require('../middleware/OauthAlexa');
//const { param, check, validationResult } = require("express-validator");


var path = require('path');
//var appDir = path.dirname(require.main.filename);

module.exports = function (app) {
	
	const validator_mob = require('../middleware/validate_mobile');
	const MobileController = require('../controller/mobile/MobileController.js');
	const DeviceController = require('../controller/mobile/DeviceController.js');
	const LoginController = require('../controller/mobile/LoginController.js');
	
	// web
	const validator_web = require('../middleware/validate_web');
	const jwt = require('../middleware/verifyJwtToken');
	
	const LoginWebController 		= require('../controller/web/LoginWebController.js');	
	const DashboardWebController 	= require('../controller/web/DashboardWebController.js');	
	const UserWebController 		= require('../controller/web/UserWebController.js');	
	const DeviceWebController 		= require('../controller/web/DeviceWebController.js');	
	const AdminWebController 		= require('../controller/web/AdminWebController.js');
	const LogWebController 			= require('../controller/web/LogWebController.js');
	const PermissionsWebController 	= require('../controller/web/PermissionsWebController.js');
	
	
	
	
	
	app.post('/mobile-api/login'  						, [validator_mob.login]												,   LoginController.login); 
	app.post('/mobile-api/login-sms-control'  			, [validator_mob.login_sms_control]									,   LoginController.login_sms_control);
	app.post('/mobile-api/password-update'  			, [validator_mob.password_update]									,   LoginController.password_update);
	app.post('/mobile-api/token-control'  				, [validator_mob.token_control]										,   MobileController.check_token);
	app.post('/mobile-api/door-list'  					, [validator_mob.token_control]										,   MobileController.door_list);
	app.post('/mobile-api/send-device'  				, [validator_mob.send_device]										,   DeviceController.send_device);
	app.post('/mobile-api/get_version'  				, [validator_mob.token_control]										,   MobileController.get_version);

	
	
	//web					
	app.post('/web-api/login'  							, [validator_web.login]												,	LoginWebController.login);
		
	// user	
	app.post('/web-api/check_token'  					, [jwt.verifyToken]													,	LoginWebController.check_token);
	app.get('/web-api/get_user_dashboard'				, [jwt.verifyToken]													, 	DashboardWebController.get_user_dashboard);
	app.get('/web-api/get_user_clients'				    , [jwt.verifyToken]													, 	UserWebController.get_user_clients_all);
	app.put('/web-api/update_user_password'				, [jwt.verifyToken,validator_web.update_user_password]				,	UserWebController.update_user_password);
		
	app.put('/web-api/update_client_status'  			, [jwt.verifyToken]													,	UserWebController.update_client_status);
	app.post('/web-api/add_client'  					, [jwt.verifyToken,validator_web.add_client]						,	UserWebController.add_client);
	app.delete('/web-api/delete_client'  				, [jwt.verifyToken,validator_web.delete_client]						,	UserWebController.delete_client);
	app.put('/web-api/update_client'  					, [jwt.verifyToken,validator_web.update_client]						,	UserWebController.update_client);
	app.put('/web-api/reset_client_password'  			, [jwt.verifyToken]							   						,	UserWebController.reset_client_password);
		
		
	app.get('/web-api/get_user_devices'				    , [jwt.verifyToken]													, 	DeviceWebController.get_user_devices);
	app.get('/web-api/get_device_relays'				, [jwt.verifyToken]													, 	DeviceWebController.get_device_relays);
	app.post('/web-api/add_device'
	// im here						, [jwt.verifyToken,validator_web.add_device]						, 	DeviceWebController.add_device);
	app.delete('/web-api/delete_device'					, [jwt.verifyToken,validator_web.delete_device]						, 	DeviceWebController.delete_device);
	app.put('/web-api/update_device'					, [jwt.verifyToken,validator_web.update_device]						, 	DeviceWebController.update_device);
		
	app.put('/web-api/update_relay'						, [jwt.verifyToken,validator_web.update_relay]						, 	DeviceWebController.update_relay);
	app.put('/web-api/update_relay_status'				, [jwt.verifyToken,validator_web.update_relay_status]				, 	DeviceWebController.update_relay_status);
	
	app.get('/web-api/get_user_clients_logs'			, [jwt.verifyToken,validator_web.get_user_clients_logs]				, 	LogWebController.get_user_clients_logs);
	app.get('/web-api/get_client_permissions'			, [jwt.verifyToken,validator_web.get_client_permissions]			, 	PermissionsWebController.get_client_permissions);
	app.post('/web-api/set_client_permissions'			, [jwt.verifyToken,validator_web.set_client_permissions]			, 	PermissionsWebController.set_client_permissions);
	
	app.get('/web-api/get_user_info'					, [jwt.verifyToken]													, 	UserWebController.get_user_info);
		
	app.put('/web-api/update_geolocation'				, [jwt.verifyToken,validator_web.update_geolocation]				, 	UserWebController.update_geolocation);
		
		
	
	// admin	
	app.post('/web-api/loginAdmin'  					, [validator_web.login]												,	LoginWebController.loginAdmin);
	app.post('/web-api/check_token_admin'  				, [jwt.verifyTokenAdmin]											,	LoginWebController.check_token);
	app.get('/web-api/get_admin_dashboard'				, [jwt.verifyTokenAdmin]											, 	DashboardWebController.get_admin_dashboard);
	
	app.get('/web-api/get_admin_customers_all'			, [jwt.verifyTokenAdmin]											, 	AdminWebController.get_admin_customers_all);
	app.delete('/web-api/delete_customer'				, [jwt.verifyTokenAdmin, validator_web.delete_customer]				, 	AdminWebController.delete_customer);
	app.post('/web-api/add_customer'  					, [jwt.verifyTokenAdmin,validator_web.add_customer]					,	AdminWebController.add_customer);
	app.put('/web-api/update_customer'  				, [jwt.verifyTokenAdmin,validator_web.update_customer]				,	AdminWebController.update_customer);
	app.put('/web-api/update_customer_status'  			, [jwt.verifyTokenAdmin,validator_web.update_customer_status]		,	AdminWebController.update_customer_status);
	app.put('/web-api/update_customer_logs_status'  	, [jwt.verifyTokenAdmin,validator_web.update_customer_logs_status]	,	AdminWebController.update_customer_logs_status);
	
	app.put('/web-api/reset_customer_password'  		, [jwt.verifyTokenAdmin,validator_web.reset_customer_password]		,	AdminWebController.reset_customer_password);


	


	
	
	// app.get('/web-api/get_user_clients_logs'			, [jwt.verifyTokenAdmin,validator_web.get_user_clients_logs]	, 	LogWebController.get_user_clients_logs);
	


	

	

	
	
	
	

	
	
	

	
	

	


}