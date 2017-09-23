/**
 * Created by Cinthya C. Ramos G. on 16/6/2017.
*/

$(document).ready(function (){
    menu();

    var table = $('#table-payments').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching":true,
        "ordering": false,
        "info": true,
        "autoWidth": true,
        "pageLength":5,
        "language": {
            "emptyTable": "No tiene registrado proveedores de pago"
        }
    });

    $('#Modal-Delete').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var name = button.data('name');
        var product = button.data('product');
        var url = button.data('url');
        var modal = $(this);
        url = 'delete_service('+url+')';

        modal.find('.modal-body #name-aff').text(name.replace(/_/g, ' '));
        modal.find('.modal-body #product-aff').text(product);
        modal.find('#delete-aff').attr("onclick", url );

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


function delete_service(a) {
    var path = window.location.href.split('/');
    var url = path[0] + "/" + path[1] + "/" + path[2] + "/eliminar-servicio/" + a + '/';
    notification_success('Eliminando servicio.....');
    setTimeout(function(){
        $.ajax({
            url: url,
            origin: 'http://127.0.0.1:8000',
            headers: {'X-CSRFToken': getCookie('csrftoken')},
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    notification_success('Se ha eliminado exitosamente su servicio.');
                    setTimeout(function(){
                        notification_success('Actualizando....');
                        setTimeout(function(){
                            location.reload();
                        }, 1500);
                    }, 1500);
                }
                else{
                    notification_error('Hubo un error eliminando su servicio. Intente nuevamente.');
                }
            }
        })
    }, 3000);
}