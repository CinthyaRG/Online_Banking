/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    menu();
});

function DatatablesExec() {
    var table = $('#table-mng').DataTable({
        "paging": true,
        "lengthChange": false,
        "destroy": true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
        "pageLength":5
    });

    $("#table-mng_paginate").addClass("pull-right");
    $("#table-mng_paginate").css({height: '60px'});
}


function management_table(management) {

    var path = window.location.href.split('/');
    var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/get-cardCoord/";
    $.ajax({
        url: url,
        origin: 'localhost:8000',
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.user_exists) {
                management[0].push(data.coor[0]);
                management[1].push(data.coor[1]);
            }
        }
    });

    $("#body-table-mng").empty();
    alert(management[0]);
    alert(management[1]);

    $.each(management[0],function (i,val) {
        if (String(management[1][i]) === 'true') {
            $("#body-table-mng").append('<tr>'+'<td class="text-capitalize">' +val+ '</td>'+
                '<td><a  class="icon-table disabled"><i class="fa fa-check color-active"></i></a></td>' +
                '<td><a  class="icon-table" onclick=""><i class="fa fa-ban color-delete"></i></a></td></tr>' );
        }
        else {
            $("#body-table-mng").append('<tr>' + '<td class="text-capitalize">' + val + '</td>' +
                '<td><a  class="icon-table" onclick=""><i class="fa fa-check color-active"></i></a></td>' +
                '<td><a  class="icon-table disabled"><i class="fa fa-ban color-delete"></i></a></td></tr>');
        }
    });

    DatatablesExec();
}

function activate(a) {

}
