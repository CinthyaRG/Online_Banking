<?php
session_start();

if (isset($_POST['newdate'])) {
    //print_r($_POST);   
    //[fecha] => 29/02/2012 05:36
    //echo '<h2>Fecha seleccionada: '.$_POST['fecha'].'</h2>';
    $partes = explode(' ', $_POST['fecha']);
    $dmy = explode('/', $partes[0]);
    $_SESSION['dia'] = $dmy[0];
    $mes = (int)$dmy[1];
    $_SESSION['mes'] = $mes-1;
    $_SESSION['ano'] = $dmy[2];
    $h = explode(':', $partes[1]);
    $_SESSION['hora'] = $h[0];
    $_SESSION['minuto'] = $h[1];
    $_SESSION['segundo'] = '00';
    
}
else {
    $_SESSION['dia'] = '25';
    $_SESSION['mes'] = '1'; // los meses van del 0 al 11
    $_SESSION['ano'] = '2012';
    $_SESSION['hora'] = '16';
    $_SESSION['minuto'] = '20';
    $_SESSION['segundo'] = '00';
}

?>
<html>
    <head>
        <title>Countdown versión 3.0 Mejorada</title>
        <style>
            .element {
                font-family: arial,verdana,helvetica,sans-serif;
                font-size: 32px;
                color: #757575;
                background: url("nodo_bg.jpg") repeat-x scroll left top transparent;
                border: 1px solid #D8D8D8;
                height: 32px !important;
                margin: 0 6px;
                padding: 2px 10px 5px !important;
            }
            
            .dias {
                font-size: 9px;
                /*margin-left: 23px;*/
                /*margin-top: 10px;*/
                /*float: left;*/
            }
            
            .horas {
                font-size: 9px;
                margin-left: 57px;
                margin-top: 10px;
                float: left;
            }
            
            .minutos {
                font-size: 9px;
                margin-left: 48px;
                margin-top: 10px;
                float: left;
            }
            
            .segundos {
                font-size: 9px;
                margin-left: 37px;
                margin-top: 10px;
                float: left;
            }
        </style>
        <link type="text/css" href="css/jquery-ui-1.8.13.custom.css" rel="stylesheet" />
        <script type="text/javascript" src="js/jquery-1.5.1.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui-1.8.14.custom.min.js"></script>
        <script type="text/javascript" src="js/jquery-ui-timepicker-addon.js"></script>
        <script type="text/javascript" src="js/jquery.ui.datepicker-es.js"></script>
        <script type="text/javascript">
        
        $(function(){
            $('#datepicker').datetimepicker();
        });
            
        function countdown(id){
            var fecha=new Date('<?=$_SESSION['ano']?>','<?=$_SESSION['mes']?>','<?=$_SESSION['dia']?>','<?=$_SESSION['hora']?>','<?=$_SESSION['minuto']?>','<?=$_SESSION['segundo']?>')
            var hoy=new Date()
            var dias=0
            var horas=0
            var minutos=0
            var segundos=0

            if (fecha>hoy){
                    var diferencia=(fecha.getTime()-hoy.getTime())/1000
                    dias=Math.floor(diferencia/86400)
                    diferencia=diferencia-(86400*dias)
                    horas=Math.floor(diferencia/3600)
                    diferencia=diferencia-(3600*horas)
                    minutos=Math.floor(diferencia/60)
                    diferencia=diferencia-(60*minutos)
                    segundos=Math.floor(diferencia)

                    document.getElementById(id).innerHTML='<span class="element">' + dias + ' dias</span><span class="element">' + horas + ' horas</span><span class="element">' + minutos + ' minutos</span><span class="element">' + segundos + ' segundos</span>'

                    if (dias>0 || horas>0 || minutos>0 || segundos>0){
                            setTimeout("countdown(\"" + id + "\")",1000)
                    }
            }
            else{
                    document.getElementById('restante').innerHTML='<span class="element">' + dias + ' dias</span><span class="element">' + horas + ' horas</span><span class="element">' + minutos + ' minutos</span><span class="element">' + segundos + ' segundos</span>'
            }
        }
        </script>

    </head>

    <body onload="countdown('contador')">
        <?php if (isset($_POST['newdate'])) echo '<h2>Fecha seleccionada: '.$_POST['fecha'].'</h2>';  ?>
        <div id='contador'></div>
        
        <div style="margin-top: 30px;">
            <form action="index2.php" method="post">
                Selecciona fecha <input type="text" id="datepicker" name="fecha" />
                <input type="submit" name="newdate" value="Enviar" />
            </form>
        </div>
    </body>
</html>