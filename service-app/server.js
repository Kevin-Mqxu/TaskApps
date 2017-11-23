var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

//serve deployed vue app
app.use(express.static('vue_dist'));

app.use(function (req, res, next) {
    console.log("cache middleware.");
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use(cors());
var jasonParser = bodyParser.json();

var Datastore = require('nedb');
var db = new Datastore({ filename: './datafile', autoload: true });

//list APIs
app.get('/', function (req, res) {
    console.log("Getting APIs.");
    var apis = [
        {method: "post", url:"/tasks", data:"new task"},
        {method: "get", url:"/tasks"},
        {method: "get", url:"/tasks/:id"},
        {method: "put", url:"/tasks", data:"new task"},
        {method: "delete", url:"/tasks/:id"},
    ];
    res.send(apis);
})

//create task
app.post('/tasks', jasonParser, function(req, res){
    if (!req.body) return res.status(403).send("Invalid data.");
    console.log("Creating task:" + req.body);
    db.insert(req.body, (err, newDoc) => {
        if (!err) {
            console.log("Created.");
            res.status(200).send(newDoc);
        }
        else {
            console.log(err);
            res.status(500).send(err);
        }
    });
})

//get all tasks
app.get('/tasks', function(req, res) {
    console.log("Finding all tasks.");
    db.find({}, function (err, docs) {
        if (!err) {
            console.log("Done.");
            res.status(200).send(docs);
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });
})

//get a specific task
app.get('/tasks/:id', function(req, res) {
    var id = req.params.id;
    console.log("Finding task with id:" + id);
    db.find({_id: id}, function (err, docs) {
        if (!err) {
            console.log("Done.");
            res.status(200).send(docs);
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    });
})

//update task
app.put('/tasks', jasonParser, function(req, res){
    if (!req.body) return res.sendStatus(400);
    var data = req.body;
    console.log("Updating task:" + JSON.stringify(data));
    db.update({_id: data._id}, data, {}, (err, numReplaced) => {
        if (!err) {
            console.log("Updated:" + numReplaced);
            res.sendStatus(200);
        }
        else {
            console.log(err);
            res.sendStatus(500);
        }
    })
})

//delete a specific task
app.delete('/tasks/:id', function(req, res) {
    var id = req.params.id;
    console.log("Deleting task with id:" + id);
    db.remove({_id: id}, { multi: false }, 
        (err, numRemoved) => {
            if (!err){
                console.log("Deleted:" + numRemoved);
                res.sendStatus(200);
            }
            else{
                console.log(err);
                res.sendStatus(err);
            }
        });
})

var server = app.listen(8081, 'localhost', function () {

   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})