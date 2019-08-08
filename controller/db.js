const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'test'
})

connection.connect(() => {
    console.log('数据库启动成功');
})

async function select(opt) {
    //SELECT * FROM `logintable` WHERE `username` LIKE 'aa' AND `password` LIKE '%123%' LIMIT 0, 1000
    let sql = 'SELECT * FROM `logintable` WHERE ' +  Object.keys(opt).map(function(item) {
        return `${item}='${opt[item]}'`
    }).join(' AND ');
    return new Promise((resolve, reject) => {
        console.log(sql);
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
            }else {
                resolve(result);
            }
        })
    })
}
//添加
async function insert(opt) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO logintable(username, password) VALUES(?,?)`,[opt.username, opt.password], function(err, result) {
            if(err) {
                reject(err);
            }else {
                resolve(result);
            }
        })
    })
}

//更新 UPDATE `logintable` SET `userpic`='12345' WHERE (`id`='3')

async function updata(opt) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE logintable SET userpic='${opt.userpic}' WHERE (id='${opt.userid}')`, (err, result) => {
            if(err) {
                reject(err);
            }else {
                resolve(result);
            }
        })
    })
}

//UPDATE `logintable` SET `password`='1234', `email`='1308131855@qq.com', `phone`='123', `confirmpwd`='1234' WHERE (`id`='4')
async function updateinfo(opt) {
    let sql = `UPDATE logintable SET password='${opt.password}', email='${opt.email}', phone='${opt.phone}', confirmpwd='${opt.confirmpwd}' WHERE (id='${opt.id}')`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
            }else {
                resolve(result);
            }
        })
    })
}

//DELETE FROM `logintable` WHERE (`id`='4')
async function deleteData(opt) {
    let sql = `DELETE FROM logintable WHERE (id='${opt.id}')`;
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if(err) {
                reject(err);
            }else {
                resolve(result);
            }
        })
    })
}

//添加
async function addProduct(opt) {
    let {productname, desc, oprice, newprice,propic}=opt;
    console.log(productname, desc, oprice, newprice,propic,11111)
    //INSERT INTO productlist (productname, desc, oprice, newoprice, productpic) VALUES (?, ?, ?, ?, ?)
    //INSERT INTO `productlist` (`productname`, `desc`, `oprice`, `newprice`, `productpic`) VALUES ('黄瓜', '特别好吃', '15', '10', 'aa')
    return new Promise((resolve, reject) => {
        // let sql = `INSERT INTO productlist (productname, desc, oprice, newprice, productpic) VALUES (?, ?, ?, ?, ?)`;
        // 
        connection.query('INSERT INTO `productlist` (`productname`, `desc`, `oprice`, `newoprice`, `productpic`) VALUES (?, ?, ?, ?, ?)',
        [productname, desc, oprice, newprice,propic],
        (err, result) => {
            if(err) {
                reject(err);
            }else {
                resolve(result);
            }
        })
    })
}
module.exports = {
    insert,
    select,
    updata,
    updateinfo,
    deleteData,
    addProduct
};