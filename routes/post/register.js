const Router = require('koa-router');

const router = new Router();

const {insert, select} = require('../../controller/db.js');

router.post('/v1/api/register', async (ctx) => {
    let result = await select({
        username:ctx.request.body.username
    });
    console.log(result);
    if(result.length <= 0) {
        let ins = await insert(ctx.request.body);
        ctx.body = {
            status:0,
            msg:'注册成功'
        };
    }else {
        ctx.body = {
            status:1,
            msg:'注册失败，用户名已存在'
        }
    }
})


module.exports = router;