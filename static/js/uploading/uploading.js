let $ = function(id) {
    return document.getElementById(id);
} 
console.log($('addProduct'));
let form = new FormData();
$('productpic').onchange = function() {
    console.log(1);
    //读取文件的构造函数，将图片解析成64位的
    let readfile = new FileReader();
    //监听资源加载完成
    readfile.onload = function() {
        console.log(readfile.result);
        //把图片直接显示在image.src里面
        $('propic').src = readfile.result;
    }

    //将你的文件对象传给你的实例
    readfile.readAsDataURL(this.files[0]);

    //将图片存入formData里, 到时候一起发送个后端
    form.append('productpic', this.files[0]);
}

$('addProduct').addEventListener('click', function() {
    var data = {
        productname:$('proname').value,
        desc:$('desc').value,
        oprice:$('oprice').value,
        newprice:$('newprice').value
    }
    form.set('productInfor', JSON.stringify(data));
    filePost('/v1/api/addnewpro', form, function(data) {
        console.log(data);
    })
})