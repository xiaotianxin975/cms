const Koa = require('koa');

const app = new Koa();

const static = require('koa-static');//引入静态文件

const bodyparser = require('koa-bodyparser');

const path = require('path');

const requireDirectory = require('require-directory');

const koaView = require('koa-views');

const Router = require('koa-router');//引入路由模块


//挂载静态文件
app.use(static(path.join(process.cwd(),'./static')))

app.use(bodyparser())//所有挂载的post路由都要在他的后面不然解析不到

app.use(koaView(path.join(__dirname,'./static/html'), {
    extension:'html'
    
}))
//动态挂载
requireDirectory(module,'./routes/',{visit:function(modelR){
    if(modelR instanceof Router) {
        app.use(modelR.routes())
    }
}})

//启动服务
app.listen(3006,()=> {
    console.log('服务器启动成功')
})