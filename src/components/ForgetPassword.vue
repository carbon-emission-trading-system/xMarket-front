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

        <el-menu-item index="AfterLogin">首页</el-menu-item>
        <el-submenu style="padding-left: 2%" index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item style="padding-left: 1%" index="BuyAtLimitPrice">股票买卖</el-menu-item>
        <el-menu-item style="padding-left: 1%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="padding-left: 1%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange">当日成交</el-menu-item>
          <el-menu-item index="TodayOrder">当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item style="padding-left: 1%" index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;font-size: 6px;margin:auto">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div id="register">
        <el-card class="box-card" style="margin-top: 5%" shadow="hover">
          <el-form label-position="left" label-width="120px"
                   :model="forget"
                   :rules="rules"
                   ref="forget">
            <el-form-item label="邮箱"
                          prop="mailAdress"
                          :rules="[{
                        required: true,
                        validator: DetermineIfmailExists,
                        trigger: 'blur'
                        }]">
              <el-input v-model="forget.mailAdress" placeholder="请输电子邮箱"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="mailCode">
              <el-col :span="14">
                <el-input v-model="forget.mailCode" placeholder="请输入邮箱验证码"
                          @blur="focusState = false"
                          v-focus="focusState"></el-input>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="6">
                <el-button v-show="show" class="submit-btn" type="primary" @click="getMailCode(this)">获取验证码</el-button>
                <el-button v-show="!show" class="submit-btn" type="primary">{{ count }}S</el-button>
              </el-col>
            </el-form-item>

            <el-form-item label="密码" prop="newPassword">
              <el-input type="password" v-model="forget.newPassword" placeholder="请输入8-16位密码 "></el-input>
            </el-form-item>
            <el-form-item label="确认登录密码" prop="ReNewPassword">
              <el-input type="password" v-model="forget.ReNewPassword" placeholder="请确认登录密码  "></el-input>
            </el-form-item>
            <router-link to="/">
              <el-button type="text" icon="el-icon-edit" style="float: right">去登录页</el-button>
            </router-link>
            <el-button class="submit-btn" type="primary" @click="change('forget')">修改</el-button>
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
    name: 'forgetPassword',
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        focusState: '',
        activeIndex: '/',
        forget: {
          newPassword: '',
          mailCode: '',
          mailAdress: '',
          ReNewPassword: '',
        },
        show: true,
        flag: 1,
        count: 26516,
        timer: null,
        rules: {
          mailAdress: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {
              pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
              message: '邮箱格式错误',
              trigger: 'blur'
            }
          ],
          newPassword: [
            {required: true, message: '请输入密码 ', trigger: 'blur'},
            {pattern: /^([a-zA-Z0-9|_|\_|\.]{8,16})$/, message: '请输入8-16位字母,数字,下划线和“.” ', trigger: 'blur'}
          ],
          ReNewPassword: [
            {required: true, message: '请确认登录密码 ', trigger: 'blur'},
            {
              validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入登录密码'));
                } else if (value !== this.forget.newPassword) {
                  callback(new Error('两次登录密码不一致!'));
                } else {
                  callback();
                }
              },
              trigger: 'blur',
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

      warning() {
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
      },

      /**
       * @Description: 注册按钮
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      change(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let prom = {
              newPassword: this.forget.newPassword,
              mailCode: this.forget.mailCode,
              mailAdress: this.forget.mailAdress,
            };
            console.log(prom)
            this.$api.http('post', "/api/forgetPassword", prom).then(res => {
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
      /**
       * @Description: 获取验证码按钮
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      getMailCode(email) {

        let params = {
          mailAdress: this.forget.mailAdress,
        };
        if (this.forget.mailAdress === '') {
          alert('请输入账户邮箱');
        } else {
          this.$api.http('get', '/api/getMailCode', params).then(res => {
            this.getCode();
          }).catch((error) => {
            this.$message.error(error.message)
          })
        }

        // if (this.forget.mailAdress === '') {
        //   alert('请输入邮箱');
        // } else if (this.flag === 2) {
        //   alert("邮箱已被注册");
        // } else if (this.flag === 1) {
        //   let params = {
        //     mailAdress: this.forget.mailAdress
        //   };
        //   this.$api.http('get', "/api/getMailCode", params).then(res => {
        //   }).catch((error) => {
        //     this.$message.error(error.message)
        //   });
        //   this.getCode();
        // } else {
        //   alert('未知错误')
        // }
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
          mailAdress: this.forget.mailAdress,
        };
        if (value === '') {
          callBank(new Error('请输入账户邮箱'));
        } else {
          console.log(params);
          console.log('+++++++++++++')
          this.$api.http('get', '/api/determineIfMailExists2', params).then(res => {
            this.flag = 1;
            callBank()
          }).catch((error) => {
            console.log(error);
            this.flag = 2;
            callBank(error.message)
          })
        }
      }
      ,
    }
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
