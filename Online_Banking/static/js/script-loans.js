/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    drop_loan();
});

function drop_loan(){
    var loan = ['17897001', '12345343'];
    var path = window.location.pathname.split('/');
    var key = parseInt(path[2])-1;

    $.each(loan,function (i,val) {
        if (key === i) {
            $("#loan_drop").append('<option value="'+(i+1)+'" selected="selected"> '+val+'</option>');
        }
        else {
           $("#loan_drop").append('<option value="'+(i+1)+'"> '+val+'</option>');
        }
    })
}




