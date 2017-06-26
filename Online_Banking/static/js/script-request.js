/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    menu();
    drop_num_cheq();
    drop_agen();
    drop_account();

});



function drop_num_cheq() {
    var num = ['25', '50'];

    $.each(num,function (i,val) {
        if (i === 0) {
            $("#num-cheq").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else {
           $("#num-cheq").append('<option value="'+(i+1)+'"> '+val+'</option>');
        }
    })
}


function drop_agen() {
    var bank = ['La California', 'C.C. Lider', 'C.C. Millenium', 'Av. Rómulo Gallegos', 'Av. Luis Roche',
    'Centro Plaza', 'C.C. Sambil', 'C.C.C.T', 'Santa Mónica','La Trinidad', 'Boulevard Sabana Grande',
    'Plaza Venezuela','C.C. Metrocenter', 'C.C. Propatria', 'C.C. La Cascada', 'El Silencio', 'Materidad',
    'C.C. Multiplaza Paraiso', 'C.C. Galerias Ávila'];

    $("#agen_bank").append('<option value="'+'0'+'" selected="selected">' +'Seleccione'+'</option>');

    $.each(bank.sort(),function (i,val) {
           $("#agen_bank").append('<option value="'+val+'"> '+val+'</option>');
    })
}


function hab_des_text(valor) {
    if (valor === 1) {
        $("#name_reference").removeAttr("disabled");
    }
    else if (valor === 2){
        $("#name_reference").val("");
        $("#name_reference").attr("disabled","disabled");
    }
}


function drop_account(){
    var account = ['Ahorro ****2222', 'Corriente ****1234'];

    $("#account").append('<option value="'+'0'+'" selected="selected">' +'Seleccione'+'</option>');

    $.each(account,function (i,val) {
           $("#account").append('<option value="'+val+'"> '+val+'</option>');
    })
}


