/**
 * Created by Cinthya C. Ramos G. on 16/6/2017.
*/

$(document).ready(function (){
    menu();
});

var path = window.location.href.split('/');

function DatatablesExec() {
    var table = $('#table-mng').DataTable({
        "paging": false,
        "lengthChange": false,
        "searching": false,
        "destroy": true,
        "ordering": false,
        "info": false,
        "autoWidth": true,
        "language": {
            "emptyTable": "No tiene productos que activar o desactivar"
        }
    });

}


function management_table(management) {
    $("#body-table-mng").empty();
    var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/get-cardCoord/";


    $.ajax({
        url: url,
        origin: 'localhost:8000',
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.user_exists) {
                management[0].push(String(data.coor[0]).replace(/\s/g,'_').replace(/:/g,' '));
                management[1].push(data.coor[1]);

                $.each(management[0],function (i,val) {
                    var value =  val.split(' ');
                    var val_act = String(value[1] + '-act');
                    var val_des = String(value[1] + '-des');
                    value = value[0]+'-'+value[1];
                    if (String(management[1][i]) === 'true') {
                        $("#body-table-mng").append('<tr>'+'<td class="text-capitalize">' +val.replace(/_/g,' ')+ '</td>'+
                            '<td><a id="'+ val_act +'" class="icon-table activ disabled"><i class="fa fa-check color-active"></i></a></td>' +
                            '<td><a id="'+ val_des +'" class="icon-table desactiv" onclick="desactivate('+"'"+String(val_des)+"'"+","+"'"+String(value)+"'"+')">' +
                            '<i class="fa fa-ban color-delete"></i></a></td></tr>' );
                    }
                    else {
                        $("#body-table-mng").append('<tr>' + '<td class="text-capitalize">' + val.replace(/_/g,' ') + '</td>' +
                            '<td><a id="'+ val_act + '" class="icon-table activ" onclick="activate('+"'"+String(val_act)+"'"+","+"'"+String(value)+"'"+')">' +
                            '<i class="fa fa-check color-active"></i></a></td>' +
                            '<td><a id="'+ val_des + '" class="icon-table desactiv disabled"><i class="fa fa-ban color-delete"></i></a></td></tr>');
                    }
                });

                DatatablesExec();
            }
        }
    });

}

function activate(a,b) {
    var url;
    notification_success('Activando producto....');
    setTimeout(function(){
        if (b.includes('Tarjeta')) {
            url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/status-cardCoord/";
            a = a.split('-');

            $.ajax({
                url: url,
                origin: 'localhost:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                type: 'GET',
                dataType: 'json',
                data: {
                    s: a[0],
                    action: a[1]
                },
                success: function (data) {
                    if (data.user_exists) {
                        notification_success('Su Tarjeta de Seguridad se activó correctamente');
                        setTimeout(function(){
                            notification_success('Actualizando.....');
                            setTimeout(function(){
                                location.reload();
                            }, 1000);
                        }, 3500);
                    }
                    else {
                        notification_error(data.error);
                    }
                }
            })
        }
        else {
            url = path[0] + "/" + path[1] + "/" + "localhost:8001" + "/ajax/status-product/";
            a = a.split('-');

            $.ajax({
                url: url,
                origin: 'localhost:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                type: 'GET',
                dataType: 'json',
                data: {
                    num: $('#abc').text(),
                    p: b,
                    action: a[1]
                },
                success: function (data) {
                    if (!(data.product)){
                        notification_error(data.msg);
                    }
                    else{
                        if (data.correct){
                            notification_success(data.msg);
                            send_email(b,a[1]);
                            setTimeout(function(){
                                notification_success('Actualizando.....');
                                setTimeout(function(){
                                    location.reload();
                                }, 1000);
                            }, 3500);
                        }
                        else {
                            notification_error(data.msg);
                        }
                    }
                }

            })
        }
    }, 1500);

}

function desactivate(a,b) {
    var url;
    notification_success('Desactivando producto....');
    setTimeout(function(){
        if (b.includes('Tarjeta')) {
            url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/status-cardCoord/";
            a = a.split('-');

            $.ajax({
                url: url,
                origin: 'localhost:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                type: 'GET',
                dataType: 'json',
                data: {
                    s: a[0],
                    action: a[1]
                },
                success: function (data) {
                    if (data.user_exists) {
                        notification_success('Su Tarjeta de Seguridad se desactivó correctamente. Para su nuevo ingreso en ' +
                            'la aplicación debe generar una nueva para realizar operaciones especiales.');
                        setTimeout(function(){
                            notification_success('Actualizando.....');
                            setTimeout(function(){
                                location.reload();
                            }, 1000);
                        }, 3500);
                    }
                    else {
                        notification_error(data.error);
                    }
                }
            })
        }
        else {
            url = path[0] + "/" + path[1] + "/" + "localhost:8001" + "/ajax/status-product/";
            a = a.split('-');

            $.ajax({
                url: url,
                origin: 'localhost:8000',
                headers: {'X-CSRFToken': getCookie('csrftoken')},
                type: 'GET',
                dataType: 'json',
                data: {
                    num: $('#abc').text(),
                    p: b,
                    action: a[1]
                },
                success: function (data) {
                    if (!(data.product)){
                        notification_error(data.msg);
                    }
                    else{
                        if (data.correct){
                            notification_success(data.msg);
                            send_email(b,a[1]);
                            setTimeout(function(){
                                notification_success('Actualizando.....');
                                setTimeout(function(){
                                    location.reload();
                                }, 1000);
                            }, 3500);
                        }
                        else {
                            notification_error(data.msg);
                        }
                    }
                }

            })

        }
    }, 1500);

}

function send_email(a,b) {
    var url = path[0] + "/" + path[1] + "/" + path[2] + "/ajax/send-email/";

    $.ajax({
        url: url,
        origin: 'localhost:8000',
        headers: {'X-CSRFToken': getCookie('csrftoken')},
        type: 'GET',
        dataType: 'json',
        data: {
            p: String(a).replace('-',' ')+' '+String(b)
        }
    })
}