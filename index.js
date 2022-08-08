// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:timestamp", function(req, res){
  var date = new Date(req.params.timestamp);

  //console.log("Test: ",date.getUTCFullYear()," ",date.getUTCMonth());

  var d2 = new Date(date.getUTCFullYear(),date.getUTCMonth(), date.getUTCDate()-1, date.getHours(), date.getUTCMinutes(), date.getUTCSeconds());
  //console.log("Test2 : ",d2.toUTCString());


  // let year = date.getFullYear(); // 2020
  // let month = date.getMonth() + 1; // 4 (note zero index: Jan = 0, Dec = 11)
  // let day = date.getDate() + 1; // 9
  
  // const gmtDateTime = new Date().toUTCString();
  // console.log("UTC String: ",gmtDateTime);
  
  //let timestmp = date.getTime();
  
  
  //console.log("URL Hit:", year ,":: ", month ," ", day," ",date.getUTCDay()," ",date.getUTCMonth());
  //{"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
  res.json({"unix":date.getTime(),"utc":d2.toUTCString()});
});

// app.get("/api/", function(req, res) {
//   var resDate = new Date();
//   res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
// });



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
