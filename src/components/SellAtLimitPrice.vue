<!--委托限价卖出页面-->
<template>
  <div>
    <div class="NavigationBar">
      <el-menu :default-active="activeIndex"
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
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange">当日成交</el-menu-item>
          <el-menu-item index="TodayOrder">当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style="margin-left: 50px" index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style="margin-left: 5%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
      </el-menu>


    </div>
    <div class="Subtitle">
      <el-menu :default-active="activeIndexBS"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#909399"
               text-color="#fff"
               active-text-color="#ffd04b"
               router>
        <el-menu-item style="padding-left: 2%; padding-right: 2%;margin-left: 31%" index="BuyAtLimitPrice">买入
        </el-menu-item>
        <el-menu-item style="padding-left: 2% ;padding-right: 2%;" index="SellAtLimitPrice">卖出
        </el-menu-item>
        <el-menu-item style="padding-left: 2% ;padding-right: 2%;" index="BuyAtMarketPrice">市价买入
        </el-menu-item>
        <el-menu-item style="padding-left: 2%; padding-right: 2%; " index="SellAtMarketPrice">市价卖出
        </el-menu-item>

      </el-menu>
    </div>

    <div class="all">

      <div class="list1">
        <el-card class="card1">
          <el-form label-position="left" label-width="80px" :model="stockTrading" ref="stockTrading" size="mini">
            <p style="font-size: 30px; margin-top:10% ;"> {{ buyOrSell }} </p>
            <div style="text-align: center ;float: left;width: 100%" class="elementInput">
              <el-form-item label="证券代码"
                            style="float: left;width: 100%"
                            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
                            prop="stockId"
                            :rules="[{
                              validator: verifyStockCode, // 自定义验证
                              trigger: 'blur'
                            }]">
                <el-input v-model.number="stockTrading.stockId" type="number"  class="dx" placeholder="请输入证券代码"
                ></el-input>
              </el-form-item>
              <el-form-item label="证券名称">
                {{stockTrading.stockName}}
                <!--<el-input v-model="stockTrading.stockName" placeholder="证券名称" :disabled="true"></el-input>-->
              </el-form-item>
              <el-form-item label="卖出价格"
                            prop="orderPrice"
                            style="float: left;width: 100%">
                <!-- :rules="[
                { validator: LimitPrice, // 自定义验证
                  trigger: 'blur'
                }
                ]" -->
                <el-input v-model="stockTrading.orderPrice" class="dx"  placeholder="请输入卖出价格"></el-input>
              </el-form-item>
              <el-form-item label="可卖数量"
                            style="float: left">
                {{stockTrading.availableNumber}}
                <!--<el-input v-model="stockTrading.availableNumber" placeholder="可卖数量" :disabled="true"></el-input>-->
              </el-form-item>

              <div class="proportion"
                   style=" float: left; width: 100%; margin-left: 0px; align-content: left">
                <el-button type="text" @click="change1()" class="TxTbutton">1/4</el-button>
                <el-button type="text" @click="change2()" class="TxTbutton">1/2</el-button>
                <el-button type="text" @click="change3()" class="TxTbutton">3/4</el-button>
                <el-button type="text" @click="change4()" class="TxTbutton">全部</el-button>
              </div>

              <el-form-item label="卖出数量"
                            prop="orderAmount"
                            :rules="[
                            { validator: DetermineTheNumberOfPurchases, // 自定义验证
                            trigger: 'change'
                              }]"
                              style="float: left;width: 100%" >
                <el-input v-model="stockTrading.orderAmount"  class="dx" placeholder="请输入卖出股数" clearable></el-input>
              </el-form-item>
              <div style="float: left;width: 60%;margin-top: 5%">
                <el-button @click="resetForm('stockTrading')" style="width: 50%;">重新填写</el-button>
                <!-- ajaxSubmit()是ajax的提交，websocketSubmit()是websocket的提交-->
                <el-button @click="submitForm('stockTrading')" style="width: 40%;">提交</el-button>
              </div>
            </div>
          </el-form>
        </el-card>
      </div>
      <div class="list2">
        <RealTime></RealTime>
      </div>
    </div>
  </div>
</template>

<script>
  import api from './../api/index.js'
  import Stomp from 'stompjs'
  import RealTime from './RealTime'
  import store from '@/store/store'

  export default {
    name: "SellAtLimitPrice",
    data() {
      return {
        activeIndexBS: 'SellAtLimitPrice',
        activeIndex: 'BuyAtLimitPrice',
        buyOrSell: '卖出股票',
        client: null,
        stockTrading: {
          stockId: '',
          stockName: '',
          orderPrice: '',
          orderAmount: '',
          //账户可用股票
          availableNumber: '',
          openPrice: '',
          tradeMarket: '',
        },
        bz: '',
        msg: 0,
        //规则
        rules: {
          stockId: [],
          orderPrice: [],
          orderAmount: []
        },
      }
    },
    components: {
      RealTime,
    },
    created() {
      // this.connect();
      // this.firstReturnStockRealtimeInformation();
    },
    beforeMount() {
      let isLogin = this.$store.getters.isLogin;
      if (!isLogin) {
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
        this.$router.push('/')
      }
    },
    methods: {
      exit() {
        this.$store.commit('logout');
        this.$router.push('/')
      },
      //
      // realTimeDataDisplay() {
      //   var self = this;
      //   Vue.axios.get('/api/realTimeDataDisplay')
      //     .then(function (response) {
      //       self.$message.success(response.data)
      //     })
      //     .catch(function (error) {
      //       self.$message.error(response.data)
      //     });
      // },
      //
      // onConnected(frame) {
      //   console.log("Connected: " + frame);
      //   var exchange1 = "/exchange/realTimeExchange/stock.SZSE.600446";
      //   var exchange3 = "/exchange/timeShareExchange/stock.SZSE.600000";
      //
      //
      //   var subscription = this.client.subscribe(exchange1, this.onmessage);
      //   console.log(subscription);
      //
      //   var subscription3 = this.client.subscribe(exchange3, this.onmessage);
      //   console.log(subscription3);
      // },
      // onFailed(frame) {
      //   console.log("Failed: " + frame.body);
      //   //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");
      //
      // },
      // onmessage(message) {
      //   console.log("得到消息");
      // },
      //
      // responseCallback(frame) {
      //   console.log("得到的消息 msg=>" + frame.body);
      //   //接收到服务器推送消息，向服务器发送确认消息
      //   // this.client.send("/exchange/exchange_pushmsg/rk_recivemsg", {"content-type":"text/plain"}, frame.body);
      // },
      // connect() {
      //   console.log("开始连接");
      //   this.client = Stomp.client("ws://localhost:15674/ws");
      //   console.log("创建");
      //   var headers = {
      //     "login": "guest",
      //     "passcode": "guest",
      //     //虚拟主机，默认“/”
      //     "heart-beat": "0,0"
      //   };
      //   this.client.connect(headers, this.onConnected, this.onFailed);
      //   console.log("连接结束");
      // },

      /**
       *
       * 验证股票代码
       */
      verifyStockCode(rule, value, callback) {
        console.log('verifyStockCode');
        this.$forceUpdate();
        if (!value) {
          callback(new Error('请输入股票代码'))
          console.log('请输入股票代码')
        } else {
          if (this.msg === this.stockTrading.stockId) {
            callback()
          } else {
            value = Number(value)
            this.msg = 0;
            if (typeof value === 'number' && !isNaN(value)) {
              this.msg = 1;
              this.firstReturnStockRealtimeInformation();
              callback();
            } else {
              callback("请输入数字")
            }
          }
        }
      },
      /**
       *
       * 自定义验证涨跌幅
       */
      LimitPrice(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入卖出金额'));
          console.log('请输入卖出金额')
        } else {
          value = Number(value);
          if (typeof value === 'number' && !isNaN(value)) {
            if (value > this.stockTrading.openPrice * 1.1) {
              callback(new Error('超过涨停价'))
            } else if (value < this.stockTrading.openPrice * 0.9) {
              callback(new Error('低于跌停价'))
            } else if (value < 0) {
              callback(new Error('请输入合适价格'))
            } else {
              callback()
            }
          } else {
            callback("请输入数字")
          }
        }
      },
      /**
       * 验证交易策略
       *
       */
      tradingStrategyVerification(rule, value, callback) {
        if (!value) {
          callback(new Error('请选择交易策略'));
          console.log('请选择交易策略')
        }
      },
      /**
       *
       * 自定义验证卖出数量
       */
      DetermineTheNumberOfPurchases(rule, value, callback) {

        let SV = value - (Math.floor(value / 100) * 100);
        let SA = this.stockTrading.availableNumber - (Math.floor(this.stockTrading.availableNumber / 100) * 100);

        if (!value) {
          callback(new Error('请输入卖出数量'));
          console.log('请输入卖出数量')
        } else {
          value = Number(value);
          if (typeof value === 'number' && !isNaN(value)) {
            if (value > this.stockTrading.availableNumber) {
              callback(new Error('超出可买数量'))
            } else if (value < 0) {
              callback(new Error('请输入合适数量'))
            } else if (SV !== 0) {
              if (SV === SA) {
                callback()
              } else {
                callback('请卖出不足100的股票')
              }
            } else {
              callback();
            }
          } else {
            callback("请输入数字")
          }
        }
      },
      /**
       * 重新提交
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.stockTrading.stockId = null;
        this.stockTrading.orderPrice = null;
        this.stockTrading.canorderAmount = null;
        this.stockTrading.orderAmount = null;
        this.stockTrading.stockName = null;
        this.msg='';
      }
      ,
      /**
       *提交
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //ajaxSubmit()是ajax的提交，websocketSubmit()是websocket的提交-->
            this.ajaxSubmit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },


      /**
       * @author 郑科宇
       * @date 05/28
       * @param 1.0
       * @since 第一次传输股票代码,与账户ID，服务器返回实时信息与可卖股票数量
       */
      firstReturnStockRealtimeInformation() {
        let prom = {
          stockId: this.stockTrading.stockId,
          // userId: store.state.user.userId
          userId: this.$store.getters.getUserId
        }

        this.$api.http('get', "/api/QueryStockInformation", prom).then(res => {
          console.log(res);
          this.stockTrading = res.data;
          console.log("this.basicInfoStok)");
          this.$set(this.stockTrading, 'openPrice', res.data.yesterdayClosePrice);

          this.$store.commit('buyOrSellStock', this.stockTrading.stockId);

          // this.stockTrading.userId = this.basicInfoStok.stockId;
          // this.stockTrading.stockName = this.basicInfoStok.stockName;
          // this.stockTrading.orderPrice = this.basicInfoStok.orderPrice;
          // this.stockTrading.availableNumber = this.basicInfoStok.availableNumber;
        }).catch((res) => {
          this.$message.error(res.message)
        })
      },

      /**
       * websocket发送给后台委托单
       */
      websocketSubmit() {
        // this.firstReturnStockRealtimeInformation()
        let SentstockTrading = {
          userId: this.$store.getters.getUserId,
          stockId: this.stockTrading.stockId,
          type: 1,
          orderAmount: this.stockTrading.orderAmount,
          orderPrice: this.stockTrading.orderPrice,
          tradeStraregy: 0,
        }
        console.log(SentstockTrading);
        this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type": "text/plain"}, JSON.stringify(SentstockTrading));
      },
      /**
       * ajax发送给后台委托单
       */
      ajaxSubmit() {
        if (this.$store.getters.getUserId == null) {
          this.alertBox('错误', '用户未登陆');
        } else if (this.stockTrading.stockId == null
          || this.stockTrading.orderPrice == null
          || this.stockTrading.orderAmount == null) {
          this.alertBox('错误', '有东西未输入');
        } else {
          let SentstockTrading = {
            userId: this.$store.getters.getUserId,
            stockId: this.stockTrading.stockId,
            type: 1,//买卖标识
            orderAmount: this.stockTrading.orderAmount,
            orderPrice: this.stockTrading.orderPrice,
            tradeStraregy: 0,
          }
          console.log(SentstockTrading);
          this.$api.http('post', "/api/buyOrSale", SentstockTrading).then(res => {
            this.$message.success('提交成功')
          }).catch((res) => {
            this.$message.error(res.message)
          })
        }
      },

      //0.25/0.5/0.75计算
      change1() {
        this.$set(this.stockTrading, 'orderAmount', Math.floor(this.stockTrading.availableNumber * 0.25 / 100) * 100);

        // this.stockTrading.orderAmount = Math.floor(this.stockTrading.availableNumber * 0.25 / 100) * 100;
      },
      change2() {
        // this.stockTrading.orderAmount = Math.floor(this.stockTrading.availableNumber * 0.5 / 100) * 100;
        this.$set(this.stockTrading, 'orderAmount', Math.floor(this.stockTrading.availableNumber * 0.5 / 100) * 100);

      },
      change3() {
        this.$set(this.stockTrading, 'orderAmount', Math.floor(this.stockTrading.availableNumber * 0.75 / 100) * 100);

        // this.stockTrading.orderAmount = Math.floor(this.stockTrading.availableNumber * 0.75 / 100) * 100;

      },
      change4() {
        this.$set(this.stockTrading, 'orderAmount', this.stockTrading.availableNumber);

        // this.stockTrading.orderAmount = this.stockTrading.availableNumber;
      },
    },
  }
</script>

<style scoped>
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }

  #exit {
    margin-top: 1.5%;
    margin-left: 5%;
  }

  div {
    float: left;
    display: block;
  }

  .NavigationBar {
    width: 100%;
  }

  .Subtitle {

    width: 100%;
    margin-bottom: 2%;

  }

  .breadC {
    display: block;
    margin-left: 10%;
    margin-bottom: 2%;
  }

  .all {
    width: 100%;
    height: 100%;
    display: block;
    float: left;
  }

  .miniButton {
    width: 40%;
    margin-left: 5%;
  }

  .TxTbutton {
    width: 30px;
  }

  .buy-list clearfix {
    height: 480px;
  }

  .elementInput {
    margin-left: 15%;
    margin-right: 10%;
    width: 75%;
  }

  .proportion {
    margin-left: 20%;
    margin-bottom: 3%;
    float: left;
    width: 100%;
    margin-left: 0px;
    align-content: left;
    text-align: left;
  }

  .input_table {
    padding: 16px 10px;
    width: 245px;
    font-size: 14px;
  }

  .list1 {
    margin-left: 10%;
    margin-right: 2%;
    width: 28%;
    font-size: 14px;
    height: 600px;
  }

  .list2 {
    margin-left: 5%;
    margin-right: 5%;
    width: 50%;
    height: 600px;
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


  .card1 {
    height: 95%;

  }
  .dx{
    width: 60%;
  }
</style>
