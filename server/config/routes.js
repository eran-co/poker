var users = require('../controllers/users')
  , tables = require('../controllers/tables'),
    pass = require('../config/pass');

module.exports = function (app){

    // main
    app.get('/',  pass.ensureAuthenticated, function(req, res){
        res.sendfile('site/index-static.html');
    });

    // login and registration
    app.get('/login', users.getLoginPage);

    app.post('/login', users.login, function(res, req){
        res.send('login successful');
    });

    app.get('/logout', users.logout);

    // API
    app.get('/api', pass.ensureAuthenticated, function(req, res){
        res.send('working!');
    });
    
    // table routes
    app.get('/api/tables', pass.ensureAuthenticated, tables.getTables);

    app.get('/api/tables/:id', pass.ensureAuthenticated, tables.getTable);
};