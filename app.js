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
           

    app.use(function(req, res, next) {
        // Uses path.join to find the path where the file should be
        var filePath = path.join(__dirname,"static", req.url);
        
        // Built-in fs.stat gets info about a file
        fs.stat(filePath, function(err, fileInfo) {
        if (err) {
            res.send("The image file does not exist!");
        next();
        return;
        }
        if (fileInfo.isFile()) res.sendFile(filePath);
        else next();
        });
        });

// Starts the app on port 3000 and display a message when it’s started
app.listen(3000, function() {
console.log("App started on port 3000");
});