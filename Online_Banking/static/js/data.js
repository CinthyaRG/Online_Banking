/**
 * Created by CinthyaCarolina on 21/6/2017.
 */

function tables_data(a,b) {
    var num = a;
    var k = b;
    var path = window.location.href.split('/');
    var url_api = path[0]+"/"+path[1]+"/"+"localhost:8001"+"/ajax/data-customer/";
    var o;
    if (path[3] !== 'inicio') {
        o = path[4];
    }
    else {
        o = path[3];
    }

    $.ajax({
        url: url_api,
        origin: 'localhost:8000',
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        data: {
            num: num,
            option: o
        },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var url = window.location.href.split('/');
            if (data.product) {
                menu_attr(data.account,data.tdc,data.loan);
                if (url[3]==='inicio') {
                    tables(k,data.account,data.tdc,data.loan);
                }
                else if (url[4]==='consultar-cuenta') {
                    drop_account(data.account);
                    movement_table(data.mov_acc);
                }
                else if (url[4]==='consultar-tdc') {
                    drop_tdc(data.tdc);
                    movement_table(data.mov_tdc);

                }
            }
        },
        error: function (data) {
            alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
            // move('logout');
        }
    });

}

function menu_attr(account, tdc, loan) {
    $.each(account,function (i,val) {
        if (val[0] === "Cuenta Ahorro") {
            $('#acc-aho').removeClass('disabled');
        }
        else {
            $('#acc-corr').removeClass('disabled');
        }

        if (account.length === 1) {
            if (val[0] === "Cuenta Ahorro") {
                $('#acc-corr').removeAttr('href');
            }
            else {
                $('#acc-aho').removeAttr('href');
            }
        }
    });

    if (tdc.length === 0) {
        $('#tdc').removeAttr('href');
        $('#tdc').addClass('disabled');
    }

    if (loan.length === 0) {
        $('#prest').removeAttr('href');
        $('#prest').addClass('disabled');
    }
}


function tables(k,account,tdc, loan) {
    $.each(account,function (i,val) {
        var acc;

        if (val[0] === "Cuenta Ahorro") {
            acc = '1';
        }
        else {
            acc = '2';
        }

        $("#table-assets").append('<tr class="cursor" onclick="move(' +"'" + k +"/consultar-cuenta/"+ acc +"')"+'">' +
            '<td>' +val[0]+ '</td>' +
            '<td><span class="link">' +val[1]+ '</span></td>' +
            '<td>' +val[2]+ '</td>' +
            '<td class="text-bold">' + 'Bs. ' +val[3][0]+ '</td>' +
            '</tr>')
    });

    if ( (loan.length === 0) && (tdc.length === 0)) {
        $('#table-liabilities').empty();
    }
    else {
        if (tdc.length === 0) {
            $('#thread-tdc').empty();
        }
        else {
            $.each(tdc,function (i,val) {
                var date = val[8].split('-');
                $("#table-tdc").append('<tr class="cursor" onclick="move(' +"'" + k +"/consultar-tdc/"+ (i+1) +"')"+'">' +
                    '<td>' +val[0]+ '</td>' +
                    '<td><span class="link">' +val[1]+ '</span></td>' +
                    '<td class="text-bold">' + 'Bs. ' +val[5]+ '</td>' +
                    '<td>' + date[2] + '/' + date[1] + '/' + date[0] + '</td>' +
                    '</tr>')
            });
        }

        if (loan.length === 0) {
            $('#thread-loan').empty();
        }
        else {
            $.each(loan,function (i,val) {
                var date = val[3].split('-');
                $("#table-loan").append('<tr class="cursor" onclick="move(' +"'" + k +"/consultar-prestamo/"+ (i+1) +"')"+'">' +
                    '<td>' +val[0]+ '</td>' +
                    '<td><span class="link">' +val[1]+ '</span></td>' +
                    '<td class="text-bold">' + 'Bs. ' +val[2]+ '</td>' +
                    '<td>' + date[2] + '/' + date[1] + '/' + date[0] + '</td>' +
                    '</tr>')
            });
        }
    }
}