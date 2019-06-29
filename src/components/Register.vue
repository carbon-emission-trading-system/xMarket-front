<template>
  <div style="width: 100%;height: 100%">
    <div id="navigator">
      <el-image :src="url" style="height: 45px;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router=true

               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item index="/" >首页</el-menu-item>
        <el-submenu index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
        <el-menu-item index="Guide">股票指南</el-menu-item>
        <el-submenu index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')">当日成交</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('TodayOrder')">当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')">历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-menu-item style="padding-left: 4%;color: #409EFF" ><span @click="loginn">登录</span><span>/</span>
          <span style="color: #409EFF" @click="registerr">注册</span>
        </el-menu-item>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div id="register">
        <el-card class="box-card" style="margin-top: 5%" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="font-size: 20px;">注册</span>
          </div>
          <el-form label-position="left" label-width="120px"
                   :model="user"
                   :rules="rules"
                   ref="user">
            <el-form-item label="邮箱"
                          prop="email"
                          :rules="[{
                        required: true,
                        validator: DetermineIfmailExists,
                        trigger: 'blur'
                        }]">
              <el-input v-model="user.email" placeholder="请输电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="mailCode">
              <el-col :span="14">
                <el-input v-model="user.mailCode" placeholder="请输入邮箱验证码"
                          @blur="focusState = false"
                          v-focus="focusState"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="6">
                <el-button v-show="show" class="submit-btn" type="primary" @click="getMailCode(this)">获取验证码</el-button>
                <el-button v-show="!show" class="submit-btn" type="primary">{{ count }}S</el-button>
              </el-col>
            </el-form-item>
            <el-form-item label="用户名"
                          prop="username"
                          :rules="[
                        {
                          required:true, validator: DetermineIfUserNameExists, trigger: 'blur'
                        },
                        {pattern: /^([a-zA-Z0-9|_|\_|\.]{1,16})$/, message: '请输入1-16位字母,数字,下划线和“.” ', trigger: 'blur'},
                        ]">
              <el-input v-model="user.username" placeholder="请输入最多16位用户名 "></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="loginPassword">
              <el-input type="password" v-model="user.loginPassword" placeholder="请输入8-16位密码 "></el-input>
            </el-form-item>
            <el-form-item label="确认登录密码" prop="loginRepassword">
              <el-input type="password" v-model="user.loginRepassword" placeholder="请确认登录密码  "></el-input>
            </el-form-item>
            <!--<el-form-item label="交易密码" prop="transactionPassword">-->
              <!--<el-input type="password" v-model="user.transactionPassword" placeholder="只能输入6位数字  "></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="确认交易密码" prop="transactionRepassword">-->
              <!--<el-input type="password" v-model="user.transactionRepassword" placeholder="请确认交易密码  "></el-input>-->
            <!--</el-form-item>-->

         <div>
            <el-button class="submit-btn" type="primary" @click="register('user')">注册</el-button>
         </div>
            <div>
            <router-link to="/">
              <el-button type="text" icon="el-icon-edit" style="float: right">去登录页</el-button>
            </router-link>
            </div>
          </el-form>


        </el-card>
      </div>
    </div>
  </div>
</template>

import qs from 'qs'

<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        focusState: '',
        activeIndex: '/',
        user: {
          username: '',
          email: '',
          loginPassword: '',
          loginRepassword: '',
          mailCode: ''
        },
        show: true,
        flag: 1,
        msg: 'Welcome to Your Vue.js App',
        count: 26516,
        timer: null,
        rules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {
              pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
              message: '邮箱格式错误',
              trigger: 'blur'
            }

          ],
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            // {pattern: /^([a-zA-Z0-9|_|\_|\.]{2,13})$/, message: '只能输入字母，数字，下划线和“.”', trigger: 'blur'},
          ],
          loginPassword: [
            {required: true, message: '请输入密码 ', trigger: 'blur'},
            {pattern: /^([a-zA-Z0-9|_|\_|\.]{8,16})$/, message: '请输入8-16位字母,数字,下划线和“.” ', trigger: 'blur'}
          ],
          // transactionPassword: [
          //   {required: true, message: '请输入交易密码 ', trigger: 'blur'},
          //   {pattern: /^\d{6}$/, message: '请输入6位数字！', trigger: 'blur'},
          //
          // ],
          loginRepassword: [
            {required: true, message: '请确认登录密码 ', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入登录密码'));
                } else if (value !== this.user.loginPassword) {
                  callback(new Error('两次登录密码不一致!'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
            }
          ],

          // transactionRepassword: [
          //   {required: true, message: '请确认交易密码 ', trigger: 'blur'},
          //   {
          //     validator: (rule, value, callback) => {
          //       if (value === '') {
          //         callback(new Error('请再次输入交易密码'));
          //       } else if (value !== this.user.transactionPassword) {
          //         callback(new Error('两次交易密码不一致!'));
          //       } else {
          //         callback();
          //       }
          //     }, trigger: 'blur'
          //   }
          // ],
          mailCode: [
            {required: true, message: '请输入验证码 ', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请输入验证码'));
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
        }
      }
    },
    directives: {
      focus: {
        update: function (el, {value}) {
          if (value) {
            el.focus()
          }
        }
      }
    },
    methods: {
      handleNews(row) {
        this.$store.commit('title', row.title)
        this.$router.push('OneNew')
      },
      loginn(){
        this.$router.push('/')
        this.$store.commit('position',1)
      },
      registerr(){
        this.$router.push('/Register')
      },

      /**
       * @Description: 注册按钮
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      register(formName) {

        console.log(this.$refs[formName]);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('register', this.user).then((response) => {
              console.log('注册成功');
              this.$message.success(response.message);
              this.$router.push('/');
            }).catch((response) => {
              this.$message.error(response.message)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      /**
       * @Description: 获取验证码按钮
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      getMailCode(email) {
        // console.log('++++++++++++++++')
        // this.focusState = true;
        // if (this.user.email === '') {
        //   alert('请输入邮箱');
        // } else if (this.flag === 2) {
        //   alert("邮箱已被注册");
        // } else if (this.flag === 1) {

        //   let params = {
        //     mailAdress: this.user.email
        //   };
        //   this.$api.http('get', "/api/getMailCode", params).then(res => {
        //   }).catch((error) => {
        //     this.$message.error(error.message)
        //   });
        //   this.getCode();
        // } else {
        //   alert('未知错误')
        // }
        let params = {
          mailAdress: this.user.email,
        };
        if (this.user.email === '') {
          alert('请输入账户邮箱');
        } else {
          this.$api.http('get', '/api/getMailCode', params).then(res => {
            this.getCode();
          }).catch((error) => {
            this.$message.error(error.message)
          })
        }

      },
      /**
       * @Description: 倒计时60秒
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      getCode() {
        /**
         * 倒计时时间
         * @type {number}
         */
        const TIME_COUNT = 60;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      /**
       *
       * @since 判断email是否存在
       * @param emile
       * @constructor
       */
      DetermineIfmailExists(rule, value, callBank) {
        this.flag = 0;
        let params = {
          mailAdress: this.user.email,
        };
        if (value === '') {
          callBank(new Error('请输入账户邮箱'));
        } else {
          this.$api.http('get', '/api/determineIfMailExists', params).then(res => {
            this.flag = 1;
            callBank()
          }).catch((error) => {
            console.log(error);
            this.flag = 2;
            callBank(error.message)
          })
        }
      },
      toRouterOrAlert(index) {
        if (this.$store.getters.isLogin) {
          this.$router.push(index)
        } else {
          this.$message('请先登录');
        }
      },
      /**
       * 判断userName是否存在
       * @param rule
       * @param value
       * @param callBank
       * @constructor
       */
      DetermineIfUserNameExists(rule, value, callBank) {
        let prom = {
          userName: this.user.username,
        };
        if (value === '') {
          callBank(new Error('请输入账户名'));
        } else {
          this.$api.http('get', "/api/determineIfUserNameExists", prom).then(res => {
            callBank()
          }).catch((error) => {
            callBank(error.message)
          })
        }
      },
    }
    ,
  }

</script>

<style lang="scss">
  #register {
    width: 50%;
    height: 80%;
    margin: auto;
    margin-left: 25%;
    margin-top: 5%;
  }

  .box-card {

    width: 60%;
    margin: auto;
    padding: 6%;
  }
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }


  #navigator {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    display: inline-block;
    background-color: #fff;
  }
</style>
