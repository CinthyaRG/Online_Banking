/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    drop_tdc();
    movement_table_tdc();
    drop_trans_tdc();

    jQuery.extend( jQuery.fn.dataTableExt.oSort, {
        "date-uk-pre": function ( a ) {
            var ukDatea = a.split('/');
            return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
        },

        "date-uk-asc": function ( a, b ) {
            return ((a < b) ? -1 : ((a > b) ? 1 : 0));
        },

        "date-uk-desc": function ( a, b ) {
            return ((a < b) ? 1 : ((a > b) ? -1 : 0));
        }
    });


    var table = $('#example').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": true,
        "order": [ 0, 'desc' ],
        "aoColumns": [
            { "sType": "date-uk" },
            null,
            null
        ],
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

function drop_tdc(){
    var tdc = ['VISA ****1730'];
    var path = window.location.pathname.split('/');
    var key = path[2];

    $.each(tdc,function (i,val) {
        if (key === '1' && val.includes("VISA")) {
            $("#tdc_drop").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else if (key === '2' && val.includes("MASTERCARD")) {
            $("#tdc_drop").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else if (key === '3' && val.includes("AMERICAN")) {
            $("#tdc_drop").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else {
           $("#tdc_drop").append('<option value="'+(i+1)+'"> '+val+'</option>');
        }
    })
}

function movement_table_tdc() {
    var date = ['12/06/2017','08/06/2017','04/06/2017','29/05/2017','27/05/2017','22/05/2017'];
    var details = ['POS','POS','POS','POS','Pago','POS'];
    var amount = ['-12.484,00','-796,00','-5.741,94','-8.000,00','+10.000,00','-19.713,90'];
    $.each(date,function (i,val) {
        $("#mov-table-tdc").append('<tr><td>' +val+ '</td>' +
            '<td>' +details[i]+ '</td>' +
            '<td class="text-bold">' +amount[i]+ '</td>' +
            '</tr>')
    })
}


function drop_trans_tdc(){
    var type_trans = ['Pago', 'POS'];
    $("#trans").append('<option value="'+'0'+'"" selected="selected"> '+"Seleccione"+'</option>');

    $.each(type_trans,function (i,val) {
           $("#trans").append('<option value="'+val+'"> '+val+'</option>');
    })
}


