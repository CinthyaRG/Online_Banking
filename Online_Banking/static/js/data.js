/**
 * Created by CinthyaCarolina on 21/6/2017.
 */

function tables_data(a,b) {
    var num = a;
    var k = b;
    var path = window.location.href.split('/');
    var url_api = path[0]+"/"+path[1]+"/"+"localhost:8001"+"/ajax/data-customer/";

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
            if (data.product) {
                tables(k,data.account,data.tdc,data.loan);
            }
        },
        error: function (data) {
            alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
        }
    });
    
};


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
            '<td class="text-bold">' + 'Bs.' +val[3]+ '</td>' +
            '</tr>')
    });

    if ( (loan == '') && (tdc == '')) {
        $('#table-liabilities').empty();
    }
    else {

        if (tdc == '') {
            $('#thread-tdc').empty();
        }
        else {
            $.each(tdc,function (i,val) {
                var date = val[3].split('-')
                $("#table-tdc").append('<tr class="cursor" onclick="move(' +"'" + k +"'/consultar-tdc/"+ (i+1) +"')"+'">' +
                    '<td>' +val[0]+ '</td>' +
                    '<td><span class="link">' +val[1]+ '</span></td>' +
                    '<td class="text-bold">' + 'Bs.' +val[2]+ '</td>' +
                    '<td>' + date[2] + '/' + date[1] + '/' + date[0] + '</td>' +
                    '</tr>')
            }); 
        }

        if (loan == '') {
            $('#thread-loan').empty();
        }
        else {
            $.each(loan,function (i,val) {
                var date = val[3].split('-')
                $("#table-loan").append('<tr class="cursor" onclick="move(' +"'" + k +"'/consultar-prestamo/"+ (i+1) +"')"+'">' +
                    '<td>' +val[0]+ '</td>' +
                    '<td><span class="link">' +val[1]+ '</span></td>' +
                    '<td class="text-bold">' + 'Bs.' +val[2]+ '</td>' +
                    '<td>' + date[2] + '/' + date[1] + '/' + date[0] + '</td>' +
                    '</tr>')
            });  
        }
    }



    
    
};