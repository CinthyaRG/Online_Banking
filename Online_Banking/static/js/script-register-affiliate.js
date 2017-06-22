/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){
    drop_bank();

    $('li').removeClass("active");
    $("#num-acc").val("");
    $("#ci").attr({maxlength:"8"});

    $("#bank").change(function () {
        $.getJSON('static/js/bank.json', function (data) {
            $.each( data, function( key, val ) {
                if ($("#bank").val() === val.codigo) {
                    $("#num-acc").val(val.codigo);
                }
            });
        });
    });

    $("#select-ci").change(function () {
        if ($("#select-ci").val() === "V-" || $("#select-ci").val() === "E-") {
            $("#ci").val("");
            $("#ci").attr({maxlength:"8"});
        }
        else {
            $("#ci").val("");
            $("#ci").attr({maxlength:"9"});
        }
    })

});


function drop_bank(){
    $("#bank").append('<option value="'+'0'+'"> '+'Seleccione '+'</option>');
    $.getJSON('static/js/bank.json', function (data) {
      $.each( data, function( key, val ) {
          $("#bank").append('<option value="'+val.codigo+'"> '+val.banco+'</option>');
      });
    })
}


