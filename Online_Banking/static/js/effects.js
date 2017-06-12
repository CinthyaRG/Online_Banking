/**
 * Created by CinthyaCarolina on 8/6/2017.
 */

$(document).ready(parpadear);
function parpadear(){
    $('#icon').fadeIn(500).delay(250).fadeOut(500, parpadear)
}

// $(function () {
//     $("#example1").DataTable();
//     $('#example2').DataTable({
//         "paging": true,
//         "lengthChange": false,
//         "searching": false,
//         "ordering": true,
//         "info": true,
//         "autoWidth": false
//     });
// });

$(document).ready(function () {
    $('#step2').css({display: "none"});
    $('#step3').css({display: "none"});
    $('#step4').css({display: "none"});
    $('#step5').css({display: "none"});
    });

$(document).ready(function (){
    var today = new Date().toJSON().slice(0,10);
    var year = parseInt(today.slice(0,4));
    var maxYear = year +10;
    $("#year").append('<option value="'+year+'" selected="selected"> '+year+'</option>');
    year = year + 1;
    while (year < maxYear) {
        $("#year").append('<option value="'+year+'"> '+year+'</option>');
        year = year + 1;
    }
    selectMonth();
});

function selectMonth(){
    var year = $('#year').val();
    var today = new Date().toJSON().slice(0,10);
    var month;
    if (year === "2017") {
        month = parseInt(today.slice(5,7));
    }
    else {
        month = parseInt('01');
    }
    $("#month").empty();
    while (month < 13) {
        $("#month").append('<option value="'+month+'"> '+month+'</option>');
        month = month + 1;
    }
}

function pagNext(numPag) {
    var next = numPag +1;
    var step = '#step';
    var number = '#number';
    $(step+numPag).css({display: "none"});
    $(step+next).css({display: "block"});
    $(number+next).addClass("activate");
    $(number+numPag).removeClass("activate");

}

function pagBack(numPag) {
    var back = numPag -1;
    var step = '#step';
    var number = '#number';
    $(step+numPag).css({display: "none"});
    $(step+back).css({display: "block"});
    $(number+back).addClass("activate");
    $(number+numPag).removeClass("activate");
}

