/**
 * Created by CinthyaCarolina on 16/6/2017.
 */

function move(url) {
    var path = window.location.href.split('/');
    var new_url = path[0]+'/'+path[1]+'/'+path[2];
    location.href= new_url+'/'+url;
}


function menu() {
    var animationSpeed = $.AdminLTE.options.animationSpeed;
    var path = window.location.pathname.split('/');
    var act_pat = path[1];
    var key = path[2];
    var nivel = 0;

    if (act_pat === "consultar-cuenta") {
        var _this = $('#inquiries');

        if (key === '1') {
            $('#acc-aho').addClass("activate-menu");
        }
        else {
            $('#acc-corr').addClass("activate-menu");
        }
    }
    else if (act_pat === "consultar-tdc") {
        var _this = $('#inquiries');
        $('#tdc').addClass("activate-menu");
    }
    else if (act_pat === "consultar-prestamo") {
        var _this = $('#inquiries');
        $('#prest').addClass("activate-menu");
    }
    else if (act_pat === "transf-mis-cuentas"){
            var _this = $('#transfers');
            $('#my-acc').addClass("activate-menu");
    }
    else if (act_pat === "transf-mi-banco") {
        $('#my-bank').addClass("activate-menu");
        nivel = 1;
        var _this = $('#transfers-others');
    }
    else if (act_pat === "pagos") {
        var _this = $('#payments');
    }
    else if (act_pat === "solicitudes") {
        var _this = $('#request');
    }
    else if (act_pat === "gestion-productos") {
        var _this = $('#management');
    }
    else if (act_pat === "perfil-seguridad") {
        var _this = $('#profile');
    }
    else if (act_pat === "ayuda") {
        var _this = $('#help');
    }
    else {
        $('#other-bank').addClass("activate-menu");
        nivel= 1;
        var _this = $('#transfers-others');
    }

    if (nivel === 0) {
        $('.treeview-menu').not($(_this).children('.treeview-menu')).slideUp(animationSpeed);
        $('li').removeClass("active");
        $(_this).children('.treeview-menu').slideToggle(animationSpeed);
        $(_this).addClass("active");
    }
    else {
        $('.treeview-menu').not($(_this).children('.treeview-menu')).slideUp(animationSpeed);
        $('li').removeClass("active");
        $(_this).children('.treeview-menu').slideToggle(animationSpeed);
        $(_this).addClass("active");
        $("#transfers").addClass("active");
        $("#transf-other").addClass("activate-menu");
    }
}


function change_drop(id) {
    var path = window.location.href.split('/');
    var url = path[0]+'/'+path[1]+'/'+path[2]+'/'+path[3];
    var valor = parseInt($(id).val());
    location.href= url+'/'+valor;
}
