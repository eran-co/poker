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
            this.collection = options.collection;
            this.user = options.user;
            this.render();
        },
        events:{
            'click .button.join-table': 'joinTable',
            'click .log-out': 'logOut'
        },

        render: function(){
            var template = Handlebars.compile(templateSource);
            var html    = template(this.collection.toJSON());
            this.$el.empty().html(html);
            $('.user-name').text(this.user.username);

        },
        joinTable: function(event){
            //TODO check if user is allowed to join the table
            // TODO actually join the table
            var gameId = $(event.currentTarget).data('gameId');
            window.location.href= '#table/' + gameId;
        },

        logOut: function(){
            $.get('/logout', function(data){
                window.location.href = '/';
            });

        }
    });
    return tablesView;
});
