<template>
  <div style="height: 100%;width: 100%">
    <div id="navigator">
      <el-image :src="url" style="height: 45px;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router= true

               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item  index="AfterLogin" >首页</el-menu-item>
        <el-submenu  index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList" >股票列表</el-menu-item>
          <el-menu-item index="Rank" >排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item  index="BuyAtLimitPrice" >股票买卖</el-menu-item>
        <el-menu-item  index="Guide">股票指南</el-menu-item>
        <el-submenu index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange" >当日成交</el-menu-item>
          <el-menu-item index="TodayOrder" >当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo" >历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo" >历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item  index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style = "padding-left: 4%" index="2">
          <template slot="title" ><span style="color: #409EFF;font-size: 6px;margin:auto">欢迎您！{{this.$store.getters.getUsername}}</span></template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;" >
    <div style="height: 90%;width: 100%;float: left">
      <!-------左侧导航栏--->
      <div style="float: left;height: 100%;width: 15%">
        <el-container style="height: 100%; border: 1px solid #eee;">
          <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="activeIndexSelfCenter"
                     router>
              <el-menu-item index="SelfCenter">资产信息</el-menu-item>
              <el-menu-item index="SelfSelectedStock">自选股</el-menu-item>
              <el-menu-item index="SelfInfo" strle="">个人信息</el-menu-item>
            </el-menu>
          </el-aside>
        </el-container>
      </div>
      <div style="float: left;overflow: hidden;height: 5%;margin-top: 2%;margin-left: 5%" >
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/SelfInfo' }">个人信息</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/ForPasVal'}">修改密码</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-card shadow="hover" style="width:50%;margin-left: 30%;margin-top: 7%;height: auto">
        <el-form :model="password" status-icon :rules="rules" ref="password" label-width="100px" class="demo-ruleForm">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input type="password" v-model="password.oldPassword" autocomplete="off"  placeholder="请输入旧密码"></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="loginPassword">
            <el-input type="password" v-model="password.loginPassword" placeholder="请输入8-16位密码 "></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="loginRepassword">
            <el-input type="password" v-model="password.loginRepassword" placeholder="请确认登录密码  "></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('password')">提交</el-button>
            <el-button @click="resetForm('password')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    </div>
  </div>
</template>

<script>
  import api from './../api/index.js'

  export default {
    name: "ForPasVal",
    data() {
      return {
        url:'../../../static/images/xMarket.png',
        password: {
          oldPassword: '',
          loginPassword: '',
          loginRepassword: '',
        },
        active: 0,
        activeIndex: 'SelfCenter',
        activeIndexSelfCenter: 'ForPasVal',
        rules: {
          oldPassword: [
            {required: true, message: '请输入密码 ', trigger: 'blur'},
            {pattern: /^([a-zA-Z0-9|_|\_|\.]{8,16})$/, message: '请输入8-16位字母,数字,下划线和“.” ', trigger: 'blur'}
          ],
          loginPassword: [
            {required: true, message: '请输入密码 ', trigger: 'blur'},
            {pattern: /^([a-zA-Z0-9|_|\_|\.]{8,16})$/, message: '请输入8-16位字母,数字,下划线和“.” ', trigger: 'blur'}
          ],
          loginRepassword: [
            {required: true, message: '请确认登录密码 ', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入登录密码'));
                } else if (value !== this.password.loginPassword) {
                  callback(new Error('两次登录密码不一致!'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            }
          ],
        }
      }
    }
    ,
    methods: {
      exit() {
        this.$store.commit('logout');
        this.$router.push('/')
      },
      toFirst(){
        if(this.$store.getters.isLogin){
          this.$router.push('AfterLogin')
        }else{
          this.$router.push('/')
        }
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let prom = {
              oldPassword: this.password.oldPassword,
              newPassword: this.password.loginPassword,
              userName: this.$store.getters.getUsername,
            };
            this.$api.http('post', "/api/changePassword", prom).then(res => {
              this.$message.success(res.message);
            }).catch((error) => {
              this.$message.error(error.message)
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      toRouterOrAlert(index) {
        if (this.$store.getters.isLogin) {
          this.$router.push(index)
        } else {
          this.$alert('请先登录！', {
            confirmButtonText: '确定',
          });
        }
      },
      /**
       * 重新提交
       */
      resetForm(formName) {
        console.log('resetForm');
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

  a {
    text-decoration: none;
  }

  #exit {
    margin-top: 1.5%;
  }

  table {
    width: 100%;
  }

  td {
    padding-right: 5%;
    text-align: left;
  }

  .rightCard {
    margin-left: 20%;
    margin-right: 10%;
  }

  #select {
    margin-top: 50px;
    float: right;
    width: 30%;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

  userName {
    position: relative;
  }

  a {
    color: rgba(0, 0, 0, 0.81);
    text-decoration: none;
  }

  .Field-label {
    /*position: absolute;*/
    /*font-size: 15px;*/
    /*font-weight: 600;*/
    /*font-synthesis: style;*/
    /*line-height: 36px;*/
    /*color: #444;*/
    width: 10%;
    float: left;
  }

  table {
    width: 100%;
  }

  td {
    padding-right: 5%;
    text-align: left;
  }

  p {
    padding: 2%;
  }

  .rightCard {
    margin-left: 20%;
    margin-right: 10%;
  }

  #select {
    margin-top: 50px;
    float: right;
    width: 30%;
  }

  #stock {
    margin-top: 120px;
  }

  body .el-table th.gutter {
    display: table-cell !important;
  }

  div.el-divider {
    margin-top: 0px;
    margin-bottom: 0px;

    width: 90%;
  }
  #navigator{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    display: inline-block;
    background-color: #fff;
  }
</style>

