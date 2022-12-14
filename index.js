// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
let responseObject = {};

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

//route to handle empty paramter
app.get("/api", function(req, res){
    console.log("Inside W/O parameter step");
    var resDate = new Date();
    res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
});

//Route to handle if date/timestamp is provided
app.get("/api/:timestamp", function(req, res){

  let input = req.params.timestamp;
  
  //Date String in JavaScript has three formats : ISO, Short Date & Long Date refer W3 Schools
  if(input.includes(' ') || input.includes('-') || input.includes('/')){
    /* Date String */
      responseObject['unix'] = new Date(input).getTime()
      responseObject['utc'] = new Date(input).toUTCString()
  } else{
    /* Timestamp */
    input = parseInt(input)
    
    responseObject['unix'] = new Date(input).getTime()
    responseObject['utc'] = new Date(input).toUTCString()
  }
  
  if(!responseObject['unix'] || !responseObject['utc']){
    res.json({error: 'Invalid Date'})
  } else {
    res.json(responseObject)
  }
  
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
