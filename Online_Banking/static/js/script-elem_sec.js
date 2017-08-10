/**
 * Created by CinthyaCarolina on 12/6/2017.
 */

$(document).ready(function (){

});

function move_back_security() {
    var url = document.referrer.split('/');

    if (url[3] === 'consultar-cuenta' || url[3] === 'solicitudes' ) {
        window.history.back();
    }
    else {
        url = window.location.href.split('/');
        var new_url = url[0]+'/'+url[1]+'/'+url[2]+'/'+'inicio';
        location.href= new_url;
    }
}

function move_security(id_body,id_sec) {
    move_security('#body_tranf_my_bank','#sec_tranf_my_bank');
    $(id_sec).css({display:'none'});
    $(id_body).css({display:'block'});
}

function elem_Security(a,b,c) {

}