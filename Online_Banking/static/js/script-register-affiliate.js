/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

var errors = true;
var path = window.location.href.split('/');

$(document).ready(function (){
    var regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,3})$/i;
    var regexLetters = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s ]*$/;
    var a = '#bank';
    var b = '#num-acc';
    var c = '#name';
    var d = '#ci';
    var e = '#nickname';
    var f = '#email';
    var g = '#email-confirm';

    $(a).focusout(function () {
        if ($(a).val() === '0') {
            notification_error('Seleccione un banco de la lista.');
            $(a).addClass('errors');
            errors = false;
        }
    });

    $(b).focusout(function () {
        if (isNaN($(b).val())) {
            notification_error('Solo se admiten números en el número de cuenta.');
            $(b).addClass('errors');
            errors = false;
        }
        else {
            if ($(b).val().length < 20) {
                notification_error('El número de cuenta debe contener 20 dígitos.');
                $(b).addClass('errors');
                errors = false;
            }
        }
    });

    $(c).focusout(function () {
        if ($(c).val()  === ''){
            notification_error('El nombre del afiliado no puede estar vacío.');
            $(c).addClass('errors');
            errors = false;
        }
        else if (!($(c).val().match(regexLetters))){
            notification_error('El nombre del afiliado solo admite letras.');
            $(c).addClass('errors');
            errors = false;
        }
        else if ($.trim($(c).val()).split(' ').length < 2) {
            notification_error('El nombre del afiliado debe incluir al menos un nombre y un apellido.');
            $(c).addClass('errors');
            errors = false;
        }
    });

    $(d).focusout(function () {
        if (isNaN($(d).val())) {
            notification_error('Solo se admiten números en el documento de identidad.');
            $(d).addClass('errors');
            errors = false;
        }
        else{
            if ($('#select-ci').val().includes('V') || $('#select-ci').val().includes('E')) {
                if ($(d).val().length < 7) {
                    notification_error('El documento de identidad debe contener mínimo 7 dígitos.');
                    $(d).addClass('errors');
                    errors = false;
                }
            }
            else {
                if ($(d).val().length < 9) {
                    notification_error('El documento de identidad debe contener 9 dígitos.');
                    $(d).addClass('errors');
                    errors = false;
                }
            }
        }
    });

    $(e).focusout(function () {
        if ($(e).val()  === ''){
            notification_error('El alias no puede estar vacío.');
            $(e).addClass('errors');
            errors = false;
        }
        else if (!($(e).val().match(regexLetters))){
            notification_error('El alias solo admite letras.');
            $(e).addClass('errors');
            errors = false;
        }
    });

    $(f).focusout(function () {
        if ($(f).val()  === ''){
            notification_error('El email no puede estar vacío.');
            $(f).addClass('errors');
            errors = false;
        }
        else if (!($(f).val().match(regexEmail))) {
            notification_error('Ingrese un email válido.');
            $(f).addClass('errors');
            errors = false;
        }
    });

    $(g).focusout(function () {
        if ($(f).val() !== $(g).val()) {
            notification_error('La confirmación debe ser igual al email.');
            $(g).addClass('errors');
            errors = false;
        }
    });

    $('li').removeClass("active");

    $(d).attr({maxlength:"8"});

    $(a).change(function () {
        $.getJSON('../static/js/bank.json', function (data) {
            $.each( data, function( key, val ) {
                if ($(a).val() === val.codigo) {
                    $(b).val(val.codigo);
                }
            });
        });
    });

    $("#select-ci").change(function () {
        if ($("#select-ci").val() === "V-" || $("#select-ci").val() === "E-") {
            $(d).val("");
            $(d).attr({maxlength:"8"});
        }
        else {
            $(d).val("");
            $(d).attr({maxlength:"9"});
        }
    });

    $(a).click(function () {
        $(a).removeClass('errors');
        errors = true;
    });

    $(b).click(function () {
        $(b).removeClass('errors');
        errors = true;
    });

    $(c).click(function () {
        $(c).removeClass('errors');
        errors = true;
    });

    $(d).click(function () {
        $(d).removeClass('errors');
        errors = true;
    });

    $(e).click(function () {
        $(e).removeClass('errors');
        errors = true;
    });

    $(f).click(function () {
        $(f).removeClass('errors');
        errors = true;
    });

    $(g).click(function () {
        $(g).removeClass('errors');
        errors = true;
    });

});


function drop_bank(a){
    var url = document.referrer.split('/');
    if (a === ''){
        $("#bank").append('<option selected value="'+'0'+'"> '+'Seleccione '+'</option>');
    }
    $.getJSON('../static/js/bank.json', function (data) {
        $.each( data, function( key, val ) {
            if (a === val.banco){
                $("#bank").append('<option selected value="'+val.codigo+'"> '+val.banco+'</option>');
            }
            if(url[4] === 'transf-otros-bancos' && !(val.banco.includes('ACTIO'))) {
                $("#bank").append('<option value="'+val.codigo+'"> '+val.banco+'</option>');
            }
            if(url[4] === 'pagos'){
                $("#bank").append('<option value="'+val.codigo+'"> '+val.banco+'</option>');
            }
        });
    })
}

function validate_affiliates(a,b,c,d,e,f,g) {
    if ($(a).val() === '0') {
        $(a).addClass('errors');
    }
    if ($(b).val().length < 20) {
        $(b).addClass('errors');
    }
    if ($(c).val() === '') {
        $(c).addClass('errors');
    }
    if ($(d).val() === '') {
        $(d).addClass('errors');
    }
    if ($(e).val() === '') {
        $(e).addClass('errors');
    }
    if ($(f).val() === '') {
        $(f).addClass('errors');
    }
    if ($(g).val() === '') {
        $(g).addClass('errors');
    }
}

function add_affiliate(a,b,c,d,e,f,g,h) {
    if (!(errors) || $(a).val() === '0' || $(b).val().length < 20 || $(c).val() === '' || $(e).val() === '' ||
        $(f).val() === '' || $(g).val() === ''  || $(h).val() === '') {
        validate_affiliates(a,b,c,e,f,g,h);
        notification_error('El registro del afiliado presenta errores. Verifique los campos en rojo.');
    }
    else {
        var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/register-affiliate/";
        notification_success('Registrando afiliado.....');
        setTimeout(function(){
            if ($(a).val() !== '0180'){
                $.ajax({
                    url: url,
                    origin: 'http://127.0.0.1:8000',
                    headers: {'X-CSRFToken': getCookie('csrftoken')},
                    data: {
                        bank: document.getElementById('bank').options[document.getElementById('bank').selectedIndex].text,
                        num: $(b).val(),
                        name: $(c).val(),
                        ci: $(d).val()+$(e).val(),
                        nick: $.trim($(f).val()),
                        email: $(g).val()
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            notification_success('Registro de afiliado exitoso.');
                            setTimeout(function(){
                                location.href= document.referrer;
                            }, 3000);
                        }
                        else{
                            if (data.my_acc){
                                notification_error('Registro fallido, no es necesario registrar sus cuentas ' +
                                    'con Actio Capital. Puede transferirse entre sus cuentas desde la opción del menú ' +
                                    'Transferencias-Mis Cuentas');
                                $(e).addClass('errors');
                            }
                            if (data.nick_exist){
                                notification_error('El alias escogido ya existe ingrese uno diferente.');
                                $(f).addClass('errors');
                            }
                            if (data.exist){
                                notification_error('Registro fallido, el número de cuenta ya está afiliado.');
                                $(b).addClass('errors');
                            }
                        }
                    }
                })
            }
            else{
                var url_api = path[0] + "/" + path[1] + "/" + "localhost:8001/ajax/exist-account/";
                $.ajax({
                    url: url_api,
                    origin: 'localhost:8000',
                    headers: {'X-CSRFToken': getCookie('csrftoken')},
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        ci: $(d).val()+$(e).val(),
                        acc: $(b).val()
                    },
                    success: function (data) {
                        if (data.exist){
                            $.ajax({
                                url: url,
                                origin: 'http://127.0.0.1:8000',
                                headers: {'X-CSRFToken': getCookie('csrftoken')},
                                data: {
                                    bank: document.getElementById('bank').options[document.getElementById('bank').selectedIndex].text,
                                    num: $(b).val(),
                                    name: $(c).val(),
                                    ci: $(d).val()+$(e).val(),
                                    nick: $.trim($(f).val()),
                                    email: $(g).val()
                                },
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    if (data.success) {
                                        notification_success('Registro de afiliado exitoso.');
                                        setTimeout(function(){
                                            location.href= document.referrer;
                                        }, 3000);
                                    }
                                    else{
                                        if (data.my_acc){
                                            notification_error('Registro fallido, no es necesario registrar sus cuentas ' +
                                                'con Actio Capital. Puede transferirse entre sus cuentas desde la opción del menú ' +
                                                'Transferencias-Mis Cuentas');
                                            $(e).addClass('errors');
                                        }
                                        if (data.nick_exist){
                                            notification_error('El alias escogido ya existe ingrese uno diferente.');
                                            $(f).addClass('errors');
                                        }
                                        if (data.exist){
                                            notification_error('Registro fallido, el número de cuenta ya está afiliado.');
                                            $(b).addClass('errors');
                                        }
                                    }
                                }
                            })
                        }
                        else {
                            if (data.ident){
                                notification_error('El documento de identidad no pertenece a un cliente de Actio Capital.');
                                $(e).addClass('errors');
                            }
                            else if (data.acc){
                                notification_error('El número de cuenta no pertenece a un cliente de Actio Capital.');
                                $(b).addClass('errors');
                            }
                            else if (data.customer){
                                notification_error('El número de cuenta no pertenece al documento de identidad que quiere afiliar.');
                                $(e).addClass('errors');
                                $(b).addClass('errors');
                            }

                        }
                    }
                });
            }

        }, 3000);
    }
}

function modify_affiliate(a,b,c,d,e,f,g,h) {
    if (!(errors) || $(a).val() === '0' || $(b).val().length < 20 || $(c).val() === '' || $(e).val() === '' ||
        $(f).val() === '' || $(g).val() === ''  || $(h).val() === '') {
        validate_affiliates(a,b,c,e,f,g,h);
        notification_error('Lla modificación del afiliado presenta errores. Verifique los campos en rojo.');
    }
    else {
        var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/register-affiliate/";
        var back = document.referrer;
        notification_success('Modificando afiliado.....');
        setTimeout(function(){
            if ($(a).val() !== '0180'){
                $.ajax({
                    url: url,
                    origin: 'http://127.0.0.1:8000',
                    headers: {'X-CSRFToken': getCookie('csrftoken')},
                    data: {
                        bank: document.getElementById('bank').options[document.getElementById('bank').selectedIndex].text,
                        num: $(b).val(),
                        name: $(c).val(),
                        ci: $(d).val() + $(e).val(),
                        nick: $(f).val(),
                        email: $(g).val(),
                        option: path[4]
                    },
                    type: 'GET',
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            notification_success('Modificación de afiliado exitoso.');
                            setTimeout(function () {
                                location.href = back;
                            }, 3000);
                        }
                        else {
                            if (data.my_acc) {
                                notification_error('Registro fallido, no es necesario registrar sus cuentas ' +
                                    'con Actio Capital. Puede transferirse entre sus cuentas desde la opción del menú ' +
                                    'Transferencias-Mis Cuentas');
                                $(e).addClass('errors');
                            }
                            if (data.nick_exist) {
                                notification_error('El alias escogido ya existe ingrese uno diferente.');
                                $(f).addClass('errors');
                            }
                            if (data.exist) {
                                notification_error('Modificación fallida, el número de cuenta ya ' +
                                    'está registrado a otro afiliado.');
                                $(b).addClass('errors');
                            }
                        }
                    }
                })
            }
            else {
                var url_api = path[0] + "/" + path[1] + "/" + "localhost:8001/ajax/exist-account/";
                $.ajax({
                    url: url_api,
                    origin: 'localhost:8000',
                    headers: {'X-CSRFToken': getCookie('csrftoken')},
                    type: 'GET',
                    dataType: 'json',
                    data: {
                        ci: $(d).val() + $(e).val(),
                        acc: $(b).val()
                    },
                    success: function (data) {
                        if (data.exist) {
                            $.ajax({
                                url: url,
                                origin: 'http://127.0.0.1:8000',
                                headers: {'X-CSRFToken': getCookie('csrftoken')},
                                data: {
                                    bank: document.getElementById('bank').options[document.getElementById('bank').selectedIndex].text,
                                    num: $(b).val(),
                                    name: $(c).val(),
                                    ci: $(d).val() + $(e).val(),
                                    nick: $(f).val(),
                                    email: $(g).val(),
                                    option: path[4]
                                },
                                type: 'GET',
                                dataType: 'json',
                                success: function (data) {
                                    if (data.success) {
                                        notification_success('Modificación de afiliado exitoso.');
                                        setTimeout(function () {
                                            location.href = back;
                                        }, 3000);
                                    }
                                    else {
                                        if (data.my_acc) {
                                            notification_error('Registro fallido, no es necesario registrar sus cuentas ' +
                                                'con Actio Capital. Puede transferirse entre sus cuentas desde la opción del menú ' +
                                                'Transferencias-Mis Cuentas');
                                            $(e).addClass('errors');
                                        }
                                        if (data.nick_exist) {
                                            notification_error('El alias escogido ya existe ingrese uno diferente.');
                                            $(f).addClass('errors');
                                        }
                                        if (data.exist) {
                                            notification_error('Modificación fallida, el número de cuenta ya ' +
                                                'está registrado a otro afiliado.');
                                            $(b).addClass('errors');
                                        }
                                    }
                                }
                            })
                        }
                        else {
                            if (data.ident) {
                                notification_error('El documento de identidad no pertenece a un cliente de Actio Capital.');
                                $(e).addClass('errors');
                            }
                            else if (data.acc) {
                                notification_error('El número de cuenta no pertenece a un cliente de Actio Capital.');
                                $(b).addClass('errors');
                            }
                            else if (data.customer) {
                                notification_error('El número de cuenta no pertenece al documento de identidad que quiere afiliar.');
                                $(e).addClass('errors');
                                $(b).addClass('errors');
                            }

                        }
                    }
                })
            }
        }, 3000);
    }
}

