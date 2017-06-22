/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    drop_account_trans();
    menu();
    transf_table();
    transf_other_table();

    $("#table-payments_filter").addClass("pull-right");

    if ($("#account1").val() !== '0') {
        $("#balance-acc").css({display:'inline'});
        drop_change($("#account1").val());
    }

    $("#account1").change(function () {
        if ($("#account1").val() !== '0') {
            $("#balance-acc").css({display: 'inline'});
        }
        else {
            $("#balance-acc").css({display: 'none'});
        }
        drop_change($("#account1").val());
    });

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
});


function drop_account_trans(){
    var account = ['Ahorro ****2222', 'Corriente ****1234'];
    var url = document.referrer.split('/');
    var key = '0';
    if (url[3] === 'consultar-cuenta') {
        key = url[4];
    }

    if (key === '0') {
        $("#account1").append('<option value="'+'0'+'" selected="selected"> '+"Seleccione"+'</option>');
    }

    $.each(account,function (i,val) {
        if (key === '1' && val.includes("Ahorro")) {
            $("#account1").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else if (key === '2' && val.includes("Corriente")) {
            $("#account1").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else {
           $("#account1").append('<option value="'+(i+1)+'"> '+val+'</option>');
        }
    })
}


function drop_change(key) {
        $("#account2").empty();
        $("#account2").append('<option value="'+'0'+'" selected="selected"> '+"Seleccione"+'</option>');
        var account = ['Ahorro ****2222', 'Corriente ****1234'];

        $.each(account,function (i,val) {
        if (key === '1' && val.includes("Ahorro")) {
            $("#account2").append('<option value="'+(i+1)+'" disabled="disabled"> '+val+'</option>');
        }
        else if (key === '2' && val.includes("Corriente")) {
            $("#account2").append('<option value="'+(i+1)+'" disabled="disabled"> '+val+'</option>');
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
        $("#table-af").append('<tr>'+
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
        $("#table-af-other").append('<tr>' +
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



