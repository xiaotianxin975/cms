const Router = require('koa-router');

const router = new Router();

const path = require('path');

const fs = require('fs');

const koaBody = require('koa-body');

const {addProduct} = require('../../controller/db.js');
router.post('/v1/api/addnewpro', koaBody({
    //多个文件传输
   multipart:true,
   formidable:{
       maxFieldsSize:200 * 1024 * 1024
   }
}),async (ctx) => {

    console.log(ctx.request.body,'11');
    console.log(ctx.request.files, '22');
    // let userid = ctx.cookies.get('userid');
    let {productInfor} = ctx.request.body;
    productInfor = JSON.parse(productInfor);
    let picurl = '';
    if(ctx.request.files.productpic) {
        let {productpic} = ctx.request.files;
        let rStream = fs.createReadStream(productpic.path);
        picurl = '/upload/' + Math.floor(Math.random()* 100000) + productpic.name;
        let str = path.join(process.cwd(), '/static' + picurl)
    
        const wStream = fs.createWriteStream(str);

        rStream.pipe(wStream);

        // ctx.body = {
        //     status:0,
        //     msg:'上传成功',
        //     imgSrc:picurl
        // }
    }
    if(productInfor) {
        await addProduct({
            ...productInfor,
            propic:picurl
        })
    }
    ctx.body = ctx.request.body;
    // if(userid) {
    //     let userpic = ctx.request.files.userpic;

    //     let rStream = fs.createReadStream(userpic.path);
    //     let picurl = '/upload/' + Math.floor(Math.random()* 100000) + userpic.name;
    //     let str = path.join(process.cwd(), '/static' + picurl)
   
    //     const wStream = fs.createWriteStream(str);

    //     rStream.pipe(wStream);

    //     // let resultPic = await updata({
    //     //     userid, 
    //     //     userpic:picurl
    //     // })   
    //     ctx.body = {
    //         status:0,
    //         msg:'上传成功',
    //         imgSrc:picurl
    //     }
    // }
})
module.exports = router;