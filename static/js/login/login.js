var $ = function(id) {
    return document.getElementById(id)
}

$('login').addEventListener('click', function() {
    ajax({
        url:'/v1/api/login',
        method:'POST',
        async:true,
        data:{
            username:$('login-username').value,
            password:$('login-password').value
        },
        success: function(data) {
            let data1 = JSON.parse(data);
            if(data1.status === 0) {
                location.href = data1.redirect;
                localStorage.setItem('userid', JSON.parse(data).id);   
            }else {
                alert(data1.msg);
            }
        }
    })
})
$('register').onclick = function() {
    ajax({
        url:'/v1/api/register',
        method:'POST',
        async:true,
        data:{
            username:$('login-username').value,
            password:$('login-password').value
        },
        success: function() {

        }
    })
}