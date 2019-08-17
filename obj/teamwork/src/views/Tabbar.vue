<template>
  <div>
    <!-- //头部 -->
    <div id="header">
      <!-- 1、这里改成你的网站管理系统：蘑菇街电商管理系统 -->
      <h1>
        <a href="dashboard.html">购物电商管理系统</a>
      </h1>
    </div>
    <!-- //头部 -->
    <div id="user-nav" class="navbar navbar-inverse">
      <ul class="nav" style="width: auto; margin: 0px;">
        <li class="dropdown" id="profile-messages">
          <a
            title
            href="#"
            data-toggle="dropdown"
            data-target="#profile-messages"
            class="dropdown-toggle"
          >
            <i class="icon icon-user"></i>&nbsp;
            <span class="text">欢迎你，admin</span>&nbsp;
            <b class="caret"></b>
          </a>
        </li>
        <li class>
          <a title href="login.html">
            <i class="icon icon-share-alt"></i>
            <span class="text">&nbsp;退出系统</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- //头部 -->
    <div id="search">
      <input type="text" placeholder="搜索..." />
    </div>

    <!-- //左边导航 -->
    <el-row class="tac">
      <el-col :span="12">
        <h2 style="margin-left:30px;">后台系统管理</h2>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/tabbar/username" class="service">
                <el-menu-item index="1-1">用户管理</el-menu-item>
              </router-link>
              <router-link to="/tabbar/add" class="service">
                <el-menu-item index="1-2 ">添加新用户</el-menu-item>
              </router-link>
              <router-link to="/tabbar/changepwd" class="service">
                <el-menu-item index="1-3">修改密码</el-menu-item>
              </router-link>
              <router-link to="/tabbar/shop" class="service">
                <el-menu-item index="1-4">商品信息管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/tabbar/order" class="service">
                <el-menu-item index="1-1">订单</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/tabbar/addGd" class="service">
                <el-menu-item index="1-1">添加商品</el-menu-item>
              </router-link>
              <router-link to="/tabbar/goodList" class="service">
                <el-menu-item index="1-2 ">商品列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>

    <!-- 后台管理的右边 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabbarItem: [
        {
          //添加新用户
          url: "add"
        },
        {
          //修改密码
          url: "changepwd"
        },
        {
          //用户管理
          url: "username"
        }
      ]
    };
  },

  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },

    //跳转到其他路由
    addto(name) {
      this.$router.push(name);
    }
  }
};
</script>

<style>
#content {
  height: 500px;
  width: 1300px;
  position: absolute;
  left: 230px;
}
.el-col el-col-12 {
  position: absolute;
}
element.style {
  height: 744px;
}
body {
  background: #2e363f;
  font-family: "Microsoft Yahei";
}
body {
  overflow: hidden;
  margin-top: -10px;
  font-family: "Microsoft Yahei", sans-serif;
  font-size: 12px;
  color: #666;
}

#user-nav {
  position: absolute;
  right: 285px;
  /* left: 220px; */
  top: 0px;
  z-index: 20;
  margin: 0;
  float: right;
}
#sidebar > ul li ul {
  display: block;
}
#sidebar {
  background: #1e242b;
}
.el-submenu {
  width: 220px;
}
.el-menu {
  width: 220px;
}
.el-col el-col-12 {
  width: 0px;
  position: absolute;
}
.tac el-row {
  position: absolute;
}
.el-col-12 {
  position: absolute;
}
</style>

