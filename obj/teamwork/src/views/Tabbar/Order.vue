<template>
  <div>
    <div id="content">
      <div class="main">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item index="1">处理中心</el-menu-item>
        </el-menu>订单编号:
        <el-input placeholder="请输入内容" v-model="orderid" clearable></el-input>
        <span class="demonstration">订单时间:从</span>
        <el-date-picker v-model="time1" type="date" placeholder="选择日期"></el-date-picker>
        <span class="demonstration">到</span>
        <el-date-picker v-model="time2" type="date" placeholder="选择日期"></el-date-picker>
        <div class="Contacts">
          物流公司:
          <el-input placeholder="请输入内容" v-model="logistics" clearable></el-input>收货联系人:
          <el-input placeholder="请输入内容" v-model="Customer" clearable></el-input>收货方电话:
          <el-input placeholder="请输入内容" v-model="tel" clearable></el-input>
          <el-button type="primary" @click="search">查询</el-button>
          <el-button type="primary" @click="insert">添加</el-button>
        </div>
        <div class="orderTable">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="orderid" label="订单编号" width="150"></el-table-column>
            <el-table-column prop="goodname" label="商品名称" width="230"></el-table-column>
            <el-table-column prop="time" label="订单成立时间" width="170"></el-table-column>
            <el-table-column prop="logistics" label="物流公司" width="150"></el-table-column>
            <el-table-column prop="Customer" label="收货联系人" width="150"></el-table-column>
            <el-table-column prop="tel" label="收货人电话" width="150"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click.native.prevent="deleteRow(scope.$index, tableData)"
                >删除</el-button>
                <el-button type="text" size="small" @click="open(scope.$index, tableData)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 弹窗 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="alldata.length"
            @current-change="chage"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input10: "",
      value1: "",
      //每一页的数据
      tableData: [],
      //全部数据，生成页码
      alldata: "",
      orderid: "",
      time1: "",
      time2: "",
      logistics: "",
      Customer: "",
      tel: ""
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    //查询按钮
    async search() {
      let orderid = this.orderid;
      let time3 = this.time1;
      let time4 = this.time2;
      var data = new Date(time3);
      var time1 = data.getTime();
      var data2 = new Date(time4);
      var time2 = data2.getTime();
      let logistics = this.logistics;
      let Customer = this.Customer;
      let tel = this.tel;
      let str = await this.$axios.post("http://localhost:3000/search", {
        orderid,
        time1,
        time2,
        logistics,
        Customer,
        tel
      });
      console.log(str);
      this.tableData = str.data;
      this.alldata = str.data;
    },
    //添加
    insert() {
      this.$alert(
        `<p style="margin-bottom:10px">订单编号: <input type="text" id="order1"></p>
       <p style="margin-bottom:10px">商品名称: <input type="text" id="goods1"></p>
       <p style="margin-bottom:10px">物流公司: <input type="text" id="logistics1"></p>
       <p style="margin-bottom:10px">收货联系人: <input type="text" id="Customer1"></p>
       <p style="margin-bottom:10px">收货电话: <input type="text" id="tel1"></p>`,
        "HTML 片段",
        {
          dangerouslyUseHTMLString: true
        }
      ).then(async () => {
        let order1 = document.getElementById("order1").value;
        let goods1 = document.getElementById("goods1").value;
        let logistics1 = document.getElementById("logistics1").value;
        let Customer1 = document.getElementById("Customer1").value;
        let tel1 = document.getElementById("tel1").value;
        let date = new Date();
        let time = date.getTime();
        let str = await this.$axios.post("http://localhost:3000/insert", {
          orderid: order1,
          goodname: goods1,
          logistics: logistics1,
          Customer: Customer1,
          tel: tel1,
          times: time
        });
        if (str.data == "yes") {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
        } else {
          this.$message({
            type: "success",
            message: "添加失败!"
          });
        }
      });
    },
    //封装获取订单数据方法     不传参代表拿全部数据，传参进行分类
    async gettable() {
      let index = arguments[0];
      let str = await this.$axios("http://localhost:3000/tabledate", {
        params: {
          index: index
        }
      });
      if (index) {
        this.tableData = str.data;
      } else {
        this.alldata = str.data;
      }
    },
    //当页码改变是触发
    chage(val) {
      this.gettable(val);
    },
    //封装弹窗删除
    //删除
    deleteRow(index, rows) {
      var _this = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          console.log(rows[index].orderid); //获取到订单编号
          let str = this.$axios("http://localhost:3000/delorder", {
            params: {
              orderid: rows[index].orderid
            }
          })
            .then(function(response) {
              console.log(response);
              rows.splice(index, 1);
              console.log(_this);
              location.reload();
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    open(index, arr) {
      this.$alert(
        `<h2 style="margin-bottom:10px">订单编号:${arr[index].orderid}</h2>
        <p style="margin-bottom:10px">商品名称: ${arr[index].goodname}</p>
        <p style="margin-bottom:10px">物流公司: <input type="text" value="${arr[index].logistics}" id="logistics" 
        ></p>
        <p style="margin-bottom:10px">收货联系人: <input type="text" value="${arr[index].Customer}" id="Customer"></p>
        <p style="margin-bottom:10px">收货人电话: <input type="text" value="${arr[index].tel}" id="tel"></p>`,
        "HTML 片段",
        {
          dangerouslyUseHTMLString: true,
          customClass: "mess2"
        }
      ).then(() => {
        let logistics = document.getElementById("logistics");
        let Customer = document.getElementById("Customer");
        let tel = document.getElementById("tel");
        let str = this.$axios("http://localhost:3000/editorder", {
          params: {
            orderid: arr[index].orderid,
            logistics: logistics.value,
            Customer: Customer.value,
            tel: tel.value
          }
        }).then(response => {
          this.$message({
            type: "success",
            message: "编辑成功!"
          });
          location.reload();
        });
      });
    }
  },
  created() {
    this.gettable();
    this.gettable(1);
  }
};
</script>
<style scoped>
.main {
  width: 90%;
  margin: 20px auto;
  font-size: 17px;
}
#content .el-menu-demo {
  width: 100%;
  margin-bottom: 20px;
}
#content .el-input {
  width: 200px;
}
#content .el-input:nth-of-type(1) {
  margin-right: 60px;
}
#content .demonstration {
  margin-right: 15px;
}
#content .el-input {
  margin-right: 20px;
}

#content .Contacts {
  margin-top: 20px;
  margin-bottom: 20px;
}

#content .Contacts .el-input:nth-of-type(2) {
  margin-right: 60px;
}
#content .el-pagination {
  margin-left: 750px;
}
/* 编辑弹出窗 */
#content .mess2 .el-message-box__message > p > p {
  margin-bottom: 10px;
}
</style>


