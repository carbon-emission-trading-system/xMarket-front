<!-- 个人中心信息--->
<template>
  <div style="height: 100%;width: 100%">
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router=true>

        <el-menu-item style="margin-left: 15%" index="AfterLogin">首页</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="StockList">股票列表</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="BuyAtLimitPrice">股票买卖</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="margin-left: 5%" index="1">
          <template slot="title" index="1">信息统计</template>
          <el-menu-item index="TodayExchange">当日成交</el-menu-item>
          <el-menu-item index="TodayOrder">当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style="margin-left: 5%" index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style="margin-left: 5%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

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
      <div style="height: 100%;float: left;width: 70%">
        <el-card shadow="hover" style="margin-left: 15%;margin-top: 10%;height: auto">
          <div slot="header">
            <span style="float: left;margin-bottom: 2%;">个人信息</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <div style="margin-left: 5%;float: left;width: 100%;text-align: left;height: 100%;margin-bottom: 5%">
            <i class="el-icon-user" style=" font-size: 40px;margin-left:45%;margin-bottom: 2%"></i>
            <el-divider content-position="right" style="width: 100%"></el-divider>

            <div style="height: 10%; width:100%;overflow: hidden" id="userName" v-on:mouseenter='visibleUserName'
                 @mouseleave="invisibleUserName">
              <p class="Field-label">用户名:</p>
              <div style="width: 80%;float: left;">
                <div v-show="!judgeUserName">
                  <P style="float: left">{{ this.user.UserName}}</P>
                  <span v-show="seenUserName">
                    <li class="el-icon-edit" style="font-size:18px;float: left" @click="changeUserName">修改</li>
                  </span>
                </div>
                <div v-show="judgeUserName" style="margin-top: 1%;margin-bottom: 1%;width: 60%">
                  <el-form :model="ium" ref="ium" label-width="40%">
                    <el-form-item
                      label="用户名"
                      prop="inputUserName"
                      :rules="[
                        { required:true, validator: DetermineIfUserNameExists, trigger: 'blur'},
                        {pattern: /^([a-zA-Z0-9|_|\_|\.]{1,16})$/, message: '请输入1-16位字母,数字,下划线和“.”',}
                        ]">
                      <el-input v-model="ium.inputUserName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitUserName('ium')">确定</el-button>
                      <el-button type="primary" @click="disChangeUserName">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <el-divider content-position="right" style="width: 20%;margin-top: 1%;margin-top: 1%"></el-divider>

            <!--修改邮箱----->
            <div style="height: 10%; width:100%;overflow: hidden" id="userEmail" v-on:mouseenter='visibleUserEmail'
                 @mouseleave="invisibleEmail">
              <p class="Field-label">邮箱:</p>

              <div style="width: 80%;float: left;" v-show="reviseUserEmail">
                <div style="height: 10%; width:100%;overflow: hidden" v-show="!judgeUserEmail">
                  <P style="float: left">{{ this.user.UserEmail}}</P>
                  <span v-show="seenUserEmail">
                    <li class="el-icon-edit" style="font-size:18px;float: left" @click="changeUserEmail">修改</li>
                  </span>
                </div>

                <div v-show="judgeUserEmail" style="margin-top: 1%;margin-bottom: 1%;width: 60%">
                  <el-form :model="iue" ref="iue" label-width="40%">
                    <el-form-item
                      label="验证码"
                      prop="inputUserEmail">
                      <el-input v-model="iue.inputUserEmail" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" style="float: left" @click="getMailCode(this.user.UserEmail)">获取验证码
                      </el-button>
                      <el-button type="primary" style="float: left" @click="submitUserEmailFirst('iue')">提交
                      </el-button>
                      <el-button type="primary" style="float: left" @click="disChangeUserEmail">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>

              <!--+++++++++++++-------------------------->
              <div v-show="!reviseUserEmail">
                <el-form :model="iue" ref="iue" label-width="40%">
                  <el-form-item label="邮箱"
                                prop="inputUserEmail"
                                :rules="[{
                        required: true,
                        validator: DetermineIfmailExists,
                        trigger: 'blur'
                        }]">
                    <el-input v-model="Tiue.inputUserEmail" placeholder="请输电子邮箱"></el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="mailCode">
                    <el-col :span="14">
                      <el-input v-model="Tiue.mailCode" placeholder="请输入邮箱验证码"
                                @blur="focusState = false"
                                v-focus="focusState"></el-input>
                    </el-col>
                    <el-col class="line" :span="2">-</el-col>
                    <el-col :span="6">
                      <el-button v-show="show" class="submit-btn" type="primary" @click="getMailCode(this)">获取验证码
                      </el-button>
                      <el-button v-show="!show" class="submit-btn" type="primary">{{ count }}</el-button>
                    </el-col>
                  </el-form-item>

                </el-form>
                <el-button type="primary" style="float: left" @click="submitUserEmailTwo">提交</el-button>

                <el-button type="primary" style="float: left" @click="dischangeUSerEmailAll">取消</el-button>
              </div>
            </div>

            <el-divider content-position="right" style="width: 20%;margin-top: 2%;margin-top: 2%"></el-divider>
            <div style="margin-bottom: 2%;margin-top: 2%">
              <el-button type="primary" @click="">注销</el-button>
              <el-button type="text" @click="ModifyTheLoginPassword">修改登录密码</el-button>
              <el-button type="primary" @click="">修改交易密码</el-button>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './../api/index.js'

  export default {
    name: "SelfInfo",

    data() {
      return {
        flag:0,
        userId: this.$store.getters.getUserId,
        activeIndex: 'SelfCenter',
        activeIndexSelfCenter: 'SelfInfo',
        seenUserName: false,
        user: {
          UserName: '郑科宇',
          UserEmail: '1172@qq.com',
        },
        reviseUserEmail: true,
        seenUserEmail: false,
        judgeUserName: false,
        judgeUserEmail: false,
        ium: {
          inputUserName: '',
        },
        iue: {
          inputUserEmail: '',
        },
        Tiue:{
          inputUserEmailTwo:'',
          mailCode:''
        },
        show: true,
        count: 156,
      }
    },

    methods: {
      /***
       * @Description: 提交userName修改以后的样子
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      submitUserName(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //***************需要确定接口名字*******************************
            let prom = {
              userId: this.userId,
              userName: this.ium.inputUserName,
            };
            this.$api.http('get', "/api/determineIfUserNameExists", prom).then(res => {
              this.$message.success(res.message);
              this.$store.commit('changeUserName', this.ium.inputUserName)
              this.$set(this.user, 'userName', this.ium.inputUserName);
            }).catch((error) => {
              this.$message.error(error.message)
            })

            this.$store.dispatch('register', this.ium).then((response) => {
              console.log('修改成功');
              this.$message.success(response.message);
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
       * 判断userName是否存在
       * @param rule
       * @param value
       * @param callBank
       * @constructor
       */
      DetermineIfUserNameExists(rule, value, callBank) {
        let prom = {
          userName: this.user.UserName,
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
      /**
       * @Description: 获取验证码按钮
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      getMailCode(email) {
        let params = {
          mailAdress: this.user.UserEmail
        };
        this.$api.http('get', "/api/getMailCode", params).then(res => {
        }).catch((error) => {
          this.$message.error(error.message)
        });
        this.getCode();
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
      /***
       * @Description: 第一次向后台发送验证码
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      submitUserEmailFirst(formName) {
        this.reviseUserEmail = false;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //***************需要确定接口名字*******************************
            let prom = {
              userId: this.userId,
              userEmail: this.iue.inputUserEmail,
            };
            this.$api.http('get', "/api/determineIfUserNameExists", prom).then(res => {
              this.$message.success(res.message);
              this.reviseUserEmail = false;
            }).catch((error) => {
              this.$message.error(error.message)
            });

          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },
      /***
      * @Description:  第二次向后台发送验证码
      * @Param:
      * @return:
      * @Author: zky
      * @Date:
      */
      submitUserEmailTwo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //***************需要确定接口名字*******************************
            let prom = {
              userId: this.userId,
              userEmail: this.Tiue.inputUserEmail,
              mailCode: this.Tiue.mailCode,
            };
            this.$api.http('get', "/api/determineIfUserNameExists", prom).then(res => {
              this.$message.success(res.message);
              this.reviseUserEmail = false;
              this.$set(this.user, 'userEmail', this.Tiue.inputUserEmailTwo);
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
       *
       * @since 判断email是否存在
       * @param emile
       * @constructor
       */
      DetermineIfmailExists(rule, value, callBank) {
        this.flag = 0;
        let params = {
          mailAdress: this.Tiue.mailCode,
          email:this.Tiue.inputUserEmailTwo,
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
      }
      ,
      changeUserName() {
        this.seenUserName = false;
        this.judgeUserName = true;
        console.log('+++++++++++')
      },
      disChangeUserName() {
        this.seenUserName = true;
        this.judgeUserName = false;
        console.log('+++++++++++')
      },
      changeUserEmail() {
        this.seenUserEmail = false;
        this.judgeUserEmail = true;
      },
      disChangeUserEmail() {
        this.seenUserEmail = true;
        this.judgeUserEmail = false;
      },
      dischangeUSerEmailAll() {
        this.seenUserEmail = true;
        this.judgeUserEmail = false;
        this.reviseUserEmail = true;
      },
      visibleUserName: function () {
        this.seenUserName = true;
      },
      invisibleUserName: function () {
        this.seenUserName = false;
      },
      visibleUserEmail: function () {
        this.seenUserEmail = true;
      },
      invisibleEmail: function () {
        this.seenUserEmail = false;
      },
      exit() {
        this.$store.commit('logout');
        this.$router.push('/')
      },
      ModifyTheLoginPassword(){
        this.$router.push('/ForPasVal')
      }
    }
  }
</script>

<style scoped>

  #domo {
    position: relative;
  }

  userName {
    position: relative;
  }

  a {
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
</style>

