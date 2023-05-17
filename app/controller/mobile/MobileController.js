const Mobile_mdl = require('../../model/mobile/Mobile_mdl');
const {versions} = require('../../config/version.config')

exports.check_token = async(req,res)=>{

    let tiny_token = req.body.token
    
    let result  = await Mobile_mdl.check_token(tiny_token).catch(e=>{console.log(e) })
    //console.log("exports.check_token -> result", result)
    if((result.length < 1) || (tiny_token =="") )
    {
        let response = {
            "token": tiny_token,
            "status": 0
        }
        return res.status(200).send(response);
    }

    let response = {
        "token": tiny_token,
        "status": 1
    }
    return res.status(200).send(response);
    
}

exports.door_list = async(req,res)=>{

    let tiny_token = req.body.token
    
    
    let rank_user_id_res  = await Mobile_mdl.get_rank_user_id(tiny_token).catch(e=>{console.log(e) })
    if(rank_user_id_res.length < 1)
    {
        return res.status(200).send([]);    
    }

    let rank_user_id = rank_user_id_res[0].rank_user_id
    let door_list     = await Mobile_mdl.get_door_list(rank_user_id).catch(e=>{console.log(e) })
    
    return res.status(200).send(door_list);
}

exports.get_version = async(req,res)=>{

    return res.status(200).send(versions);
    
}






