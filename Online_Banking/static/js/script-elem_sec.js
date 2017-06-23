/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){

});

function move_back_security() {
    var url = document.referrer.split('/');

    if (url[3] === 'consultar-cuenta' ) {
        window.history.back();
    }
    else {
        url = window.location.href.split('/');
        var new_url = url[0]+'/'+url[1]+'/'+url[2]+'/'+'inicio';
        location.href= new_url;
    }
}

function move_security(id_body,id_sec) {
    $(id_sec).css({display:'none'});
    $(id_body).css({display:'block'});
}