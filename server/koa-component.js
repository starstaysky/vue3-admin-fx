var koa = require('koa')
var fs = require('fs')
var app = new koa()
var Router = require('koa-router')
const serve = require('koa-static')
const router = new Router()
app.use(serve(__dirname +'/dist', {extentions: ['html']}))
var myLogger = function (ctx, next) {
    console.log('LOGGED')
    next()
  }
  
app.use(myLogger)
// fs.readFile(__dirname + '/json.json', 'utf8', async (err, data) => {
//     console.log(data, 'data')
// })
// setTimeout(() => {
//     console.log('settime')
// }, 1000);
// setImmediate((a)=>{
//     console.log('setImmediate', 'bbb')
// })

// setImmediate(function (){
//     setImmediate(function A() {
//       console.log(1);
//       setImmediate(function B(){console.log(2);});
//     });
  
//     setTimeout(function timeout() {
//       console.log('TIMEOUT FIRED');
//     }, 0);
//   });

// new Promise(function (resolve) {
//     console.log('promise1')
//     resolve();
//     console.log('promise2')
//   }).then(function () {
//    console.log('promise3')
//   })
//   process.nextTick(()=> {
//     console.log('process')
// })
// app.use(async (ctx, next) => {
//     console.log(1);
//     await next();
//     console.log(2);
// });

// app.use(async (ctx, next) => {
//     ctx.cookies.set('xsj', 'bd')
//     console.log(3);
//     await next();
//     console.log(4);
// });
router.get('/login', async (ctx, next) => {
    console.log('login')
    ctx.response.body = {
        code : 1,
        message: '我是login'
    }
    console.log('7')
})
app.use(async (ctx, next) => {
    console.log(5);
    ctx.body = 'Hello World';
    // await next();
    console.log(6);
    ctx.response.etag= 'fsfdsfdsfds'
});
app.use(router.routes());


app.listen(3000, function(err) {
    console.log('listen', err)
});