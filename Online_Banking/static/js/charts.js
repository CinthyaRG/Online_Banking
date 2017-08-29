/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){


});

function chart(a) {
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        alert(typeof(a[1][1]));
        var data = google.visualization.arrayToDataTable(a);

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