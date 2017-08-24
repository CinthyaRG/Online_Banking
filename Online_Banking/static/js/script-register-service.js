/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

var errors = true;
var path = window.location.href.split('/');
var a = '#num_service';
var b = '#ident';
var c = '#name';
var d = '#email';
var e = '#nickname';
var f = '#num-tlf';

$(document).ready(function (){

    drop_type();
    $(e).val('');

    $('li').removeClass("active");
    $("#dl-nick").css({visibility:'hidden'});

    $("#type_payment").click(function(){
        drop_type_payment();
        $("#dl-nick").css({visibility:'hidden'});
    });

    $("#type_payment").change(function(){
        $("#input-services").empty();
        $("#name_service").empty();
        drop_type_payment();
        $("#dl-nick").css({visibility:'hidden'});
        $(a).removeClass('errors');
        $(b).removeClass('errors');
        $(c).removeClass('errors');
        $(d).removeClass('errors');
        $(e).removeClass('errors');
        $(f).removeClass('errors');
        $('#codes').removeClass('errors');
        $("#type_payment").removeClass('errors');
        errors = true;
    });

    $("#name_service").change(function () {
        $("#dl-nick").css({visibility:'hidden'});
        drop_name();
        $(a).removeClass('errors');
        $(b).removeClass('errors');
        $(c).removeClass('errors');
        $(d).removeClass('errors');
        $(e).removeClass('errors');
        $(f).removeClass('errors');
        $('#codes').removeClass('errors');
        $("#name_service").removeClass('errors');
        errors = true;

    });

});


function accions() {
    var regexEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,3})$/i;
    var regexLetters = /^[a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ\s ]*$/;
    var option = $("#name_service").val();

    $(a).change(function () {
        var name = name_service(option);

        if (isNaN($(a).val())) {
            notification_error('Solo se admiten números en el '+ name + '.');
            $(a).addClass('errors');
            errors = false;
        }
        else {
            var len = parseInt($(a).attr('maxlength'));
            if ($(a).val().length < len) {
                notification_error('El '+name+' debe contener '+$(a).attr('maxlength')+' dígitos.');
                $(a).addClass('errors');
                errors = false;
            }
        }
    });

    $(b).change(function () {
        var len = parseInt($(b).attr('maxlength'));
        var name;
        if (len === 9) {
            name = 'rif del beneficiario'
        }
        else if (len === 8){
            name = 'documento de identidad'
        }
        if (isNaN($(b).val())) {
            notification_error('Solo se admiten números en el '+ name + '.');
            $(b).addClass('errors');
            errors = false;
        }
        else {
            if (len === 9) {
                if ($(b).val().length < len){
                    notification_error('El '+name+' debe contener '+$(b).attr('maxlength')+' dígitos.');
                    $(b).addClass('errors');
                    errors = false;
                }
            }
            else if (len === 8){
                if ($(b).val().length < 7) {
                    notification_error('El '+name+' del beneficiario debe contener mínimo 7 dígitos.');
                    $(b).addClass('errors');
                    errors = false;
                }
            }
        }
    });

    $(c).change(function () {
        if ($(c).val()  === ''){
            notification_error('El nombre del titular no puede estar vacío.');
            $(c).addClass('errors');
            errors = false;
        }
        else if (!($(c).val().match(regexLetters))){
            notification_error('El nombre del titular solo admite letras.');
            $(c).addClass('errors');
            errors = false;
        }
        else if ($.trim($(c).val()).split(' ').length < 2) {
            notification_error('El nombre del titular debe incluir al menos un nombre y un apellido.');
            $(c).addClass('errors');
            errors = false;
        }
    });

    $(d).change(function () {
        if (!($(d).val().match(regexEmail))) {
            notification_error('Ingrese un email válido.');
            $(d).addClass('errors');
            errors = false;
        }
    });

    $(e).change(function () {
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

    $(f).change(function () {
        var name = name_service(option);

        if (isNaN($(f).val())) {
            notification_error('Solo se admiten números en el '+ name + '.');
            $(f).addClass('errors');
            errors = false;
        }
        else {
            var len = parseInt($(f).attr('maxlength'));
            if ($(f).val().length < len) {
                notification_error('El '+name+' debe contener '+$(f).attr('maxlength')+' dígitos.');
                $(f).addClass('errors');
                errors = false;
            }
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

    $("#codes").click(function () {
        $("#codes").removeClass('errors');
        errors = true;
    });
}


function drop_bank(){
    $("#bank").append('<option value="'+'0'+'"> '+'Seleccione '+'</option>');
    $.getJSON('../static/js/bank.json', function (data) {
        $.each( data, function( key, val ) {
            $("#bank").append('<option value="'+val.codigo+'"> '+val.banco+'</option>');
        });
    })
}


function name_service(a) {
    var name = '';
    if (a === 'Banavih Aportes FAOV') {
        name = 'número de afiliación';
    }
    else if (a === 'Electricidad de Caracas'){
        name = 'número de contrato';
    }
    else if (a === 'DirecTV Previo Pago'){
        name = 'número de suscripción';
    }
    else if (a === 'DirecTV Prepago'){
        name = 'número de smartcard';
    }
    else if (a.includes('TDC')){
        name = 'número de tarjeta';
    }
    else if (a === 'CANTV' || a === 'Digitel' || a === 'Movistar' || a === 'Movilnet'){
        name = 'número de teléfono';
    }

    return name

}


function drop_codes(valor,select){
    alert(valor);
    $("#codes").empty();
    $("#codes").append('<option value="'+'0'+'"> '+'Seleccione '+'</option>');
    $.getJSON('../static/js/codes.json', function (data) {
        $.each( data, function( key, val ) {
            if (valor === key) {
                val.sort();
                $.each( val, function( k, v ) {
                    if (select === v) {
                        $("#codes").append('<option selected value="' +v+ '"> ' +v+ '</option>');
                    }
                    else {
                        $("#codes").append('<option value="' +v+ '"> ' +v+ '</option>');
                    }
                })
            }
        });
    })
}


function drop_type(){
    var type_services = ['Servicio', 'TDC', 'Telefonía'];
    $("#type_payment").empty();

    $("#type_payment").append('<option value="'+'0'+'" selected> '+"Seleccione"+'</option>');

    $.each(type_services,function (i,val) {
        $("#type_payment").append('<option value="'+val+'"> '+val+'</option>');
    })
}


function drop_type_payment() {
    var valor = $("#type_payment").val();
    var type_name_services = ['Banavih Aportes FAOV', 'Electricidad de Caracas', 'DirecTV Previo Pago',
        'DirecTV Prepago', 'Pago de Impuestos Nacionales Propios','Pago de Impuestos Nacionales Terceros'];
    var type_name_tdc = ['TDC de Terceros mismo banco', 'TDC de Terceros otros bancos'];
    var type_name_tlf = ['CANTV', 'Digitel', 'Movilnet', 'Movistar'];
    var _this = $("#name_service");
    var type_name;

    _this.empty();
    _this.append('<option value="'+'0'+'" selected> '+"Seleccione"+'</option>');

    if (valor === 'Servicio') {
        type_name = type_name_services;
    }
    else if (valor === 'TDC') {
        type_name = type_name_tdc;
    }
    else if (valor === 'Telefonía') {
        type_name = type_name_tlf;
    }

    $.each(type_name,function (i,val) {
        _this.append('<option value="'+val+'"> '+val+'</option>');
    })
}


function drop_name() {
    var valor = $("#name_service").val();
    var _this = $("#input-services");
    var info_bank = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Banco: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<select id="bank" class="select2 input-register field-register"></select></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>Número de cuenta: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num-acc" maxlength="20" class="input-register"></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select id="rif" class="select2 input-register">'+
        '<option selected value="V-">V- </option>'+
        '<option value="J-">J- </option></select>'+
        '<input id="rif_info_bank" maxlength="9" class="input-register margin-register"></div></div>';

    _this.empty();
    $(e).val('');

    if (valor === 'Banavih Aportes FAOV') {
        field_banavih(_this);
    }
    else if (valor === 'Electricidad de Caracas') {
        field_electricidad(_this);
    }
    else if (valor === 'DirecTV Previo Pago' || valor === 'DirecTV Prepago') {
        field_directv(_this,valor);
    }
    else if (valor === 'Pago de Impuestos Nacionales Propios' ||
        valor=== 'Pago de Impuestos Nacionales Terceros') {
        field_impuestos(_this,valor);
    }
    else if (valor === 'TDC de Terceros mismo banco' ||
        valor === 'TDC de Terceros otros bancos') {
        field_tdc(_this,valor);
    }
    else {
        field_tlf(_this,valor);
    }

}


function field_banavih(_this) {
    var banavih = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de Afiliación: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_service" maxlength="20" class="input-register"></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF del Beneficiario: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select  id="rif" class="select2 input-register">'+
        '<option selected value="V-">V- </option>'+
        '<option value="J-">J- </option></select>'+
        '<input id="ident" maxlength="9" class="input-register margin-register"></div></div>';
    var field_payment = banavih;

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

    accions();

    $('#bank').unbind('change').bind('change', function (e){
        $.getJSON('../static/js/bank.json', function (data) {
            $.each(data, function (key, val) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });
}


function field_electricidad(_this) {
    var elec = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de Contrato: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_service" maxlength="13" class="input-register"></div></div>';
    var field_payment = elec;

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

    accions();

    $('#bank').unbind('change').bind('change', function (e){
        $.getJSON('../static/js/bank.json', function (data) {
            $.each(data, function (key, val) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });
}


function field_directv(_this,valor) {
    var directv_previo = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de Suscripción: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_service" maxlength="8" class="input-register"></div></div>';
    var directv_prepago = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de SmartCard: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_service" maxlength="12" class="input-register"></div></div>';
    var field_payment;

    if (valor === 'DirecTV Previo Pago') {
        field_payment = directv_previo;
    }
    else {
        field_payment = directv_prepago;
    }

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

    accions();

    $('#bank').unbind('change').bind('change', function (e){
        $.getJSON('../static/js/bank.json', function (data) {
            $.each(data, function (key, val) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });
}


function field_impuestos(_this,valor) {
    var owns = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF del Beneficiario: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select  id="rif" class="select2 input-register">'+
        '<option selected value="V-">V- </option>'+
        '<option value="J-">J- </option></select>'+
        '<input id="ident" maxlength="9" ' +
        'class="input-register margin-register"></div></div>';
    var others = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF del Beneficiario: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select  id="rif" class="select2 input-register">'+
        '<option selected value="V-">V- </option>'+
        '<option value="J-">J- </option></select>'+
        '<input id="ident" maxlength="9" ' +
        'class="input-register margin-register"></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        'Email: </label></div><div class="col-md-6 col-xs-5 rows">'+
        '<input id="email" class="input-register field-register"></div></div>';
    var field_payment;

    if (valor === 'Pago de Impuestos Nacionales Propios') {
        field_payment = owns;
    }
    else {
        field_payment = others;
    }

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

    accions();

    $('#bank').unbind('change').bind('change', function (e){
        $.getJSON('../static/js/bank.json', function (data) {
            $.each(data, function (key, val) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });
}


function field_tdc(_this,valor) {
    var my_bank = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de Tarjeta: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_service" maxlength="16" class="input-register"></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Nombre del Titular: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="name" class="input-register"></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>Documento de Identidad: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select  id="rif" class="select2 input-register">'+
        '<option selected value="V-">V- </option>'+
        '<option value="E-">E- </option></select>'+
        '<input id="ident" maxlength="8" class="input-register margin-register"></div></div>' +
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        'Email: </label></div><div class="col-md-6 col-xs-5 rows">'+
        '<input id="email" class="input-register field-register"></div></div>';
    var others_banks = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de Tarjeta: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_service" maxlength="16" class="input-register"></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Nombre del Titular: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="name" class="input-register"></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>Documento de Identidad: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select  id="rif" class="select2 input-register">'+
        '<option selected value="V-">V- </option>'+
        '<option value="E-">E- </option></select>'+
        '<input id="ident" maxlength="8" class="input-register margin-register"></div></div>'+
        '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        'Email: </label></div><div class="col-md-6 col-xs-5 rows">'+
        '<input id="email" class="input-register field-register"></div></div>';
    var field_payment;

    if (valor === 'TDC de Terceros mismo banco') {
        field_payment = my_bank;
    }
    else {
        field_payment = others_banks;
    }

    _this.append(field_payment);
    $("#dl-nick").css({visibility:'visible'});

    accions();

}


function field_tlf(_this,valor) {
    var fields = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>Número de Teléfono: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select id="codes" class="select2 input-register">'+
        '<input id="num-tlf" maxlength="7" class="input-register margin-register"></div></div>';

    _this.append(fields);
    $("#dl-nick").css({visibility:'visible'});
    drop_codes(valor);
    accions();

}


function validate_affiliates(a,b,c,d,e) {
    if ($(a).val() === '') {
        $(a).addClass('errors');
    }
    if ($(b).val() === '') {
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
}


function add_services() {
    var type_payment = $("#type_payment").val();
    var option = $("#name_service").val();
    var a = '#num_service';
    var b = '#ident';
    var c = '#name';
    var d = '#email';
    var e = '#nickname';
    var f = '#num-tlf';

    if (type_payment === '0') {
        notification_error('Escoja un tipo de servicio.');
        $("#type_payment").addClass('errors');
        errors = false;
    }
    else if (option ==='0') {
        notification_error('Escoja el nombre del servicio a afiliar.');
        $("#name_service").addClass('errors');
        errors = false;
    }
    else if ($("#codes").val() ==='0') {
        notification_error('Escoja el código de área del teléfono a afiliar.');
        $("#codes").addClass('errors');
        errors = false;
    }
    else if (!(errors) || $(a).val() === '' || $(b).val() === '' ||
        $(c).val() === '' || $(e).val() === '' || $(f).val() === '') {
        validate_affiliates(a,b,c,e,f);
        notification_error('El registro del servicio presenta errores. Verifique los campos en rojo.');
    }
    else {
        var numService;
        if (type_payment === 'Telefonía' ){
            numService = $("#codes").val()+ '-'+ $(f).val();
        }
        else if (option.includes('Impuestos')){
            numService = $("#rif").val()+ $(b).val();
        }
        else {
            numService = $(a).val();
        }
        var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/register-services/";
        notification_success('Registrando servicio.....');
        setTimeout(function(){
            $.ajax({
                url: url,
                origin: 'http://127.0.0.1:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                data: {
                    numService: numService,
                    ident: $("#rif").val()+ $(b).val(),
                    identServ: option,
                    name: $(c).val(),
                    email: $(d).val(),
                    nick: $.trim($(e).val())
                },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        notification_success('Registro de servicio exitoso.');
                        setTimeout(function(){
                            location.href= document.referrer;
                        }, 3000);
                    }
                    else{
                        if (data.nick_exist){
                            notification_error(data.error);
                            $(e).addClass('errors');
                        }
                        if (data.exist){
                            notification_error('Registro fallido ' + data.error);
                            if (type_payment === 'Telefonía' ){
                                $(f).addClass('errors');
                            }
                            else {
                                $(a).addClass('errors');
                            }
                        }
                    }
                }
            })
        }, 3000);
    }
}


function modify_services() {
    var type_payment = $("#type_payment").val();
    var option = $("#name_service").val();
    var a = '#num_service';
    var b = '#ident';
    var c = '#name';
    var d = '#email';
    var e = '#nickname';
    var f = '#num-tlf';

    if (type_payment === '0') {
        notification_error('Escoja un tipo de servicio.');
        $("#type_payment").addClass('errors');
        errors = false;
    }
    else if (option ==='0') {
        notification_error('Escoja el nombre del servicio a afiliar.');
        $("#name_service").addClass('errors');
        errors = false;
    }
    else if ($("#codes").val() ==='0') {
        notification_error('Escoja el código de área del teléfono a afiliar.');
        $("#codes").addClass('errors');
        errors = false;
    }
    else if (!(errors) || $(a).val() === '' || $(b).val() === '' ||
        $(c).val() === '' || $(e).val() === '' || $(f).val() === '') {
        validate_affiliates(a,b,c,e,f);
        notification_error('El registro del servicio presenta errores. Verifique los campos en rojo.');
    }
    else {
        var numService;
        if (type_payment === 'Telefonía' ){
            numService = $("#codes").val()+ '-'+ $(f).val();
        }
        else if (option.includes('Impuestos')){
            numService = $("#rif").val()+ $(b).val();
        }
        else {
            numService = $(a).val();
        }
        var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/register-services/";
        var back = document.referrer;
        notification_success('Modificando afiliado.....');
        setTimeout(function(){
            $.ajax({
                url: url,
                origin: 'http://127.0.0.1:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                data: {
                    numService: numService,
                    ident: $("#rif").val()+ $(b).val(),
                    identServ: option,
                    name: $(c).val(),
                    email: $(d).val(),
                    nick: $.trim($(e).val()),
                    option: path[4]
                },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.success) {
                        notification_success('Modificación de afiliado exitoso.');
                        setTimeout(function(){
                            location.href= back;
                        }, 3000);
                    }
                    else{
                        if (data.my_acc){
                            notification_error('Modificación fallida, '+ data.error);
                            $(a).addClass('errors');
                        }
                        if (data.nick_exist){
                            notification_error(data.error);
                            $(e).addClass('errors');
                        }
                        if (data.exist){
                            notification_error(data.error);
                            if (type_payment === 'Telefonía' ){
                                $(f).addClass('errors');
                            }
                            else {
                                $(a).addClass('errors');
                            }
                        }
                    }
                }
            })
        }, 3000);
    }
}