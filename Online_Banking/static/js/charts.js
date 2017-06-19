/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    chart();

});

function chart() {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Meses', 'Activos', 'Pasivos'],
            ['Enero',  1000,      400],
            ['Febrero',  1170,      460],
            ['Marzo',  660,       1120],
            ['Abril',  1030,      540],
            ['Mayo',  1170,      460],
            ['Junio',  660,       1120]
        ]);

        var options = {
            title: 'Últimos Movimientos',
            /*chartArea: {width:'85%'},
            width: 910,*/
            height: 230,
            legend: {alignment:'center', position: 'top',
                textStyle: {fontSize: 15,bold: true}},
            backgroundColor: '#ECF0F5',
            colors: ['#438D88','#B5BBC8'],
            hAxis: {title: 'Meses del año actual',  titleTextStyle: {color: '#000'}},
            vAxis: {title: 'En miles de Bs.',minValue: 0}
        };

        var chart = new google.visualization.AreaChart(document.getElementById('graph'));
        chart.draw(data, options);
    }
}