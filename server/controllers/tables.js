var Table = require('../models/table').TableModel;

exports.getTable = function(req, res){
    Table.findOne({bet:30}, function (err, table) {
        res.send(table);
    });
};