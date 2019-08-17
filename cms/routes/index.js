var express = require('express');
var router = express.Router();
var iconv = require('iconv-lite');
var { find, remov, updateOne, updata, insertMany
} = require('../libs/db');
var { find1,
  show1,
  remov1,
  updata1
} = require('../libs/home');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/tabledate', function (req, res, next) {
  // res.render('index', { title: 'Express' });
  let index = req.query.index;
  // res.append('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
  (async () => {
    let dat = await find('orderlist', null);
    if (index) {
      let data = dat.slice((index - 1) * 10, (index * 9) + (index - 1));
      var obj = JSON.stringify(data);
    } else {
      var obj = JSON.stringify(dat);
    }
    res.send(obj);
  })();
});
router.get('/delorder', function (req, res, next) {
  // res.append('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
  (() => {
    let dat = remov1('orderlist', {
      orderid: req.query.orderid
    }).then(function (response) {
      //删除成功返回yes
      res.send('yes');
    })
  })();
});
//编辑菜单接口
router.get('/editorder', function (req, res, next) {
  // res.append('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
  let obj = {
    logistics: req.query.logistics,
    Customer: req.query.Customer,
    tel: req.query.tel
  }
  for (var item in obj) {
    var encodedBuff = iconv.encode(item, 'gbk');
    var decodedText = iconv.decode(encodedBuff, 'gbk');
  }
  console.log(obj.logistics, obj.Customer);
  (() => {
    let dat = updata1('orderlist', {
      orderid: req.query.orderid
    }, {
        logistics: req.query.logistics,
        Customer: req.query.Customer,
        tel: req.query.tel
      }).then(function (response) {
        //删除成功返回yes
        res.send('yes');
      })
  })();
});
//多条件查询接口
router.post('/search', function (req, res, next) {
  // res.append('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
  var obj = {
    orderid: req.body.orderid,
    logistics: req.body.logistics,
    Customer: req.body.Customer,
    tel: req.body.tel
  }
  for (var item in obj) {
    var encodedBuff = iconv.encode(item, 'gbk');
    var decodedText = iconv.decode(encodedBuff, 'gbk');
  }
  (async () => {
    console.log("商品id：" + req.body.orderid, "物流信息：" + req.body.logistics,
      "联系人" + req.body.Customer, "电话" + req.body.tel);
    let arr = [];
    //计算要查询几个条件
    var num = 0;
    var obj2 = {};
    arrkey = ['orderid', 'logistics', 'Customer', 'tel']
    var oldarr = [req.body.orderid, req.body.logistics,
    req.body.Customer, req.body.tel];
    oldarr.forEach((item, index) => {
      if (item) {
        obj2[arrkey[index]] = item;
      }
    });
    console.log(req.body.time1, req.body.time2);
    if (req.body.time1 && req.body.time2) {
      obj2['times'] = { '$gt': req.body.time1, '$lt': req.body.time2 }
    }
    let date = await find('orderlist', obj2);
    var str = JSON.stringify(date);
    res.send(str);
    console.log(obj2);
  })();
});
router.post('/insert', function (req, res, next) {
  var date = new Date(req.body.times);
  var time = date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();
  // res.append('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
  var obj = {
    orderid: req.body.orderid,
    goodname: req.body.goodname,
    logistics: req.body.logistics,
    Customer: req.body.Customer,
    tel: req.body.tel,
    times: req.body.times,
    time: time
  }
  for (var item in obj) {
    var encodedBuff = iconv.encode(item, 'gbk');
    var decodedText = iconv.decode(encodedBuff, 'gbk');
  }
  console.log(obj);
  (() => {
    let dat = show1('orderlist', [obj]).then(function (response) {
      //删除成功返回yes
      res.send('yes');
    })
  })();
});
module.exports = router;
