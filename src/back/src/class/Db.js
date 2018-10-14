'use strict';

const mongoose = require('mongoose');
const config = require('../config');

module.exports.connect = function() {
	mongoose.connect(config.db.url);
	var db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error"));
	db.once("open", function(callback){
	  console.log("Connection Succeeded");
	});
	return db;
}
