/**
 * Created by CinthyaCarolina on 6/8/2017.
 */

function validate_date(a, b) {
    var s = a.split('/');
    var e;
    var date;

    if (b === ''){
        date = new Date();
        e = [date.getDate(), date.getMonth()+1, date.getFullYear()]
    }
    else {
        e = b.split('/');
    }

    var start = new Date(s[2],s[1]-1,s[0]);
    var end = new Date(e[2],e[1]-1,e[0]);

    return start < end

}