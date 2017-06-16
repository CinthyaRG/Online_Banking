/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

$(document).ready(function (){
    drop_account();
});

function drop_account(){
    var account = ['Ahorro ****2222', 'Corriente ****1234']

    $.each(account,function (i,val) {
        if (i ===0) {
            $("#account").append('<option value="'+i+'" selected="selected"> '+val+'</option>');
        }
        else {
           $("#account").append('<option value="'+i+'"> '+val+'</option>');
        }
    })
}

$(function () {
    $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "pageLength":5
    });
});
