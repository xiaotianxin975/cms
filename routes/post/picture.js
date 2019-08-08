const Router = require('koa-router');

const router = new Router();

const {select} = require('../../controller/db.js');
router.post('/v1/api/picture', async ctx => {
    let resultPic = await select(ctx.request.body);
    ctx.body = resultPic;
})

module.exports = router;