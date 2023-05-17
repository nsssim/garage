const User_mdl = require('../../model/mobile/User_mdl');

exports.check_token = async (tiny_token) => {

    let token_data = await User_mdl.check_token(tiny_token)
    //console.log("exports.check_token -> token_data", token_data)
    
    let res = true 
    
    if(token_data.length < 1)
    {
        res =  false 
    }
    
    return res
    
}

exports.get_user_info = async (tiny_token) => {

    let user_info = await User_mdl.get_user_info(tiny_token)
    
    console.log("exports.get_user_info -> user_info", user_info)

          
    
    return user_info
    
}

