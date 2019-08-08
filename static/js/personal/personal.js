let file = document.getElementById('file');
let userPicture = document.getElementById('userPic');
let $ = function(id) {
    return document.getElementById(id)
}

//上传图片
file.onchange = function() {
    let form = new FormData();
    //添加表单数据
    form.append('userpic', this.files[0]);
    form.append('userid',localStorage.getItem('userid'));

    filePost('/v1/api/upload', form, function(data) {
        let picData = JSON.parse(data);
        setTimeout(() => {
            userPicture.src = picData.imgSrc;        
        }, 1000);
        
    })
}
ajax({
    url:'/v1/api/picture',
    method:'POST',
    async:true,
    data:{
        id: localStorage.getItem('userid')
    },
    success:function(data) {
        console.log(data);
        let data1 = JSON.parse(data);
        if(data1[0].userpic !== null) {
            userPicture.src = data1[0].userpic;
        }else {
            console.log(1);
        }
    }
})

//更新数据
$('update-infor').addEventListener('click', function() {
    // if($('new-password').value !== $('confirmpwd').value) {
    //     console.log('两次密码不一致');
    // }
    ajax({
        url:'/v1/api/updateinfo',
        method:'POST',
        async:true,
        data:{
            username:$('new-username').value,
            email:$('new-email').value,
            password:$('new-password').value,
            confirmpwd:$('confirmpwd').value,
            phone:$('phone').value
        },
        success:function(data) {
            let data1 = JSON.parse(data);
            if(data1.status === 0) {
                location.href = data1.redirect;
            }
        }
    })
})
//删除数据
$('delete').addEventListener('click', function() {
    ajax({
        url:'/v1/api/delete',
        method:'POST',
        async:true,
        data:{},
        success:function(data) {
            console.log(data);
            let data1 = JSON.parse(data);
            if(data1.status === 0) {
                location.href = data1.redirect;
            }
        }
    })
})