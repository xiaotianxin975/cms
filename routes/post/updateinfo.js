const Router = require('koa-router');

const router = new Router();

const {updateinfo} = require('../../controller/db.js');

router.post('/v1/api/updateinfo' ,async ctx => {
    let result = await updateinfo({
        ...ctx.request.body,
        id:ctx.cookies.get('userid')
    })
    ctx.body = {
        status:0,
        msg:'更新成功',
        redirect:'/'  
    };
})

module.exports = router;