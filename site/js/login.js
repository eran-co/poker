$( document).ready(function(){

    $('.login').click(function(){
        var username = $('input[name="username"]').val();
        var pass = $('input[name="password"]').val();
        if (username && pass){
            $.post('/login', {username:username, password:pass }, function(data){
                if (data.res){
                    window.location.href = '/';
                }
                else{
                    $('.login-warning').show();
                }
            });
        }

    });

    $('.button.register').click(function(){
        var username = $('input[name="register-username"]').val();
        var pass = $('input[name="register-password"]').val();
        if (username && pass){
            $.post('/register', {username:username, password:pass }, function(data){
                if (data.res){
                    $('.register.form') .dimmer('toggle');
                }
                else{
                    $('.register-warning .message').text(data.message);
                    $('.register-warning').show();
                }
            });
        }
    })

});
