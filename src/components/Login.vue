<template>
  <div>
    <div id="navigator">
      <el-image :src="url" style="height: 10%;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router=true

               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item index="AfterLogin" @click="toFirst">首页</el-menu-item>
        <el-submenu style="padding-left: 2%" index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item style="padding-left: 1%" @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
        <el-menu-item style="padding-left: 1%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="padding-left: 1%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')">当日成交</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('TodayOrder')">当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')">历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item style="padding-left: 1%" @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>
    </div>

    <div style="z-index: 1;position:relative;">
      <!--    <div id="sin">-->

      <!--      <div id="sleft">-->
      <!--        <search></search>-->
      <!--      </div>-->
      <!--      <div id="sright">-->
      <!--        <el-button v-if="this.shenIndex.lastIndex>=this.shenIndex.yesterdayCloseIndex" type="text" class="index" style="color: #ff3434" @click="gotoIndexDisplay(shenIndex.indexId)">深证成指：{{shenIndex.lastIndex}}</el-button>-->
      <!--        <el-button v-else type="text" class="index" style="color: #02e602" @click="gotoIndexDisplay(shenIndex.indexId)">深证成指：{{shenIndex.lastIndex}}</el-button>-->
      <!--        <el-button v-if="this.shangIndex.lastIndex>=this.shangIndex.yesterdayCloseIndex" type="text" class="index" style="color: #ff3434" @click="gotoIndexDisplay(shangIndex.indexId)">上证指数：{{shangIndex.lastIndex}}</el-button>-->
      <!--        <el-button v-else type="text" class="index" style="color: #02e602" @click="gotoIndexDisplay(shangIndex.indexId)">上证指数：{{shangIndex.lastIndex}}</el-button>-->
      <!--      </div>-->

      <!--    </div>-->

      <div style="width: 50%;margin: auto">
        <search></search>
      </div>

      <div style="margin-top: 2%;display: inline-block;width: 30%">
        <div style="float: left;width: 40%">
          <el-button v-if="this.shenIndex.lastIndex>=this.shenIndex.yesterdayCloseIndex" type="text" class="index"
                     style="color: #ff3434" @click="gotoIndexDisplay(shenIndex.indexId)">深证成指：{{shenIndex.lastIndex}}
          </el-button>
          <el-button v-else type="text" class="index" style="color: #02e602"
                     @click="gotoIndexDisplay(shenIndex.indexId)">深证成指：{{shenIndex.lastIndex}}
          </el-button>
        </div>
        <div style="float: right;width: 40%">
          <el-button v-if="this.shangIndex.lastIndex>=this.shangIndex.yesterdayCloseIndex" type="text" class="index"
                     style="color: #ff3434" @click="gotoIndexDisplay(shangIndex.indexId)">上证指数：{{shangIndex.lastIndex}}
          </el-button>
          <el-button v-else type="text" class="index" style="color: #02e602"
                     @click="gotoIndexDisplay(shangIndex.indexId)">上证指数：{{shangIndex.lastIndex}}
          </el-button>
        </div>
      </div>

      <div id="in">
        <!--公告-->
        <div id="left">
          <el-card class="box-card" style="height: 350px;" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-postcard" style="font-size: 25px"></i>
              <span style="font-size: 25px">公告</span>
              <router-link to="/News">
                <el-button style="float: right; padding: 3px 0" type="text">更多公告</el-button>
              </router-link>
            </div>

            <el-table
              :data="news"
              @row-dblclick="handleNews"
              style="width: 100%">
              <el-table-column
                prop="title"
                label="标题"
                width="280">
              </el-table-column>
              <el-table-column
                prop="date"
                label="日期"
              >
              </el-table-column>
            </el-table>

          </el-card>

        </div>
        <!--自选股-->
        <div id="right">
          <el-card class="box-card" style="height: 350px" shadow="hover">
            <div slot="header" class="clearfix">
              <i class="el-icon-user" style="font-size: 25px"></i>
              <span style="font-size: 25px">登录</span>
            </div>
            <div id="login">
              <el-form label-position="left" label-width="80px" :model="user"
                       :rules="rules" ref="ruleForm">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="user.username" placeholder="请输入用户名  "></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="loginPassword">
                  <el-input type="password" v-model="user.loginPassword" placeholder="请输入密码  "></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="validateCode">
                  <el-col :span="14">
                    <el-input v-model="user.validateCode" placeholder="请输验证码 "></el-input>
                  </el-col>
                  <el-col class="line" :span="2"> &nbsp</el-col>
                  <el-col :span="6">

                    <img style="width: 100px; height: 30px" :src="imgCodeUrl" @click="refreshCode()"></img>

                  </el-col>

                </el-form-item>
                <el-button class="submit-btn" type="primary" @click="login('ruleForm')">登录</el-button>
              </el-form>
              <router-link to="/forgetPassword">
                <el-button type="text" icon="el-icon-edit" style="float: left">忘记密码</el-button>
              </router-link>
              <router-link to="/register">
                <el-button type="text" icon="el-icon-edit" style="float: right">去注册页</el-button>
              </router-link>
            </div>
          </el-card>


        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import Search from './Search'
  import axios from 'axios'

  Vue.component('search', Search);

  export default {
    name: 'login',
    components: {
      Search,
    },
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: '/',
        news: [],
        shenIndex: {
          lastIndex: '',
          yesterdayCloseIndex: '',
          indexId: '',
        },
        shangIndex: {
          lastIndex: '',
          yesterdayCloseIndex: '',
          indexId: '',
        },
        user: {
          username: '',
          loginPassword: '',
          validateCode: ''
        },
        msg: 'Welcome to Your Vue.js App',
        imgCodeUrl: "",
        rules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          loginPassword: [
            {required: true, message: '请输入密码 ', trigger: 'blur'}
          ],
          validateCode: [
            {required: true, message: '请输入验证码 ', trigger: 'blur'}
          ]
        }
      }
    },
    mounted: function () {
      this.refreshCode();//需要触发的函数
    },
    created() {
      this.setNewsApi();
      this.setIndexApi();
    },
    methods: {

      warning() {
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
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

      handleNews(row) {
        this.$store.commit('title', row.title)
        this.$router.push('OneNew')
      },

      gotoIndexDisplay(index) {
        this.$store.commit('indexId', index)
        this.$router.push('IndexDisplay')
      },

      refreshCode() {
        let self = this;
        axios.get('/api/validateCode', {
          responseType: "arraybuffer",
        }).then(function (response) {
          //将从后台获取的图片流进行转换
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
        }).then(function (data) {
          //接收转换后的Base64图片
          self.imgCodeUrl = data;

        }).catch(function (err) {
        })
      },


      //获取公告
      setNewsApi: function () {
        this.$api.http('get', '/api/getNews').then(res => {
          let data = res.data
          if (data.length >= 4) {
            this.news = data.slice(0, 4)
          }
          else {
            this.news = data;
          }
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },

      //获取指数
      setIndexApi: function () {
        this.$api.http('get', '/api/getIndex').then(res => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].indexName === '上证指数') {
              this.shangIndex.lastIndex = data[i].lastIndex
              this.shangIndex.yesterdayCloseIndex = data[i].yesterdayCloseIndex
              this.shangIndex.indexId = data[i].indexId
            }
            else {
              this.shenIndex.lastIndex = data[i].lastIndex
              this.shenIndex.yesterdayCloseIndex = data[i].yesterdayCloseIndex
              this.shenIndex.indexId = data[i].indexId
            }
          }
          // this.shenIndex = res.
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      login(formName) {
        let self = this;
        let userId
        self.$refs[formName].validate((valid) => {
          if (valid) {
            // let params ={
            //   username:this.user.username
            // }
            // //获取用户Id
            // this.$api.http('get','/api/getUserId',params).then(res=>{
            //   console.log(res);
            //   userId=res.data.userId
            // })
            let payload = {
              username: self.user.username,
              //   userId:userId,
              loginPassword: self.user.loginPassword,
              validateCode: self.user.validateCode
            }
            self.$store.dispatch('login', payload)
              .then((response) => {
                self.$message.success(response.message)
                self.$router.push('/afterLogin');
              })
              .catch((response) => {
                self.$message.error(response.message)
              })
          }
        });
      }
    }
  }


</script>

<style lang="scss">

  #in {
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }

  #left {
    margin-top: 5%;
    float: left;
    width: 45%;
    height: 45%
  }

  #right {
    margin-top: 5%;
    float: right;
    width: 45%;
    height: 45%
  }

  a {
    text-decoration: none;
  }

  #sin {
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }

  #sleft {
    margin-top: 3%;
    float: left;
    width: 60%;
    height: 50%
  }

  #sright {
    margin-top: 6%;
    float: right;
    width: 40%;
    height: 50%
  }

  #navigator {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

  .el-aside {
    color: #333;
  }

  .code {
    margin: 400px auto;
    width: 114px;
    height: 40px;
    border: 1px solid red;
  }

  .in {
    margin-top: 200px;
  }

  .index {
    font-size: 16px;
    font-family: "Century Gothic";
  }

  #navigator {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    display: inline-block;
  }

</style>
