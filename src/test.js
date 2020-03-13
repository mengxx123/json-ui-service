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

async function test() {
    let canvas = new NodeCanvas()
    let key = uuid() + '.jpg'
    let filePath = path.resolve(__dirname, '../tmp', key)
    await canvas.renderToPath(root2, filePath)
    // await canvas.render(root2)
}

test()
