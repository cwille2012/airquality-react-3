const express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cors = require('cors')
var MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var http = require('http');

const app = express();
app.locals.pretty = true;
//const port = process.env.PORT || 5000;
app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

var whitelist = [
    'http://localhost:3000',
    'http://localhost:5000',
];
var corsOptions = {
    origin: function(origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions));

var databaseName = "dashboard";
var databaseURL = 'mongodb://' + dbHost + ':' + dbPort + '/' + databaseName;

var dbHost = process.env.DB_HOST || 'localhost'
var dbPort = process.env.DB_PORT || 27017;
var dbName = process.env.DB_NAME || 'node-login';

var dbURL = 'mongodb://' + dbHost + ':' + dbPort + '/' + dbName;
if (app.get('env') == 'live') {
    // prepend url with authentication credentials // 
    dbURL = 'mongodb://' + process.env.DB_USER + ':' + process.env.DB_PASS + '@' + dbHost + ':' + dbPort + '/' + dbName;
}

app.use(session({
    secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({ url: dbURL })
}));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

require('./account-handler')(app);
require('./sensor-handler')(app);

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});