/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){
    $('#resp_seg').click(function () {
        $('#resp_seg').removeClass('errors');
    });

    $('#input_frs_coor').click(function () {
        $('#input_frs_coor').removeClass('errors');
    });

    $('#input_snd_coor').click(function () {
        $('#input_snd_coor').removeClass('errors');
    })

});

function move_back_security() {
    var url = document.referrer.split('/');

    if (url[3] === 'consultar-cuenta' || url[3] === 'solicitudes' ) {
        window.history.back();
    }
    else {
        url = window.location.href.split('/');
        var new_url = url[0]+'/'+url[1]+'/'+url[2]+'/'+'inicio';
        location.href= new_url;
    }
}

function move_security(id_body,id_sec) {
    $(id_sec).css({display:'none'});
    $(id_body).css({display:'block'});
}

function validate_elem(a,b,c) {
    var result = true;

    if ($(a).val() === '') {
        $(a).addClass('errors');
        notification_error('La respuesta de la pregunta de seguridad no puede estar vacía.');
        result = false;
    }
    else if (($(b).val() === '') || ($(c).val() === '')) {
        if ($(b).val() === ''){
            $(b).addClass('errors');
        }
        else{
            $(c).addClass('errors');
        }
        notification_error('Las coordenadas de seguridad no pueden estar vacías.');
        result = false;
    }
    else if ($(b).val().length < 3) {
        $(b).addClass('errors');
        notification_error('La coordenada debe tener una longitud de 3 dígitos.');
        result = false;
    }
    else if ($(c).val().length < 3) {
        $(c).addClass('errors');
        notification_error('La coordenada debe tener una longitud de 3 dígitos.');
        result = false;
    }

    return result;

}

function elem_Security(a,b,c,d,e) {
    var validate = validate_elem(a,b,c);
    if (validate) {
        var path = window.location.href.split('/');
        var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/validate-elems-seguridad/";
        alert(url);
        $.ajax({
            url: url,
            origin: 'localhost:8000',
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                f_coord_val: $(b).val(),
                s_coord_val: $(c).val(),
                answer: $(a).val(),
                question: $('#question').text(),
                question: $('#question').text(),
                question: $('#question').text()
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.user_exists){
                    move_security(d,e);
                }
            },
            error: function (data) {
                alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
            }
        })
    }
    else{

    }

}