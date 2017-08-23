/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

var errors = true;
var path = window.location.href.split('/');

$(document).ready(function (){

    drop_type();

    $('li').removeClass("active");
    $("#dl-nick").css({visibility:'hidden'});

    $("#type_payment").change(function(){
        $("#input-services").empty();
        $("#dl-nick").css({visibility:'hidden'});
        drop_type_payment();
    });

    $("#name_service").change(function () {
        $("#dl-nick").css({visibility:'hidden'});
        drop_name();
    });



});


function drop_bank(){
    $("#bank").append('<option value="'+'0'+'"> '+'Seleccione '+'</option>');
    $.getJSON('../static/js/bank.json', function (data) {
      $.each( data, function( key, val ) {
          $("#bank").append('<option value="'+val.codigo+'"> '+val.banco+'</option>');
      });
    })
}


function name_service(a) {
    var type_name_services = ['', , '',
        'DirecTV Prepago', '','Pago de Impuestos Nacionales Terceros'];
    var type_name_tdc = ['TDC de Terceros mismo banco', 'TDC de Terceros otros bancos'];
    var type_name_tlf = ['CANTV', 'Digitel', 'Movilnet', 'Movistar'];
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

}


function drop_codes(valor){
    $("#codes").append('<option value="'+'0'+'"> '+'Seleccione '+'</option>');
    $.getJSON('../static/js/codes.json', function (data) {
        $.each( data, function( key, val ) {
            if (valor === key) {
                val.sort();
                $.each( val, function( k, v ) {
                    $("#codes").append('<option value="' +k+ '"> ' +v+ '</option>');
                })
            }
        });
    })
}


function drop_type(){
    var type_services = ['Servicio', 'TDC', 'Telefonía'];
    $("#type_payment").append('<option value="'+'0'+'" selected="selected"> '+"Seleccione"+'</option>');

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
    _this.append('<option value="'+'0'+'" selected="selected"> '+"Seleccione"+'</option>');


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
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>J- </option></select>'+
        '<input id="rif_info_bank" maxlength="9" class="input-register margin-register"></div></div>';

    _this.empty();

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
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>J- </option></select>'+
        '<input id="ident" maxlength="9" class="input-register margin-register"></div></div>';
    var field_payment = banavih;

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

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
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>J- </option></select>'+
        '<input id="ident" maxlength="9" ' +
        'class="input-register margin-register"></div></div>';
    var others = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF del Beneficiario: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>J- </option></select>'+
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
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>E- </option></select>'+
        '<input id="ident" maxlength="8" class="input-register margin-register">' +
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
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>E- </option></select>'+
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

}


function field_tlf(_this,valor) {
    var fields = '<div class="row"><div class="col-md-5 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>Número de Teléfono: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select id="codes" class="select2 input-register">'+
        '<input id="num-tlf" maxlength="7" class="input-register margin-register"></div></div>';

    _this.append(fields);
    $("#dl-nick").css({visibility:'visible'});
    drop_codes(valor);

}


function add_services() {
    var type_payment = $("#type_payment").val();

    if (!(errors) || $(a).val() === '0' || $(b).val().length < 20 || $(c).val() === '' || $(e).val() === '' ||
        $(f).val() === '' || $(g).val() === ''  || $(h).val() === '') {
        validate_affiliates(a,b,c,e,f,g,h);
        notification_error('El registro del afiliado presenta errores. Verifique los campos en rojo.');
    }
    else {
        var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/register-affiliate/";
        notification_success('Registrando servicio.....');
        setTimeout(function(){
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
        }, 3000);
    }
}