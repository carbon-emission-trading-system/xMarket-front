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
               router="true">

        <el-menu-item style = "margin-left: 20%" index="/" >首页</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="StockList" >股票列表</el-menu-item>
        <el-menu-item style = "margin-left: 5%" @click="warning">股票买卖</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="1">
          <template slot="title" >信息统计</template>
          <el-menu-item  @click="warning" >当日成交</el-menu-item>
          <el-menu-item @click="warning">当日委托</el-menu-item>
          <el-menu-item  @click="warning">历史持仓</el-menu-item>
          <el-menu-item  @click="warning">历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style = "margin-left: 50px"  @click="warning">个人中心</el-menu-item>
      </el-menu>
    </div>

    <div id="register">
      <el-card class="box-card" style="margin-top: 5%">
      <el-form label-position="left" label-width="120px" :model="user"
               :rules="rules" ref="ruleForm">
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" placeholder="请输电子邮箱  "></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
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
        <el-form-item label="验证码" prop="mailCode">

          <el-col :span="14">
            <el-input  v-model="user.mailCode" placeholder="请输入邮箱验证码  "></el-input>
          </el-col>
          <el-col class="line" :span="2"> - </el-col>
          <el-col :span="6">
            <el-button class="submit-btn" type="primary" @click="getMailCode('email')">获取验证码</el-button>
          </el-col>

        </el-form-item>
        <el-button class="submit-btn" type="primary" @click="register('ruleForm')">注册</el-button>
      </el-form>

      <router-link to="/"><el-button type="text" icon="el-icon-edit">去登录页</el-button></router-link>
      </el-card>
    </div>
  </div>
</template>

import qs from 'qs'

<script>
  import Vue from 'vue'
  export default {

    data () {
      let validCode=(rule,value,callback)=>{
        let reg=/[0-9a-zA-Z]{4,9}/
        if(!reg.test(value)){callback(new Error('学号必须是由4-9位数字和字母组合'))
        }else{
          callback()
        }
      };
      return {
        activeIndex:'/',
        user: {
          username: '',
          email: '',
          loginPassword: '',
          loginRepassword: '',
          transactionPassword: '',
          transactionRepassword: '',
          mailCode: ''
        },
        msg: 'Welcome to Your Vue.js App',

        rules: {
          email:[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { pattern: /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/, message: '邮箱格式错误', trigger: 'blur' }

          ],
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { pattern: /^([a-zA-Z0-9|_|\_|\.])*$/, message: '只能输入字母，数字，下划线和“.”', trigger: 'blur' }
          ],
          loginPassword: [
            { required: true, message: '请输入密码 ', trigger: 'blur' },
            { pattern: /^([a-zA-Z0-9|_|\_|\.]{8,16})$/, message: '只能输入字母，数字，下划线和“.”', trigger: 'blur' }
          ],
          transactionPassword:[
            {required: true, message: '请输入交易密码 ', trigger: 'blur' },
            { pattern: /^\d{6}$/, message: '请输入6位数字！', trigger: 'blur' },

          ],
          loginRepassword: [
            { required: true, message: '请确认登录密码 ', trigger: 'blur' },
            { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入登录密码'));
                } else if (value !== this.user.loginPassword) {
                  callback(new Error('两次登录密码不一致!'));
                } else {
                  callback();
                }
              }, trigger: 'blur' }
          ],

          transactionRepassword: [
            { required: true, message: '请确认交易密码 ', trigger: 'blur' },
            { validator: (rule, value, callback) => {
                if (value === '') {
                  callback(new Error('请再次输入交易密码'));
                } else if (value !== this.user.transactionPassword) {
                  callback(new Error('两次交易密码不一致!'));
                } else {
                  callback();
                }
              }, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      warning() {
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
      },
      register(formName) {
        var self = this;
        self.$refs[formName].validate((valid) => {
          if (valid) {

let payload=
            {
              username: self.user.username,
              loginPassword: self.user.loginPassword,
              loginRepassword: self.user.loginRepassword,
              transactionPassword: self.user.transactionPassword,
              transactionRepassword: self.user.transactionRepassword,
              email: self.user.email,
              mailCode: self.user.mailCode
            }

            self.$store.dispatch('register', this.user)
              .then((response) => {
                alert("reg接受resolve："+response.data.message)
                self.$message.success(response.data.message)
                self.$router.push('/');
              })
              .catch((response) => {
                  alert("reg接受reject："+JSON.stringify(response))
              //  self.$message.error(response.data.message)
              })
          }
        });
      },
      getMailCode(email) {
        let params = {
          mailAdress: this.user.email
        }
        this.$api.http('get', "/api/getMailCode", params).then(res => {
          console.log(res);
        })
      }
    }


  }
</script>

<style lang="scss">
  #register{
    margin: auto;
    width: 40%;
    height:40%;

  }

  .box-card {
    width: 100%;
  }
</style>
