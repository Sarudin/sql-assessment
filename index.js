var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://postgres:bigbrush1@localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({connectionString : connString},
  function(err, localdb){
    db = localdb;
    app.set('db', db);

    db.user_create_seed(function(){
      console.log("User Table Init");
    });
    db.vehicle_create_seed(function(){
      console.log("Vehicle Table Init")
    });

    app.get('/api/users', function(req, res, next) {
      db.getAllUsers(function(err, response) {
        res.status(200).send(response);
      })
    });

    app.get('/api/vehicles', function(req, res, next) {
      db.getAllVehicles(function(err, response) {
        res.status(200).send(response);
      })
    });

    app.post('/api/users', function(req, res, next) {
      db.createUser([req.body.firstname, req.body.lastname, req.body.email], function(err, response) {
        res.status(200).send();
      })
    });

    app.post('/api/vehicles', function(req, res, next) {
      db.createVehicle([req.body.make, req.body.model, req.body.year, req.body.ownerId], function(err, response) {
        res.status(200).send();
      })
    });

    app.get('/api/user/:userId/vehiclecount', function(req, res, next) {
      db.countVehicles(function(err, response) {
        res.status(200).send({'count': 'res.body.count'});
      })
    });

    app.get('/api/user/:userId/vehicle', function(req, res, next) {
      db.countVehicles(function(err, response) {
        res.status(200).send({'count': 'res.body.length'});
      })
    });

    app.get('/api/vehicle?UserEmail=email', function(req, res, next) {
      db.findVehiclesByEmail([req.query.email], function(err, response) {
        res.status(200).send(response);
      })
    });

    app.get('/api/newervehiclesbyyear', function(req, res, next) {
      db.getVehiclesByYear(function(err, response) {
        res.status(200).send(response);
      })
    });

    app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res, next) {
      db.changeOwnership([req.body.vehicleId, req.body.userId], function(err, response) {
        res.status(200).send();
      })
    });

    app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res, next) {
      db.deleteButKeep([req.body.userId, req.body.vehicleId], function(err, response) {
        res.status(200).send();
      })
    });

    app.delete('/api/vehicle/:vehicleId', function(req, res, next) {
      db.deleteVehicle([req.body.vehicleId], function(err, response) {
        res.status(200).send();
      })
    })

});

app.listen('3000', function(){
  console.log("Successfully listening on : 3000")
})

module.exports = app;
