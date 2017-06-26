/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    menu();
    management_table();


    var table = $('#table-mng').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching":false,
        "ordering": true,
        "order": [ 0, 'asc' ],
        "info": true,
        "autoWidth": false,
        "pageLength":5
    });
});



function management_table() {
    var product = ['Tarjeta de Coordenadas','VISA ****1730','Chequera 1234','Chequera 1235'];
    var active = ['false','true','true','false'];

    $.each(product,function (i,val) {
        if (active[i] === 'true') {
            $("#body-table-mng").append('<tr>'+'<td class="text-capitalize">' +val+ '</td>'+
            '<td><a  class="icon-table disabled"><i class="fa fa-check color-active"></i></a></td>' +
            '<td><a  class="icon-table" href="#"><i class="fa fa-ban color-delete"></i></a></td></tr>' );
        }
        else {
            $("#body-table-mng").append('<tr>' + '<td class="text-capitalize">' + val + '</td>' +
                '<td><a  class="icon-table" href="#"><i class="fa fa-check color-active"></i></a></td>' +
                '<td><a  class="icon-table disabled"><i class="fa fa-ban color-delete"></i></a></td></tr>');
        }
    })
}


