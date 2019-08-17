var express = require('express');
var router = express.Router();
var {
    find,
    insertMany,
    deleteOne
} = require('../libs/db')

router.use((req, res, next) => {
    // 全局添加
    // res.append("Access-Control-Allow-Origin", "*");
    next();
});


//删除
router.post('/login', async (req, res, next) => {
    let {
        //前端传过来的数据
        name,
        phone,
        cod,
        username,
        pas,
        inputEmail,
        inputPassword
    } = req.body;

    let data = await deleteOne('username', {
        phone: phone
    });
    console.log(data);
    res.send(data);
    // }
});

module.exports = router;