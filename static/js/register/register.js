var $ = function(id) {
    return document.getElementById(id)
}

$('register').onclick = function() {
    console.log(1);
    ajax({
        url:'/v1/api/register',
        method:'POST',
        async:true,
        data:{
            username:$('username').value,
            password:$('password').value
        },
        success: function() {

        }
    })
}