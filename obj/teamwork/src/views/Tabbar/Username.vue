<template>
  <div>
    <div id="content">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="姓名" width="180">
          <template slot-scope="scope">
            <el-popover placement="top">
              <!-- <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>-->
              <div slot="reference" class="name-wrapper">
                <el-tag
                  size="medium"
                  contenteditable="true"
                  :key="scope.$index"
                >{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="手机" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px" contenteditable="true">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">保存</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <van-popup v-model="show" class="changeclass">删除成功</van-popup>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      //这里放获取到后端的数据数组
      tableData: []
    };
  },
  methods: {
    async handleEdit(index, row) {
      //存在的bug，修改内容时获取不到修改的内容，给后台发送的信息
      this.$axios({
        method: "post",
        url: "http://localhost:3000/change/login",
        data: this.$qs.stringify({
          //用户id或者用令牌
          name: row.name,
          phone: row.phone
        })
      }).then(res => {
        console.log(res);
      });
    },
    //删除
    async handleDelete(index, row) {
      this.show = true;
      this.$axios({
        method: "post",
        url: "http://localhost:3000/del/login",
        data: this.$qs.stringify({
          //用户id或者用令牌
          phone: row.phone
        })
      });
      //延迟渲染这里有Bug,少用延迟定时器，用异步解决,怎么让数据自动更新，后台更新了
      //但是视图层没有改变
      setTimeout(() => {
        this.$axios({
          method: "post",
          url: "http://localhost:3000/users/login"
        }).then(res => {
          this.tableData = res.data;
        });
      }, 100);
    }
  },
  async created() {
    this.$axios({
      method: "post",
      url: "http://localhost:3000/users/login"
    }).then(res => {
      this.tableData = res.data;
    });
  }
};
</script>
<style>
.changeclass {
  font-size: 23px;
  height: 50px;
  width: 100px;
  line-height: 50px;
  text-align: center;
}
</style>

