var koa = require('koa')
var fs = require('fs')
var app = new koa()
var Router = require('koa-router')
const serve = require('koa-static')
const router = new Router()
app.use(serve(__dirname + '/public', { extentions: ['html'] }))
var myLogger = function (ctx, next) {
  console.log('LOGGED')
  next()
}

app.use(myLogger)

router.post('/dev/login', async (ctx, next) => {
  ctx.response.body = {
    code: 0,
    message: '我是login',
    success: true,
    data: {
      user: 'fuxing'
    }
  }
})

app.use(router.routes())
const port = 3002
app.listen(port, function (err) {
  err && app.listen(++port)
})
