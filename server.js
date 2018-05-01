"use strict";

var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var bodyParser = require('body-parser');
var cors = require('cors');
var jwt = require("jsonwebtoken");

mongoose.connect(database.localUrl, { useMongoClient: true }); 

app.use(cors({origin: '*'}));

app.use("/", express.static(__dirname + "/app/public"));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());

require('./server/routes.js')(app, jwt);

app.listen(port);
console.log("App listening on port " + port);
