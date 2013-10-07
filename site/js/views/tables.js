define([
    'jquery',
    'underscore',
    'backbone',
    'handlebars',
    'text!views/templates/tables.html'
], function($, _, Backbone, handlebars, templateSource){
    var tablesView = Backbone.View.extend({
        el: '#table',

        initialize: function(options){
            this.render();
            this.collection = options.collection;
        },
        events:{
            'click .button.join-table': 'joinTable'
        },

        render: function(){
            var template = Handlebars.compile(templateSource);
            var html    = template(this.collection.toJSON());
            this.$el.empty().html(html);

        },
        joinTable: function(event){
            //TODO check if user is allowed to join the table
            // TODO actually join the table
            var gameId = $(event.currentTarget).data('gameId');
            window.location.href= '#table/' + gameId;
        }
    });
    return tablesView;
});
