let bodyContent = [
    // title box
    {
        // debug: true,
        height: 118, // TODO auto
        // color: '#f00',
        children: [
            // 标题框 left
            {
                comment: '标题框 left',
                relative: 'parent',
                left: 0,
                top: 0,
                width: 8,
                height: 37,
                color: '#000',
            },
            // 标题框 top
            {
                relative: 'parent',
                top: 0,
                left: 0,
                width: 37,
                height: 8,
                color: '#000000',
            },
            // 标题框 right
            {
                relative: 'parent',
                right: 0,
                bottom: 0,
                width: 8,
                height: 37,
                color: '#000',
            },
            // 标题框 bottom
            {
                relative: 'parent',
                bottom: 0,
                right: 0,
                width: 37,
                height: 8,
                color: '#000000',
            },
        ]
    },
    {
        type: 'text',
        text: '2020年不能荒废，至少要读30本书并做读书笔记',
        x: 93,
        y: 486,
        width: 610,
        height: 118,
        color: '#000000',
        borderRadius: 20,
        textSize: 50,
        lineHeight: 84,
        marginBottom: 63,
    },
    // 挑战标题
    {
        position: 'static',
        x: 93,
        width: 154,
        height: 50,
        borderRadius: 20,
        textSize: 50,
        lineHeight: 84,
        marginBottom: 32,
        // strong: '#f00',
        children: [
            {
                type: 'text',
                text: '挑战内容',
                width: 285,
                color: 'rgba(0, 0, 0, 0.85)',
                textSize: 36,
                lineHeight: 84,
                fontWeight: 'bold',
            },
            {
                relative: 'parent',
                left: 0,
                bottom: 0,
                width: 154,
                height: 15,
                color: 'rgba(249, 138, 95, 1)',
            },
        ],
    },
    // 挑战列表
    {
        // debug: true,
        position: 'static',
        x: 93,
        // width: 154,
        // height: 350,
        // color: '#f00',
        borderRadius: 20,
        textSize: 50,
        lineHeight: 84,
        marginBottom: 72,
        children: [
            '坚持10天读完一本书',
            '坚持写读书笔记',
            '这是第三条',
            '这是第四条',
            '这是第五条',
            '这是第六条',
            '这是第 7 条',
            '这是第 8 条',
            '这是第 9 条',
            '这是第 10 条',
            '这是第 11 条',
            '这是第 12 条',
            'Hello，world',
        ].map(item => {
            return {
                width: 300,
                height: 42,
                marginBottom: 18,
                // strong: '#09c',
                layout: 'x',
                // yAlign: 'center',
                children: [
                    {
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginRight: 20,
                        color: '#f00',
                    },
                    {
                        type: 'text',
                        text: item,
                        width: 285,
                        color: 'rgba(0, 0, 0, 0.65)',
                        textSize: 30,
                        lineHeight: 84,
                    },
                ]
            }
        })
    },
]

window.root = {
    x: 0,
    y: 0,
    width: 750,
    // height: 1934,
    height: 1334,
    // minHeight: 1334,
    padding: 32,
    color: 'rgba(241,240,240,1)',
    children: [

        // 右下角
        {
            relative: 'parent',
            bottom: 0,
            left: 0,
            type: 'image',
            width: 118,
            height: 118,
            url: '/bg.png',
        },
        // .content
        {
            // debug: true,
            comment: 'content',
            // debug: truxe,
            // x: 32,
            // y: 34,
            width: 686,
            // height: 1264,
            color: 'rgba(255,255,255,.95)',
            borderRadius: 8,
            // debug: true,
            children: [
                // 调试专用
                // {
                //     visible: false,
                //     debug: true,
                //     x: 32,
                //     y: 80,
                //     width: 400,
                //     height: 200,
                //     color: '#c90',
                //     padding: [10, 20, 30, 40],
                // },
                // header
                {
                    comment: 'header',
                    // debug: true,
                    height: 405,
                    // color: '#f00',
                    // strong: '#09c',
                    children: [
                        // 左边的圆
                        {
                            relative: 'parent',
                            left: -15,
                            bottom: -15,
                            width: 30,
                            height: 30,
                            color: 'rgba(241,240,240,1)',
                            borderRadius: 15,
            //                 css: `
            //                 width: 30px;
            // height: 30px;
            // background: rgb(241, 240, 240);
            // border-radius: 50%;`
                        },
                        {
                            relative: 'parent',
                            right: -15,
                            bottom: -15,
                            width: 30,
                            height: 30,
                            color: 'rgba(241,240,240,1)',
                            borderRadius: 15,
                        },
                    ],
                },
                // body
                {
                    // debug: true,
                    minHeight: 318, // TODO min-height？
                    padding: [35, 21],
                    // strong: '#0c9',
                    children: bodyContent
                },
            ]
        },
        // 虚线
        {
            type: 'line',
            x: 52,
            y: 439,
            x2: 52 + 647,
            y2: 439,
            color: '#979797',
            lineStyle: 'dashed',
        },



        // 头像
        {
            type: 'image',
            x: 53,
            y: 104,
            width: 118,
            height: 118,
            url: '/avatar.jpg',
        },
        // info
        {
            // debug: true,
            x: 177,
            y: 103,
            width: 520,
            // height: 20,
            color: '#FFE6DC',
            borderRadius: 20,
            padding: 32,
            minHeight: 80,
            children: [
                // {
                //     width: 300,
                //     height: 300,
                //     color: '#FF5138',
                // },
                {
                    type: 'text',
                    text: '你敢立下这个flag吗？',
                    width: 412,
                    textColor: '#FF5138',
                    borderRadius: 20,
                    textSize: 42,
                    lineHeight: 59,
                },
                {
                    type: 'text',
                    text: '成功奖励',
                    width: 412,
                    textColor: '#FF5138',
                    fontWeight: 'bold',
                    borderRadius: 20,
                    textSize: 42,
                    lineHeight: 59,
                },
                {
                    // debug: true,
                    type: 'text',
                    text: '如果做到了，你将有机会获得1888元红包',
                    width: 412,
                    textColor: '#FF5138',
                    borderRadius: 20,
                    textSize: 24,
                    lineHeight: 33, // TODO 可以不写
                },

            ]
        },



        // {
        //     x: 0,
        //     y: 0,
        //     width: 100,
        //     height: 100,
        //     border: {
        //         color: '#09c'
        //     }
        //     // color: '#396',
        // },
        // footer
        {
            // x: 32,
            // y: 1159,
            width: 686,
            height: 102,
            // border: {
            //     color: '#f00'
            // },
            children: [
                // 二维码
                {
                    type: 'image',
                    relative: 'parent',
                    top: 0,
                    right: 46,
                    width: 102,
                    height: 102,
                    url: '/qrcode.png',
                },
                {
                    type: 'text',
                    relative: 'parent',
                    text: '长按识别小程序码',
                    top: 21,
                    right: 170,
                    width: 610,
                    borderRadius: 20,
                    textSize: 24,
                    lineHeight: 33,
                    textAlign: 'right',
                    textColor: 'rgba(0, 0, 0, 0.45)',
                },
                {
                    type: 'text',
                    relative: 'parent',
                    text: '立下我的flag',
                    top: 68,
                    right: 170,
                    width: 610,
                    borderRadius: 20,
                    textSize: 24,
                    lineHeight: 33,
                    textAlign: 'right',
                    textColor: 'rgba(0, 0, 0, 0.45)',
                },
            ]
        },

    ]
}

module.exports = {
    root,
}
