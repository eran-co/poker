var passport = require('passport')

exports.getLoginPage = function(req, res){
    //TODO return login page here
    res.send('login page will be here')
}

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

exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};