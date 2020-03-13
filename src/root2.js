const root2 = {
    x: 0,
    y: 0,
    width: 750,
    // height: 1934,
    height: 1334,
    // minHeight: 1334,
    // padding: 32,
    color: '#f00',
    textColor: '#fff',
    children: [
        // 背景
        {
            relative: 'parent',
            type: 'image',
            left: 0,
            top: 0,
            // right: 0, // TODO 还不支持
            // x: 0,
            // y: 0,
            width: '100%',
            height: '100%',
            url: 'https://weya-lxy-static.oss-cn-beijing.aliyuncs.com/canvas/mark_bg.jpg',
        },
        // {
        //     name: 'mask',
        //     relative: 'parent',
        //     left: 0,
        //     top: 0,
        //     width: '100%',
        //     height: '100%',
        //     color: '#999',
        //     gradient: {
        //         direction: 'y', // 只支持这个值
        //         from: 'rgba(0, 0, 0, 0)',
        //         to: 'rgba(0, 0, 0, 0.9)',
        //     }
        // },
        {
            name: 'footer',
            relative: 'parent',
            left: 0,
            bottom: 0,
            width: 750, // TODO
            height: 212,
            color: '#fff',
            textColor: '#000',
            children: [
                // {
                //     relative: 'parent',
                //     left: 0,
                //     top: 0,
                //     width: '33.333%',
                //     height: '50%',
                //     color: '#09c',
                // },
                {
                    relative: 'parent',
                    left: '30',
                    top: 67,
                    type: 'text',
                    text: '长按识别小程序码，给我鼓励',
                    // textColor: '#000',
                    textSize: 30,
                    // marginBottom: 16,
                },
                {
                    relative: 'parent',
                    left: '30',
                    top: 122,
                    type: 'text',
                    text: '来自 立行易™',
                    // textColor: '#000',
                    textSize: 20,
                },
                // {
                //     type: 'image',
                //     relative: 'parent',
                //     // bottom: 0,
                //     y: 'center',
                //     right: 32,
                //     width: 142,
                //     height: 142,
                //     url: 'http://localhost:8082/qrcode.png',
                // },
            ]
        },

        {
            name: 'textBox',
            y: 336,
            x: 0,
            bottom: 0,
            height: 550,
            color: '#999',
            children: [
                {
                    type: 'text',
                    text: '2020年不能荒废要读30本书并做读书笔记',
                    relative: 'parent',
                    left: 60,
                    top: 8,
                    width: 600,
                    textSize: 48,
                    lineHeight: 120,
                    fontWeight: 'bold',
                    // marginBottom: 16,
                },
            ],
        },
        // {
        //     // name: 'textBox',
        //     y: 820,
        //     x: 0,
        //     // bottom: 0,
        //     height: 245,
        //     // color: '#fff',
        //     layout: 'x',
        //     children: [
        //         {
        //             y: 820,
        //             x: 0,
        //             width: '50%',
        //             // bottom: 0,
        //             height: '100%',
        //             // color: '#f00',
        //             // textColor: '#f00',
        //             children: [
        //                 {
        //                     relative: 'parent',
        //                     x: 'center',
        //                     top: 0,
        //                     width: 100,
        //                     height: 100,
        //                     // color: '#00f',
        //                     children: [
        //                         {
        //                             type: 'text',
        //                             text: '12',
        //                             width: '100%',
        //                             // left: 60,
        //                             // top: 8,
        //                             textSize: 63,
        //                             marginBottom: 20,
        //                             fontWeight: 'bold',
        //                             // textAlign: 'center', // TODO bug
        //                             textAlign: 'center',
        //                             children: [
        //                                 {
        //                                     type: 'text',
        //                                     relative: 'parent',
        //                                     bottom: 4,
        //                                     left: 90,
        //                                     text: '%',
        //                                     textSize: 28,
        //                                     // textAlign: 'center',
        //                                 } 
        //                             ],
        //                         },
        //                         {
        //                             type: 'text',
        //                             text: '进度',
        //                             width: '100%',
        //                             textSize: 22,
        //                             textAlign: 'center',
        //                             fontFamily: ''
        //                         }
        //                     ]
        //                 },
        //             ]
        //         },
        //         {
        //             // y: 820,
        //             // x: 0,
        //             width: '50%',
        //             // bottom: 0,
        //             height: '100%',
        //             // color: '#09c',
        //             // textColor: '#f00',
        //             children: [
        //                 {
        //                     relative: 'parent',
        //                     x: 'center',
        //                     top: 0,
        //                     width: 100,
        //                     height: 100,
        //                     children: [
        //                         {
        //                             type: 'text',
        //                             text: '35',
        //                             width: '100%',
        //                             textSize: 63,
        //                             marginBottom: 20,
        //                             fontWeight: 'bold',
        //                             textAlign: 'center',
        //                         },
        //                         {
        //                             type: 'text',
        //                             text: '坚持天数',
        //                             width: '100%',
        //                             textSize: 22,
        //                             textAlign: 'center',
        //                         }
        //                     ]
        //                 },
        //             ]
        //         },
        //         // {
        //         //     type: 'text',
        //         //     text: '12%',
        //         //     relative: 'parent',
        //         //     left: 24,
        //         //     top: 8,
        //         //     width: '90%',
        //         //     textSize: 48,
        //         //     lineHeight: 120,
        //         //     fontWeight: 'bold',
        //         //     // marginBottom: 16,
        //         // },
        //     ],
        // },
        // // 头像
        // {
        //     type: 'image',
        //     x: 62,
        //     y: 99,
        //     width: 118,
        //     height: 118,
        //     url: 'http://localhost:8082/avatar.jpg',
        //     borderRadius: '50%'
        // },
        // {
        //     x: 0,
        //     y: 0,
        //     width: 100,
        //     height: 100,
        //     color: '#09c',
        //     // textSize: 42,
        // },
        // {
        //     type: 'text',
        //     text: '123',
        //     x: 0,
        //     y: 0,
        //     textSize: 42,
        // },

        // 时间
        // {
        //     relative: 'parent',
        //     right: 50,
        //     top: 50,
        //     width: 120,
        //     height: 120,
        //     // color: '#979797',
        //     border: {
        //         color: '#fff',
        //         // width: 40,
        //     },
        //     // children: [
        //     //     {
        //     //         relative: 'parent',
        //     //         left: -8,
        //     //         top: 8,
        //     //         width: 120,
        //     //         height: 120,
        //     //         border: {
        //     //             color: '#fff',
        //     //             // width: 40,
        //     //         },
        //     //     },
        //     //     {
        //     //         type: 'text',
        //     //         relative: 'parent',
        //     //         left: 24,
        //     //         top: 8,
        //     //         // width: '100%', // TODO 有 bug
        //     //         text: '13',
        //     //         // textColor: '#000',
        //     //         textSize: 64,
        //     //         // marginBottom: 16,
        //     //     },
        //     //     {
        //     //         // TODO 有什么可以优化的吗
        //     //         // x: 'center',
        //     //         type: 'text',
        //     //         relative: 'parent',
        //     //         left: 20,
        //     //         top: 80,
        //     //         text: '2020.01',
        //     //         // textColor: '#000',
        //     //         textSize: 18,
        //     //         // marginBottom: 16,
        //     //     },
        //     // ]
        // },


    ]
}

module.exports = {
    root2,
}
