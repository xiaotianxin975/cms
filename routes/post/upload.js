const Router = require('koa-router');

const router = new Router();

const path = require('path');

const fs = require('fs');

const koaBody = require('koa-body');

const {updata} = require('../../controller/db.js');

router.post('/v1/api/upload', koaBody({
    //多个文件传输
   multipart:true,
   formidable:{
       maxFieldsSize:200 * 1024 * 1024
   }
}),async (ctx) => {
    let userid = ctx.request.body.userid;
    if(userid) {
        let userpic = ctx.request.files.userpic;

        let rStream = fs.createReadStream(userpic.path);
        let picurl = '/upload/' + Math.floor(Math.random()* 100000) + userpic.name;
        let str = path.join(process.cwd(), '/static' + picurl)
   
        const wStream = fs.createWriteStream(str);

        rStream.pipe(wStream);

        let resultPic = await updata({
            userid, 
            userpic:picurl
        })
        ctx.body = {
            status:0,
            msg:'上传成功',
            imgSrc:picurl
        }
    }
})

module.exports = router;