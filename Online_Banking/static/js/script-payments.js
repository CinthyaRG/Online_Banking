/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    menu();
    payments_table();

    var table = $('#table-payments').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching":true,
        "ordering": true,
        "order": [ 0, 'asc' ],
        "info": true,
        "autoWidth": false,
        "pageLength":5
    });
});



function payments_table() {
    var alias = ['','','movistar de papa','electricidad mi casa','tdc mama','mi digitel'];
    var name = ['pago prestamo','TDC propias','movistar','electricidad caracas',
        'TDC mismo banco', 'digitel'];
    var type = ['Prestamo','TDC','Recarga','Servicio','TDC','Recarga'];
    var product = ['prestamo-17897001','VISA ****1730','04142342211','000018219311',
        'MASTERCARD ****3256','04127330101'];

    $.each(name,function (i,val) {
        $("#body-table-pay").append('<tr>' +
            '<td>' +alias[i]+ '</td>' +
            '<td class="text-bold text-capitalize">' +val+ '</span></td>' +
            '<td>' +type[i]+ '</td>' +
            '<td class="text-bold text-capitalize">' +product[i]+ '</td>' +
            '<td><a href="#"><i class="fa fa-pencil color-icon"></i>' +
            '<a data-toggle="modal" href="#Modal-Delete-Payments">' +
            '<i class="fa fa-close color-delete"></i></td>' +
            '</tr>')
    })
}




