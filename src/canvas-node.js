const { CanvasX } = require('./canvas')
const { createCanvas, Image } = require('canvas')
const fs = require('fs')
const path = require('path')

const canvasOptions = {

}

function getImage(url) {
    return new Promise((resolve, reject) => {
        console.log('_this.opts', _this.opts)
        let img = new Image()
        img.onload = () => {
            resolve({
                url: url,
                image: img,
            })
        }
        img.onerror = err => {
            resolve({
                url: url,
                image: null,
                error: err
            })
            // throw new Error(`image load fail ${url}`)
        }
        if (url.includes('{LOCAL_PATH}')) {
            // let filePath = path.resolve(__dirname, '.')
            // console.log('file path', filePath)
            img.src = url.replace('{LOCAL_PATH}', __dirname)
        } else {
            img.src = url
        }
    })
}


function drawRoundRectPath(cxt, width, height, radius) {
    cxt.beginPath(0);
    //从右下角顺时针绘制，弧度从0到1/2PI
    cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

    //矩形下边线
    cxt.lineTo(radius, height);

    //左下角圆弧，弧度从1/2PI到PI
    cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

    //矩形左边线
    cxt.lineTo(0, radius);

    //左上角圆弧，弧度从PI到3/2PI
    cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

    //上边线
    cxt.lineTo(width - radius, 0);

    //右上角圆弧
    cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

    //右边线
    cxt.lineTo(width, height - radius);
    cxt.closePath();
}


/**该方法用来绘制一个有填充色的圆角矩形
     *@param cxt:canvas的上下文环境
    *@param x:左上角x轴坐标
    *@param y:左上角y轴坐标
    *@param width:矩形的宽度
    *@param height:矩形的高度
    *@param radius:圆的半径
    *@param fillColor:填充颜色
**/
function fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false; }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.fillStyle = fillColor || "#000"; //若是给定了值就用给定的值否则给予默认值
    cxt.fill();
    cxt.restore();
}

/*
    * 圆角矩形
    * @parama int/float x            矩形位置x坐标
    * @parama int/float y            矩形位置y坐标
    * @parama int/float w            矩形宽度
    * @parama int/float h            矩形高度
    * @parama int/float r            圆角半径
    * @parama object <img>           矩形背景图
    */
   function drawRoundedImg(ctx, bgimg, x, y, w, h, r) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x+r,y);
    ctx.arcTo(x+w,y,x+w,y+h,r);
    ctx.arcTo(x+w,y+h,x,y+h,r);
    ctx.arcTo(x,y+h,x,y,r);
    ctx.arcTo(x,y,x+w,y,r);
    ctx.stroke();
    ctx.clip();
    ctx.drawImage(bgimg, x, y, w, h);
    ctx.restore();
    ctx.closePath();
}

/**该方法用来绘制圆角矩形
 *@param cxt:canvas的上下文环境
    *@param x:左上角x轴坐标
    *@param y:左上角y轴坐标
    *@param width:矩形的宽度
    *@param height:矩形的高度
    *@param radius:圆的半径
    *@param lineWidth:线条粗细
    *@param strokeColor:线条颜色
    **/
   function strokeRoundRect(cxt, x, y, width, height, radius, /*optional*/ lineWidth, /*optional*/ strokeColor) {
    //圆的直径必然要小于矩形的宽高
    if (2 * radius > width || 2 * radius > height) { return false; }

    cxt.save();
    cxt.translate(x, y);
    //绘制圆角矩形的各个边
    drawRoundRectPath(cxt, width, height, radius);
    cxt.lineWidth = lineWidth || 2; //若是给定了值就用给定的值否则给予默认值2
    cxt.strokeStyle = strokeColor || "#000";
    // cxt.stroke();
    cxt.restore();
}

class Painter {

    setCanvas(canvas) {
        this.canvas = canvas
    }

    setContext(ctx) {
        this.ctx = ctx
    }

    setSize(width, height) {
        this.canvasWidth = width
        this.canvasHeight = height
        this.ctx.width = width
        this.ctx.height = height
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    drawLine(line, style) {
        const { ctx } = this
        const styleLine = style.line || {}
        ctx.strokeStyle = style.stroke.color
        ctx.beginPath()
        ctx.moveTo(line[0].x, line[0].y)
        ctx.lineTo(line[1].x, line[1].y)
        ctx.setLineDash(styleLine.dash || [])
        ctx.stroke()
    }

    async loadImages(allImage) {

        function getImage(url) {
            return new Promise((resolve, reject) => {
                // console.log('_this.opts', _this.opts)
                let img = new Image()
                img.onload = () => {
                    resolve({
                        url: url,
                        image: img,
                    })
                }
                img.onerror = err => {
                    resolve({
                        url: url,
                        image: null,
                        error: err
                    })
                    // throw new Error(`image load fail ${url}`)
                }
                if (url.includes('{LOCAL_PATH}')) {
                    // let filePath = path.resolve(__dirname, '.')
                    // console.log('file path', filePath)
                    img.src = url.replace('{LOCAL_PATH}', path.resolve(__dirname, '../cache'))
                } else {
                    img.src = url
                }
                // img.src = url
            })
        }

        // const getImage = this.opts.getImage || defaultFetImage

        let promises = []
        for (let img of allImage) {
            promises.push(getImage(img))
        }
        let requestStartTime = new Date().getTime()
        let imgCaches = await Promise.all(promises)
        console.log('imgCaches', imgCaches)
        let requestTime = new Date().getTime() - requestStartTime
        console.log(`图片请求耗时2：${requestTime}ms`)
        this.imgCaches = imgCaches

        return {
            requestImageTime: requestTime,
        }
    }

    drawImage(url, x, y, width, height, style) {
        const { ctx } = this
        let cache = this.imgCaches.find(item => item.url === url)
        if (cache && cache.image) {
            let img = cache.image
            console.log('cache', cache, img)
            if (style.radius) {
                drawRoundedImg(ctx, img, x, y, width, height, style.radius)
            } else {
                ctx.drawImage(img, 0, 0, img.width, img.height, x, y, width, height)
            }
            // this.painter.drawImage()
        } else {
            console.error('image err', cache)
            // drawRoundedImg(ctx, img, _x, _y, _width, _height, node._borderRadius)
            // ctx.beginPath()
            // ctx.rect(_x, _y, _width, _height)
            // ctx.stroke()
        }
    }

    drawRect(x, y, width, height, style) {
        const { ctx } = this
        // const styleLine = style.line || {}
        // ctx.strokeStyle = style.stroke.color
        // ctx.beginPath()
        // ctx.moveTo(line[0].x, line[0].y)
        // ctx.lineTo(line[1].x, line[1].y)
        // ctx.setLineDash(styleLine.dash || [])
        // ctx.stroke()
        const { fill, stroke } = style

        ctx.beginPath()
        if (style.radius) {
            strokeRoundRect(ctx, x, y, width, height, style.radius)
        } else {
            ctx.rect(x, y, width, height)
        }
        if (fill) {
            if (fill.gradient) {
                let grd = ctx.createLinearGradient(x, y, x, y + height)
                grd.addColorStop(0, fill.gradient.from)
                grd.addColorStop(1, fill.gradient.to)

                // fill.gradient = grd
                ctx.fillStyle = grd
            } else {
                ctx.fillStyle = fill.color
            }
            
            ctx.fill()
        }
        if (stroke) {
            console.log('画边框', stroke)
            ctx.setLineDash(stroke.dash || []) // TODO
            ctx.strokeStyle = stroke.color || '#000'
            ctx.lineWidth = stroke.width || 1
            ctx.stroke()
        }
    }
}


class NodeCanvas extends CanvasX {

    constructor(options) {
        const canvas1 = createCanvas(200, 200)
        super(canvas1, {
            ...options,
            Image: Image,
            Painter,
            debug: false,
        })
        this.canvas = canvas1
        // let canvasX = new CanvasX(canvas1, {
        //     Image,
        //     debug: false,
        //     getImage,
        //     Painter,
        // })
        this.canvasX = this
    }
    
    async renderBuffer(root) {
        await this.canvasX.render(root)
        return this.canvas.toBuffer()
    }

    async renderToPath(root, path) {
        let renderParam = await this.canvasX.render(root)
        fs.writeFileSync(path, this.canvas.toBuffer())
        return renderParam
    }

    // async render(root) {
    //     const canvas = createCanvas(200, 200)
    //     this.canvas = canvas
    //     let canvasX2 = new CanvasX(canvas, {
    //         Image,
    //     })
    //     // await canvasX2.render(root)
    //     // fs.writeFileSync('tmp/test.png', canvas.toBuffer())
    // }

    async exportPng(path) {
        fs.writeFileSync(path, this.canvas.toBuffer())
    }

    toBuffer() {
        return this.canvas.toBuffer()
    }
}

module.exports = {
    NodeCanvas,
}
