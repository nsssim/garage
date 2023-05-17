var express = require('express')
var fs = require('fs')
var https = require('https')
var http = require('http')
var app = express()
var bodyParser = require('body-parser');
require('dotenv').config()

const {autoclean_log} = require('./app/controller/web/LogWebController') 

app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type,x-access-token');
  next();
})

require('./app/router/router.js')(app);

//srv = http.createServer({
srv = https.createServer({                                 // <------- uncomment for https    
  key: fs.readFileSync('./ssl/api_garajapp.com.tr.key'),     // <------- uncomment for https 
  cert: fs.readFileSync('./ssl/api_garajapp.com.tr.crt'),    // <------- uncomment for https 
  requestCert: true,
  rejectUnauthorized: false
}, app)

.listen(4433, function () {
  const port = 4433
  //console.log("App listening at http(s)://localhost:%s", port)
  console.log("App listening at https://localhost:%s", port)  // <------- uncomment for https
  autoclean_log().catch(e=>{console.log(e);});
})

process.on('SIGTERM', () => {
  console.info('SIGTERM signal received.');
  console.log('Closing web server.');
  srv.close(() => {
    console.log('web server closed.');
  });
});
