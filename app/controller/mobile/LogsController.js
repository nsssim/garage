//import axios from "axios";
const Logs_mdl = require('../../model/mobile/Logs_mdl');
const User_ctrl   = require('./UserController');


exports.save = async (req) => {
    let token  = req.body.token
    let doorID = req.body.doorID
    let rele_id = doorID

    
    let user_info = await User_ctrl.get_user_info(token)
    
    console.log("exports.save -> rank_user_id", user_info[0].rank_user_id)
    console.log("exports.save -> user_id", user_info[0].id)
    console.log("exports.save -> rele_id", rele_id)

    let data = 
    {
        "user_rank_id" :  user_info[0].rank_user_id,
        "user_id" :  user_info[0].id,
        "role_id" :  rele_id
    }

    Logs_mdl.save(data)
    
    

    save_status = 1

    return save_status  
}

