/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    $('li').removeClass("active");

    drop_account_trans();

    $("#account").change(function () {
        if ($("#account").val() === '1') {
            $("#balance_transf").text("Bs. 172.096,77");
        }
        else if ($("#account").val() === '2'){
            $("#balance_transf").text("Bs. 36.289,24");
        }
        else {
            $("#balance_transf").text("");
        }
    });

});


function drop_account_trans(){
    var account = ['Ahorro ****2222', 'Corriente ****1234'];

    $("#account").append('<option value="'+'0'+'" selected="selected"> '+"Seleccione"+'</option>');
    $.each(account,function (i,val) {
       $("#account").append('<option value="'+(i+1)+'"> '+val+'</option>');
    })
}





