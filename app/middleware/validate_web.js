const { body, param, check, validationResult } = require("express-validator");
let  { dd } = require("../helper/logger.js") ;


exports.login = [
    check('username', 'username can not be empty').not().isEmpty(),
    check('password', 'password empty').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            
            let response = {
                auth:0,
                code: 422,
                meta : "empty data",
                token: null
            }
            
            return res.status(422).json(response);
        }
        next();
    }
]

exports.add_client = [
    check('', '1').not().isEmpty().isLength({min: 3, max: 40}),
    check('lname', '2').not().isEmpty().isLength({min: 3, max: 40}),
    check('email', '3').not().isEmpty().isEmail(),
    check('phone', '4').not().isEmpty().matches(/^[0-9/+-/(/)]*$/, "i"),
    check('username', '5').not().isEmpty().isLength({min: 3, max: 40}),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let response = {
                code: 422,
                meta : errors,
            }

            return res.status(422).json(response);
        }
        next();
    }
]

exports.delete_client = [
    check('client_id', '1').not().isEmpty().isNumeric(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let response = {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }

            return res.status(422).json(response);
        }
        next();
    }
]


exports.update_client = [
    
    check('id', '0').isNumeric(),
    check('', '1').not().isEmpty().isLength({min: 3, max: 40}),
    check('lname', '2').not().isEmpty().isLength({min: 3, max: 40}),
    check('email', '3').not().isEmpty().isEmail(),
    check('phone', '4').not().isEmpty().matches(/^[0-9/+-/(/)]*$/, "i"),
    check('username', '5').not().isEmpty().isLength({min: 3, max: 40}),
    
    
    (req, res, next) => {
        //dd('validate_web.js ','update_client','req',req.body )
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let response = {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }

            return res.status(422).json(response);
        }
        next();
    }
]



/**
   body 
  {
    dev_name: 'df',
    ip: '192.168.1.1:100',
    port: 0,
    project: 'GarajBox_1608190254573'
  }
 */
exports.add_device = [
    
    check('dev_name', '1').not().isEmpty().isLength({min: 3, max: 40}) ,
    check('ip', '2').not().isEmpty().matches(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:([0-9]+)/, "i") ,
    check('port', '3').isNumeric() ,

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response =
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }

            return res.status(422).json(response);
        }
        next();
    }

]


exports.delete_device = [
    
    check('id', '0').isNumeric(),
        
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response =
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }

            return res.status(422).json(response);
        }
        next();
    }

]

//{"id":12,"ip":"78.189.28.103:199","dev_name":"myboxy23"}
exports.update_device = [
    
    check('id', '1').isNumeric() ,
    check('ip', '2').not().isEmpty().matches(/[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}:([0-9]+)/, "i") ,
    check('dev_name', '3').not().isEmpty().isLength({min: 3, max: 40}) ,

    (req, res, next) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            let response = {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }
            return res.status(422).json(response);
        }
        next();
    }
]


exports.update_relay = [
    check('id',   '0').isNumeric(),
    check('name', '1').not().isEmpty().isLength({min: 3, max: 40}),
    check('timer', '2').isNumeric(),

    (req, res, next) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response = 
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }
            return res.status(422).json(response);
        }
        next();
    }

]

/* {    id: 2609, name: '---', number: 9, status: true, timer: 0, type: 'BARRIER' }  */
exports.update_relay_status = [
    check('id', '1').isNumeric() ,
    check('name', '2').not().isEmpty().isLength({min: 3, max: 60}) ,
    check('timer', '3').isNumeric() ,
    
    (req, res, next) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response = 
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }
            return res.status(422).json(response);
        }
        next();
    }
]

// { new_password: 'asdasd', old_password: 'asdasdasd' }
exports.update_user_password = [
    check('new_password', '1').not().isEmpty().isLength({min: 6, max: 60}) ,
    check('old_password', '2').not().isEmpty().isLength({min: 5, max: 60}) ,
    
    (req, res, next) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response = 
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }
            return res.status(422).json(response);
        }
        next();
    }

]

//{ customer_id: 2368 }
exports.delete_customer = [
    check('customer_id', '1').isNumeric() ,
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response = 
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }
            return res.status(422).json(response);
        }
        next();
    }
]



exports.add_customer = [
    
    check('lname', '2').not().isEmpty().isLength({min: 3, max: 40}),
    check('email', '3').not().isEmpty().isEmail(),
    check('phone', '4').not().isEmpty().matches(/^[0-9/+-/(/)]*$/, "i"),
    check('username', '5').not().isEmpty().isLength({min: 3, max: 40}),

    (req, res, next) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response = 
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }
            return res.status(422).json(response);
        }
        next();
        
    }
]

exports.update_customer = [
   
    check('id', '1').not().isEmpty().isLength({min: 3, max: 40}),
    check('lname', '2').not().isEmpty().isLength({min: 3, max: 40}),
    check('email', '3').not().isEmpty().isEmail(),
    check('phone', '4').not().isEmpty().matches(/^[0-9/+-/(/)]*$/, "i"),
    check('username', '5').not().isEmpty().isLength({min: 3, max: 40}),

    (req, res, next) => {
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response = 
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }
            return res.status(422).json(response);
        }
        next();
        
    }
]

/*------------------------------
{
  fname: 'asdsad4s',
  lname: 'asdsad',
  email: 'aasd@asdasd.com',
  phone: '+9065465445',
  status: false,
  username: '33333333',
  id: '2376'
}
-------------------------------*/
exports.update_customer_status = [
    
    check('status', '1').isBoolean(),

    (req, res, next) => {
        dd('validate_web.js ','update_customer_status','reqbody',req.body )
        
        next();
    }
]

exports.update_customer_logs_status = [
    
    check('log_status', '1').isBoolean(),

    (req, res, next) => {
        dd('validate_web.js ','update_customer_status','reqbody',req.body )
        
        next();
    }
]


exports.reset_customer_password = [
    check('id', '1').not().isEmpty().isLength({min: 3, max: 40}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response = 
            {
                auth:1,
                code: 422,
                meta : errors,
                token: null
            }
            return res.status(422).json(response);
        }
        next();
    }
]


exports.get_user_clients_logs = [
    //check('id', '1').not().isEmpty().isLength({min: 3, max: 40}),
    (req, res, next) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) 
        // {
        //     let response = 
        //     {
        //         auth:1,
        //         code: 422,
        //         meta : errors,
        //         token: null
        //     }
        //     return res.status(422).json(response);
        // }
        next();
    }
]



exports.get_client_permissions = [
    //check('id', '1').not().isEmpty().isLength({min: 3, max: 40}),
    (req, res, next) => {
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) 
        // {
        //     let response = 
        //     {
        //         auth:1,
        //         code: 422,
        //         meta : errors,
        //         token: null
        //     }
        //     return res.status(422).json(response);
        // }
        next();
    }
]


exports.set_client_permissions = [
    //check('id', '1').not().isEmpty().isLength({min: 3, max: 40}),
    (req, res, next) => 
    {
        function isEmpty(value){
            return (value == null || value.length === 0);
          }

        let permissions = req.body.permissions
        for( i in permissions)
        {
            if(permissions[i].days != "0000000")
            {
                // console.log("permissions[i].finish_time", permissions[i].finish_time)

                if((permissions[i].start_time == '') || (permissions[i].finish_time == '') || (permissions[i].start_time == null) || (permissions[i].finish_time == null) ) 
                {
                    let response = 
                    {
                        auth:1,
                        code: 4221,
                        meta : "error start_time or finish_time",
                        token: null
                    }
                    return res.status(422).json(response);

                }

            }

            if((permissions[i].start_time > permissions[i].finish_time )) 
            {
                console.log( permissions[i].start_time + " is > " + permissions[i].finish_time )

                let response = 
                {
                    auth:1,
                    code: 4222,
                    meta : "delta_time error",
                    token: null
                }
                return res.status(422).json(response);

            }

            if(permissions[i].days == "0000000")
            {
                // console.log("permissions[i].days", permissions[i].days)
                // console.log("permissions[i].start_time"  , permissions[i].start_time )
                // console.log("permissions[i].finish_time" , permissions[i].finish_time)
                
                if( !isEmpty(permissions[i].start_time) || !isEmpty(permissions[i].finish_time)  ) 
                {

                    
                    // console.log("permissions[i].days", permissions[i].days)
                    // console.log("permissions[i].start_time"  , permissions[i].start_time )
                    // console.log("permissions[i].finish_time" , permissions[i].finish_time)
                    
                    {
                        let response = 
                        {
                            auth:1,
                            code: 4223,
                            meta : "error time_but_no_day", //<------------------------here need more tests ...
                            token: null
                        }
                        return res.status(422).json(response);
                        
                    }
                }

            }


            
        }
    
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) 
        // {
        //     let response = 
        //     {
        //         auth:1,
        //         code: 422,
        //         meta : errors,
        //         token: null
        //     }
        //     return res.status(422).json(response);
        // }
        next();
    }
]



exports.update_geolocation = [

    check('latitude',  '4061').isNumeric() ,
    check('longitude', '4062').isNumeric() ,

    (req, res, next) => 
    {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
        {
            let response = 
            {
                auth: 1 ,
                code: 4061 ,
                meta : errors ,
                token: null
            }
            return res.status(4061).json(response);
        }
        next();
    }
]