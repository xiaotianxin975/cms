function ajax(opt) {
    let _opt = {
        url:'',
        method:'GET',
        async:true,
        data:{},
        success:null
    }
    let newOpt = Object.assign(_opt, opt);

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            newOpt.success && newOpt.success(xhr.responseText);
        }
    }
    let search = ''
    if(newOpt.method.toUpperCase() === 'GET') {
        search = '?' + Object.keys(newOpt.data).map(function(item) {
            return item + '=' + newOpt.data[item];
        }).join('&');
    }
    xhr.open(newOpt.method, newOpt.url + search, newOpt.async);
    
    let data = null;
    if(newOpt.method.toUpperCase() === 'POST') {
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');

        data = Object.keys(newOpt.data).map(function(item) {
            return item + '=' + newOpt.data[item];
        }).join('&');
        console.log(data);
    }
    xhr.send(data);
}
  
function filePost(url, fileData, callback) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
            callback && callback(xhr.responseText);
        }
    }
    xhr.open('POST', url);
    xhr.send(fileData);
}