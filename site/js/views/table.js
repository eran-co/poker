define([
    'jquery',
    'underscore',
    'backbone',
    'text!views/templates/table.html'
], function($, _, Backbone, template){
    var tableView = Backbone.View.extend({
        el: '#table',

        initialize: function(options){
            this.render();
        },

        render: function(){
            this.$el.html(template);
        }
    });
    return tableView;
});
