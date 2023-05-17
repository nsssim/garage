let {dd} = require('../helper/logger');

exports.send_code_via_sms = (phone_number) => {

         p =  new Promise(function (resolve, reject) {

            var axios    = require("axios");
            var min = 10000;
            var max = 99999;
            var code = Math.floor(Math.random() * (max - min + 1)) + min;
            let data_sms =   '<sms><kno>1007268</kno><kulad>0000000000</kulad><sifre>00000</sifre><tur>Normal</tur><gonderen>00000000000</gonderen><mesaj> Garaj App uygulama giriş kodunuz: '+ code +'</mesaj><numaralar>'+phone_number+'</numaralar><zaman>2020-06-04 16:30:39</zaman><zamanasimi>2036-06-04 18:30:39</zamanasimi></sms>'
            
            // console.log('data_sms ---> ' + data_sms);
            
        
            const options = {
            url: 'http://www.ozteksms.com/panel/smsgonder1Npost.php',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/txt;charset=UTF-8'
            },
            data: data_sms
            };
            
            axios(options)
            .then(response => {
                console.log("exports.send_code_via_sms -> response.status : ", response.status)
                console.log("exports.send_code_via_sms -> response.data : ", response.data)
                console.log("exports.send_code_via_sms -> response.data[0] : ", response.data[0])
                
                if((response.status === 200) && (response.data[0] == 1) )
                {
                    let api_res = {
                        "status" : true ,
                        "code": code ,
                        "meta":response.data
                    }
                    resolve(api_res)
                }
                else
                {
                    console.log("exports.send_code_via_sms -> maybe no money / wrong number ? ")
                    let api_res = {
                        "status" : false ,
                        "code" : null ,
                        "meta" :response.data
                    }
                    resolve(api_res)
                     
                }
            }).catch(err => {
                console.log("error handled in send_code_via_sms" + err);
                
                let api_res = {
                    "status": false ,
                    "code": null ,
                    "meta": err
                }
                reject(api_res)
            });

         })
 
         return p

}

exports.send_web_code_via_sms = (phone_number) => {

    p =  new Promise(function (resolve, reject) {

       var axios      = require("axios");
       var webcode    = makeid(6);
       
       dd('sms.js ','send_web_code_via_sms','webcode',webcode )

       let data_sms   =   '<sms><kno>1007268</kno><kulad>905323028251</kulad><sifre>568SYR</sifre><tur>Normal</tur><gonderen>908505910253</gonderen><mesaj>DUMAN RD Sizin kodunuz: '+ webcode +'</mesaj><numaralar>'+phone_number+'</numaralar><zaman>2020-06-04 16:30:39</zaman><zamanasimi>2036-06-04 18:30:39</zamanasimi></sms>'
       
       // console.log('data_sms ---> ' + data_sms);
       
   
       const options = {
       url: 'http://www.ozteksms.com/panel/smsgonder1Npost.php',
       method: 'POST',
       headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/txt;charset=UTF-8'
       },
       data: data_sms
       };
       
       axios(options)
       .then(response => {
           console.log("exports.send_code_via_sms -> response.status : ", response.status)
           console.log("exports.send_code_via_sms -> response.data : ", response.data)
           console.log("exports.send_code_via_sms -> response.data[0] : ", response.data[0])
           
           if((response.status === 200) && (response.data[0] == 1) )
           {
               let api_res = {
                   "status" : true ,
                   "code": webcode ,
                   "meta":response.data
               }
               resolve(api_res)
           }
           else
           {
               console.log("exports.send_code_via_sms -> maybe no money / wrong number ? ")
               let api_res = {
                   "status" : false ,
                   "code" : null ,
                   "meta" :response.data
               }
               resolve(api_res)
                
           }
       }).catch(err => {
           console.log("error handled in send_code_via_sms" + err);
           
           let api_res = {
               "status": false ,
               "code": null ,
               "meta": err
           }
           reject(api_res)
       });

    })

    return p

}


function makeid(length) {
	var result           = '';
	var characters       = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }
