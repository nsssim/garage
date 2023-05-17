const { body, param, check, validationResult } = require("express-validator");

exports.login = [
    check('userName', 'username can not be empty').not().isEmpty(),
    check('password', 'password empty').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            
            let response = {
                "userName": req.body.userName,
                "password":  req.body.password,
                "token": null,
                "status": "FALSE",
                "smsCode": null,
                "projectName": null
            }
            return res.status(422).json(response);
        }
        next();
    }
]


exports.login_sms_control = [
    check('userName', 'username can not be empty').not().isEmpty(),
    check('password', 'password empty').not().isEmpty(),
    check('smsCode',  'smsCode must be 5 digits only ').not().isEmpty().isNumeric().isLength({ min: 5, max:5 }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("middleware [login_sms_control] !");
            
            let response = {
                "userName": req.body.userName,
                "password":  req.body.password,
                "token": null,
                "status": "FALSE",
                "smsCode": req.body.smsCode,
                "projectName": null
            }
            return res.status(422).json(response);
        }
        next();
    }
]

exports.token_control = [
    check('token', 'token error').not().isEmpty().isLength({ min: 5}),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("middleware [token_control] !");
            
            let response = {
                "token": req.body.token,
                "status": 0
            }

            return res.status(422).json(response);
        }
        next();
    }
]

exports.send_device = [
    check('token',  'token error').not().isEmpty().isLength({ min: 5}),
    check('doorID', 'doorID error').not().isEmpty().isNumeric(),
    check('buttonStatus',  'buttonStatus error').not().isEmpty().isIn([0,1,2]),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("middleware [send_device] !");
            
            let response ={
                "sendStatus": "FALSE"
            }

            return res.status(422).json(response);
        }
        next();
    }
]


exports.password_update = [
    check('token',  'token error').not().isEmpty().isLength({ min: 5}),
    check('oldPassword', 'oldPassword error').not().isEmpty(),
    check('newPassword',  'newPassword error').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("middleware [password_update] !");
            
            let response ={
                "reqStatus": "WRONG",
                "message": "Şifre alanı boş"
            }

            return res.status(422).json(response);
        }
        next();
    }
]





