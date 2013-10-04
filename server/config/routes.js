var users = require('../controllers/users')
  , tables = require('../controllers/tables');

module.exports = function (app){
    
    // API
    app.get('/api', function(req, res){
        res.send('working!');
    });
    
    // table routes
    app.get('/api/table', tables.getTable);
};