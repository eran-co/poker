var Table = require('../models/table').TableModel;

exports.getTables = function(req, res){
    Table.find(function (err, tables) {
        res.send(tables);
    });
};

exports.getTablesData = function(callback){
    Table.find(function (err, tables) {
        callback(tables);
    });
};

exports.getTable = function(req, res){
    var id = req.params.id;
    if (id){
        console.log('return table by id here');
    };
    //TODO return table by id
    Table.findOne({bet:30}, function (err, table) {
        res.send(table);
    });
};