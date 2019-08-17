<template>
  <div class="gd-list">
    <h2 class="tt">商品列表</h2>
    <el-row type="flex" class="row-bg action" justify="start">
      <el-col :span="6">
        <el-input placeholder="请输入商品名称" v-model="searchVal">
          <label slot="prepend">商品id:</label>
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </el-col>
    </el-row>

    <el-table
      :data="nowData"
      style="width: 100%"
      :default-sort="{prop: 'pid', order: 'descending'}"
      stripe
      class="gd-tb"
    >
      <el-table-column prop="pid" label="商品编号" sortable width="180"></el-table-column>
      <el-table-column prop="tit" label="商品名称" width="180"></el-table-column>
      <el-table-column prop="store" label="库存" sortable></el-table-column>
      <el-table-column prop="price_home" label="现价" sortable :formatter="priceHome"></el-table-column>
      <el-table-column prop="price_ref" label="原价" sortable :formatter="priceRef"></el-table-column>
      <el-table-column prop="sales" label="销量"></el-table-column>
      <el-table-column label="操作" width="190">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      layout="prev, pager, next"
      hide-on-single-page
      :total="gdList.length"
      class="page_btn"
      @size-change="updateData"
      @current-change="setNow"
      :current-page="currentPage"
    ></el-pagination>

    <!-- 弹窗 -->
    <van-popup v-model="show" :style="{ width: '500px',background: '#fff' }" round>
      <h2 class="edit-tt">修改商品</h2>
      <van-divider />
      <div class="edit-form">
        <van-field clearable v-model="editData.pid" label="编号" :placeholder="editData.pid" />
        <van-field clearable v-model="editData.tit" label="商品名称" />
        <van-field clearable v-model="editData.store" label="库存" />
        <van-field clearable v-model="editData.price_home" label="现价" />
        <van-field clearable v-model="editData.price_ref" label="原价" />
      </div>

      <van-divider />
      <van-row type="flex" justify="end" class="editBtn">
        <van-col>
          <van-button type="default" size="small" class="cancel" @click="editCancel">取消</van-button>
        </van-col>
        <van-col>
          <van-button type="primary" size="small" @click="editSave">保存</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: "价格升序",
          label: "价格升序"
        },
        {
          value: "价格降序",
          label: "价格降序"
        },
        {
          value: "销量降序",
          label: "销量降序"
        }
      ],
      value: "",
      //所有商品数据
      gdList: [],
      //当前页的数据
      nowData: [],
      //当前页
      currentPage: 1,
      //弹窗状态
      show: false,
      editData: {},
      editOldData: {},
      searchVal: null
    };
  },
  created() {
    this.$axios("http://localhost:3000/goods/all").then(res => {
      this.gdList = res.data;
      var old = JSON.stringify(this.gdList);
      this.nowData = JSON.parse(old).slice(0, 10);
    });
  },
  methods: {
    priceHome(row, column) {
      return (row.price_home - 0).toFixed(2);
    },
    priceRef(row, column) {
      return (row.price_ref - 0).toFixed(2);
    },

    search() {
      var reg = new RegExp("^" + this.searchVal);
      this.gdList.forEach((item, idx) => {
        if (reg.test(item.pid)) {
          console.log(item);
        }
      });
    },

    handleEdit(index, row) {
      var { pid, tit, store, price_home, price_ref, _id } = row;
      this.editData = {
        pid,
        tit,
        store,
        price_home,
        price_ref,
        _id
      };
      this.show = true;
    },
    editCancel() {
      this.show = false;
    },
    editSave() {
      this.$axios
        .get("http://localhost:3000/goods/update", {
          params: this.editData
        })
        .then(function(response) {
          console.log(response);
        });
      this.$message({
        message: "更改成功",
        type: "success"
      });
      var index = null;
      this.nowData.forEach((item, idx) => {
        if (item._id == this.editData._id) {
          index = idx;
        }
      });
      this.nowData[index].store = this.editData.store;
      this.nowData[index].pid = this.editData.pid;
      this.nowData[index].tit = this.editData.tit;
      this.nowData[index].price_home = this.editData.price_home;
      this.nowData[index].price_ref = this.editData.price_ref;
      //转换
      var old = JSON.stringify(this.nowData);
      this.nowData = JSON.parse(old);

      this.show = false;
    },

    handleDelete(index, row) {
      var _id = row._id;
      this.$axios
        .get("http://localhost:3000/goods/delete", {
          params: {
            _id: _id
          }
        })
        .then(function(response) {
          console.log(response);
        });

      this.gdList.forEach((item, idx) => {
        if (this.gdList[idx]._id == row._id) {
          this.gdList.splice(idx, 1);
        }
      });
      this.setNow(this.currentPage);
    },
    updateData() {
      console.log("当前页数据改变啦！");
    },
    setNow(i) {
      this.currentPage = i;
      var old = JSON.stringify(this.gdList);
      this.nowData = JSON.parse(old).splice((i - 1) * 10, i * 10 - 1);
      // console.log(this.gdList);
    },
    onSubmit() {
      console.log("提交啦");
    }
  },
  watch: {
    searchVal() {
      if (this.searchVal !== "") {
        var reg = new RegExp("^" + this.searchVal);
        var gds = [];
        this.gdList.forEach((item, idx) => {
          if (reg.test(item.pid)) {
            gds.push(item);
          }
        });
        console.log(gds);
        this.nowData = gds;
      } else {
        this.setNow(1);
      }
    }
  }
};
</script>
<style>
.gd-list {
  box-sizing: border-box;
  position: relative;
  left: 220px;
  right: 0;
  height: calc(100vh - 50px);
  width: calc(100vw - 220px);
  padding: 0 25px;
  background-color: rgb(239, 242, 248);
  overflow-y: scroll;
  /* padding: 0 25px; */
}
.gd-list .tt {
  margin: 0;
  line-height: 50px;
}
.gd-list .action {
  padding: 10px 0;
  background: #fff;
}
.gd-list .gd-tb {
  margin-top: 20px;
  padding: 0 25px;
}
.gd-list .page_btn {
  display: table;
  margin: 15px auto;
}
.gd-list .edit-tt {
  padding-left: 20px;
}
.gd-list .edit-form {
  padding: 0 10px;
}
.gd-list .editBtn {
  padding: 0 20px 20px;
}
.gd-list .editBtn .cancel {
  margin-right: 10px;
}
</style>
