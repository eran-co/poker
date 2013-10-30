/*jslint plusplus: true, node: true */
var passport = require('passport'),
    User = require('../models/user').userModel;

exports.getLoginPage = function(req, res){
    res.sendfile('site/login.html');
};

exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) {
            req.session.messages =  [info.message];
            return res.send({res:false});
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({res:true});
        });
    })(req, res, next);
};

exports.register = function(req, res) {
    var userName = req.body.username;
    var password = req.body.password;

    if (!userName || !password){
        res.send({res:false, message: "user name and password can't be empty"});
    }

    var user = new User({
        username: userName,
        password:password,
        balance: 50000,
        //TODO set default picture
        imageUrl: '../img/faces/1.jpg'
    });

    user.save( function( err ) {
        if( err ) {
            var message = "";
            if (err.code === 11000){
                message = 'User name already taken, please try again with a different one.';
            }
            else {
                message = 'please try again';
            }
            res.send({res:false, message: message});
        }
        else {
            res.send({res:true});
        }
    });
};

exports.logout = function(req, res) {
    req.logout();
    res.send('ok');
};

exports.getUser = function(req, res){
    var user = req.user.toJSON();
    delete user.password;
    res.send(user);
};
