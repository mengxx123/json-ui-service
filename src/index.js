const fs = require('fs')
const path = require('path')
const { createCanvas, Image } = require('canvas')
const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const uuid = require('uuid/v1')
const { NodeCanvas } = require('./canvas-node')
const { root2 } = require('./root2')
const { root3 } = require('./root3')

app.use(bodyParser())

var router = require('koa-router')();  /*引入是实例化路由** 推荐*/




async function make() {
    

    
    let root = {
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        color: '#fff',
        children: [
            {
                type: 'text',
                text: '123'
            }
            // {
            //     x: 0,
            //     y: 0,
            //     width: 100,
            //     height: 100,
            //     color: '#f00',
            // },
        ]
    }

    
    

    let canvas2 = new NodeCanvas()
    await canvas2.render(root2)
    canvas2.exportPng('tmp/test2.png')

    let canvas3 = new NodeCanvas()
    await canvas3.render(root3)
    canvas3.exportPng('tmp/test3.png')




    // const ctx = canvas.getContext('2d')

    // ctx.fillStyle = '#fff'
    // ctx.fillRect(0, 0, 200, 200)

    // ctx.fillStyle = '#000'
    // // Write "Awesome!"
    // ctx.font = '30px Impact'
    // // ctx.rotate(0.1)
    // ctx.fillText('Awesome!', 50, 100)

    // let img = await getImage('https://app.yunser.com/static/img/logo_64.png')
    
    // // const img = new Image()
    // // img.onload = () => {
    // //     console.log('onload')
    // //     ctx.drawImage(img, 0, 0)
    // // }
    // // img.onerror = err => { throw err }
    // // img.src = './avatar.jpg'
    // // img.src = 'https://app.yunser.com/static/img/logo_64.png'
    // ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 200, 200)
    // console.log('start')
    // fs.writeFileSync('node/test.png', canvas.toBuffer())
    // console.log('end')
    // console.log('window', window)
}


// app.use(async ctx => {
//     ctx.body = 'Hello World'
// }

// 跨域设置 
// app.use(convert(cors));
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
   });
   app.use(async (ctx, next)=> {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
      ctx.body = 200; 
    } else {
      await next();
    }
})

router.get('/', async (ctx) => {
    ctx.body = '首页'
})

router.get('/ok', async (ctx) => {
    console.log('ok')
    // await 
    // ctx.set('Content-Type', 'image/jpg')
    // ctx.body = fs.readFileSync(path.resolve(__dirname, '../src/avatar.jpg'))

    let root = {
        x: 0,
        y: 0,
        width: 400,
        height: 400,
        color: '#fff',
        children: [
            {
                type: 'text',
                text: '123'
            }
            // {
            //     x: 0,
            //     y: 0,
            //     width: 100,
            //     height: 100,
            //     color: '#f00',
            // },
        ]
    }
    
    let canvas2222 = new NodeCanvas()
    let key = uuid() + '.jpg'
    let filePath = path.resolve(__dirname, '../tmp', key)
    await canvas.renderToPath(root2, filePath)
    // await canvas.render(root2)
    
    // let filePath = path.resolve(__dirname, '../tmp/asd.jpg')
    // canvas2.exportPng('tmp/test2.png')

    // canvas.exportPng(filePath)

    ctx.body = 'ok'
})

router.post('/service', async (ctx) => {
    const { body } = ctx.request
    const { root } = body
    let key = uuid() + '.jpg'
    let filePath = path.resolve(__dirname, '../tmp', key)
    let canvas2 = new NodeCanvas()
    let renderParam = await canvas2.renderToPath(root, filePath)

    ctx.body = {
        key: key,
        renderParam,
    }
})

router.get('/files/:key', async (ctx) => {
    const { key } = ctx.params
    ctx.set('Content-Type', 'image/jpg')
    ctx.body = fs.readFileSync(path.resolve(__dirname, `../tmp/${key}`))
})

app.use(router.routes())
app.use(router.allowedMethods())

let port = 3077
app.listen(port)

console.log(`http://localhost:${port}`)
