/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    menu();

    var table = $('#table-payments').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching":true,
        "ordering": true,
        "order": [ 0, 'asc' ],
        "info": true,
        "autoWidth": false,
        "pageLength":5,
        "language": {
            "emptyTable": "No tiene registrado proveedores de pago"
        }
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
        $("#body-table-pay").append('<tr onclick="move(' +"'datos-pago/"+(i+1)+"')"+'">' +
            '<td><span class="link">' +alias[i]+ '</span></td>' +
            '<td class="text-bold text-capitalize">' +val+ '</span></td>' +
            '<td>' +type[i]+ '</td>' +
            '<td class="text-bold text-capitalize">' +product[i]+ '</td>' +
            '<td><a  class="icon-table" href="#"><i class="fa fa-pencil color-icon"></i></a>' +
            '<a  class="icon-table" data-toggle="modal" href="#Modal-Delete-Payments">' +
            '<i class="fa fa-close color-delete"></i></a></td>' +
            '</tr>')
    })
}




