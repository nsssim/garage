const Door_mdl = require('../../model/mobile/Door_mdl');

exports.get_door = async (door_id) => {
    let door_data = await Door_mdl.get_door(door_id)
    
    if(door_data.length < 1)
    {
        let response = {
            status : false,
            data:null
        }
        
        return response  
    }

    let response = {
        status : true,
        data: door_data[0]
    }
    
    return response  

}

