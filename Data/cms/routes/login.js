var express = require('express');
var router = express.Router();
var {
    find,
    insertMany,
} = require('../libs/db')

router.use((req, res, next) => {
    // 全局添加
    res.append("Access-Control-Allow-Origin", "*");
    res.append("Access-Control-Allow-Headers", "Content-Type")
    next();
});
// router.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
//添加新用户
router.post('/login', async(req, res, next) => {
    let {
        //前端传过来的数据
        username,
        pwd
    } = req.body;

    let data = await find('user', {
        username
    });
    if (data.length < 1) {
        data = await insertMany('user', [{
            username,
            pwd
        }]);
    }
    // data = await find('user', {
    //     name: name,
    //     pwd: pwd
    // });
    // console.log(data);

    res.json({
        success: true,
        data
    });
    // }
});

module.exports = router;