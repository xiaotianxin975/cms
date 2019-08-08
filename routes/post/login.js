const Router = require('koa-router');

const router = new Router();

const {insert, select} = require('../../controller/db.js');

router.post('/v1/api/login', async (ctx) => {
    let result = await select(ctx.request.body);
    console.log(result,'123');
    if(result.length <= 0) {
        ctx.body = {
            status:1,
            msg:'登录失败，用户名或密码错误'
        };
    }else {
        ctx.cookies.set('userid',result[0].id, {
            //年龄
            maxAge:1000000*1000000,
            //有效期
            expires:new Date('2019/8/6')
        })
        ctx.body = {
            status:0,
            msg:'登录成功',
            id: result[0].id,
            redirect:'/personal'
        }
    }
})


module.exports = router;