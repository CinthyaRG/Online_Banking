/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){
    menu();
    change_input();

    $("#show-hide-passwd").click(function(e){
      e.preventDefault();
      var current = $(this).attr('action');

      if (current == 'hide'){
        $("#password").attr({type: 'text'});
        $(this).removeClass('fa-eye-slash').addClass('fa-eye').attr('action','show');
      }
      if (current == 'show'){
        $("#password").attr({type: 'password'});
        $(this).removeClass('fa-eye').addClass('fa-eye-slash').attr('action','hide');
      }
    });
});

function change_input() {
    var email = "mperez@gmail.com";
    var quest1 = "Nombre de mi primera mascota";
    var answ1 = "walle";
    var quest2 = "Ciudad favorita de mi pais";
    var answ2 = "merida";


    $("#email_user").val(email);
    $("#quest1").val(quest1);
    $("#answ1").val(answ1);
    $("#quest2").val(quest2);
    $("#answ2").val(answ2);
}
