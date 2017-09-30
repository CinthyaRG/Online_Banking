/**
 * Created by Cinthya C. Ramos G. on 16/6/2017.
 */

/**
    Función chart, se encarga de conectarse con el api de google chart
    y cargar el gráfico correspondiente a los activos y pasivos del
    cliente que haya iniciado sesión, de los últimos seis meses.

    Parámetros:
        a: lista que contiene los meses a grficar con sus respectivos activos
            y pasivos del cliente.

*/
function chart(a) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable(a);

        var options = {
            title: 'Últimos Movimientos',
            height: 230,
            legend: {alignment:'center', position: 'top',
            textStyle: {fontSize: 15,bold: true}},
            backgroundColor: '#ECF0F5',
            colors: ['#438D88','#B5BBC8'],
            hAxis: {title: 'Meses del año actual',  titleTextStyle: {color: '#000'}},
            vAxis: {title: 'En Bs.',minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('graph'));
        chart.draw(data, options);
    }
}