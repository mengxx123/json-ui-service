const { createCanvas, Image } = require('canvas')
const fs = require('fs')

const { CanvasX } = require('./canvas')
const { root2 } = require('./root2')
const { root3 } = require('./root3')


function getImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.src = url
    })
}

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

    class NodeCanvas {

        async render(root) {
            const canvas = createCanvas(200, 200)
            this.canvas = canvas
            let canvasX2 = new CanvasX(canvas)
            await canvasX2.render(root)
            fs.writeFileSync('tmp/test.png', canvas.toBuffer())
        }

        async exportPng(path) {
            fs.writeFileSync(path, this.canvas.toBuffer())
        }
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

make()

