define([
    'jquery',
    'models/table',
    'views/table',
    'socketio'
    ], function( $, TableModel, TableView, io ){
    var app = {
        init: function(){
            console.log('app init, fetching table data');

            // init socket.io
            var socket = io.connect('http://localhost');
            socket.on('news', function (data) {
                console.log(data);
                socket.emit('my other event', { my: 'data' });
            });

            $.getJSON('/table', function(data){
                console.log('table data received, creating view');
                var tableModel = new TableModel(data);
                var tableView = new TableView( {model:tableModel} );
            });
        }
    };

    return app;
})
