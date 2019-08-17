<template>
  <div>
    <div id="content">
      <div class="addclass">
        <h2>添加新用户</h2>

        <van-cell-group class="userborder">
          <van-field
            v-model="username"
            required
            :clearable="isclear"
            label="用户名"
            right-icon="question-o"
            placeholder="请输入用户名"
            @click-right-icon="$toast('question')"
          />

          <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
          <van-field v-model="phone" type="text" label="手机号码" placeholder="手机号码" required />
        </van-cell-group>
        <input type="submit" value="保存" class="save" @click="addsave" />
        <van-popup v-model="show" class="changeclass">添加成功</van-popup>
      </div>
    </div>
  </div>
</template>

<script>
// 发送注册请求，注册成功，用户管理页面渲染数据，修改数据，删除数据，下午可以写完
export default {
  data() {
    return {
      show: false,
      isclear: true,
      username: "",
      password: "",
      phone: ""
    };
  },
  methods: {
    clear() {
      this.username = "";
    },
    async addsave() {
      if (this.username && this.password && this.phone) {
        this.show = true;
        //非空
        this.$axios({
          method: "post",
          url: "http://localhost:3000/add/login",
          data: this.$qs.stringify({
            //用户id或者用令牌
            name: this.username,
            pas: this.password,
            phone: this.phone
          })
        }).then(res => {
          console.log(res);
        });
      } else {
        //为空
        console.log("空");
      }
    }
  }
};
</script>



<style>
.userborder {
  width: 320px;
  /* border: 1px solid black; */
}
.addclass {
  padding-top: 30px;
  padding-left: 50px;
  width: 96%;
  height: 300px;
  background: white;
}
.save {
  margin-top: 30px;
  margin-left: 230px;
  height: 30px;
  width: 50px;
}
.changeclass {
  font-size: 23px;
  height: 50px;
  width: 100px;
  line-height: 50px;
  text-align: center;
}
</style>
