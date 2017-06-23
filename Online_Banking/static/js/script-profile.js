/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){
    menu();
    change_input();
});

function change_input() {
    var email = "mperez@gmail.com";
    var answ1 = "Nombre de mi primera mascota";
    var resp1 = "walle";
    var answ2 = "Ciudad favorita de mi pais";
    var resp2= "merida";


    $("#email_user").val(email);
    $("#answ1").val(answ1);
    $("#resp1").val(resp1);
    $("#answ2").val(answ2);
    $("#resp2").val(resp2);
}