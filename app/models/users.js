"use strict";

var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
	email: {type:String},
	password: {type:String},
	role: {type:String}
});

module.exports = mongoose.model('users', usersSchema);
