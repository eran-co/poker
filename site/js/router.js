

define(['jquery', 'backbone', 'views/tables', 'views/table', 'collections/tables'], function($, Backbone, TablesView, TableView, TableCollection){
    var Router = Backbone.Router.extend({

        initialize: function(){
            var self = this;
            $( document ).ajaxError(function(event, jqxhr, settings, exception) {
                console.log('ajax error called on router:' + exception);

                // TODO: only redirect 401 not authorized errors
                // TODO: pass router info to be able to send the user back after login
                if (jqxhr.status == '401'){
                    self.navigate('/login', { trigger: true });
                }

            });
        },
        routes:{
            "" : "index",
            "table/:id" : "joinTable"
        },

        index: function(){
            console.log("index called");
            var tablesCollection = new TableCollection();
            tablesCollection.fetch({
                success:function (){
                    var tablesView = new TablesView( {collection: tablesCollection} );
                }});
        },
        joinTable: function(id){
            console.log('joinTable called ' + id);
        }
    });
    return Router;
});