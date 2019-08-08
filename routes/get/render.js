const Router = require('koa-router');

const router = new Router();

//首页
router.get('/', async ctx => {
    // console.log(ctx.cookies.get('userid'));
    if(!ctx.cookies.get('userid')) {
        ctx.redirect('/login');
    }
    await ctx.render('index');
})
//登录
router.get('/login', async ctx => {
    await ctx.render('login');
})
//注册
router.get('/register', async ctx => {
    await ctx.render('register');
})
//个人信息
router.get('/personal', async ctx => {
    if(!ctx.cookies.get('userid')) {
        ctx.redirect('/login');
    }
    await ctx.render('personal');
})
//产品 
router.get('/index1', async ctx => {
    if(!ctx.cookies.get('userid')) {
        ctx.redirect('/login');
    }
    await ctx.render('index1');
})

//设置
router.get('/uploading', async ctx => {
    if(!ctx.cookies.get('userid')) {
        ctx.redirect('/login');
    }
    await ctx.render('uploading');
})

module.exports = router;   