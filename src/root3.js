const root3 = {
    x: 0,
    y: 0,
    width: 750,
    height: 1334,
    padding: 32,
    color: '#fff',
    children: [
        // 右下角
        {
            relative: 'parent',
            bottom: 120,
            right: 0,
            type: 'image',
            width: 478,
            height: 425,
            url: 'http://localhost:8082/goal_bg.png',
        },

        // qrcode box
        {
            relative: 'parent',
            bottom: 140,
            left: 63,
            width: 146,
            height: 209, // TODO 可以省去
            // color: '#000',
            children: [
                {
                    // relative: 'parent',
                    // bottom: 0,
                    // right: 0,
                    type: 'image',
                    url: 'http://localhost:8082/qrcode.png',
                    width: 146,
                    height: 146,
                    marginBottom: 22,
                },
                {
                    type: 'text',
                    text: '长按监督',
                    color: '#9097A1',
                    textSize: 30,
                    width: '100%',
                    // strong: '#f00', // TODO 文本的宽度会影响他的高度
                    textAlign: 'center',
                },
            ]
        },
        // container
        {
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            url: '/avatar.jpg',
            // strong: '#f00',
            padding: [50, 40, 120, 40],
            // debug: true,
            children: [
                // header
                {
                    height: 130,
                    // strong: '#f00',
                    marginBottom: 76,
                    layout: 'x',
                    children: [
                        // 头像
                        {
                            type: 'image',
                            width: 130,
                            height: 130,
                            marginRight: 34,
                            url: 'http://localhost:8082/avatar.jpg',
                        },
                        {
                            // strong: '#09C',
                            children: [
                                {
                                    type: 'text',
                                    text: '建帆远航',
                                    color: '#434861',
                                    textSize: 36,
                                    marginTop: 32,
                                    marginBottom: 15,
                                },
                                {
                                    type: 'text',
                                    text: '2020/3/9',
                                    color: '#9097A1',
                                    textSize: 24,
                                },

                            ]
                        },
                    ]
                },
                {
                    height: 320,
                    // strong: '#f00',
                    marginBottom: 76,
                    children: [
                        {
                            type: 'text',
                            text: '咕咚智能心率耳机Quiet体验：耳机除了听歌原来还能这样玩！',
                            width: '100%',
                            textColor: '#434861',
                            textSize: 64,
                        },
                    ]
                },
                {
                    height: 144,
                    // strong: '#f00',
                    marginBottom: 76,
                    children: [
                        {
                            type: 'text',
                            text: '若失败，我将给每位监督我的朋友发¥100红包',
                            width: '100%',
                            textColor: '#666',
                            textSize: 40,
                        },
                    ]
                },
            ]
        },
    ]
}

module.exports = {
    root3,
}
