<!-- 个人中心信息--->
<template>
  <div style="height: 100%;width: 100%">
    <div id="navigator">
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
      <div style="height: 100%;float: left;width: 70%">
        <el-card shadow="hover" style="margin-left: 15%;margin-top: 10%;height: auto">
          <div slot="header">
            <span style="float: left;margin-bottom: 2%;">个人信息</span>
          </div>
          <div style="margin-left: 5%;float: left;width: 100%;text-align: left;height: 100%;margin-bottom: 5%">
            <i class="el-icon-user" style=" font-size: 40px;margin-left:45%;margin-bottom: 2%"></i>
            <el-divider content-position="right" style="width: 100%"></el-divider>

            <div style="height: 10%; width:100%;overflow: hidden" id="userName" v-on:mouseenter='visibleUserName'
                 @mouseleave="invisibleUserName">
              <div style="width: 20%;height: 100%">
                <p class="Field-label">用户名:</p>
              </div>
              <div style="width: 70%;float: left;">
                <div v-show="!judgeUserName">
                  <P style="float: left;margin-top: 3%;">
                    {{this.user.UserName}}
                  </P>
                  <span v-show="seenUserName">
                    <li class="el-icon-edit" style="font-size:16px;float: left;margin-top: 5%;color: #8ca4c2"
                        @click="changeUserName">修改</li>
                  </span>
                </div>
                <div v-show="judgeUserName" style="margin-top: 5%;margin-bottom: 1%;width: 80%;float: left">
                  <el-form :model="ium" ref="ium" label-width="20%">
                    <el-form-item
                      label="用户名"
                      prop="inputUserName"
                      :rules="[
                        { required:true, validator: DetermineIfUserNameExists, trigger: 'blur'},
                        {pattern: /^([a-zA-Z0-9|_|\_|\.]{1,16})$/, message: '请输入1-16位字母,数字,下划线和“.”',}
                        ]">
                      <el-input v-model="ium.inputUserName" placeholder="请输入用户名" autofocus="autofocus"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitUserName('ium')">确定</el-button>
                      <el-button type="primary" @click="disChangeUserName('ium')">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <el-divider content-position="right" style="width: 20%;margin-top: 1%;margin-top: 1%"></el-divider>

            <!--修改邮箱----->
            <div style=" width:100%;overflow: hidden" id="userEmail" v-on:mouseenter='visibleUserEmail'
                 @mouseleave="invisibleEmail">
              <div style="height: 100%;width: 20%;float: left">
                <p class="Field-label">邮箱:</p>
              </div>

              <div style="width: 80%;height:100%;float: left;" v-show="reviseUserEmail">
                <div style="height: 10%; width:100%;overflow: hidden" v-show="!judgeUserEmail">
                  <P style="float: left;height: 100%;margin-top: 2%;">{{ this.user.UserEmail}}</P>
                  <span v-show="seenUserEmail">
                      <li class="el-icon-edit" style="font-size:16px;float: left;margin-top: 4%;color: #8ca4c2"
                          @click="changeUserEmail">修改</li>
                    </span>
                </div>


                <div v-show="judgeUserEmail" style="margin-top: 5%;margin-bottom: 1%;width: 80%;float: left">
                  <el-form :model="iue" ref="iue" style="width: 100%" label-width="20%">
                    <el-form-item
                      label="密码"
                      prop="inputUserPassword"
                      :rules="[
                          {required: true, message: '请输入密码 ', trigger: 'blur'},
                          {pattern: /^([a-zA-Z0-9|_|\_|\.]{8,16})$/, message: '请输入8-16位字母,数字,下划线和“.” ', trigger: 'blur'}
                        ]">
                      <el-input v-model="iue.inputUserPassword" placeholder="请输入密码" type="password"
                                style="float: left;width: 50%" autofocus="autofocus"></el-input>


                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" style="float: left" @click="submitUserEmailFirst('iue')">提交
                      </el-button>
                      <el-button type="primary" style="float: left" @click="disChangeUserEmail('iue')">取消</el-button>
                    </el-form-item>
                  </el-form>
                </div>

              </div>
              <!--+++++++++++++-------------------------->

              <div v-show="!reviseUserEmail" style="width: 80%;height:100%;float: left;">
                <div style="margin-top: 2%;margin-bottom: 1%;width: 100%;float: left">
                  <el-form :model="Tiue" ref="Tiue" style="width: 100%" label-width="15%">
                    <el-form-item label="邮箱"
                                  prop="inputUserEmailTwo"
                                  :rules="[{
                                        required: true,
                                        validator: DetermineIfmailExists,
                                        trigger: 'blur'
                                        }]">
                      <el-input v-model="Tiue.inputUserEmailTwo"
                                placeholder="请输电子邮箱"
                                style="float: left;width:50%"></el-input>
                    </el-form-item>
                    <el-form-item label="验证码"
                                  prop="mailCode"
                                  :rules="[
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
                                      ]">
                      <el-col :span="14">
                        <el-input v-model="Tiue.mailCode"
                                  placeholder="请输入邮箱验证码"
                                  style="float: left;float: left"></el-input>
                      </el-col>
                      <el-col class="line" :span="2" style="float:left;align-content: center;text-align: center">-
                      </el-col>
                      <el-col :span="6">
                        <el-button v-show="show" class="submit-btn" style="float: left;" type="primary"
                                   @click="getMailCode(this)">
                          获取验证码
                        </el-button>
                        <el-button v-show="!show" class="submit-btn" type="primary">{{ count }}</el-button>
                      </el-col>
                    </el-form-item>

                    <el-form-item>
                      <el-button type="primary" style="float: left" @click="submitUserEmailTwo('Tiue')">提交</el-button>
                      <el-button type="primary" style="float: left" @click="dischangeUSerEmailAll('Tiue')">取消
                      </el-button>

                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
            <el-divider content-position="right" style="width: 20%;margin-top: 2%;margin-top: 2%"></el-divider>

            <div style="margin-bottom: 2%;margin-top: 2%;align-content: center">
              <el-button type="primary" @click="ModifyTheLoginPassword">修改登录密码</el-button>
            </div>
          </div>
        </el-card>
      </div>
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
        focusState: '',
        flag: 0,
        userId: this.$store.getters.getUserId,
        activeIndex: 'SelfCenter',
        activeIndexSelfCenter: 'SelfInfo',
        seenUserName: false,
        user: {
          UserName: '',
          UserEmail: '',
        },
        reviseUserEmail: true,
        seenUserEmail: false,
        judgeUserName: false,
        judgeUserEmail: false,
        ium: {
          inputUserName: '',
        },
        /**
         * 密码
         */
        iue: {
          inputUserPassword: '',
        },
        Tiue: {
          inputUserEmailTwo: '',
          mailCode: ''
        },
        show: true,
        count: 156,
      }
    },

    created() {
      let prom = {
        userId: this.userId,
      };

      this.$api.http('get', "/api/getUserInfo", prom).then(res => {
        console.log(res)
        this.$message.success(res.message);
        this.$set(this.user, 'UserName', res.data.userName);
        this.$set(this.user, 'UserEmail', res.data.email)

        // this.user.UserName = res.userName;
        // this.user.UserEmail = res.email;
      }).catch((error) => {

        this.$message.error(error.message)
      })
    },
    methods: {
      a() {
        this.$forceUpdate();
      },
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
              newUserName: this.ium.inputUserName,
            };
            this.$api.http('post', "/api/changeUserName", prom).then(res => {
              this.$message.success(res.message);
              this.$store.commit('changeUserName', this.ium.inputUserName);
              this.user.UserName = this.ium.inputUserName;
              this.disChangeUserName('ium');

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
       * 判断userName是否存在
       * @param rule
       * @param value
       * @param callBank
       * @constructor
       */
      DetermineIfUserNameExists(rule, value, callBank) {
        let prom = {
          userName: this.ium.inputUserName,
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
          mailAdress: this.Tiue.inputUserEmailTwo,
        };
        if (this.Tiue.inputUserEmailTwo === '') {
          alert('请输入账户邮箱');
        } else {
          this.$api.http('get', '/api/determineIfMailExists', params).then(res => {
            this.getCode();
          }).catch((error) => {
            this.$message.error(error.message)
          })
        }
        //
        // if (this.Tiue.inputUserEmailTwo === '') {
        //   alert('请输入邮箱');
        // } else if (this.flag === 2) {
        //   alert("邮箱已被注册");
        // } else if (this.flag === 1) {
        //   let params = {
        //     mailAdress: this.Tiue.inputUserEmailTwo
        //   };
        //   console.log('emile');
        //   console.log(params)
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
      /***
       * @Description: 第一次向后台发送密码
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      submitUserEmailFirst(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //***************需要确定接口名字*******************************

            let prom = {
              userId: this.userId,
              loginPassword: this.iue.inputUserPassword,
            };
            console.log(prom)
            this.$api.http('post', "/api/validateLoginPassword", prom).then(res => {
              this.$message.success(res.message);
              this.reviseUserEmail = false;
              this.$refs[formName].resetFields();

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
      submitUserEmailTwo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('+++++++++++')
            //***************需要确定接口名字*******************************
            let prom = {
              userId: this.userId,
              mailAdress: this.Tiue.inputUserEmailTwo,
              mailCode: this.Tiue.mailCode,
            };
            this.$api.http('post', "/api/changeMailAddress", prom).then(res => {
              this.$message.success(res.message);
              this.reviseUserEmail = true;
              this.changeUserEmail();
              this.user.UserEmail = this.Tiue.inputUserEmailTwo;
              this.$refs[formName].resetFields();
              this.dischangeUSerEmailAll('Tiue');
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
          mailAdress: this.Tiue.inputUserEmailTwo,
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
      changeUserName() {
        this.seenUserName = false;
        this.judgeUserName = true;
      },
      disChangeUserName(formName) {
        this.seenUserName = true;
        this.judgeUserName = false;
        this.$refs[formName].resetFields();
      },
      changeUserEmail() {
        this.seenUserEmail = false;
        this.judgeUserEmail = true;
      },
      disChangeUserEmail(formName) {
        this.seenUserEmail = true;
        this.judgeUserEmail = false;
        this.$refs[formName].resetFields();
      },
      dischangeUSerEmailAll(formName) {
        this.seenUserEmail = true;
        this.judgeUserEmail = false;
        this.reviseUserEmail = true;
        this.$refs[formName].resetFields();
        this.$refs['iue'].resetFields();
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
      ModifyTheLoginPassword() {
        this.$router.push('/ForPasVal')
      },
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
    width: 100%;
    float: left;
    margin-top: 12%;
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

  .el-col-14 {
    width: auto;
  }

  .el-col.el-col-14 {
    padding-right: 0%;
  }
  #navigator{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
  }
</style>

