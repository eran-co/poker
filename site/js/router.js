

define(['jquery', 'backbone','models/game', 'views/tables', 'views/table', 'collections/tables'], function($, Backbone, GameModel, TablesView, TableView, TableCollection){
    var Router = Backbone.Router.extend({

        initialize: function(options){
            var self = this;
            this.user = options.user;
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
            var user = this.user;
            tablesCollection.fetch({
                success:function (){
                    var tablesView = new TablesView( {collection: tablesCollection, user:user} );
                }});
        },
        joinTable: function(id){
            console.log('joinTable called ' + id);
            var user = this.user;
            $.get('/api/game/' + id, function(data){
                var gameModel = new GameModel(data);
                var tableView = new TableView( {model:gameModel, user:user} );
            })
        }
    });
    return Router;
});