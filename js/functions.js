function SerializeDataToJSON(id){
    var form = $('#'+id).serializeArray();
    var formObject = {};
    $.each(form,
        function(i, v) {
            formObject[v.name] = v.value;
        });
    return JSON.stringify (formObject);
}
function setCookie(cname, cvalue, lifeLength) {
    var d = new Date();
    d.setTime(d.getTime() + (lifeLength*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
function Register(id){
    $('#reg-infobox').html('Fancy spinning animation');
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://wi-back.com/app_dev.php/user/register",
        data: SerializeDataToJSON(id),
        success : function(data) {
            console.log( "success!" );
            console.log( data );
            $('#reg-infobox').html('success!');
            setCookie('token', data.token, data.lifeLength)
            setTimeout(function(){ window.location.href = '/dashboard.html'; }, 200);
        },
        error: function(data) {
            console.log( "error!" );
            console.log( data );
            $('#reg-infobox').html(data.responseJSON.errorText);
        }
    });
    return false;
}

function Login(id){
    $('#login-infobox').html('Fancy spinning animation');
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://wi-back.com/app_dev.php/user/login",
        data: SerializeDataToJSON(id),
        success : function(data) {
            console.log( "success!" );
            console.log( data );
            $('#login-infobox').html('success!');
            setCookie('token', data.token, data.lifeLength)
            setTimeout(function(){ window.location.href = '/dashboard.html'; }, 200);
        },
        error: function(data) {
            console.log( "error!" );
            console.log( data );
            $('#login-infobox').html(data.responseJSON.errorText);
        }
    });
    return false;
}

function LogOut(){
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "http://wi-back.com/app_dev.php/user/logout",
        data: JSON.stringify({ token : getCookie('token')}),
        success : function(data) {
            console.log( "success!" );
            $('#message').html('Logged out');
            eraseCookie('token');
            setTimeout(function(){ window.location.href = '/'; }, 2000);

        },
        error: function(data) {
            console.log( "error!" );
        }
    });
}