define([
    'backbone',
    'models/table'
], function(Backbone, TableModel){
    var tablesCollection = Backbone.Collection.extend({
        model: TableModel,
        url: '/api/tables'
    });
    return tablesCollection;
});
