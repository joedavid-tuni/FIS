
var mysql = require('mysql');
var express = require('express');
var app = express();
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');
const wait = 5000;
var pallet = [];
var pallet_C2Z1;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//DATABASE PARAMETERS
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, //Port number to connect to the db
    user: 'root', //The user name assigned to work with the database
    password: 'oracle', //password for the database
    database: 'dasdfinal' //Name of the database
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


                if ((req.body.payload.PalletID != -1)) { //If new pallet is introduced and not leaving (as we receive notifications for both)

                    switch (req.body.senderID) {

                        case "SimCNV1":



                            break;

                        case "SimCNV2":


                            break;
                        case "SimCNV3":


                            break;
                        case "SimCNV4":

                            break;
                        case "SimCNV5":
                            //CHECKING IF THE CURRENT WORKSTATION IS CAPABLE OF SERVING


                            break;

                        case "SimCNV6":

                            break;

                        case "SimCNV7":

                            break;

                        case "SimCNV8":

                            break;

                        case "SimCNV9":

                            break;
                        case "SimCNV10":

                            break;
                        case "SimCNV11":

                            break;

                        case "SimCNV12":

                            break;
                    }
                }
                if ((req.body.payload.PalletID == -1)) {


                }

                res.end();
                break;

            case "Z2_Changed":

                if ((req.body.payload.PalletID != -1)) {


                    switch (req.body.senderID) {


                        case "SimCNV1":
                        case"SimCNV7":

                            break;

                        case "SimCNV2":
                        case "SimCNV3":
                        case "SimCNV4":
                        case "SimCNV5":
                        case "SimCNV6":
                        case "SimCNV8":
                        case "SimCNV9":
                        case "SimCNV10":
                        case "SimCNV11":
                        case "SimCNV12":


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

                //IF A PALLET ARRIVES AT ZONE 3 AND THAT HAPPENS NOT AT WORKSTATION 7 (TO PREVENT SIMILAR CONDITIONS WHILE LOADING PALLET)
                if (req.body.payload.PalletID != -1) {


                    switch (req.body.senderID) {

                        case"SimCNV7":

                            break;

                        case "SimCNV1":
                        case "SimCNV2":
                        case "SimCNV3":
                        case "SimCNV4":
                        case "SimCNV5":
                        case "SimCNV6":
                        case "SimCNV8":
                        case "SimCNV9":
                        case "SimCNV10":
                        case "SimCNV11":
                        case "SimCNV12":


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


                }

                else if ((req.body.payload.PalletID == -1)){


                }


                res.end();
                break;

            case "Z5_Changed":
                if (req.body.payload.PalletID == -1) {


                    switch (req.body.senderID) {

                        case "SimCNV2":
                        case "SimCNV3":
                        case "SimCNV4":
                        case "SimCNV5":
                        case "SimCNV6":
                        case "SimCNV8":
                        case "SimCNV9":
                        case "SimCNV10":
                        case "SimCNV11":
                        case "SimCNV12":

                           break;

                    }
                }
                else if (req.body.payload.PalletID != -1) {


                }
                res.end();

                break;

            case "DrawEndExecution":

                console.log('\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

                if ((req.body.payload.Recipe > 0) && (req.body.payload.Recipe < 4)) {


                    // },1000);
                }

                if ((req.body.payload.Recipe > 3) && (req.body.payload.Recipe < 7)) {

                    // },1000);
                }

                if ((req.body.payload.Recipe > 6) && (req.body.payload.Recipe < 10)) {

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