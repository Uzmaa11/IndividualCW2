const express = require('express');
const app = express();
var path = require("path");
var fs = require("fs");
const cors=("cors");

// config Express.js
app.use(express.json())

// the 'logger' middleware
app.use(function(req, res, next) {
    console.log("Request IP: " + req.url);
    console.log("Request date: " + new Date());
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
    });

// Starts the app on port 3000 and display a message when it’s started
app.listen(3000, function() {
console.log("App started on port 3000");
});