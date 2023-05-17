const axios = require('axios')

const User_ctrl   = require('./UserController');
const Door_ctrl   = require('./DoorController');
const Logs_ctrl   = require('./LogsController'); 
const Permissions_ctrl   = require('./PermissionsController'); 


/**
 * gets token, doorID , buttonStatus  
 * 1st check token if valid 
 * 
 * 2nd check if doorID exists and is Active and get its type (Barrier or Shutter) from DB 
 * 
 * 3rd depending on its type it will send the right command using control_barrier() and control_shutter() functions
 *
 * @param {*} req 
 * @param {*} res 
 */
exports.send_device = async(req,res)=>{
    
    let tiny_token      = req.body.token;
    let door_id         = req.body.doorID;
    let button_status   = req.body.buttonStatus;

      //1st check token 
    let user_info = await User_ctrl.get_user_info(tiny_token)
    // token not found
    if(user_info.length < 1)
    {
        let response = 
            {
                "sendStatus": "FALSE"
            }
            return res.status(200).send(response); 
    }
    
    //console.log("exports.send_device -> user_info", user_info)
    
    //2nd check door ID and if ACTIVE
    let door_data  = await Door_ctrl.get_door(door_id)
    //console.log("exports.send_device -> door_data", door_data)
        
    let door_is_vaid = door_data.status // ok it exists
    if(!door_is_vaid){

        let response = {
            "timestamp" : Date(),
            "status"    : 500,
            "error"     : "Internal Server Error",
            "message"   : "Unable to find role id =  " + door_id ,
            "trace"     : "",
            "path"      : "/mobile-api/send-device"
        }
        return res.status(200).send(response);
    }

    let door_is_active = door_data.data.role_status

    if(door_is_active != "ACTIVE")
    {
        let response = 
        {
            "sendStatus": "FALSE"
        }
        return res.status(200).send(response);
    }

    //3 (NEW) check for permissions
    client_door_permission = await Permissions_ctrl.check_client_door_permission(user_info,door_id)
    if(!client_door_permission.status)
    {
        let response = 
        {
            "sendStatus": "FALSE"
        }
        return res.status(200).send(response);
    }


        
    //send 
    let door_type = door_data.data.role_type

    let response = {}
    switch (door_type) {
        case "BARRIER":
            response = await control_barrier(door_data.data)
            break;
            
        case "SHUTTER":
            response = await control_shutter(door_data.data,button_status)
            break;
                
        default:
            response = { "sendStatus": "FALSE" }
            break;
    }

    //save logs if it was successfully done 
    
    console.log(response);

    
    console.log("exports.send_device -> user_info[0].customer_logstatus---------------->>>>>>", user_info[0].customer_logstatus)
    

    
    if(response.sendStatus == "TRUE")
    {
        //save logs if logs is enabled 
        if(user_info[0].customer_logstatus ==="ACTIVE")
        {
            console.log("saving log ...");
            
            Logs_ctrl.save(req)
        }

    }
                
    return res.status(200).send(response);
    

}

/**
 * 
 * Will [open , close] a barrier  using http://192.168.1.250/?Bar=Time3000@!
 * 
 * @param {Object} door_data 
 */
let control_barrier = async(door_data)=>{
    //maybe turn it into a promise 

    let device_ip_port  = door_data.device_ip_port
    let role_time       = door_data.role_time * 1000 // new
    let role_num        = door_data.role_num

    let EP_URL = `http://${device_ip_port}/?Bar${role_num}=Time${role_time}@!`

     console.log("control_barrier -> EP_URL", EP_URL)
    
    let res = await axios.get(EP_URL).catch(e=>{console.log(e);});
    
    if( res != undefined ) 

    {
        // console.log("send_barriere -> res", res.data)
        if(res.data.State !== undefined ) //  { WrongSetting: 'Dip Set For Curtain' }
        {
            if(res.data.State[0] == "B") //   { State: 'Bariyer 3 on' }
            {

                let response = 
                {
                    "sendStatus": "TRUE"
                }
            
                return response
            
            }
        }

        let response = 
        {
            "sendStatus": "FALSE"
        }
        return response
        
    }
    
    let response = 
    {
        "sendStatus": "FALSE"
    }
    return response
}

/**
 * 
 * Will  [open , stop , close] a shutter using http://192.168.1.250/?Kep1=Open
 * 
 * 
 * @param {Object} door_data 
 */
let control_shutter = async(door_data,button_status)=>{

    let cmd = ""
    switch (button_status) {
        case 0:
            cmd = "Close"
            break;

        case 1:
            cmd = "Open"
            break;

        case 2:
            cmd = "Stop"
            break;
    
        default:
            break;
    }

    
    let device_ip_port  = door_data.device_ip_port
    let role_num        = door_data.role_num
    
    let EP_URL = `http://${device_ip_port}/?Kep${role_num}=${cmd}`

    console.log("control_shutter -> EP_URL", EP_URL)

    let res = await axios.get(EP_URL).catch(e=>{console.log(e);});
    
    if( res != undefined ) 
    {
        
        // console.log("control_shutter -> res.data", res.data)
        if(res.data.State !== undefined ) // {"WrongSetting":"Dip 2 Set For Bariyer"}
        {
            if(res.data.State[0] == "K")  // {"State":"KEP 1 Open"} || {"State":"KEP 1 STOP"} || {"State":"KEP 1 Close"}
            {
                let response = 
                {
                    "sendStatus": "TRUE"
                }
            
                return response
            
            }

        }
        let response = 
        {
            "sendStatus": "FALSE"
        }
        return response

    }

    let response = 
    {
        "sendStatus": "FALSE"
    }
    return response
  
}

let get_door_details = async(door_id) =>
{
    let data = 0 
    return data 
}