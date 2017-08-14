/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){
    menu();

    $("#show-hide-passwd").click(function(e){
        e.preventDefault();
        var current = $(this).attr('action');

        if (current == 'hide'){
            $("#password").attr({type: 'text'});
            $(this).removeClass('fa-eye-slash').addClass('fa-eye').attr('action','show');
        }
        if (current == 'show'){
            $("#password").attr({type: 'password'});
            $(this).removeClass('fa-eye').addClass('fa-eye-slash').attr('action','hide');
        }
    });

});

function change_input(a,b,c,d,e) {
    $("#email_user").val(a);
    $("#quest1").val(b);
    $("#answ1").val(c);
    $("#quest2").val(d);
    $("#answ2").val(e);
}

function modify_profile() {
    var q1 = $('#quest1');
    var q2 = $('#quest2');
    var a1 = $('#answ1');
    var a2 = $('#answ2');
    var password = $('#password');
    var confirm = $('#confirm-pass');
    var email = $('#email_user');

    if (!(q1.hasClass('errors') || a1.hasClass('errors') || q2.hasClass('errors') ||
            a2.hasClass('errors') || password.hasClass('errors') ||
            confirm.hasClass('errors') || email.hasClass('errors'))) {
        var path = window.location.href.split('/');
        var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/modify-profile/";

        $.ajax({
            url: url,
            origin: 'localhost:8000',
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                q1: $('#quest1').val(),
                q2: $('#quest2').val(),
                a1: $('#answ1').val(),
                a2: $('#answ2').val(),
                password: $('#password').val(),
                email: $('#email_user').val()
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.correct) {
                    if (data.password) {
                        notification_success('Sus datos han sigo guardados exitosamente. ' +
                            'Será redirijido al inicio para ingresar con su nueva contraseña.');
                        setTimeout(function(){
                            move('logout');
                        }, 3500);
                    }
                    else {
                        notification_success('Sus datos han sigo guardados exitosamente.');
                    }
                }
                else {
                    notification_error('Hubo un error, intente nuevamente guardar sus datos.');
                }
            }
        })

    }
}
