/**
 * Created by Cinthya C. Ramos G. on 16/6/2017.
 */

$(document).ready(function (){
    drop_trans();

    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var detail = button.data('details');
        var date = button.data('date');
        var ref = button.data('ref');
        var type = button.data('type');
        var amount = 'Bs. '+ button.data('amount');
        var modal = $(this);

        modal.find('.modal-body #detail').text(detail.replace(/_/g, ' '));
        modal.find('.modal-body #date').text(date);
        modal.find('.modal-body #ref').text(ref);
        modal.find('.modal-body #type').text(type);
        modal.find('.modal-body #amount').text(amount);
    });

    $('#datepicker').val('');

    $('#datepicker2').val('');

});


function drop_account(account){
    var path = window.location.pathname.split('/');
    var key = path[3];
    $("#account").empty();

    if (account.length < 2){
        $('#transf-my-acc').removeAttr('href');
        $('#transf-my-acc').addClass('disabled');
    }

    $.each(account,function (i,val) {
        if (key === '1' && val[0].includes("Ahorro")) {
            $("#account").append('<option value="'+(i+1)+'" selected> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
            $("#agency").text(val[4]);
            $("#status").text(val[2]);
            $('#available').text( 'Bs. ' +val[3][0]);
            $('#deferrer').text( 'Bs. ' +val[3][1]);
            $('#lock').text( 'Bs. ' +val[3][2]);
        }
        else if (key === '2' && val[0].includes("Corriente")) {
            $("#account").append('<option value="'+(i+1)+'" selected> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
            $("#agency").text(val[4]);
            $("#status").text(val[2]);
            $('#available').text( 'Bs. ' +val[3][0]);
            $('#deferrer').text( 'Bs. ' +val[3][1]);
            $('#lock').text( 'Bs. ' +val[3][2]);
        }
        else {
            $("#account").append('<option value="'+(i+1)+'"> '+val[0].substring(6)+'  '+val[1].substring(12)+'</option>');
        }
    })
}

function movement_table(movements) {
    var path = window.location.pathname.split('/');
    var key = path[3];
    var j;

    if (key === '1') {
        j = 0;
    }
    else {
        j = 1;
    }


    $('#example2').DataTable().destroy();
    $("#mov-table").empty();

    var mov = movements[j];
    $.each(mov, function (i, val) {
        var d = val[0].split('-');
        var date = d[2][0]+d[2][1] + '/' + d[1] + '/' + d[0];
        var details = String(val[5].replace(/\s/g,'_'));
        var amount = 'Bs. '+ val[3].substring(1);
        $("#mov-table").append('<tr class="open_modal" data-toggle="modal" ' +
            'data-target="#myModal" data-date=' + date + ' data-amount=' +
            String(val[3].substring(1)) + ' data-type=' + val[2] +
            ' data-ref=' + val[1] + ' data-details=' + details + '><td>' + date + '</td>' +
            '<td> <span class="link"> ' + val[1] + '</span></td>' +
            '<td>' + val[2] + '</td>' +
            '<td>' + val[3][0] + amount + '</td>' +
            '<td class="text-bold">' + 'Bs. ' + val[4] + '</td>' +
            '</tr>')
    });

    DatatablesExec();
}

function drop_trans(){
    var type_trans = ['Depósito', 'Retiro', 'POS', 'Transferencia','Pagos'];
    $("#trans").append('<option value="'+'0'+'" selected> '+"Todas"+'</option>');

    $.each(type_trans,function (i,val) {
        $("#trans").append('<option value="'+val+'"> '+val+'</option>');
    })
}

function DatatablesExec() {
    var table = $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "destroy": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
        "pageLength":5,
        "language": {
            "emptyTable": "No existen movimientos en la cuenta"
        },
        dom:'lr<"table-filter-container">tip',
        initComplete: function () {
            $('#btn-con').click(function () {
                if ($('#trans').val() !== 0) {
                    if ($('#datepicker').val() === '' && $($('#datepicker2').val() === '')) {
                        table.search($('#trans').val()).draw();
                    }
                }
            });
        }
    });

    $("#example2_paginate").addClass("pull-right");
    $("#example2_paginate").css({height: '60px'});
}

function download_movement(a) {
    var path = window.location.href.split('/');
    var url_api = path[0]+"/"+path[1]+"/"+"localhost:8001"+"/ajax/data-customer/";
    var o;
    var s = $('#datepicker').val();
    var e = $('#datepicker2').val();
    var select = $('#trans').val();

    if (validate_date(s,e)) {
        var today = new Date();
        var start = s;
        var end = e;
        if (s === '') {
            start = 1 + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
        }
        if (e === '') {
            end = today.getDate() + '/' + (today.getMonth()+1) + '/' + today.getFullYear();
        }

        $.ajax({
            url: url_api,
            origin: 'localhost:8000',
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            data: {
                num: a,
                start: start,
                end: end,
                select: select,
                option: path[4]
            },
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.product) {
                    var mov;
                    if (path[5] === '1') {
                        mov = data.mov_acc[0];
                    }
                    else if (path[5] === '2'){
                        mov = data.mov_acc[1];
                    }
                    var acc = document.getElementById('account').options[document.getElementById('account').selectedIndex].text;
                    $('#my_form_data').val(JSON.stringify([mov,start,end,select,acc]));
                    $('#my_form').submit();
                }
            },
            error: function (data) {
                alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
                // move('logout');
            }
        });
    }
    else if (!(validate_date(s,e))) {
        $('#datepicker2').addClass('errors');
        var msg = 'La fecha final para la consulta de movimientos no ' +
            'puede ser mayor a la fecha de inicio.';
        notification_error(msg);
    }
}



