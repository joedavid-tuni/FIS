var express = require("express");
var app     = express();
var path    = require("path");
var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use("/css", express.static(__dirname + '/css'));
app.use("/script", express.static(__dirname + '/script'));
app.use("/img", express.static(__dirname + '/img'));


app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/Form.html'));
  //__dirname : It will resolve to your project folder.
});

app.post('/', urlencodedParser ,function(req,res){
  var all = JSON.parse( req.body.data);
  console.log(all);
  res.end();

//__dirname : It will resolve to your project folder.
});




app.listen(3000);

console.log("Running at Port 3000");