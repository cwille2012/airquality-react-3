var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');

var MongoClient = require('mongodb').MongoClient;
var dbHost = DB_HOST = "localhost";
var dbPort = DB_PORT = 27017;

var databaseName = "dashboard";
var databaseURL = 'mongodb://' + dbHost + ':' + dbPort + '/' + databaseName;

module.exports = function(app) {
    app.post('/api/login', function(req, res) {
        console.log('user requesting login')
        console.log(req.body)
        AM.manualLogin(req.body['user'], req.body['pass'], function(e, o) {
            if (!o) {
                res.status(400).send(e);
            } else {
                req.session.user = o;
                console.log(o)
                if (req.body['remember-me'] == 'true') {
                    res.cookie('user', o.user, { maxAge: 900000 });
                    res.cookie('pass', o.pass, { maxAge: 900000 });
                }
                res.status(200).send(o);
            }
        });
    });

    app.post('/api/logout', function(req, res) {
        res.clearCookie('user');
        res.clearCookie('pass');
        req.session.destroy(function(e) { res.status(200).send('ok'); });
    });

    app.post('/api/signup', function(req, res) {
        AM.addNewAccount({
            name: req.body['name'],
            email: req.body['email'],
            user: req.body['user'],
            pass: req.body['pass'],
            country: req.body['country']
        }, function(e) {
            if (e) {
                res.status(400).send(e);
                var alarmText = String("new user signup failed: " + req.body['email'] + " " + e);
                var alarmStatus = "info";
                logAlarm(alarmText, alarmStatus);
            } else {
                res.status(200).send('ok');
                var alarmText = String("new user signup: " + req.body['email']);
                var alarmStatus = "info";
                logAlarm(alarmText, alarmStatus);
            }
        });
    });

    app.post('/api/lost-password', function(req, res) {
        AM.getAccountByEmail(req.body['email'], function(o) {
            if (o) {
                EM.dispatchResetPasswordLink(o, function(e, m) {
                    // this callback takes a moment to return //
                    // TODO add an ajax loader to give user feedback //
                    if (!e) {
                        res.status(200).send('ok');
                        var alarmText = String("reset password email sent to: " + req.body['email']);
                        var alarmStatus = "info";
                        logAlarm(alarmText, alarmStatus);
                    } else {
                        for (k in e) console.log('ERROR : ', k, e[k]);
                        res.status(400).send('unable to dispatch password reset');
                        var alarmText = String("error sending password reset email to: " + req.body['email']);
                        var alarmStatus = "info";
                        logAlarm(alarmText, alarmStatus);
                    }
                });
            } else {
                res.status(400).send('email-not-found');
            }
        });
    });

    app.post('/api/reset-password', function(req, res) {
        var nPass = req.body['pass'];
        // retrieve the user's email from the session to lookup their account and reset password //
        var email = req.session.reset.email;
        // destory the session immediately after retrieving the stored email //
        req.session.destroy();
        AM.updatePassword(email, nPass, function(e, o) {
            if (o) {
                res.status(200).send('ok');
                var alarmText = String("user updated password successfully: " + email);
                var alarmStatus = "info";
                logAlarm(alarmText, alarmStatus);
            } else {
                res.status(400).send('unable to update password');
                var alarmText = String("updating user password failed: " + email);
                var alarmStatus = "info";
                logAlarm(alarmText, alarmStatus);
            }
        })
    });

    app.post('/api/users/remove', function(req, res) {
        if (req.session.user.access != 'admin') {
            var alarmText = String('unauthorized user (' + req.session.user.email + ') tried to remove user: ' + req.body.userID);
            var alarmStatus = "info";
            logAlarm(alarmText, alarmStatus);
            res.status(400).send('not authorized');
        } else {
            var userAccess = req.session.user.access;
            var command = req.body.command;
            var accountID = req.body.userID;
            if (command == "remove") {
                AM.deleteAccount(accountID, function(e, obj) {
                    if (!e) {
                        res.status(200).send('ok');
                        var alarmText = String("removed user: " + accountID);
                        var alarmStatus = "info";
                        logAlarm(alarmText, alarmStatus);
                    } else {
                        res.status(400).send('could not delete user');
                        var alarmText = String("could not remove user: " + accountID);
                        var alarmStatus = "info";
                        logAlarm(alarmText, alarmStatus);
                    }
                });
            }
        }
    });

    app.post('/api/whitelist', function(req, res) {
        if (req.session.user.access != 'admin') {
            res.status(400).send('not authorized');
        } else {
            if (req.body.command == "add") {
                var receivedEmail = String(req.body.email);
                var receivedAccess = String(req.body.access);
                MongoClient.connect(databaseURL, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("dashboard");
                    var newObj = { email: receivedEmail, access: receivedAccess };
                    dbo.collection("whitelist").insertOne(newObj, function(err, res) {
                        if (err) throw err;
                        var alarmText = String(receivedEmail + " added to whitelist as " + receivedAccess);
                        var alarmStatus = "info";
                        logAlarm(alarmText, alarmStatus);
                        db.close();
                    });
                });
            } else if (req.body.command == "remove") {
                var receivedEmail = String(req.body.email);
                MongoClient.connect(databaseURL, function(err, db) {
                    if (err) throw err;
                    var dbo = db.db("dashboard");
                    var dbquery = { email: receivedEmail };
                    dbo.collection("whitelist").deleteOne(dbquery, function(err, obj) {
                        if (err) throw err;
                        var alarmText = String(receivedEmail + " removed from whitelist");
                        var alarmStatus = "info";
                        logAlarm(alarmText, alarmStatus);
                        db.close();
                    });
                });
            } else {
                var alarmText = String("could not remove user from whitelist");
                var alarmStatus = "info";
                logAlarm(alarmText, alarmStatus);
            }
            var responseText = JSON.stringify(req.body);
            res.status(200).send(responseText);
        }
    });

    app.post('/api/account', function(req, res) {
        if (req.session.user == null) {
            res.redirect('/');
        } else {
            AM.updateAccount({
                id: req.session.user._id,
                name: req.body['name'],
                email: req.body['email'],
                pass: req.body['pass'],
                country: req.body['country']
            }, function(e, o) {
                if (e) {
                    res.status(400).send('error-updating-account');
                    var alarmText = String("could not update account: " + req.body['email'] + " " + e);
                    var alarmStatus = "info";
                    logAlarm(alarmText, alarmStatus);
                } else {
                    req.session.user = o;
                    // update user login cookies if they exist
                    if (req.cookies.user != undefined && req.cookies.pass != undefined) {
                        res.cookie('user', o.user, { maxAge: 900000 });
                        res.cookie('pass', o.pass, { maxAge: 900000 });
                    }
                    var alarmText = String("user account updated: " + req.body['email']);
                    var alarmStatus = "info";
                    logAlarm(alarmText, alarmStatus);
                    res.status(200).send('ok');
                }
            });
        }
    });

    app.get('/api/users', function(req, res) {
        console.log(req)
        if (req.session.user.access != 'admin') {
            res.status(400).send('unauthorized');
        } else {
            AM.getAllRecords(function(e, accounts) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                for (var account in accounts) {
                    accounts[account]['pass'] = 'hidden';
                }
                res.end(JSON.stringify(accounts));
            })
        }
    });

    app.get('/api/whitelist', function(req, res) {
        if (req.session.user.access != 'admin') {
            res.redirect('/');
        } else {
            MongoClient.connect(databaseURL, function(err, db) {
                if (err) throw err;
                var dbo = db.db("dashboard");
                dbo.collection("whitelist").find({}).toArray(function(err, result) {
                    if (err) throw err;
                    var whitelist = result;
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(whitelist));
                    db.close();
                });
            });
        }
    });
};

function logAlarm(alarmText, alarmStatus) {
    if (alarmStatus === undefined) {
        alarmStatus = "info";
    }
    MongoClient.connect(databaseURL, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dashboard");
        var alarmTime = String(new Date().today() + " " + new Date().timeNow());
        var epochTime = String((new Date).getTime());
        var newObj = { epoch: epochTime, time: alarmTime, text: String(alarmText), status: String(alarmStatus) };
        //console.log(newObj);
        console.log("[" + alarmStatus + "] [" + alarmTime + "] " + alarmText);
        dbo.collection("alarms").insertOne(newObj, function(err, res) {
            if (err) throw err;
            db.close();
        });
    });

}

// For todays date;
Date.prototype.today = function() {
    return (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + this.getFullYear();
}

// For the time now
Date.prototype.timeNow = function() {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes() + ":" + ((this.getSeconds() < 10) ? "0" : "") + this.getSeconds();
}