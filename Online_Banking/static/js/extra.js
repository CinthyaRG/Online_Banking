    var regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,3})$/i;
    var regexLetters = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s ]*$/;
    var a = '#num_service';
    var b = '#ident';
    var c = '#name';
    var d = '#email';
    var e = '#nickname';
    var f = '#num-tlf';
    var len = document.getElementById("id_username").maxLength;


    $(a).focusout(function () {
        if (isNaN($(a).val())) {
            notification_error('Solo se admiten números en el número de cuenta.');
            $(a).addClass('errors');
            errors = false;
        }
        else {
            if ($(a).val().length < 20) {
                notification_error('El número de cuenta debe contener 20 dígitos.');
                $(b).addClass('errors');
                errors = false;
            }
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
        else if ($.trim($(c).val()).split(' ')< 2) {
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
                if ($(d).val().length < 8) {
                    notification_error('El documento de identidad debe contener 8 dígitos.');
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

