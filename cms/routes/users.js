var express = require('express');
var router = express.Router();
var {
  find,
  insertMany,
} = require('../libs/db')

router.use((req, res, next) => {
  // 全局添加
  // res.append("Access-Control-Allow-Origin", "*");
  next();
});

/* GET users listing. */
router.post('/login', async (req, res, next) => {
  let {
    //前端传过来的数据
    phone,
    cod,
    username,
    pas,
    inputEmail,
    inputPassword
  } = req.body;

  let data = await find('username', {

  });
  console.log(data);
  res.send(data);
  // }
});

module.exports = router;