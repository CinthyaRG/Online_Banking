/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    drop_account();
    movement_table();
    drop_trans();

});

function drop_account(){
    var tdc = ['VISA ****1730']

    $.each(tdc,function (i,val) {
        if (i ===0) {
            $("#tdc_drop").append('<option value="'+i+'" selected="selected"> '+val+'</option>');
        }
        else {
           $("#tdc_drop").append('<option value="'+i+'"> '+val+'</option>');
        }
    })
}

function movement_table() {
    var date = ['21/04/2017','18/04/2017','17/04/2017','17/04/2017','14/04/2017','13/04/2017'];
    var details = ['Depósito','Retiro','Pago','Transferencia','POS','POS'];
    var amount = ['+2.000,00','-700,00','-21.000,00','-13.000,00','-1.760,67','-14.743,90'];

    $.each(date,function (i,val) {
        $("#mov-table").append('<tr data-toggle="modal" data-target="#myModal"><td>' +val+ '</td>' +
            '<td>' +ref[i]+ '</td>' +
            '<td>' +trans[i]+ '</td>' +
            '<td>' +amount[i]+ '</td>' +
            '<td class="text-bold">' +balance[i]+ '</td>' +
            '</tr>')
    })
}

function drop_trans(){
    var type_trans = ['Depósito', 'Retiro', 'POS', 'Transferencias']
    $("#trans").append('<option value="'+""+'" selected="selected"> '+"Seleccione"+'</option>');

    $.each(type_trans,function (i,val) {
           $("#trans").append('<option value="'+i+'"> '+val+'</option>');
    })
}


$(function () {
    $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "order": [ 0, 'desc' ],
        "info": true,
        "autoWidth": false,
        "pageLength":5
    });

    $('#datepicker').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy',
        language: 'es',
        clearBtn: true
    });
    $('#datepicker2').datepicker({
        autoclose: true,
        format: 'dd/mm/yyyy',
        language: 'es',
        clearBtn: true
    });

});


