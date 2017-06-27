/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    menu();
    drop_num_cheq();
    drop_agen();
    drop_account();
    tarj_coor();

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


function tarj_coor() {
    var c= "";
    var i, j;
    // $.getJSON('static/js/coord.json', function (data) {
    //     $.each( data, function( key, val ) {
    //             $.each( val, function( k, v ) {
    //                 $("#codes").append('<option value="' +k+ '"> ' +v+ '</option>');
    //             })
    //         })
    //     });
    var coor = [['123', '123', '333', '444', '555', '666'],
        ['333', '333', '222', '986', '444', '111'],
        ['422', '555', '222', '000', '223', '555'],
        ['666', '765', '444', '332', '444', '634'],
        ['555', '234', '088', '654', '234', '765']];

    c+='<table  id="table_coor">';
    c+='<tr><td></td>'+'<td align="center"><strong>A</strong></td>'+
    '<td align="center"><strong>B</strong></td>' +
    '<td align="center"><strong>C</strong></td>' +
    '<td align="center"><strong>D</strong></td>' +
    '<td align="center"><strong>E</strong></td>' +
    '<td align="center"><strong>F</strong></td>' +
    '<td class="td-w"></td></tr>';
    for ( i = 0; i < 5; i++) {
        c+='<tr><td class="col-xs-1" align="center"><strong>'+(i+1)+'</strong></td>';
        for ( j = 0; j < 6; j++) {
            c+='<td class="td-border"><p class="col-xs-1 top-p">'+coor[i][j]+'</p></td>';
        }
        c+='</tr>';
    }
    c+='<tr class="height-20"></tr>';
    c+='</table>';
    c+='<div class="row"><div class="col-md-4"></div>' +
        '<div class="col-md-8"><p class="text-bold pull-right"> Serial 1234567</p>' +
        '</div></div>';

    $('#tarj-coor').append(c);

}


