/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

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
    $.getJSON('static/js/bank.json', function (data) {
      $.each( data, function( key, val ) {
          $("#bank").append('<option value="'+val.codigo+'"> '+val.banco+'</option>');
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

var cod_area = ['0212','0248','0281','0282','0283','0292','0247',
'0278','0243','0244','0245','0246','0273','0234',
'0284','0285','0286','0288','0241','0242','0253',
'0249','0258','0287','0259','0268','0269','0279',
'0235','0238','0251','0271','0274','0275','0239',
'0291','0295','0255','0256','0257','0272','0293',
'0294','0276','0277','0254','0262','0263','0264',
'0265','0267'];

function drop_type_payment() {
    var valor = $("#type_payment").val();
    var type_name_services = ['Banavih Aportes FAOV', 'Electricidad de Caracas', 'DirecTV Previo Pago',
        'DirecTV Prepago', 'Pago de Impuestos Nacionales Propios','Pago de Impuestos Nacionales Terceros'];
    var type_name_tdc = ['TDC de Terceros mismo banco', 'TDC de Terceros mismo banco'];
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
    var type_name_tdc = ['TDC de Terceros mismo banco', 'TDC de Terceros mismo banco'];
    var type_name_tlf = ['CANTV', 'Digitel', 'Movilnet', 'Movistar'];
    var _this = $("#input-services");
    var info_bank = '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Banco: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<select id="bank" class="select2 input-register field-register"></select></div></div>'+
        '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>Número de cuenta: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num-acc" maxlength="20" class="input-register"></div></div>'+
        '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>J- </option></select>'+
        '<input id="rif_info_bank" maxlength="9" class="input-register margin-register"></div></div>';

    _this.empty();

    if (valor === 'Banavih Aportes FAOV') {
        field_banavih(info_bank,_this);
    }
    else if (valor === 'Electricidad de Caracas') {
        field_electricidad(info_bank,_this);
    }
    else if (valor === 'DirecTV Previo Pago' || valor === 'DirecTV Prepago') {
        field_directv(info_bank,_this,valor);
    }
    else if (valor === 'Pago de Impuestos Nacionales Propios' ||
        valor=== 'Pago de Impuestos Nacionales Terceros') {
        field_impuestos(info_bank,_this,valor);
    }
    else if (valor === 'DirecTV Previo Pago') {
        field_directv(info_bank,_this);
    }

}


function field_banavih(field,_this) {
    var banavih = '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de Afiliación: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_af_banavih" maxlength="20" class="input-register"></div></div>'+
        '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF del Beneficiario: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>J- </option></select>'+
        '<input id="rif_banavih" maxlength="9" class="input-register margin-register"></div></div>';
    var field_payment = field + banavih;

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

    $('#bank').unbind('change').bind('change', function (e){
        $.getJSON('static/js/bank.json', function (data) {
            $.each(data, function (key, val) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });
}

function field_electricidad(field,_this) {
    var elec = '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de Contrato: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_elec" maxlength="13" class="input-register"></div></div>';
    var field_payment = field + elec;

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

    $('#bank').unbind('change').bind('change', function (e){
        $.getJSON('static/js/bank.json', function (data) {
            $.each(data, function (key, val) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });
}

function field_directv(field,_this,valor) {
    var directv_previo = '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de Suscripción: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_susc" maxlength="8" class="input-register"></div></div>';
    var directv_prepago = '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span> Número de SmartCard: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows">'+
        '<input id="num_smart" maxlength="12" class="input-register"></div></div>';
    var field_payment;

    if (valor === 'DirecTV Previo Pago') {
        field_payment = field + directv_previo;
    }
    else {
        field_payment = field + directv_prepago;
    }

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

    $('#bank').unbind('change').bind('change', function (e){
        $.getJSON('static/js/bank.json', function (data) {
            $.each(data, function (key, val) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });
}

function field_impuestos(field,_this,valor) {
    var owns = '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF del Beneficiario: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>J- </option></select>'+
        '<input id="rif_impuestos_owns" maxlength="9" ' +
        'class="input-register margin-register"></div></div>';
    var others = '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        '<span class="text-danger"> * </span>RIF del Beneficiario: </label></div>'+
        '<div class="col-md-6 col-xs-5 rows"><select class="select2 input-register">'+
        '<option selected="selected">V- </option>'+
        '<option>J- </option></select>'+
        '<input id="rif_impuestos_others" maxlength="9" ' +
        'class="input-register margin-register"></div></div>'+
        '<div class="row"><div class="col-md-6 col-xs-5"><label class="pull-right">'+
        'Email: </label></div><div class="col-md-6 col-xs-5 rows">'+
        '<input id="email_impuestos" class="input-register field-register"></div></div>';
    var field_payment;

    if (valor === 'Pago de Impuestos Nacionales Propios') {
        field_payment = field + owns;
    }
    else {
        field_payment = field + others;
    }

    _this.append(field_payment);
    drop_bank();
    $("#dl-nick").css({visibility:'visible'});

    $('#bank').unbind('change').bind('change', function (e){
        $.getJSON('static/js/bank.json', function (data) {
            $.each(data, function (key, val) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });
}
