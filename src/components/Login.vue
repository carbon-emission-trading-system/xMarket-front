<template>
  <div>
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router=true>

        <el-menu-item style="margin-left: 15%" index="/">首页</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList" >股票列表</el-menu-item>
          <el-menu-item index="Rank" >排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item style="margin-left: 5%" @click="warning">股票买卖</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="margin-left: 5%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="warning">当日成交</el-menu-item>
          <el-menu-item @click="warning">当日委托</el-menu-item>
          <el-menu-item @click="warning">历史持仓</el-menu-item>
          <el-menu-item @click="warning">历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style="margin-left: 5%" @click="warning">个人中心</el-menu-item>
      </el-menu>
    </div>

    <div id="sin">

      <div id="sleft">
        <search></search>
      </div>
      <div id="sright">
        <el-button v-if="this.shenIndex.lastIndex>=this.shenIndex.yesterdayCloseIndex" type="text" class="index" style="color: #ff3434" @click="gotoIndexDisplay(0)">深证成指：{{shenIndex.lastIndex}}</el-button>
        <el-button v-else type="text" class="index" style="color: #02e602" @click="gotoIndexDisplay(0)">深证成指：{{shenIndex.lastIndex}}</el-button>
        <el-button v-if="this.shangIndex.lastIndex>=this.shangIndex.yesterdayCloseIndex" type="text" class="index" style="color: #ff3434" @click="gotoIndexDisplay(1)">上证指数：{{shangIndex.lastIndex}}</el-button>
        <el-button v-else type="text" class="index" style="color: #02e602" @click="gotoIndexDisplay(1)">上证指数：{{shangIndex.lastIndex}}</el-button>
      </div>

    </div>
    <div id="in">
      <!--公告-->
      <div id="left">
        <el-card class="box-card" style="height: 350px;">
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
        <el-card class="box-card" style="height: 350px">
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
        activeIndex: '/',
        news: [],
        shenIndex:{
          lastIndex:'',
          yesterdayCloseIndex:''
        },
        shangIndex:{
          lastIndex:'',
          yesterdayCloseIndex:''
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
          validateCode:[
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

      handleNews(row){
        this.$store.commit('title',row.title)
        this.$router.push('OneNew')
      },

      gotoIndexDisplay(index){
        this.$store.commit('marketIndex',index)
        this.$router.push('IndexDisplay')
      },

      refreshCode(){
        let self =this;
        axios.get('/api/validateCode' ,{
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
        if(data.length>=4){
          this.news = data.slice(0,4)
        }
        else{
          this.news = data;
        }}).catch((error) => {
        this.$message.error(error.message)
      })
    },

      //获取指数
      setIndexApi:function () {
        this.$api.http('get','/api/getIndex').then(res=>{
          let data = res.data
          for(let i = 0; i<data.length; i++){
            if(data[i].indexName ==='上证指数'){
              this.shangIndex.lastIndex = data[i].lastIndex
              this.shangIndex.yesterdayCloseIndex = data[i].yesterdayCloseIndex
            }
            else{
              this.shenIndex.lastIndex = data[i].lastIndex
              this.shenIndex.yesterdayCloseIndex = data[i].yesterdayCloseIndex
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



  !(function() {
    function n(n, e, t) {
      return n.getAttribute(e) || t;
    }

    function e(n) {
      return document.getElementsByTagName(n);
    }

    function t() {
      var t = e("script"),
        o = t.length,
        i = t[o - 1];

      return {
        l: o,
        z: n(i, "zIndex", -1),
        o: n(i, "opacity", 0.5),
        c: n(i, "color", "0,0,0"),
        n: n(i, "count", 99)
      };
    }

    function o() {
      (a = m.width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth),
        (c = m.height =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight);
    }

    function i() {
      r.clearRect(0, 0, a, c);

      var n, e, t, o, m, l;

      s.forEach(function(i, x) {
        for (
          i.x += i.xa,
            i.y += i.ya,
            i.xa *= i.x > a || i.x < 0 ? -1 : 1,
            i.ya *= i.y > c || i.y < 0 ? -1 : 1,
            r.fillRect(i.x - 0.5, i.y - 0.5, 1, 1),
            e = x + 1;
          e < u.length;
          e++
        )
          (n = u[e]),
          null !== n.x &&
          null !== n.y &&
          ((o = i.x - n.x),
            (m = i.y - n.y),
            (l = o * o + m * m),
          l < n.max &&
          (n === y &&
          l >= n.max / 2 &&
          ((i.x -= 0.03 * o), (i.y -= 0.03 * m)),
            (t = (n.max - l) / n.max),
            r.beginPath(),
            (r.lineWidth = t / 2),
            (r.strokeStyle = "rgba(" + d.c + "," + (t + 0.2) + ")"),
            r.moveTo(i.x, i.y),
            r.lineTo(n.x, n.y),
            r.stroke()));
      }),
        x(i);
    }

    var a,
      c,
      u,
      m = document.createElement("canvas"),
      d = t(),
      l = "c_n" + d.l,
      r = m.getContext("2d"),
      x =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(n) {
          window.setTimeout(n, 1e3 / 45);
        },
      w = Math.random,
      y = { x: null, y: null, max: 2e4 };
    (m.id = l),
      (m.style.cssText =
        "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o),
      e("body")[0].appendChild(m),
      o(),
      (window.onresize = o),
      (window.onmousemove = function(n) {
        (n = n || window.event), (y.x = n.clientX), (y.y = n.clientY);
      }),
      (window.onmouseout = function() {
        (y.x = null), (y.y = null);
      });

    for (var s = [], f = 0; d.n > f; f++) {
      var h = w() * a,
        g = w() * c,
        v = 2 * w() - 1,
        p = 2 * w() - 1;
      s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 });
    }

    (u = s.concat([y])),
      setTimeout(function() {
        i();
      }, 100);
  })();



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
  #sin{
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }
  #sleft{
    margin-top: 3%;
    float:left;
    width:60%;
    height: 50%
  }
  #sright{
    margin-top: 6%;
    float: right;
    width: 35%;
    height: 50%
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
  .index{
    font-size: 20px;
    font-family: "Century Gothic";
  }

</style>
