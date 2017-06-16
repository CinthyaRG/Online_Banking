/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

// function move_menu(url) {
//     alert("aqui");
//     location.href= url;
//
//     var animationSpeed = $.AdminLTE.options.animationSpeed;
//     $('.treeview-menu').not($(this).children('.treeview-menu')).slideUp(animationSpeed);
//     $('li').removeClass("active");
//     $('#inquiries').children('.treeview-menu').slideToggle(animationSpeed);
//     $('#inquiries').addClass("active");
//     $('#inquiries').children('.treeview-menu').addClass("menu-open");
//     alert("aqui");
//     $('#abc').children('.treeview-menu').slideToggle(animationSpeed);
//     $('#abc').addClass("active");
//     $('#abc').children('.treeview-menu').addClass("menu-open");
//
// }

$(document).ready(function (){
    append();
});

function append() {
    $("#section").append('<h1 class="text-capitalize margin-l-45">gráfico de productos</h1>'+
                '<div class="row">'+
                    '<div class="col-md-2"></div>'+
                    '<div class="col-md-10 col-lg-10 margin-l-45">'+
                        '<div class="img-graph" id="graph"></div>
                    '</div>
                </div>'
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <div class="box">
                            <div class="box-header">
                                <h3 class="box-title">Activos</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body no-padding">
                                <table class="table table-bordered table-condensed text-center">
                                    <tbody><tr class="bg-gray bg-gray-active">
                                        <th>Tipos de Cuenta</th>
                                        <th>Números de Cuenta</th>
                                        <th>Estado</th>
                                        <th>Saldo Disponible</th>
                                    </tr>
                                    <tr class="cursor" onclick="move_menu('consultar-cuenta'); return false;">
                                        <td>Ahorros</td>
                                        <td>017600**********2222</td>
                                        <td>Activa</td>
                                        <td class="text-bold">Bs. 172.096,77</td>
                                    </tr>
                                    <tr class="cursor" onclick="move_menu('consultar-cuenta'); return false;">
                                        <td>Corriente</td>
                                        <td>017602**********1234</td>
                                        <td>Activa</td>
                                        <td class="text-bold">Bs. 36.289,24</td>
                                    </tr>
                                    </tbody></table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-1"></div>
                    <div class="col-md-10">
                        <div class="box">
                            <div class="box-header">
                                <h3 class="box-title">Pasivos</h3>
                            </div>
                            <!-- /.box-header -->
                            <div class="box-body no-padding">
                                <table class="table table-bordered table-condensed text-center">
                                    <tbody><tr class="bg-gray bg-gray-active">
                                        <th>Tipos de Tarjeta</th>
                                        <th>Números de Tarjeta</th>
                                        <th>Saldo Actual</th>
                                        <th>Pague antes de</th>
                                    </tr>
                                    <tr class="cursor" onclick="move_menu('consultar-cuenta')">
                                        <td>Visa</td>
                                        <td>4541********1730</td>
                                        <td class="text-bold">Bs.17.089,40</td>
                                        <td>29/06/2017</td>
                                    </tr>
                                    </tbody>
                                    <tbody><tr class="bg-gray bg-gray-active">
                                        <th>Número de Préstamo</th>
                                        <th>Producto Asociado</th>
                                        <th>Monto Pendiente</th>
                                        <th>Pague antes de</th>
                                    </tr>
                                    <tr class="cursor" onclick="location.href= '{% url 'home' %}'">
                                        <td>17897001</td>
                                        <td>Ahorro *****2222</td>
                                        <td class="text-bold">Bs. 56.520,00</td>
                                        <td>24/06/2017</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>');
}
