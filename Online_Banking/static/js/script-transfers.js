/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    drop_account();
    menu();
    // $("#balance-acc").style({display:'none'});

    if ($("#account").val() !== '0') {
        $("#balance-acc").css({display:'inline'});
        drop_change($("#account").val());
    }

    $("#account").change(function () {
        if ($("#account").val() !== '0') {
            $("#balance-acc").css({display: 'inline'});
        }
        else {
            $("#balance-acc").css({display: 'none'});
        }
        drop_change($("#account").val());
    })
});


function drop_account(){
    $("#account").empty();
    var account = ['Ahorro ****2222', 'Corriente ****1234'];
    var url = document.referrer.split('/');
    var key = '0';
    if (url[3] === 'consultar-cuenta') {
        key = url[4];
    }

    if (key === '0') {
        $("#account").append('<option value="'+'0'+'" selected="selected"> '+"Seleccione"+'</option>');
    }

    $.each(account,function (i,val) {
        if (key === '1' && val.includes("Ahorro")) {
            $("#account").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else if (key === '2' && val.includes("Corriente")) {
            $("#account").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else {
           $("#account").append('<option value="'+(i+1)+'"> '+val+'</option>');
        }
    })
}


function drop_change(key) {
        $("#account2").empty();
        $("#account2").append('<option value="'+'0'+'" selected="selected"> '+"Seleccione"+'</option>');
        var account = ['Ahorro ****2222', 'Corriente ****1234'];

        $.each(account,function (i,val) {
        if (key === '1' && val.includes("Ahorro")) {
            $("#account2").append('<option value="'+(i+1)+'" disabled="disabled"> '+val+'</option>');
        }
        else if (key === '2' && val.includes("Corriente")) {
            $("#account2").append('<option value="'+(i+1)+'" disabled="disabled"> '+val+'</option>');
        }
        else {
           $("#account2").append('<option value="'+(i+1)+'"> '+val+'</option>');
        }
    })
}



