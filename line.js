
var mysql = require('mysql');
var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');
const wait = 5000;
var pallet = [];
var pallet_C2Z1;
var orders = require('./web');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//DATABASE PARAMETERS
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, //Port number to connect to the db
    user: 'root', //The user name assigned to work with the database
    password: 'oracle', //password for the database
    database: 'fisfinal' //Name of the database
});

//CONNECTING TO DATABASE
connection.connect(function (err) {
    if (!err){
        console.log('Successfully connected to Database');
    }

});





//CLASS WORKSTATION
var workstation= function (wsnumber, capability) {
    this.wsnumber = wsnumber;
    this.capability = capability;
    this.zone1ID = 0;
    this.zone2ID = 0;
    this.zone3ID = 0;
    this.zone4ID = 0;
    this.zone5ID = 0;
    this.zone1=false;
    this.zone2=false;
    this.zone3=false;
    this.zone4=false;
    this.zone5=false;
    this.flag =false;
    this.port  = 1234;
    this.url = "127.0.0.1";
    this.buffer = 'free';
    this.status = 'free';
    // if(!((wsnumber == 1)||(wsnumber == 7))) {
    //     this.loadpen(wsnumber, capability);
    // }
};




//METHOD RUNSERVER OF CLASS WORKSTATION
workstation.prototype.runServer = function (port) {
    this.port = port;
    var ref1 = this;
    var hostname = this.url;



    app.get('/', function(req,res){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.write('\nI am workstation ' + ref1.wsnumber);
        res.write('\nMy capability is: ' + ref1.capability);
        res.end('\nWorkstation ' + ref1.wsnumber + ' is running.');
    });

    app.post('/notifs/'+ref1.wsnumber, function(req,res){

        // var ref = this;
        console.log(req.body);
        // switch (req.body.SenderID) {

        //  case 'SimCNV8' || 'SimCNV9' || 'SimCNV10' || 'SimCNV11' || 'SimCNV12' || 'SimCNV2' || 'SimCNV3' || 'SimCNV4' || 'SimCNV5' || 'SimCNV6':

        switch (req.body.id){

            case "Z1_Changed":
                var zone1="_Z1";


                if ((req.body.payload.PalletID != -1)) { //If new pallet is introduced and not leaving (as we receive notifications for both)




                    switch (req.body.senderID) {

                        case "SimCNV1":
                            var palletID1 = req.body.payload.PalletID;

                            connection.query("UPDATE Pallets SET Current_Loc = 'WS1_Z1' where PalletID = ?",palletID1, function (rows,results) {
                                    console.log('Location Updated');
                            });
                            break;



                        case "SimCNV2":
                            var palletID2 = req.body.payload.PalletID;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS2_Z1' where PalletID = ?",palletID2, function (rows,results) {
                                console.log('Location Updated');
                            });

                            break;
                        case "SimCNV3":
                            var palletID3 = req.body.payload.PalletID;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS3_Z1' where PalletID = ?",palletID3, function (rows,results) {
                                console.log('Location Updated');
                            });

                            break;
                        case "SimCNV4":
                            var palletID4 = req.body.payload.PalletID;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS4_Z1' where PalletID = ?",palletID4, function (rows,results) {
                                console.log('Location Updated');
                            });
                            break;
                        case "SimCNV5":
                            var palletID5 = req.body.payload.PalletID;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS5_Z1' where PalletID = ?",palletID5, function (rows,results) {
                                console.log('Location Updated');
                            });
                            break;

                        case "SimCNV6":
                            var palletID6 = req.body.payload.PalletID;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS6_Z1' where PalletID = ?",palletID6, function (rows,results) {
                                console.log('Location Updated');
                            });
                            break;

                        case "SimCNV7":
                            var palletID7 = req.body.payload.PalletID;

                            var counter =1;
                            // connection.query("Select * from Pallets where Status = 'pending'", function (rows) {
                            //         var index = rows[0].Sno;
                            //         connection.query("UPDATE Pallets SET Status = 'in_production' where Sno = ?", index, function(){
                            //             console.log('Loaded Status updated');
                            //             connection.query("UPDATE Pallets SET PalletID = '?' where Status = '?'", [palletID1,index], function(){
                            //             });
                            //         })
                            // });

                            connection.query("UPDATE Pallets SET Current_Loc = 'WS7_Z1' where PalletID = ?",palletID7, function (rows,results) {
                                console.log('Location Updated');
                            });


                            break;

                        case "SimCNV8":
                            // var palletID1 = req.body.payload.PalletID;

                            var palletID8 = req.body.payload.PalletID;
                            console.log(palletID8);
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS8_Z1' where PalletID = ?",palletID8, function (rows,results, error) {
                                console.log('Location Updated');
                                console.log(error);
                            });

                            break;

                        case "SimCNV9":

                            var palletID9 = req.body.payload.PalletID;

                            connection.query("UPDATE Pallets SET Current_Loc = 'WS9_Z1' where PalletID = ?",palletID9, function (rows,results) {
                                console.log('Location Updated');
                            });

                            break;
                        case "SimCNV10":

                            var palletID10 = req.body.payload.PalletID;

                            connection.query("UPDATE Pallets SET Current_Loc = 'WS10_Z1' where PalletID = ?",palletID10, function (rows,results) {
                                console.log('Location Updated');
                            });
                            break;
                        case "SimCNV11":
                            var palletID11 = req.body.payload.PalletID;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS11_Z1' where PalletID = ?",palletID11, function (rows,results) {
                                console.log('Location Updated');
                            });

                            break;

                        case "SimCNV12":

                            var palletID12 = req.body.payload.PalletID;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS12_Z1' where PalletID = ?",palletID12, function (rows,results) {
                                console.log('Location Updated');
                            });

                            break;
                    }
                }
                if ((req.body.payload.PalletID == -1)) {


                }

                res.end();
                break;

            case "Z2_Changed":
                var zone2="_Z2";

                if ((req.body.payload.PalletID != -1)) {


                    switch (req.body.senderID) {


                        case "SimCNV1":
                            connection.query("Select * from Pallets where Current_Loc = 'WS1_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS1_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case"SimCNV7":
                            connection.query("Select * from Pallets where Current_Loc = 'WS7_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS7_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });

                            break;

                        case "SimCNV2":
                            connection.query("Select * from Pallets where Current_Loc = 'WS2_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS2_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV3":
                            connection.query("Select * from Pallets where Current_Loc = 'WS3_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS3_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV4":
                            connection.query("Select * from Pallets where Current_Loc = 'WS4_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS4_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV5":
                            connection.query("Select * from Pallets where Current_Loc = 'WS5_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS5_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV6":
                            connection.query("Select * from Pallets where Current_Loc = 'WS6_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS6_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV8":
                            connection.query("Select * from Pallets where Current_Loc = 'WS8_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS8_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;

                        case "SimCNV9":
                            connection.query("Select * from Pallets where Current_Loc = 'WS9_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS9_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV10":
                            connection.query("Select * from Pallets where Current_Loc = 'WS10_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS10_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV11":
                            connection.query("Select * from Pallets where Current_Loc = 'WS11_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS11_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV12":
                            connection.query("Select * from Pallets where Current_Loc = 'WS12_Z1'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS12_Z2' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;


                    }


                }
                if ((req.body.payload.PalletID == -1)) {

                    switch (req.body.senderID) {
                        case "SimCNV1":
                        case "SimCNV7":

                            break;
                    }

                }
                res.end();
                break;


            case "Z3_Changed":

                var zone3="_Z3";

                //IF A PALLET ARRIVES AT ZONE 3 AND THAT HAPPENS NOT AT WORKSTATION 7 (TO PREVENT SIMILAR CONDITIONS WHILE LOADING PALLET)
                if (req.body.payload.PalletID != -1) {


                    switch (req.body.senderID) {

                        case"SimCNV7":

                            //FOR THE SIMULATOR
                            var palletID = req.body.payload.PalletID;
                            var WS7 = "WS7";
                            var currloc = WS7.concat(zone3);
                            console.log(currloc);

                            connection.query("Select * from Pallets where Status = 'pending'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Status = 'in_production' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                                connection.query("UPDATE Pallets SET PalletID = ? where Sno= ?", [palletID,index], function(error){
                                    if(!error) {
                                        console.log('Pallet Id updated');
                                    }
                                    else {
                                        console.log(error);
                                    }
                                });
                                connection.query("UPDATE Pallets SET Current_loc = ? where Sno = ?", [currloc,index], function(error){
                                    if(!error) {
                                        console.log('Current Location updated');
                                    }
                                    else {
                                        console.log(error);
                                    }

                                });
                            });

                            //FOR THE PHYSICAL LINE
                            // connection.query("Select * from Pallets where Current_Loc = 'WS7_Z2'", function (rows,results) {
                            //     console.log('Results',results);
                            //     var index = results[0].Sno;
                            //     connection.query("UPDATE Pallets SET Current_Loc = 'WS7_Z3' where Sno = ?", index, function(){
                            //         console.log('Loaded Status updated');
                            //     });
                            //
                            // });

                            break;

                        case "SimCNV1":
                            connection.query("Select * from Pallets where Current_Loc = 'WS1_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS1_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV2":
                            connection.query("Select * from Pallets where Current_Loc = 'WS2_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS2_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV3":
                            connection.query("Select * from Pallets where Current_Loc = 'WS3_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS3_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV4":
                            connection.query("Select * from Pallets where Current_Loc = 'WS4_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS4_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV5":
                            connection.query("Select * from Pallets where Current_Loc = 'WS5_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS5_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV6":
                            connection.query("Select * from Pallets where Current_Loc = 'WS6_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS6_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV8":
                            connection.query("Select * from Pallets where Current_Loc = 'WS8_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS8_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV9":
                            connection.query("Select * from Pallets where Current_Loc = 'WS9_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS9_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV10":
                            connection.query("Select * from Pallets where Current_Loc = 'WS10_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS10_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV11":
                            connection.query("Select * from Pallets where Current_Loc = 'WS11_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS11_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;
                        case "SimCNV12":
                            connection.query("Select * from Pallets where Current_Loc = 'WS12_Z2'", function (rows,results) {
                                console.log('Results',results);
                                var index = results[0].Sno;
                                connection.query("UPDATE Pallets SET Current_Loc = 'WS12_Z3' where Sno = ?", index, function(){
                                    console.log('Loaded Status updated');
                                });

                            });
                            break;


                            break;
                    }
                }

                else if (req.body.payload.PalletID == -1) {

                }
                // res.writeHead(202);
                res.end();

                break;

            case "Z4_Changed":


                if ((req.body.payload.PalletID != -1)) {

                switch (req.body.senderID) {

                    case "SimCNV2":
                        connection.query("Select * from Pallets where Current_Loc = 'WS2_Z1'", function (rows,results) {
                        console.log('Results',results);
                        var index = results[0].Sno;
                        connection.query("UPDATE Pallets SET Current_Loc = 'WS2_Z4' where Sno = ?", index, function(){
                            console.log('Loaded Status updated');
                        });

                    });
                        break;
                    case "SimCNV3":
                        connection.query("Select * from Pallets where Current_Loc = 'WS3_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS3_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;
                    case "SimCNV4":
                        connection.query("Select * from Pallets where Current_Loc = 'WS4_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS4_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;

                        break;
                    case "SimCNV5":
                        connection.query("Select * from Pallets where Current_Loc = 'WS5_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS5_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;
                    case "SimCNV6":
                        connection.query("Select * from Pallets where Current_Loc = 'WS6_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS6_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;
                    case "SimCNV8":
                        connection.query("Select * from Pallets where Current_Loc = 'WS8_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS8_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;
                    case "SimCNV9":
                        connection.query("Select * from Pallets where Current_Loc = 'WS9_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS9_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;
                    case "SimCNV10":
                        connection.query("Select * from Pallets where Current_Loc = 'WS10_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS10_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;
                    case "SimCNV11":
                        connection.query("Select * from Pallets where Current_Loc = 'WS11_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS11_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;
                    case "SimCNV12":
                        connection.query("Select * from Pallets where Current_Loc = 'WS12_Z1'", function (rows,results) {
                            console.log('Results',results);
                            var index = results[0].Sno;
                            connection.query("UPDATE Pallets SET Current_Loc = 'WS12_Z4' where Sno = ?", index, function(){
                                console.log('Loaded Status updated');
                            });

                        });
                        break;



                }




                }

                else if ((req.body.payload.PalletID == -1)){


                }


                res.end();
                break;

            case "Z5_Changed":



                res.end();

                break;

            case "DrawEndExecution":
                console.log(req.body);
                console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
                var pallid = req.body.payload.PalletID;
                var currentdate = new Date();
                var datetime = currentdate.getFullYear() + "-"
                    + ('0' + currentdate.getMonth()).slice(-2) + "-"
                    + ('0' + currentdate.getDay()).slice(-2) + "T"
                    + ('0' + currentdate.getHours()).slice(-2) + ":"
                    + ('0' + currentdate.getMinutes()).slice(-2) + ":"
                    + ('0' + currentdate.getSeconds()).slice(-2) + "."
                    + ('0' + currentdate.getMilliseconds()).slice(-2);
                console.log(datetime);
                if ((req.body.payload.Recipe > 0) && (req.body.payload.Recipe < 4)) {

                    var key1 =  "ready" +" | "+ req.body.senderID +" I "+ datetime;
                    console.log(key1);
                    connection.query("UPDATE Pallets SET Frame = ? WHERE PalletID = ?", [key1, pallid], function(error){
                        console.log(error);
                    });

                }


                if ((req.body.payload.Recipe > 3) && (req.body.payload.Recipe < 7)) {

                    var key2=  "ready" +" | "+ req.body.senderID +" | "+ datetime;
                    connection.query("UPDATE Pallets SET Screen = ? WHERE PalletID = ?", [key2, pallid], function(error){
                        console.log(error);
                    });
                }

                if ((req.body.payload.Recipe > 6) && (req.body.payload.Recipe < 10)) {
                    var key3 = "ready" +" | "+ req.body.senderID +" | "+ datetime;
                    connection.query("UPDATE Pallets SET Keyboard = ? WHERE PalletID = ?", [key3, pallid], function(error){
                        console.log(error);
                    });
                }
                // res.writeHead(202);
                res.end();

                break;
            // case "PaperLoaded":
            //     request.get("http://localhost:3000/RTU/SimCNV2/data/P1", function (req, res, body) {
            //         var obj = JSON.parse(res.body);
            //         var present = obj.v;
            //         if (!present) {
            //             setTimeout(function() {
            //                 ref1.transzone(3, 5);
            //             },1000);
            //         }
            //
            //         else {
            //
            //             //write code to invoke the above after 10 seconds
            //         }
            //     });
            //
            //     res.end();
            //     break;
            case "PalletLoaded":




                break;


            case "PalletUnloaded":

                break;
        }

        //   break;
        //  }

        //IF NEW PALLET IS INTRODUCED IN ALL WORKSTATIONS

    });

    app.listen(port, hostname, function(){
        console.log(' Server running at http://'+hostname+':'+port);
    });

    if((ref1.wsnumber>0)&&(ref1.wsnumber<10)) {
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z1_Changed/notifs', {form: {destUrl: "http://localhost:600"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z2_Changed/notifs', {form: {destUrl: "http://localhost:600"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z3_Changed/notifs', {form: {destUrl: "http://localhost:600"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z5_Changed/notifs', {form: {destUrl: "http://localhost:600"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        if((ref1.wsnumber!=1)&&(ref1.wsnumber!=7))
        {
            request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z4_Changed/notifs', {form: {destUrl: "http://localhost:600"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
            request.post('http://localhost:3000/RTU/SimROB'+ref1.wsnumber+'/events/DrawEndExecution/notifs', {form: {destUrl: "http://localhost:600"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        }

    }
    if((ref1.wsnumber>9)&&(ref1.wsnumber<13)) {
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z1_Changed/notifs', {form: {destUrl: "http://localhost:60"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z2_Changed/notifs', {form: {destUrl: "http://localhost:60"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z3_Changed/notifs', {form: {destUrl: "http://localhost:60"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z4_Changed/notifs', {form: {destUrl: "http://localhost:60"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        request.post('	http://localhost:3000/RTU/SimCNV'+ref1.wsnumber+'/events/Z5_Changed/notifs', {form: {destUrl: "http://localhost:60"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
        request.post('http://localhost:3000/RTU/SimROB'+ref1.wsnumber+'/events/DrawEndExecution/notifs', {form: {destUrl: "http://localhost:60"+ref1.wsnumber+"/notifs/"+ref1.wsnumber}});
    }

};


//METHOD LOAD PEN OF CLASS ROBOT
workstation.prototype.loadpen = function () {
    ref=this;
    var options;
    if (this.capability == "red") {
        options = {
            method: 'POST', //http://127.0.0.1:3000/RTU/SimROB"+wsnumber+"/services/ChangePenRED
            body: {"destUrl": "http://127.0.0.1"}, // Javascript object
            json: true,
            url: "http://127.0.0.1:3000/RTU/SimROB"+this.wsnumber+"/services/ChangePenRED",
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }

    else if (this.capability == "green") {
        options = {
            method: 'POST',  //http://127.0.0.1:3000/RTU/SimROB"+wsnumber+"/services/ChangePenGREEN
            body: {"destUrl": "http://127.0.0.1"}, // Javascript object  	http://127.0.0.1:3000/RTU/SimROB"+wsnumber+"/services/Draw1
            json: true,
            url: "http://127.0.0.1:3000/RTU/SimROB"+this.wsnumber+"/services/ChangePenGREEN",
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    else if (this.capability == "blue") {
        options = {
            method: 'POST', //  http://127.0.0.1:3000/RTU/SimROB"+wsnumber+"/services/ChangePenBLUE
            body: {"destUrl": "http://127.0.0.1"}, // Javascript object
            json: true,
            url: "http://127.0.0.1:3000/RTU/SimROB"+this.wsnumber+"/services/ChangePenBLUE",
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    //Print the result of the HTTP POST request
    request(options, function (err) {

        if (err) {
            console.log('Error loading pen', err);
        }


    });
    console.log('Robot ' + ref.wsnumber +' Pen Colour '  + ref.capability + ' loaded');
};

//CREATING THE AGENTS
var ws1 = new workstation(1,'paper');
var ws2 = new workstation(2,'red');
var ws3 = new workstation(3,'blue');
var ws4 = new workstation(4,'green');
var ws5 = new workstation(5,'red');
var ws6 = new workstation(6, 'blue');
var ws7 = new workstation(7,'loadpallet');
var ws8 = new workstation(8,'green');
var ws9 = new workstation(9, 'red');
var ws10 = new workstation(10, 'blue');
var ws11 = new workstation(11,  'green');
var ws12 = new workstation(12,  'red');



//HANDLES SUBMIT AFTER MAKING ORDER




//SUBSCRIBES TO ALL EVENTS FROM THE SIMULATOR
function subscriptions() {

    request.post('http://localhost:3000/RTU/SimROB7/events/PalletLoaded/notifs', {form: {destUrl: "http://localhost:6007/notifs/7"}}, function (err) {if (err) {} else{ console.log('subscribed to pallet load');}});
    request.post('http://localhost:3000/RTU/SimROB1/events/PaperLoaded/notifs', {form: {destUrl: "http://localhost:6001/notifs/paperloaded"}}, function (err) {if (err) {}});
    request.post('	http://localhost:3000/RTU/SimROB7/events/PalletUnloaded/notifs', {form: {destUrl: "http://localhost:6007/notifs/7"}}, function (err) {if (err) {}});
}


ws1.runServer(6001);
ws2.runServer(6002);
ws3.runServer(6003);
ws4.runServer(6004);
ws5.runServer(6005);
ws6.runServer(6006);
ws7.runServer(6007);
ws8.runServer(6008);
ws9.runServer(6009);
ws10.runServer(6010);
ws11.runServer(6011);
ws12.runServer(6012);

ws2.loadpen();
ws3.loadpen();
ws4.loadpen();
ws5.loadpen();
ws6.loadpen();
ws8.loadpen();
ws9.loadpen();
ws10.loadpen();
ws11.loadpen();
ws12.loadpen();

//EXPRESS LISTENING CODE TO RUN 'THIS' SERVER
app.listen(5001, function(){
    console.log('Server Running on Port 5001');
    subscriptions();
});