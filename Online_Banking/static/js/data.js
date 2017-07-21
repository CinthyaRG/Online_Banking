/**
 * Created by CinthyaCarolina on 21/6/2017.
 */

function data(a) {
    var path = window.location.href.split('/');
    var url_api = path[0]+"/"+path[1]+"/"+"localhost:8001"+"/ajax/data-customer/";

    $.ajax({
        url: url_api,
        origin: 'localhost:8000',
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        data: {
            numtarj: a
        },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            alert("EXITO ajax api");
            if (data.correct) {
                $("#name_customer").text(data.customer_name);
                $("#last-name_customer").text(data.customer_last);
                $("#ci_customer").text(data.customer_ident);
                $("#phone-home").text(data.phone_home);
                $("#cellphone").text(data.cellphone);
                $("#phone-office").text(data.phone_office);
                $("#birthday").text(data.birthday);
                pagNext(1);
            }
        },
        error: function (data) {
            alert("Lo sentimos, hay problemas con el servidor. Intente más tarde.");
        }
    });
}


function assets_table() {
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