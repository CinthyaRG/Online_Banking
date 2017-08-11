/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){
    menu();

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

function change_input(a,b,c,d,e) {
    var quest1 = "Nombre de mi primera mascota";
    var answ1 = "walle";
    var quest2 = "Ciudad favorita de mi pais";
    var answ2 = "merida";


    $("#email_user").val(a);
    $("#quest1").val(b);
    $("#answ1").val(c);
    $("#quest2").val(d);
    $("#answ2").val(e);
}
