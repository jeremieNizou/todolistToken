"use strict";

var mongoose = require('mongoose');

var todosSchema = new mongoose.Schema({
	nom: {type:String},
	presentation: {type:String}
});

module.exports = mongoose.model('todos', todosSchema);
