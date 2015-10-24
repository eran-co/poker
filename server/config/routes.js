var user = require('../controllers/users'),
    table = require('../controllers/tables'),
    game = require('../controllers/game'),
    pass = require('../config/pass');

module.exports = function (app){

    // main
    app.get('/',  pass.ensureAuthenticated, function(req, res){
        table.getTablesData(function(tablesData) {
            res.render('tables', {
                tables: tablesData,
                userName: req.user.toJSON().username
            });
        });

        //res.sendfile('site/app.html');
    });

    // login and registration
    app.get('/login', user.getLoginPage);

    app.post('/login', user.login, function(res, req){
        res.send('login successful');
    });
    
    app.get('/fastlogin', function (req, res, next) {
        req.body.username = req.query.user;
        req.body.password = req.query.pass;
        next();
        },  user.login, function(req, res){
        res.redirect('/index');  
    });

    app.post('/register', user.register);

    app.get('/user', pass.ensureAuthenticated, user.getUser);

    app.get('/logout', pass.ensureAuthenticated, user.logout);

    // API
    app.get('/api', pass.ensureAuthenticated, function(req, res){
        res.send('working!');
    });
    
    // table routes
    app.get('/api/tables', pass.ensureAuthenticated, table.getTables);

    app.get('/api/tables/:id', pass.ensureAuthenticated, table.getTable);

    app.get('/game/:id', pass.ensureAuthenticated, game.getGame );
};