/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    menu();
    transf_table();
    transf_other_table();

    if ($("#account1").val() !== '0') {
        $("#balance-acc").css({display:'inline'});
    }

    $("#account1").change(function () {
        if ($("#account1").val() !== '0') {
            $("#balance-acc").css({display: 'inline'});
        }
        else {
            $("#balance-acc").css({display: 'none'});
        }
        change_drop('#account1');
    });

    $("#amount-transf").click(function () {
        $("#amount-transf").removeClass('errors');
    });

});


function drop_account_trans(account){
    var path = window.location.pathname.split('/');
    var key = path[3];

    $("#account1").empty();

    $.each(account,function (i,val) {
        if (key === '0' && i === 0) {
            $("#account1").append('<option value="'+'0'+'" selected> '+"Seleccione"+'</option>');
        }
        if (key === '1' && val[0].includes("Ahorro")) {
            $("#account1").append('<option value="'+(i+1)+'" selected> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
            $("#account1").append('<option value="'+'0'+'"> '+"Seleccione"+'</option>');
            $('#balance-acc').append('<span class="text-bold"> Bs. '+ val[3][0] +'</span>');
        }
        else if (key === '2' && val[0].includes("Corriente")) {
            $("#account1").append('<option value="'+(i+1)+'" selected> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
            $("#account1").append('<option value="'+'0'+'"> '+"Seleccione"+'</option>');
            $('#balance-acc').append('<span class="text-bold"> Bs. '+ val[3][0] +'</span>');
        }
        else {
            $("#account1").append('<option value="'+(i+1)+'"> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
        }
    });

    drop_change($("#account1").val());

}

function drop_change() {
    $("#account2").empty();

    var account = [];
    var l = $('#account1').children().length;
    var path = window.location.pathname.split('/');
    var key = path[3];

    for (var i=0; i<l; i++) {
        account.push($('#account1').children()[i].text);
    }

    $.each(account,function (i,val) {
        if (key === '1' && val.includes("Ahorro")) {
            $("#account2").append('<option value="'+(i+1)+'" disabled> '+val+'</option>');
        }
        else if (key === '2' && val.includes("Corriente")) {
            $("#account2").append('<option value="'+(i+1)+'" disabled> '+val+'</option>');
        }
        else if (val.includes("Seleccione")) {
            $("#account2").append('<option value="'+'0'+'" selected> '+val+'</option>');
        }
        else {
            $("#account2").append('<option value="'+(i+1)+'"> '+val+'</option>');
        }
    })
}

function transf_table() {
    var alias = ['mama','plomero','hermano','empresa','florista'];
    var name = ['Julia Lopez','Luis Navarro','Manuel Perez','CasaMil C.A', 'Lucia Gomez'];
    var ci = ['V-11234256','V-21113456','V-16109456','J-298736476','V-17235431'];
    var date_af = ['21/04/2016','23/08/2017','17/04/2016','17/12/2016','12/02/2016'];

    $.each(name,function (i,val) {
        // $("#table-af").append('<tr onclick="move(' +"'elementos-seguridad/21')"+'">' +
        $("#table-af").append('<tr onclick="move(' +"'datos-transferencia/1"+i+"')"+'">' +
            '<td><span class="link">' +alias[i]+ '</span></td>' +
            '<td class="text-bold">' +val+ '</td>' +
            '<td>' +ci[i]+ '</td>' +
            '<td>' +date_af[i]+ '</td>' +
            '<td><a class="icon-table" href="#"><i class="fa fa-pencil color-icon"></i></a>' +
            '<a class="icon-table" data-toggle="modal" href="#Modal-Delete">' +
            '<i class="fa fa-close color-delete"></i></a></td>' +
            '</tr>')
    })
}

function transf_other_table() {
    var alias = ['mama','plomero','hermano','empresa','florista'];
    var name = ['Julia Lopez','Luis Navarro','Manuel Perez','CasaMil C.A', 'Lucia Gomez'];
    var ci = ['V-11234256','V-21113456','V-16109456','J-298736476','V-17235431'];
    var bank = ['BANCO MERCANTIL, C.A.','BANESCO BANCO UNIVERSAL',
        'BOD BANCO OCCIDENTAL DE DESCUENTO','BANCO MERCANTIL, C.A',
        'BANCO PROVINCIAL BBVA'];
    var date_af = ['21/04/2016','23/08/2017','17/04/2016','17/12/2016','12/02/2016'];

    $.each(name,function (i,val) {
        $("#table-af-other").append('<tr onclick="move(' +"'datos-transferencia/2"+i+"')"+'">' +
            '<td><span class="link">' +alias[i]+ '</span></td>' +
            '<td class="text-bold">' +val+ '</td>' +
            '<td>' +ci[i]+ '</td>' +
            '<td>' +bank[i]+ '</td>' +
            '<td>' +date_af[i]+ '</td>' +
            '<td><a class="icon-table" href="#"><i class="fa fa-pencil color-icon"></i></a>' +
            '<a  class="icon-table" data-toggle="modal" href="#Modal-Delete-Other">' +
            '<i class="fa fa-close color-delete"></i></a></td>' +
            '</tr>')
    })
}

function send_transfer(a,b,c) {
    var msg = '';
    var available = $('#balance-acc').text;
    if ($(b).val() === '0') {
        $(b).addClass('errors');
        msg = 'Seleccione una cuenta a acreditar';
    }
    else if ($(a).val() === '0') {
        $(a).addClass('errors');
        msg = 'Seleccione una cuenta a acreditar';
    }
    else if ($(c).val() === ''){
        $(c).addClass('errors');
        msg = 'El monto de la transferencia no puede estar vacío.';

    }
    else if (!($.isNumeric($(c).val()))) {
        $(c).addClass('errors');
        msg = 'El monto de la transferencia debe ser un número válido. ' +
            'Por ejemplo: 23989.99, donde con el punto se indican los decimales.';
    }
    else if ($(c).val() > available) {
        $(c).addClass('errors');
        msg = 'El monto de la transferencia no puede ser mayor su monto disponible.';
    }

    if (msg !== ''){

        $(function(){
            var stack = {"dir1": "down",
                "dir2": "left",
                "firstpos2": 10,
                "firstpos1": 10
            };
            new PNotify({
                text: msg,
                buttons: {
                    closer: false,
                    sticker: false
                },
                styling: 'bootstrap3',
                type: 'error',
                stack: stack
            });
        });
    }
}


function DatatablesExec() {
    var table = $('#table-transf').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching":true,
        "ordering": true,
        "order": [ 0, 'asc' ],
        "info": true,
        "autoWidth": false,
        "pageLength":5
    });

    $("#table-payments_filter").addClass("pull-right");
}



