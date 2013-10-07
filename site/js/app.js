define([
    'jquery',
    'router',
    'models/table',
    'collections/tables',
    'views/tables',
    'views/tables',
    'socketio'
    ], function( $, Router, TableModel, TableCollection, TableView, TablesView, io ){
    var app = {
        init: function(){
            console.log('app init, fetching table data');

//            // init socket.io
//            var socket = io.connect('http://localhost');
//            socket.on('news', function (data) {
//                console.log(data);
//                socket.emit('my other event', { my: 'data' });
//            });
//
//            socket.on('reset', function(data){
//                console.log('receive message from other client' + data);
//            });
//
//            window.socket = socket;
//            $.getJSON('/api/tables/lala', function(data){
//                console.log('table data received, creating view');
//                var tableModel = new TableModel(data);
//                var tableView = new TableView( {model:tableModel} );
//                window.table = tableView;
//            });
            var router = new Router();
            Backbone.history.start();

//            var collection = new TableCollection();
//            collection.fetch({
//                success:function (){
//                    var tablesView = new TablesView( {collection: collection} );
//            }});


        }
    };

    return app;
});
