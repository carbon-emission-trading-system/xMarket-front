<template>
  <el-card id="login">
    <div slot="header" class="clearfix">
      <span style="font-size: 20px;">登录</span>
    </div>
    <div style="margin:5%">
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
        <el-button type="text" icon="el-icon-edit" style="float: left;padding-bottom: 1%">忘记密码</el-button>
      </router-link>
      <router-link to="/register">
        <el-button type="text" icon="el-icon-edit" style="float: right;padding-bottom: 1%">去注册页</el-button>
      </router-link>
    </div>
  </el-card>

</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'

  export default {
    name: "LoginCompon",
    data() {
      return {
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
      this.$store.dispatch('stockList')
    },
    methods: {
      refreshCode() {
        let self = this;
        console.log(this)
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
      login(formName) {
        let self = this;
        let userId;
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

<style scoped>


  a {
    text-decoration: none;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  #login {
    margin: auto;
    margin-top: 5%;
    margin-left: 5%;
    margin-right: 5%;
  }


</style>
