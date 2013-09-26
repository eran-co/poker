
define(['views/table'], function(table){
    var app = {
        init: function(){
            console.log('app init');
            new table();
        }
    };

    return app;
})
