/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    drop_account();
    movement_table();
    drop_trans();

    var table = $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "order": [ 0, 'desc' ],
        "info": true,
        "autoWidth": false,
        "pageLength":5,
        dom:'lr<"table-filter-container">tip',
        initComplete: function () {
            $('#btn-con').click(function () {
                if ($('#trans').val() !== 0) {
                    table.search($('#trans').val()).draw();
                }
            });
        }
    });
});

function drop_account(){
    var account = ['Ahorro ****2222', 'Corriente ****1234'];
    var path = window.location.pathname.split('/');
    var key = path[2];

    $.each(account,function (i,val) {
        if (key === '1' && val.includes("Ahorro")) {
            $("#account").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else if (key === '2' && val.includes("Corriente")) {
            $("#account").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else {
           $("#account").append('<option value="'+(i+1)+'"> '+val+'</option>');
        }
    })
}

function movement_table() {
    var date = ['21/04/2017','18/04/2017','17/04/2017','17/04/2017','14/04/2017','13/04/2017'];
    var ref = ['1123456','1113456','1109456','1108756','1106556','1102156'];
    var trans = ['Depósito','Retiro','Pago','Transferencia','POS','POS'];
    var amount = ['+2.000,00','-700,00','-21.000,00','-13.000,00','-1.760,67','-14.743,90'];
    var balance = ['172.096,77','170.796,77','191.796,77','204.796,77','206.556,67','221.299,64'];

    $.each(date,function (i,val) {
        $("#mov-table").append('<tr data-toggle="modal" data-target="#myModal"><td>' +val+ '</td>' +
            '<td> <span class="link"> ' +ref[i]+ '</span></td>' +
            '<td>' +trans[i]+ '</td>' +
            '<td>' +amount[i]+ '</td>' +
            '<td class="text-bold">' +balance[i]+ '</td>' +
            '</tr>')
    })
}

function drop_trans(){
    var type_trans = ['Depósito', 'Retiro', 'POS', 'Transferencia','Pagos'];
    $("#trans").append('<option value="'+'0'+'" selected="selected"> '+"Seleccione"+'</option>');

    $.each(type_trans,function (i,val) {
           $("#trans").append('<option value="'+val+'"> '+val+'</option>');
    })
}


$(function () {

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


