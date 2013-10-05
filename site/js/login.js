$( document).ready(function(){

    $('.login').click(function(){
        var uname = $('input[name="username"]').val();
        var pass = $('input[name="password"]').val();
        if (uname && pass){
            $.post('/login', {username:uname, password:pass }, function(data){
                if (data.res){
                    window.location.href = '/';
                }
            });
        }

    });

    $('.register').click(function(){
        alert('not implemented yet');
    })

});
