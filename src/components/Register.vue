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

        <el-menu-item style="margin-left: 20%" index="/">首页</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="StockList">股票列表</el-menu-item>
        <el-menu-item style="margin-left: 5%" @click="warning">股票买卖</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="margin-left: 5%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="warning">当日成交</el-menu-item>
          <el-menu-item @click="warning">当日委托</el-menu-item>
          <el-menu-item @click="warning">历史持仓</el-menu-item>
          <el-menu-item @click="warning">历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style="margin-left: 50px" @click="warning">个人中心</el-menu-item>
      </el-menu>
    </div>

    <div id="register">
      <el-card class="box-card" style="margin-top: 5%">
        <el-form label-position="left" label-width="120px" :model="user"
                 :rules="rules" ref="user">
          <el-form-item label="邮箱"
                        prop="email"
                        :rules="[{
                        required: true,
                        validator: DetermineIfmailExists,
                        trigger: 'blur'
                        }]">
            <el-input v-model="user.email" placeholder="请输电子邮箱  "></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="mailCode">

            <el-col :span="14">
              <el-input v-model="user.mailCode" placeholder="请输入邮箱验证码"></el-input>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="6">
              <el-button v-show="show" class="submit-btn" type="primary" @click="getMailCode(this)">获取验证码</el-button>
              <el-button v-show="!show" class="submit-btn" type="primary">{{ count }}S</el-button>

              <!--<span v-show="!show" class="count">{{count}} s</span>-->
            </el-col>
          </el-form-item>
          <el-form-item label="用户名"
                        prop="username"
                        :rules="[{
                          required:true, validator: DetermineIfUserNameExists, trigger: 'blur'
                        }]">
            <el-input v-model="user.username" placeholder="请输用户名  "></el-input>
          </el-form-item>
          <el-form-item label="登录密码" prop="loginPassword">
            <el-input type="password" v-model="user.loginPassword" placeholder="请输入登录密码  "></el-input>
          </el-form-item>
          <el-form-item label="确认登录密码" prop="loginRepassword">
            <el-input type="password" v-model="user.loginRepassword" placeholder="请确认登录密码  "></el-input>
          </el-form-item>
          <el-form-item label="交易密码" prop="transactionPassword">
            <el-input type="password" v-model="user.transactionPassword" placeholder="请输入交易密码  "></el-input>
          </el-form-item>
          <el-form-item label="确认交易密码" prop="transactionRepassword">
            <el-input type="password" v-model="user.transactionRepassword" placeholder="请确认交易密码  "></el-input>
          </el-form-item>
          <router-link to="/">
            <el-button type="text" icon="el-icon-edit" style="float: right">去登录页</el-button>
          </router-link>

          <!--<router-link to="/">-->
          <!--<el-button class="submit-btn" type="primary">登录</el-button>-->
          <!--</router-link>-->
          <el-button class="submit-btn" type="primary" @click="register('user')">注册</el-button>
        </el-form>


      </el-card>
    </div>
  </div>
</template>

import qs from 'qs'

<script>
  import Vue from 'vue'

  export default {
    data() {
      return {
        activeIndex: '/',
        user: {
          username: '',
          email: '',
          loginPassword: '',
          loginRepassword: '',
          transactionPassword: '',
          transactionRepassword: '',
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
            },

          ],
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {pattern: /^([a-zA-Z0-9|_|\_|\.])*$/, message: '只能输入字母，数字，下划线和“.”', trigger: 'blur'}
          ],
          loginPassword: [
            {required: true, message: '请输入密码 ', trigger: 'blur'},
            {pattern: /^([a-zA-Z0-9|_|\_|\.]{8,16})$/, message: '只能输入字母，数字，下划线和“.”', trigger: 'blur'}
          ],
          transactionPassword: [
            {required: true, message: '请输入交易密码 ', trigger: 'blur'},
            {pattern: /^\d{6}$/, message: '请输入6位数字！', trigger: 'blur'},

          ],
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

          transactionRepassword: [
            {required: true, message: '请确认交易密码 ', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入交易密码'));
                } else if (value !== this.user.transactionPassword) {
                  callback(new Error('两次交易密码不一致!'));
                } else {
                  callback();
                }
              }, trigger: 'blur'
            }
          ],
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
    methods: {

      /**
       * @since 导航栏需要
       * @param key
       * @param keyPath
       */
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      warning() {
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
      },
      register(formName) {
        var self = this;

        self.$refs[formName].validate((valid) => {
          if (valid) {
            self.$store.dispatch('register', this.user).then((response) => {
              self.$message.success(response.message);
              self.$router.push('/');
            })
              .catch((response) => {
                self.$message.error(response.message)
              })
          }
        });
      },
      getMailCode(email) {
        if (this.flag === 0) {
          alert("邮箱已被注册")
        } else {
          let params = {
            mailAdress: this.user.email
          };
          this.$api.http('get', "/api/getMailCode", params).then(res => {
            this.flag = 1;
          }).catch((error) => {
            this.$message.error(res.message)
          })
          this.getCode();
        }
      },
      getCode() {
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
        let prom = {
          mailAdress: this.user.email,
        }
        if (value === '') {
          callBank(new Error('请输入账户邮箱'));
        } else {
          this.$api.http('get', '/api/determineIfMailExists', prom).then(res => {
            this.flag = 1;
          }).catch((error) => {
            this.flag = 0,
              callBank(res.message)
          })
        }
      }
      ,
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
          }).catch((error)=>{
              callBank(res.message)
          })
        }
      }
    }
    ,
  }


</script>

<style lang="scss">
  #register {
    margin: auto;
    width: 40%;
    height: 40%;
  }

  .box-card {
    width: 100%;
  }
</style>
