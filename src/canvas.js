
const { Image } = require('canvas')

function getImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image()
        img.onload = () => {
            resolve(img)
        }
        img.onerror = err => { throw err }
        img.src = url
    })
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

function drawText(context, t, x, y, w, lineHeight, opts) {

    var chr = t.split("");
    var temp = "";
    var row = [];

    // context.font = "20px Arial";
    // context.fillStyle = "black";
    // context.textBaseline = "middle";

    for (var a = 0; a < chr.length; a++) {

        if (context.measureText(temp).width < w && context.measureText(temp + (chr[a])).width <= w) {
            temp += chr[a];
        }//context.measureText(text).width  测量文本text的宽度
        else {
            row.push(temp);
            temp = chr[a];
        }
    }
    row.push(temp);

    const { textAlign } = opts

    for (var b = 0; b < row.length; b++) {
        // context.fillText(row[b],x,y+(b+1)*lineHeight)
        context.textAlign = textAlign
        let textX
        if (textAlign === 'left') {
            textX = x
        } else if (textAlign === 'right') {
            textX = x + w
            // context.fillText(row[b], x + w, y + (b) * lineHeight)
        } else if (textAlign === 'center') {
            textX = x + w / 2
            // context.fillText(row[b], x + w, y + (b) * lineHeight)
        }
        context.fillText(row[b], textX, y + (b) * lineHeight)
    }
    return {
        line: row.length,
        height: row.length * lineHeight
    }

    // 只显示2行，加...
    /*for(var b = 0; b < 2; b++){
        var str = row[b];
        if(b == 1){
            str = str.substring(0,str.length-1) + '...';
        }
        context.fillText(str,x,y+(b+1)*24);
    }*/
}

function calText(context, t, x, y, w, lineHeight, node, opts) {

    let measureResult = context.measureText(t)
    let oneLineWidth = measureResult.width

    console.log('计算文本', w, measureResult)

    if (w === 'auto') {
        w = oneLineWidth
        console.log('默认原来', oneLineWidth)
    }

    var chr = t.split("");
    var temp = "";
    var row = [];

    // context.font = "20px Arial";
    context.fillStyle = "black";
    // context.textBaseline = "middle";

    for (var a = 0; a < chr.length; a++) {

        if (context.measureText(temp).width < w && context.measureText(temp + (chr[a])).width <= w) {
            temp += chr[a];
        }//context.measureText(text).width  测量文本text的宽度
        else {
            row.push(temp);
            temp = chr[a];
        }
    }
    row.push(temp);

    for (var b = 0; b < row.length; b++) {
        // context.fillText(row[b],x,y+(b+1)*lineHeight)
        context.fillText(row[b], x, y + (b) * lineHeight)
    }
    return {
        textLine: row.length,
        textHeight: row.length * lineHeight,
        oneLineWidth,
        oneLineHeight: opts.textSize,
    }
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

class CanvasX {

    constructor(canvas) {
        // this.elemId = id
        this.canvas = canvas
    }

    async render(root) {
        let canvas = this.canvas
        let ctx = canvas.getContext('2d')

        // 预处理
        function preProcess(node, parent, lastChild) {
            console.log('预处理', node, parent)
            const {
                type = 'node',
                color = '#999',
                x,
                y,
                width = 'auto',
                height = 'auto',
                minHeight = 0,
                borderRadius = 0,
                margin,
                marginTop = 0,
                marginBottom = 0,
                marginRight = 0,
                marginLeft = 0,
                padding,
                visible = true,
                _parent,

                textColor,
                textSize,
            } = node

            // text color，默认继承父节点，否则 #000
            node._textColor = textColor
            if (node._textColor === undefined) {
                node._textColor = (parent ? parent._textColor : '') || '#000'
            }

            // text size，默认继承父节点，没有则 0
            node._textSize = textSize
            if (node._textSize === undefined) {
                node._textSize = (parent ? parent._textSize : '') || 12
            }


            // width
            node._width = width
            if (node._width === 'auto') {
                // console.log('auto', JSON.stringify(parent, null, 4), parent._innerWidth, parent)
                node._width = parent ? parent._innerWidth : 999
            } else if (typeof width === 'string') {
                // 只支持百分比的形式
                // 假设父节点存在
                node._width = parseInt(node._width.replace('%')) / 100 * parent._width
            }

            // border radius
            node._borderRadius = borderRadius
            if (typeof node._borderRadius === 'string') {
                // if (node._borderRadius.if )
                // only like 50%
                node._borderRadius = parseInt(node._borderRadius.replace('%')) / 100 * node._width
            }

            // height
            node._height = height
            if (node._height === 'auto') {
                // 在后面处理
            } else if (typeof node._height === 'string') {
                // 只支持百分比的形式
                // 假设父节点存在
                node._height = parseInt(node._height.replace('%')) / 100 * parent._height
            }


            node._marginBottom = marginBottom
            node._marginRight = marginRight

            // margin TODO
            let _margin = margin
            if (margin === undefined) {
                _margin = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }
            }
            node._margin = _margin
            if (marginTop !== undefined) {
                node._margin.top = marginTop
            }
            if (marginRight !== undefined) {
                node._margin.right = marginRight
            }
            if (marginBottom !== undefined) {
                node._margin.bottom = marginBottom
            }
            if (marginLeft !== undefined) {
                node._margin.left = marginLeft
            }

            // padding
            let _padding = padding
            if (padding === undefined) {
                _padding = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                }
            } else if (typeof padding === 'number') {
                _padding = {
                    top: padding,
                    right: padding,
                    bottom: padding,
                    left: padding,
                }
            } else if (Array.isArray(padding)) {
                if (padding.length === 2) {
                    _padding = {
                        top: padding[0],
                        right: padding[1],
                        bottom: padding[0],
                        left: padding[1],
                    }
                } else if (padding.length === 4) {
                    _padding = {
                        top: padding[0],
                        right: padding[1],
                        bottom: padding[2],
                        left: padding[3],
                    }
                }
            }
            node._padding = _padding


            // text type
            if (node.type === 'text') {
                const { textSize, lineHeight } = node
                // font size
                // TODO



                // line height
                node._lineHeight = lineHeight
                if (node._lineHeight === undefined) {
                    node._lineHeight = textSize
                }

                // font family
                // TODO

                ctx.font = `${node.textSize}px Georgia`
                let { textLine, textHeight, oneLineWidth, oneLineHeight } = calText(ctx, node.text, 0, 0, node._width, node._lineHeight, node, {
                    textSize
                })
                // if (line)
                console.log('字体计算', node.text, textLine, textHeight)
                node._textLine = textLine
                node._height = textHeight
                if (width === 'auto') {
                    node._width = oneLineWidth + 4 // TODO hack +4 不加会换行，需要解决，否则有几个像素差
                }

                node._fontWeight = node.fontWeight
                node._oneLineWidth = oneLineWidth
                node._oneLineHeight = oneLineHeight
            }

            // x
            node._x = x
            if (x === undefined) {
                node._x = parent ? (parent._x + parent._padding.left) : 0
            } else if (x === 'left') {
                node._x = 150
                // node._x = parent ? (parent._x + parent._padding.left) : 0
            }

            // y
            node._y = y
            if (y === undefined) {
                console.log('没有y', lastChild)
                if (lastChild) {
                    node._y = lastChild._y + lastChild._height + lastChild._marginBottom
                } else {
                    node._y = parent ? (parent._y + parent._padding.top + node._margin.top) : 0
                }
            }

            if (parent && parent.layout === 'x') {
                if (parent.yAlign === 'center') {
                    node._y = parent._y + parent._height / 2 - node._height / 2
                } else {
                    node._y = parent._y
                }
                if (lastChild) {
                    node._x = lastChild._x + lastChild._width
                    node._x = lastChild._x + lastChild._width + lastChild._marginRight
                } else {
                    node._x = parent ? parent._x : 0
                }
            }



            if (node.css) {
                let css = node.css
                // console.log('css', css)
                let arr = css.split('\n').map(item => item.replace(/^\s+/, '').replace(/\s+$/, '').replace(/;/, '')).filter(item => item)
                for (let item of arr) {
                    // console.log('item', item)
                    let kv = item.split(':')
                    let key = kv[0].replace(/^\s+/, '').replace(/\s+$/, '')
                    let value = kv[1].replace(/^\s+/, '').replace(/\s+$/, '')
                    // console.log('key & value', key, value)
                    if (key === 'width') {
                        node.width = value.replace('px', '')
                    }
                    if (key === 'height') {
                        node.height = value.replace('px', '')
                    }
                }
            }

            // 文字计算行、高度
            // 流式布局
            if (node.position === 'static') {
                if (lastChild) { // TODO
                    node._y = lastChild._y + lastChild._height + lastChild._marginBottom
                    console.log('计算', node._y)
                }
            }
            // 相对布局
            if (node.relative === 'parent' && parent) {
                // node._x = parent._x + parent._width
                // node._y = parent._y + node._y
                // calculate x
                if (x === 'center') {
                    node._x = parent._x + parent._width / 2 - node._width / 2
                } else {
                    if (node.right !== undefined) {
                        node._x = parent._x + parent._width - node._width - node.right
                    } else {
                        node._x = parent._x + node.left
                    }
                }
                // calculate y
                if (y === 'center') {
                    node._y = parent._y + parent._height / 2 - (node.type === 'text' ? node._oneLineHeight : node._height) / 2
                } else {
                    if (node.top !== undefined) {
                        node._y = parent._y + node.top
                    } else {
                        node._y = parent._y + parent._height - node._height - node.bottom
                    }
                }
            }



            // inner width & inner height
            node._innerWidth = node._width - node._padding.left - node._padding.right
            if (node.debug) {

                console.log('_innerWidth', node._innerWidth, node._width, node._padding.left, node._padding.right)
            }
            node._innerHeight = node._height - node._padding.top - node._padding.bottom

            // visible
            node._visible = !!visible

            // parent
            node._parent = parent

            let maxRight
            let maxBottom
            if (node.children && node.children.length) {
                let children = node.children
                let lastChild = null
                for (let idx = 0; idx < children.length; idx++) {
                    let child = node.children[idx]
                    let _node = preProcess(child, node, lastChild)
                    if (!child.relative) { // TODO
                        lastChild = _node
                    }
                    let right = _node._x + _node._width
                    let bottom = _node._y + _node._height
                    if (idx === 0) {
                        maxRight = right
                        maxBottom = bottom
                    } else {
                        if (right > maxRight) {
                            maxRight = right
                        }
                        if (bottom > maxBottom) {
                            maxBottom = bottom
                        }
                    }
                }
            }

            if (node._height === 'auto') {
                if (node.children && node.children.length) {
                    let innerHeight = maxBottom - node._y - node._padding.top
                    // innerHeight = 300
                    node._innerHeight = innerHeight
                    node._height = innerHeight + node._padding.top + node._padding.bottom
                } else {
                    node._height = 0
                }
            }

            if (node._height < minHeight) {
                node._height = minHeight
            }

            return node
        }

        let startTime = new Date().getTime()

        preProcess(root, null, null)

        console.log('预处理后', root)
        // console.log('预处理后 children', root.children[0].children)

        let canvasWidth = root.width
        let canvasHeight = root.height
        canvas.width = canvasWidth
        canvas.height = canvasHeight
        // canvas.setAttribute('width', '' + canvasWidth)
        // canvas.setAttribute('height', '' + canvasHeight)
        ctx.width = canvasWidth
        ctx.height = canvasHeight

        ctx.clearRect(0, 0, canvasWidth, canvasHeight)

        async function drawNode(node) {
            // console.log('画画', node)
            const {
                type = 'view',
                color,
                borderRadius = 0,

                _x,
                _y,
                _width,
                _height,
                _innerHeight,
                _padding,
                _visible,
            } = node

            let drawOutline = false

            if (_visible) {
                if (type === 'view') {
                    // console.log('画 view', node)
                    ctx.beginPath()

                    // fill
                    if (node.gradient) {
                        // gradient
                        let grd = ctx.createLinearGradient(_x, _y, _x, _y + _height)
                        grd.addColorStop(0, node.gradient.from)
                        grd.addColorStop(1, node.gradient.to)
                        ctx.fillStyle = grd
                    } else {
                        // fill color
                        ctx.fillStyle = color
                    }

                    if (borderRadius) {
                        strokeRoundRect(ctx, _x, _y, _width, _height, borderRadius)
                    } else {
                        ctx.rect(_x, _y, _width, _height)
                    }
                    if (color) {
                        ctx.fill()
                    } else {
                        drawOutline = true
                    }
                    // border
                    if (node.border) {
                        const { color = '#000', width = 1 } = node.border
                        ctx.beginPath()
                        ctx.setLineDash([])
                        if (borderRadius) {
                            strokeRoundRect(ctx, _x, _y, _width, _height, borderRadius)
                        } else {
                            // ctx.rect(_x, _y, _width, _height)
                            ctx.rect(_x, _y, _width, _height)
                        }
                        ctx.strokeStyle = node.border.color
                        ctx.lineWidth = width
                        ctx.fillStyle = color
                        ctx.stroke()
                    }

                }
                if (type === 'line') {
                    if (node.lineStyle === 'dashed') {
                        ctx.setLineDash([8, 8])
                    } else {
                        ctx.setLineDash([])
                    }
                    // ctx.setLineDash([8, 8])
                    ctx.beginPath()
                    ctx.moveTo(node.x, node.y)
                    ctx.lineTo(node.x2, node.y2)
                    ctx.stroke()

                }
                if (type === 'image') {
                    // console.log('画 image', node)
                    
                    let img = await getImage(node.url)
                    // console.log('获得图片，卡斯话', img)
                    if (node._borderRadius) {
                        drawRoundedImg(ctx, img, _x, _y, _width, _height, node._borderRadius)
                    } else {
                        ctx.drawImage(img, 0, 0, img.width, img.height, _x, _y, _width, _height)
                    }

                    drawOutline = true

                    // ctx.beginPath()
                    // ctx.setLineDash([8, 8])
                    // ctx.rect(_x, y, width, height)
                    // ctx.stroke()
                }
                if (type === 'text') {
                    const {
                        textSize = 12,
                        lineHeight,
                        textAlign = 'left',
                    } = node



                    let drawLineHeight = lineHeight || (textSize * 1.6)
                    // let height = lineHeight

                    let fontWeight = node._fontWeight === 'bold' ? node._fontWeight : ''

                    ctx.beginPath()
                    ctx.fillStyle = node._textColor
                    ctx.font = `${textSize}px Georgia ${fontWeight}`
                    ctx.textBaseline = 'top'
                    // ctx.fillText(node.text, x, y)

                    // if (textAlign === 'left') {}
                    const { line, height } = drawText(ctx, node.text, _x, _y, _width, drawLineHeight, {
                        textAlign
                    })

                    drawOutline = true
                }
            }


            if (drawOutline) {
                ctx.strokeStyle = '#999'
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.setLineDash([8, 8])
                ctx.rect(_x, _y, _width, _height)
                ctx.stroke()
            }
            if (node.strong) {
                ctx.beginPath()
                ctx.strokeStyle = node.strong
                ctx.lineWidth = 8
                ctx.setLineDash([])
                ctx.rect(_x, _y, _width, _height)
                ctx.stroke()
            }

            if (node.debug) {
                console.log('debug', node)
                // ctx.globalAlpha = .3
                ctx.globalAlpha = 1

                ctx.beginPath()
                ctx.fillStyle = '#09c'
                ctx.strokeStyle = '#f00'
                ctx.lineWidth = 8
                ctx.setLineDash([])
                ctx.rect(_x, _y, _width, _height)

                ctx.fill()
                ctx.stroke()


                ctx.fillStyle = '#8BC34A'
                // ctx.beginPath()
                let inTop = _y + _padding.top
                let inBottom = _y + _height - _padding.bottom
                // padding top
                ctx.fillRect(_x, _y, _width, _padding.top)
                // ctx.fill()
                // padding left
                ctx.fillRect(_x, inTop, _padding.left, _innerHeight)
                // padding right
                ctx.fillRect(_x + _width - _padding.right, inTop, _padding.right, _innerHeight)
                // padding bottom
                ctx.fillRect(_x, inBottom, _width, _padding.bottom)




                ctx.globalAlpha = 1
            }

            if (node.children && node.children.length) {
                for (let child of node.children) {
                    await drawNode(child)
                }
            }


            // ctx.beginPath()
            // ctx.fillStyle = '#f00'
            // ctx.fillRect(32, 32, 100, 100)
        }

        await drawNode(root)

        async function forEachNode(node, callback) {

            callback && callback(node)

            if (node.children && node.children.length) {
                for (let child of node.children) {

                    forEachNode(child, callback)
                }
            }
        }

        // forEachNode(root, node => {
        //     const {
        //         type = 'view',
        //         color,
        //         x = 0,
        //         y = 0,
        //         width = 0,
        //         height = 0,
        //         borderRadius = 0,

        //         _x,
        //         _y,
        //         _width,
        //         _height,
        //         _innerWidth,
        //         _innerHeight,
        //         _padding,
        //         _margin,
        //         _visible,
        //     } = node

        // })

        // ctx.beginPath()
        // ctx.fillRect(0, 0, 100, 100)

        let time = new Date().getTime() - startTime
        console.log(`耗时：${time}ms`)
    }
}


module.exports = {
    CanvasX,
}
