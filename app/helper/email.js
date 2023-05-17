var nodemailer = require('nodemailer');
var {email} = require('../config/email.config');


const transporter = nodemailer.createTransport({
    host: "smtp.yandex.com",
    port: 465,
    secure: true,
    auth: {
        user: email.user,
        pass: email.pass,
    }
});

exports.sendEmail = (usrEmail, vCode) => {
    
    // console.log("exports.sendEmail -> email.user", email.user)
    // console.log("exports.sendEmail -> email.pass", email.pass)
    console.log(`--- VC is for ${usrEmail} is: `, vCode);
    var mailOptions = {
        from: '"XenonSmart" <'+ email.user+'>',
        to: usrEmail,
        subject: 'GarajApp',
        html: '<body style=" background: #f1f1f1; padding-top: 50px;   font-family: Arial,Tahoma;"> <div style="width: 500px; height: 650px; border-bottom: solid 10px #ccc;  background: #fff; border-radius: 30px;  margin:auto; padding: 50px;"><img style="width: 200px;  margin-bottom: 30px; display: block; margin:auto;" src="https://garajapp.com.tr/img/logo.png"/></br></br><img style="width: 100px;  display: block; margin:auto;" src="https://garajapp.com.tr/aktivasyon-maili/email.png"/><div style="width: 100%; margin-top: 30px; margin-bottom: 30px; font-size: 30px; text-align: center; color: #FE3C00; font-weight: bold;"> Hesap Aktivasyon </div><div style="width: 100%; text-align: center; color: #676767;"> Merhaba, bu e-posta Garaj App uygulama tarafından gönderilmiştir. Hesap Aktivasyon işlemi için lütfen aşağıda gönderilen doğrulama kodunu uygulama ekrarına giriniz. </div></br></br><div style="width: 200px; font-size: 30px; font-weight: bold;  border-radius: 10px; height:50px; padding-top: 20px; color:#fff;  background: #FE3C00; margin:auto;  text-align: center;"> '+ vCode +' </div></br></br><hr style="border: solid 1px #E6E6E6;"></br><div style="width: 100%; text-align:center;"> <p>Xenon Smart Teknoloji San. ve Tic. Ltd. Şti. </p><img style="width: 100px;  margin-bottom: 30px; display: block; margin:auto;" src="https://garajapp.com.tr/aktivasyon-maili/xenon-logo.png"/> </div></div></br></br></body>' 
        // html: "<h1>Welcome to GarajApp</h1>\n \n Your verification code is: " + vCode
    };
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("___", error);
                reject(false)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true)

            }
        });
    })
}


exports.WelcomeEmail = (usr) => {
    
    console.log(usr);
    
    let html_email = ` <body style=" background: #f1f1f1; padding-top: 50px;   font-family: Arial,Tahoma;"> 
    <div style="width: 500px; height: 650px; border-bottom: solid 10px #ccc;  background: #fff; border-radius: 30px;  margin:auto; padding: 50px;">
    <img style="width: 200px;  margin-bottom: 30px; display: block; margin:auto;" src="https://garajapp.com.tr/img/logo.png"/></br></br>
    <img style="width: 100px;  display: block; margin:auto;" src="https://garajapp.com.tr/aktivasyon-maili/email.png"/>
    <div style="width: 100%; margin-top: 30px; margin-bottom: 30px; font-size: 30px; text-align: center; color: #FE3C00; font-weight: bold;"> Hesap Aktivasyon </div>
    <div style="width: 100%; text-align: center; color: #676767;"> Merhaba, bu e-posta Garaj App uygulama tarafından gönderilmiştir. Hesap Aktivasyon işlemi için lütfen aşağıda gönderilen doğrulama kodunu uygulama ekrarına giriniz. </div></br></br>
    
    <div style="width: 200px; font-size: 15px; font-weight: bold;  border-radius: 10px; height:70px; padding-top: 20px; color:#fff;  background: #FE3C00; margin:auto;  text-align: center;">
    username : ${usr.username} <br/><br/>
    password : ${usr.password} </div>
    
    </br></br>
    <hr style="border: solid 1px #E6E6E6;"></br>
    <div style="width: 100%; text-align:center;"> 
    <p>Xenon Smart Teknoloji San. ve Tic. Ltd. Şti. </p>
    <img style="width: 100px;  margin-bottom: 30px; display: block; margin:auto;" src="https://garajapp.com.tr/aktivasyon-maili/xenon-logo.png"/> 
    </div>
    </div></br></br>
    </body>`
    
    var mailOptions = {
        from: '"XenonSmart" <'+ email.user+'>',
        to: usr.email,
        subject: 'GarajApp',
        html: html_email
        // html: "<h1>Welcome to GarajApp</h1>\n \n Your verification code is: " + vCode
    };
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("___", error);
                reject(false)
            } else {
                console.log('Email sent: ' + info.response);
                resolve(true)

            }
        });
    })
}