let menus = [{
    name: '首页',
    url: '/home'
}, {
    name: '个人中心',
    url: '/mine'
}, {
    name: '设置',
    url: '/setting'
}]

let nav = [{
    key: 'sub1',
    title: '学员后台',
    iconType: 'user',
    options: [{
            key: 1,
            title: '匿名投诉',
            url: '/home/complaint'
        },
        {
            key: 2,
            title: '技术问题',
            url: '/home/problem'
        }, {
            key: 3,
            title: '项目上传',
            url: '/home/itemupload'
        }, {
            key: 4,
            title: 'VIP',
            url: '/home/vip'
        }, {
            key: 5,
            title: '学员周报',
            url: '/home/weekly'
        }
    ]
}, {
    key: 'sub2',
    title: '学员考勤',
    iconType: 'laptop',
    options: [{
        key: 7,
        title: '学员请假',
        url: '/home/leave'
    }, {
        key: 8,
        title: '学员违纪',
        url: '/home/discipline'
    }]
}]

export default {
    menus,
    nav
}