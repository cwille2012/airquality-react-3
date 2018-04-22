var MongoClient = require('mongodb').MongoClient;
var dbHost = DB_HOST = "localhost";
var dbPort = DB_PORT = 27017;

var databaseName = "dashboard";
var databaseURL = 'mongodb://' + dbHost + ':' + dbPort + '/' + databaseName;

module.exports = function(app) {
    app.post('/api/sensors', function(req, res) {
        console.log('received sensor data')
        console.log(req.body)
            // MongoClient.connect(databaseURL, function(err, db) {
            //     if (err) throw err;
            //     var dbo = db.db("dashboard");
            //     dbo.collection("sensors").insertOne(req.body, function(err, res) {
            //         if (err) {
            //             throw err;
            //         }
            //         db.close();
            //     });
            //     res.status(200).send('ok');
            // });
        res.status(200).send('ok');
    });

    app.post('/api/test', function(req, res) {
        console.log('received sensor data')
        console.log(req.body)
    });

    app.get('/api/sensors', function(req, res) {
        MongoClient.connect(databaseURL, function(err, db) {
            if (err) throw err;
            var dbo = db.db("dashboard");
            dbo.collection("sensors").find({}).toArray(function(err, result) {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(result));
                db.close();
            });
        });
    });
};