/**
 * Created by Cinthya C. Ramos G. on 16/6/2017.
*/

$(document).ready(function (){
    drop_loan();
});

function drop_loan(loan){
    var path = window.location.pathname.split('/');
    var key = parseInt(path[3])-1;

    $("#loan_drop").empty();

    $.each(loan,function (i,val) {
        var d = val[7].split('-');
        var date = d[2] + '/' + d[1] + '/' + d[0];
        d = val[8].split('-');
        var date_expires = d[2][0] + d[2][1] + '/' + d[1] + '/' + d[0];
        if (key === i) {
            $("#loan_drop").append('<option value="'+(i+1)+'" selected> '+val[0]+'</option>');
            $("#product").text(val[1]);
            $("#numInstallments").text(val[4]);
            $('#startingAmount').text( 'Bs. ' +val[5]);
            $('#overdue_amount').text( 'Bs. ' +val[6]);
            $('#paid_amount').text( 'Bs. ' +val[2]);
            $('#date').text(date);
            $('#date_expires').text(date_expires);
            $('#paidInstallments').text(val[9]);
            $('#overdueInstallments').text(val[10]);
        }
        else {
           $("#loan_drop").append('<option value="'+(i+1)+'"> '+val[0]+'</option>');
        }
    })
}




