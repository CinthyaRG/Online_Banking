/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    drop_trans();

    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var detail = button.data('details');
        var date = button.data('date');
        var ref = button.data('ref');
        var type = button.data('type');
        var amount = button.data('amount');
        var modal = $(this);

        modal.find('.modal-body #detail').text(detail.replace(/_/g, ' '));
        modal.find('.modal-body #date').text(date);
        modal.find('.modal-body #ref').text(ref);
        modal.find('.modal-body #type').text(type);
        modal.find('.modal-body #amount').text(amount);
    });

    // $.fn.DataTable.ext.search.push(
    //     function(settings, data, dataIndex) {
    //         var startDate = $('#datepicker').val();
    //         var endDate = $('#datepicker2').val();
    //         var date = parseFloat(data[0]) || 0;

    //         if ((startDate === '') && (endDate === '') ||
    //             (startDate <= date && (endDate ))) {
    //             return false;
    //         }

    //     }
    // );

    $('#btn-con').click(function () {
        if (($('#datepicker').val() !== '') || ($('#datepicker2').val() !== '')) {
            var path = window.location.href.split('/');
            var url_api = path[0]+"/"+path[1]+"/"+"localhost:8001"+"/ajax/data-movements/";

            $.ajax({
                url: url_api,
                origin: 'localhost:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                data: {
                    num: num
                },
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    var url = window.location.href.split('/');
                    alert(url[3]);
                    if (data.product) {
                        menu_attr(data.account,data.tdc,data.loan);
                        if (url[3]==='inicio') {
                            tables(k,data.account,data.tdc,data.loan);
                        }
                        else if (url[4]==='consultar-cuenta') {
                            drop_account(data.account);
                            movement_table(data.mov);
                        }
                    }
                },
                error: function (data) {
                    alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                    // move('logout');
                }
            });
        }
    })

});



function drop_account(account){
    var path = window.location.pathname.split('/');
    var key = path[3];
    $("#account").empty();

    $.each(account,function (i,val) {
        if (key === '1' && val[0].includes("Ahorro")) {
            $("#account").append('<option value="'+(i+1)+'" selected="selected"> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
            $("#agency").text(val[4]);
            $("#status").text(val[2]);
            $('#available').text( 'Bs.' +val[3][0]);
            $('#deferrer').text( 'Bs.' +val[3][1]);
            $('#lock').text( 'Bs.' +val[3][2]);
        }
        else if (key === '2' && val[0].includes("Corriente")) {
            $("#account").append('<option value="'+(i+1)+'" selected="selected"> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
            $("#agency").text(val[4]);
            $("#status").text(val[2]);
            $('#available').text( 'Bs.' +val[3][0]);
            $('#deferrer').text( 'Bs.' +val[3][1]);
            $('#lock').text( 'Bs.' +val[3][2]);
        }
        else {
            $("#account").append('<option value="'+(i+1)+'"> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
        }
    })
}

function movement_table(movements) {
    var path = window.location.pathname.split('/');
    var key = path[3];

    if (key === '1') {
        j = 0;
    }
    else {
        j = 1;
    }

    var mov = movements[j];
    $.each(mov, function (i, val) {
        var d = val[0].split('-');
        var date = d[2][0]+d[2][1] + '/' + d[1] + '/' + d[0];
        var details = String(val[5].replace(/\s/g,'_'));
        var amount = 'Bs.'+ val[3].substring(1);
        $("#mov-table").append('<tr class="open_modal" data-toggle="modal" ' +
            'data-target="#myModal" data-date=' + date + ' data-amount=' +
            amount + ' data-type=' + val[2] +
            ' data-ref=' + val[1] + ' data-details=' + details + '><td>' + date + '</td>' +
            '<td> <span class="link"> ' + val[1] + '</span></td>' +
            '<td>' + val[2] + '</td>' +
            '<td>' + val[3][0] + amount + '</td>' +
            '<td class="text-bold">' + 'Bs. ' + val[4] + '</td>' +
            '</tr>')
    });

    var table = $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "ordering": false,
        "info": true,
        "autoWidth": false,
        "pageLength":5,
        dom:'lr<"table-filter-container">tip',
        initComplete: function () {
            $('#btn-con').click(function () {
                if ($('#trans').val() !== 0) {
                    if (($('#datepicker').val() === '') && ($('#datepicker2').val() === '')) {
                        table.search($('#trans').val()).draw();
                    }
                }
            });
        }
    });

    $("#example2_paginate").addClass("pull-right");
    $("#example2_paginate").css({height: '60px'});
}

function drop_trans(){
    var type_trans = ['Depósito', 'Retiro', 'POS', 'Transferencia','Pagos'];
    $("#trans").append('<option value="'+'0'+'" selected="selected"> '+"Todas"+'</option>');

    $.each(type_trans,function (i,val) {
        $("#trans").append('<option value="'+val+'"> '+val+'</option>');
    })
}

function movement() {

}



