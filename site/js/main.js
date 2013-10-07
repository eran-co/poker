require.config({
    baseUrl:'js',
    paths: {
        jquery: 'lib/jquery',
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        rivets: 'lib/rivets',
        handlebars: 'lib/handlebars',
        text: 'lib/text',
        socketio: 'lib/socket.io'
    },
    shim: {
        'socketio': {
            exports: 'io'
        },
        backbone: {
            'deps': ['jquery', 'underscore'],
            'exports': 'Backbone'
        },
        underscore: {
            'exports': '_'
        },
        'handlebars': {
                exports: 'Handlebars'
            }
    }
});

require(['app'], function(app){
    app.init();
});
