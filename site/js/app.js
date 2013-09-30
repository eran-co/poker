
define([
    'jquery',
    'models/table',
    'views/table'
    ], function( $, TableModel, TableView ){
    var app = {
        init: function(){
            console.log('app init, fetching table data');
            $.getJSON('/table', function(data){
                console.log('table data received, creating view');
                var tableModel = new TableModel(data);
                var tableView = new TableView( {model:tableModel} );
            });
        }
    };

    return app;
})
