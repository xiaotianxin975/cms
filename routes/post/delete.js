const Router = require('koa-router');

const router = new Router();

const {deleteData} = require('../../controller/db.js');
router.post('/v1/api/delete', async ctx => {
    await deleteData({
        id:ctx.cookies.get('userid')
    })
    ctx.body = {
        status:0,
        msg:'删除成功',
        redirect:'/login'
    }
})

module.exports = router;