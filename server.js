var app     =     require("express")();
var mysql   =     require("mysql");
var http    =     require('http').Server(app);
var io      =     require("socket.io")(http);

/* Creating POOL MySQL connection.*/

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'oracle',
  database : 'fisfinal'
});

connection.connect();
app.get("/",function(req,res){
    res.sendFile(__dirname + '/index.html');
});
try {

    io.on('connection',function(socket){ // socket connection
        socket.on('time',function(status){ // socket handling event
            var sql = "SELECT * FROM `pallets`";
            connection.query (sql, function (err, result) {
                if (result && result.length > 0) {
                    socket.emit ("result is here", result); // emiting result to front end
                }
            });
        });
        socket.on('disconnect', function () {
        setTimeout(function () {
        }, 10000);
    });
    });

} catch (err) {
    console.log(err);
}



http.listen(4000,function(){
    console.log("Listening on 4000");
});
