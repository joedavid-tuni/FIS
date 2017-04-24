/**
 * Created by Joe David on 07-04-2017.
 */
var express = require('express');
var app = express();
var request = require('request');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var formidable = require('formidable');
var builder = require('xmlbuilder');
var bodyParser = require('body-parser');
var XMLWriter = require('xml-writer');


var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306, //Port number to connect to the db
    user: 'root', //The user name assigned to work with the database
    password: 'oracle', //password for the database
    database: 'fisfinal' //Name of the database
});

var CustomerID;
var OrderID;
var SNo ;
counter =0;
module.exports = order = [];

function push(OrderID,CustomerID, ProductID,Date_time,Name, FrameType, FrameColour, ScreenType, ScreenColour, KeyboardType, KeyboardColour, Status ){

order.push({orderID: OrderID,
    customerID: CustomerID,
    productID: ProductID,
    orderTime: Date_time,
    name: Name,
    PalletID: PalletID,
    frame: Frame,
    screen: Screen,
    keyboard: Keyboard,
    currentloc: CurrentLoc,
    status : Status
});


}

function sendxml(FrameType, FrameColour, ScreenType, ScreenColour, KeyboardType, KeyboardColour){

}


app.use("/css", express.static(__dirname + '/css'));
app.use("/script", express.static(__dirname + '/script'));
app.use("/img", express.static(__dirname + '/img'));


//Connecting to the DATABASE
connection.connect(function (err) {
    if (!err) {

        console.log("Successfully Connected to Database :)");
        connection.query('delete from customers');
        connection.query('delete from products');
        connection.query('delete from orders');
        connection.query('delete from pallets');
        connection.query('ALTER TABLE Orders DROP OrderID', function(){
            connection.query('ALTER table Orders Add column OrderID Int(5) PRIMARY KEY AUTO_INCREMENT AFTER Sno', function(){
                connection.query(' ALTER TABLE Orders AUTO_INCREMENT=5000;')
            })
        });
        connection.query('ALTER TABLE customers DROP CustomerID', function(){
            connection.query('ALTER table customers Add column CustomerID Int(5) PRIMARY KEY AUTO_INCREMENT AFTER Sno', function(){
                connection.query(' ALTER TABLE Customers AUTO_INCREMENT=1000;')
            })
        });
        connection.query('ALTER TABLE Pallets DROP Sno', function(){
            connection.query('ALTER table Pallets ADD column Sno Int(5) PRIMARY KEY AUTO_INCREMENT FIRST', function(){
                connection.query(' ALTER TABLE Pallets AUTO_INCREMENT=1;')
            })
        });
        SNo =1;

    }
    else {
        console.log("Error during connection to the Database")
        console.log(err);
    }

});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/form.html'));
    console.log(order);
});



app.post('/submit', function(req, res) {

    var fieldvalues = [];   //Array to hold the values of the fields in the form
    new formidable.IncomingForm().parse(req).on('field', function (name, value) { //in the event a field in the form is encountered
        fieldvalues.push(value);    //storing the field values in an array
    })
        .on('end', function () { //in the event of end of the form data

            console.log(fieldvalues);
            var rows = fieldvalues.length;
            console.log(rows);
            for(var i =0; i< rows; i+=10) {
                var random =  Math.floor(Math.random()*90000) + 10000;
                var full_name = fieldvalues[i];
                var address = fieldvalues[i+1];
                var telephoneno = fieldvalues[i+2];
                var frame = fieldvalues[i+3];
                var frame_colour = fieldvalues[i+4];
                var screen_type = fieldvalues[i+7];
                var screen_colour = fieldvalues[i+6];
                var keyboard = fieldvalues[i+5];
                var keyboard_colour = fieldvalues[i+8];
                var order = fieldvalues[i+9];


                //Inserting relevant information into Table Products
                var sql = "INSERT INTO Products(SNo, ProductId, FrameType, FrameColour, ScreenType, ScreenColour, KeyboardType, KeyboardColour, Quantity) VALUES (?)";
                var values = [SNo, random, frame, frame_colour, screen_type, screen_colour, keyboard, keyboard_colour, order];
                connection.query(sql, [values], function (error) {
                    if (error) {

                        console.log('Error while writing into products table');
                        console.log(error);
                        res.end();
                    }
                });
                //INSERTING INTO  CUSTOMERS
                var sql1 = "INSERT INTO Customers(SNo, Name, Address, TelephoneNo) VALUES (?)";
                var values1 = [SNo, full_name, address, telephoneno];
                connection.query(sql1, [values1], function (error, results, fields) {
                    if (error) {
                        console.log('Error while writing into customers table');
                        console.log(error);

                        res.end();
                    }
                });

                //INSERTING INTO ORDERS
                var sql2 = "INSERT INTO Orders(Sno, CustomerId, ProductID, Quantity) SELECT "+ SNo +", Customers.CustomerID, Products.ProductID, Products.Quantity FROM Customers, Products WHERE Customers.Sno="+ SNo +" AND Products.Sno="+ SNo +";";

                connection.query(sql2, function (error, results, fields) {
                    if (error) {
                        console.log('Error while writing into orders table');
                        console.log(error);
                        res.end();
                    }
                });
                ++SNo;

                res.end();



            }
            setTimeout(function(){
                var rows_;


                connection.query("SELECT * FROM Orders JOIN Customers ON ( Customers.CustomerID =Orders.CustomerId) JOIN Products ON (Products.ProductID= Orders.ProductID) WHERE Products.Status = 'ordered' ORDER BY Orders.Sno", function(results,rows){

                    //CREATING PALLETS TABLE FROM ORDERS AND PRODUCTS TABLES WHICH IN TURN IS FROM THE WEB INTERFACE

                    for (rows_ = 0; rows_ < rows.length; rows_++) {   //if using dynamic form revert to rows.length instead if ++counter
                        for (var qty = 0; qty < rows[rows_].Quantity; qty++) {
                            // push(rows[rows_].OrderID,rows[rows_].CustomerID,rows[rows_].ProductID,rows[rows_].Date_time,rows[rows_].Name,rows[rows_].FrameType,rows[rows_].FrameColour,
                            //     rows[rows_].ScreenType,rows[rows_].ScreenColour, rows[rows_].KeyboardType,rows[rows_].KeyboardColour, rows[rows_].Status);


                                var random =  Math.floor(Math.random()*90000) + 10000;
                                var sql = "INSERT INTO Pallets(CustomerID, OrderID, OrderTime, Name, ProductID) VALUES (?)";
                                var values1 = [rows[rows_].CustomerID, rows[rows_].OrderID,rows[rows_].Date_time, rows[rows_].Name, rows[rows_].ProductID];
                                connection.query(sql, [values1], function (error, results, fields) {
                                    if(!error) {
                                        console.log('Inserted Successfully into Pallets Table');
                                    }
                                    else if(error){
                                        console.log(error);
                                    }
                                });



                        }
                    }

                    // for (rows_ = 0; rows_ < rows.length; rows_++) {   //if using dynamic form revert to rows.length instead if ++counter
                    //     for (var qty1 = 0; qty1 < rows[rows_].Quantity; qty1++) {
                    //         var ftype, stype, ktype;
                    //         ++counter;
						// 	console.log(counter);
                    //         switch (rows[rows_].FrameType) {
                    //             case 'frame1':
                    //                 ftype = 1;
                    //                 break;
                    //             case 'frame2':
                    //                 ftype = 2;
                    //                 break;
                    //             case 'frame3':
                    //                 ftype = 3;
                    //                 break;
                    //         }
                    //         switch (rows[rows_].ScreenType) {
                    //             case 'Screen1':
                    //                 stype = 1;
                    //                 break;
                    //             case 'Screen2':
                    //                 stype = 2;
                    //                 break;
                    //             case 'Screen3':
                    //                 stype = 3;
                    //                 break;
                    //         }
                    //         switch (rows[rows_].KeyboardType) {
                    //             case 'Keyboard1':
                    //                 ktype = 1;
                    //                 break;
                    //             case 'Keyboard2':
                    //                 ktype = 2;
                    //                 break;
                    //             case 'Keyboard3':
                    //                 ktype = 3;
                    //                 break;
                    //         }
                    //
                    //         xw = new XMLWriter;
                    //         xw.startDocument('1.0', 'UTF-8');
                    //         xw.startElement('order');
                    //         xw.writeAttribute('id', counter);
                    //         xw.startElement('product');
                    //         xw.startElement('screen');
                    //         xw.writeAttribute('model', stype);
                    //         xw.writeAttribute('color', rows[rows_].ScreenColour);
                    //         xw.endElement();
                    //         xw.startElement('keyboard');
                    //         xw.writeAttribute('model', ktype);
                    //         xw.writeAttribute('color', rows[rows_].KeyboardColour);
                    //         xw.endElement();
                    //         xw.startElement('frame');
                    //         xw.writeAttribute('model', ftype);
                    //         xw.writeAttribute('color', rows[rows_].FrameColour);
                    //         xw.endElement();
                    //         xw.endElement();
                    //         xw.endElement();
                    //         xw.endDocument();
                    //         var xml = xw.toString();
                    //
                    //         var options = {
                    //             method: 'POST',
                    //             body: xml,
                    //             url: "http://127.0.0.1:9500/submit",
                    //             headers: {'Content-Type': 'application/xml'}
                    //         };
                    //         //Print the result of the HTTP POST request
                    //
						// 	// setTimeout(function(){
						// 		console.log(counter);
                    //             request(options, function () {
                    //
                    //                 console.log("Xml requested to Orchestrator");
                    //
                    //             });
						// 	// },1000);
                    //     }
                    //
                    // }


                    for (rows_ = 0; rows_ < rows.length; rows_++) {
                        connection.query("UPDATE Products SET Status = 'processed' WHERE ProductID = ?", rows[rows_].ProductID, function(){
                            console.log('Rows updated Successfully');
                        });
                    }


                });
            }, 500);
        });
});


app.listen(5000, function(){
    console.log('Server Running on Port 5000');
});