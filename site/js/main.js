require.config({
    baseUrl:'js',
    paths: {
        jquery: 'lib/jquery',
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        rivets: 'lib/rivets',
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
        }
    }
});

require(['app'], function(app){
    app.init();
});
