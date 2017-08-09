/**
 * Created by CinthyaCarolina on 7/8/2017.
 */

function notification_success(msg) {
    $(function(){
        var stack = {"dir1": "down",
            "dir2": "left",
            "firstpos2": 10,
            "firstpos1": 80
        };
        new PNotify({
            text:msg,
            buttons: {
                closer: false,
                sticker: false
            },
            styling: 'bootstrap3',
            type: 'success',
            stack: stack
        });
    });
}

function notification_error(msg) {
    $(function(){
        var stack = {"dir1": "down",
            "dir2": "left",
            "firstpos2": 10,
            "firstpos1": 80
        };
        new PNotify({
            text:msg,
            buttons: {
                closer: false,
                sticker: false
            },
            styling: 'bootstrap3',
            type: 'error',
            stack: stack
        });
    });
}