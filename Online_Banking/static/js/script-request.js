/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    menu();
    drop_num_cheq();
    drop_agen();

    $('#account').click(function () {
        $('#account').removeClass('errors');
    });

    $('#amount_cheq').click(function () {
        $('#amount_cheq').removeClass('errors');
    });

    $('#agen_bank').click(function () {
        $('#agen_bank').removeClass('errors');
    });

    $('#datepicker').click(function () {
        $('#datepicker').removeClass('errors');
    });

});

function checkbook(account) {
    var acc = false;
    $.each(account,function (i,val) {
        if (val[0].includes('Corriente')){
            acc = true;
        }
    })
    if (!(acc)) {
        $('#btn-cheq').removeAttr('href');
        $('#btn-cheq').removeAttr('onclick');
        $('#btn-cheq').attr("onclick","notification_error('Usted no posee una cuenta con chequeras.')");
    }
}

function drop_num_cheq() {
    var num = ['25', '50'];

    $.each(num,function (i,val) {
        if (i === 0) {
            $("#num-cheq").append('<option value="'+val+'" selected="selected"> '+val+'</option>');
        }
        else {
            $("#num-cheq").append('<option value="'+val+'"> '+val+'</option>');
        }
    })
}


function drop_agen() {
    var path = window.location.href.split('/');
    var url = path[0]+"/"+path[1]+"/localhost:8001/ajax/branches/";

    $("#agen_bank").append('<option value="'+'0'+'" selected>' +'Seleccione'+'</option>');

    $.getJSON(url, function (data) {
        $.each( data.branches.sort(), function( key, val ) {
            $("#agen_bank").append('<option value="'+val+'"> '+val+'</option>');
        })
    })
}


function hab_des_text(valor) {
    if (valor === 1) {
        $("#name_reference").removeAttr("disabled");
    }
    else if (valor === 2){
        $("#name_reference").val("");
        $("#name_reference").attr("disabled","disabled");
    }
}


function drop_account(account){

    $("#account").append('<option value="'+'0'+'" selected>' +'Seleccione'+'</option>');

    $.each(account,function (i,val) {
        $("#account").append('<option value="'+(i+1)+'"> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
    })
}


function fillzeros(len, num) {
    if (num.toString().length <= len)
        return fillzeros(len, "0" + num);
    else
        return num;
}


function tarj_coor(coor,serial) {
    var c= "";
    var i, j;
    // $.getJSON('static/js/coord.json', function (data) {
    //     $.each( data, function( key, val ) {
    //             $.each( val, function( k, v ) {
    //                 $("#codes").append('<option value="' +k+ '"> ' +v+ '</option>');
    //             })
    //         })
    //     });

    c+='<table  id="table_coor">';
    c+='<tr><td></td>'+'<td align="center"><strong>A</strong></td>'+
        '<td align="center"><strong>B</strong></td>' +
        '<td align="center"><strong>C</strong></td>' +
        '<td align="center"><strong>D</strong></td>' +
        '<td align="center"><strong>E</strong></td>' +
        '<td align="center"><strong>F</strong></td>' +
        '<td class="td-w"></td></tr>';
    for ( i = 0; i < 5; i++) {
        c+='<tr><td class="col-xs-1" align="center"><strong>'+(i+1)+'</strong></td>';
        for ( j = 0; j < 6; j++) {
            c+='<td class="td-border"><p class="col-xs-1 top-p">'+fillzeros(2,coor[i][j])+'</p></td>';
        }
        c+='</tr>';
    }
    c+='<tr class="height-20"></tr>';
    c+='</table>';
    c+='<div class="row"><div class="col-md-4"></div>' +
        '<div class="col-md-8"><p class="text-bold pull-right">Serial '+serial+'</p>' +
        '</div></div>';

    $('#tarj-coor').append(c);

    notification_success('Tarjeta de Coordenadas generada y activada exitosamente.');

}


function save_references(a) {
    if ($(a).val() === '0'){
        notification_error('Seleccione una cuenta.');
        $(a).addClass('errors');
    }
    else{
        var path = window.location.href.split('/');
        var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/save-request/";
        var option = $('input:radio[name=optionsRadios]:checked').val();
        if (option === 'A un tercero'){
            option = $('#name_reference').val();
        }
        notification_success('Solicitud de Referencia Bancaria en proceso....');
        setTimeout(function(){
            $.ajax({
                url: url,
                origin: 'localhost:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                data: {
                    option: option,
                    acc: document.getElementById('account').options[document.getElementById('account').selectedIndex].text,
                    name: path[5]
                },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if(data.success){
                        location.href = path[0]+"/"+path[1]+"/"+path[2]+"/"+path[3]+"/"+path[4]+"/"+path[5]+"/exitosa/"+data.id;
                    }
                    else{
                        notification_error('Ha ocurrido un error intente nuevamente su solicitud.');
                    }
                },
                error: function (data) {
                    alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                    // move('logout');
                }
            });
        }, 1500);
    }
}


function request_checkbook(a,b) {
    if (parseInt($(a).val()) > 2 ){
        notification_error('La cantidad de chequeras solicitar son máximo dos.');
        $(a).addClass('errors');
    }
    else{
        var path = window.location.href.split('/');
        var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/save-request/";
        notification_success('Solicitud de Chequera en proceso....');
        setTimeout(function(){
            $.ajax({
                url: url,
                origin: 'localhost:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                data: {
                    option: $(a).val() + ' ' + $(b).val(),
                    name: path[5]
                },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    if (data.success){
                        location.href = path[0]+"/"+path[1]+"/"+path[2]+"/"+path[3]+"/"+path[4]+"/"+path[5]+"/exitosa/"+data.id;
                    }
                    else{
                        notification_error('No puede realizar más de una solicitud de chequeras al día.');
                        setTimeout(function(){
                            location.href= document.referrer;
                        }, 1500);
                    }
                },
                error: function (data) {
                    alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                    // move('logout');
                }
            });
        }, 1500);

    }
}


function save_appointment(a,b,c) {
    if ($(a).val() === '0'){
        notification_error('Seleccione una sucursal del banco.');
        $(a).addClass('errors');
    }
    else if ($(b).val() === ''){
        notification_error('Seleccione una fecha para agendar su cita del banco.');
        $(b).addClass('errors');
    }
    else{
        if ($(b).val() !== ''){
            var d = $(b).val().split('/');
            var date = new Date(d[2],d[1]-1,d[0]);
            if (date.getDay() === 0 || date.getDay() === 6){
                notification_error('La cita debe ser un día laboral bancario.');
                $(b).addClass('errors');
            }
            else{
                notification_success('Solicitud de Cita en proceso....');
                var path = window.location.href.split('/');
                var url = path[0]+"/"+path[1]+"/"+path[2]+"/ajax/save-request/";
                var url_api = path[0]+"/"+path[1]+"/localhost:8001/ajax/appointment/";
                setTimeout(function(){
                    $.ajax({
                        url: url_api,
                        origin: 'localhost:8000',
                        headers: {'X-CSRFToken': getCookie('csrftoken')},
                        data: {
                            num: c,
                            date: $(b).val(),
                            branch: $(a).val()
                        },
                        type: 'GET',
                        dataType: 'json',
                        success: function (data) {
                            if (data.success){
                                $.ajax({
                                    url: url,
                                    origin: 'localhost:8000',
                                    headers: {'X-CSRFToken': getCookie('csrftoken')},
                                    data: {
                                        option: $(a).val() + '-' + $(b).val(),
                                        name: path[5]
                                    },
                                    type: 'GET',
                                    dataType: 'json',
                                    success: function (data) {
                                        if (data.success){
                                            location.href = path[0]+"/"+path[1]+"/"+path[2]+"/"+path[3]+"/"+path[4]+"/"+path[5]+"/exitosa/"+data.id;
                                        }
                                    },
                                    error: function (data) {
                                        alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                                        // move('logout');
                                    }
                                });
                            }
                            else{
                                notification_error(data.msg);
                                $(a).addClass('errors');
                            }
                        },
                        error: function (data) {
                            alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                            // move('logout');
                        }
                    });
                }, 1500);

            }
        }


    }
}

