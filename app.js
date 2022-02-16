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
           // connect to MongoDB
const MongoClient = require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb+srv://Uzma:Uzma11@cluster0.zdoka.mongodb.net/', (err, client) => {
    db = client.db('webstore')
})

// display a message for root path to show that API is working
app.get('/', (req, res, next) => {
    res.send('Select a collection, e.g., /collection/messages')
})

// get the collection name
app.param('collectionName', (req, res, next, collectionName) => {
    req.collection = db.collection(collectionName)
    // console.log('collection name:', req.collection)
    return next()
})

// retrieve all the objects from an collection
app.get('/collection/:collectionName', (req, res, next) => {
    req.collection.find({}).toArray((e, results) => {
        if (e) return next(e)
        res.send(results)
    })
})
  
//adding post
app.post('/collection/:collectionName', (req, res, next) => {
    req.collection.insert(req.body, (e, results) => {
    if (e) return next(e)
    res.send(results.ops)
    })
    })
    
    // return with object id 
    const ObjectID = require('mongodb').ObjectID;
    app.get('/collection/:collectionName/:id'
    , (req, res, next) => {
    req.collection.findOne({ _id: new ObjectID(req.params.id) }, (e, result) => {
    if (e) return next(e)
    res.send(result)
    })
    })
        
    //update an object 
    app.put('/collection/:collectionName/:id', (req, res, next) => {
        req.collection.update(
        {_id: new ObjectID(req.params.id)},
        {$set: req.body},
        {safe: true, multi: false},
        (e, result) => {
        if (e) return next(e)
        res.send(result.modifiedCount === 1 ? {msg: 'success'} : {msg: 'error'})
        })
        })
                
//    delete an object 
    app.delete('/collection/:collectionName/:id', (req, res, next) => {
    req.collection.deleteOne(
    { _id: ObjectID(req.params.id) },(e, result) => {
    if (e) return next(e)
    res.send(result.deletedCount === 1 ?{msg: 'success'} : {msg: 'error'})
    })
    })  

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