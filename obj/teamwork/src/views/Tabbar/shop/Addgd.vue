<template>
  <div class="add_good">
    <h2 class="tt">商品列表</h2>
    <van-divider />
    <div class="form">
      <el-row class="mt">
        <el-col :span="2">
          <span class="attr">商品编号:</span>
        </el-col>
        <el-col :span="10">
          <el-input v-model="val.pid" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row class="mt">
        <el-col :span="2">
          <span class="attr">商品名称:</span>
        </el-col>
        <el-col :span="10">
          <el-input v-model="val.tit" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row class="mt">
        <el-col :span="2">
          <span class="attr">商品库存:</span>
        </el-col>
        <el-col :span="10">
          <el-input v-model="val.store" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row class="mt">
        <el-col :span="2">
          <span class="attr">商品现价:</span>
        </el-col>
        <el-col :span="10">
          <el-input v-model="val.price_home" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
      <el-row class="mt">
        <el-col :span="2">
          <span class="attr">商品原价:</span>
        </el-col>
        <el-col :span="10">
          <el-input v-model="val.price_ref" placeholder="请输入内容"></el-input>
        </el-col>
      </el-row>
    </div>
    <van-divider />

    <van-row type="flex" justify="starts" class="editBtn">
      <van-col>
        <van-button
          type="default"
          size="small"
          class="cancel"
          @click="reset"
          style="margin-right: 10px"
        >清空</van-button>
      </van-col>
      <van-col>
        <van-button type="primary" size="small" @click="add">添加</van-button>
      </van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      val: {
        pid: "",
        tit: "",
        store: "",
        price_home: "",
        price_ref: ""
      },
      check: {
        pid: "",
        tit: "",
        store: "",
        price_home: "",
        price_ref: ""
      }
    };
  },
  methods: {
    add() {
      var test = null;
      this.$axios
        .get("http://localhost:3000/goods/add", {
          params: this.val
        })
        .then(function(response) {
          if(response == 1) {
            alert('插入成功')
            this.reset();
            test = true;
          }else{
            alert('插入失败')
          }
        });
      //----------------------
      if(!test) {
        alert('插入成功');
        this.reset();
      }
    },
    
    reset() {
      console.log(this.val);
      for (const key in this.val) {
        this.val[key] = '';
      }
    }
  }
};
</script>
<style>
.add_good {
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
.add_good .mt {
  margin-top: 20px;
}
.gd-list .tt {
  margin: 0;
  line-height: 50px;
}
.form .attr {
  line-height: 40px;
  font-size: 16px;
}
</style>
