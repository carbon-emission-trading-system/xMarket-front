<!----委托市价买入页面-->
<template>
  <div>
    <div class="NavigationBar">
      <el-menu :default-active="activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               router>

        <el-menu-item style="margin-left: 20%" index="AfterLogin">首页</el-menu-item>
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
        <div id="exit">
          <el-link type="primary" @click="exit">退出</el-link>
        </div>
      </el-menu>

    </div>

    <div class="Subtitle">
      <el-menu :default-active="activeIndexBS"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
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
            <p style="font-size: 30px; margin-top:10% "> {{ buyOrSell }} </p>
            <div style="text-align: center" class="elementInput">
              <el-form-item label="证券代码"
                            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
                            prop="stockId"
                            :rules="[{
                              validator: verifyStockCode, // 自定义验证
                              trigger: 'blur'
                            }]">
                <el-input v-model.number="stockTrading.stockId" type="number" placeholder="请输入证券代码"></el-input>
              </el-form-item>
              <el-form-item label="证券名称">
                <el-input v-model="stockTrading.stockName" placeholder="证券名称" :disabled="true"></el-input>
              </el-form-item>

              <!---->
              <el-form-item label="交易策略"
                            prop="value"
                            :rules="[{
                              validator: tradingStrategyVerification, // 自定义验证
                              trigger: 'blur'
                            }]">
                <el-select v-model="DelegateType" placeholder="请选择委托方案">
                  <el-option v-for="item in allDelegateType" :key="item.value" :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="可买数量">
                <el-input v-model="stockTrading.canorderAmount" placeholder="可买数量" :disabled="true"></el-input>
              </el-form-item>

              <div class="proportion">
                <el-button type="text" @click="change1" class="TxTbutton">1/4</el-button>
                <el-button type="text" @click="change2" class="TxTbutton">1/2</el-button>
                <el-button type="text" @click="change3" class="TxTbutton">3/4</el-button>
                <el-button type="text" @click="change4" class="TxTbutton">全部</el-button>
              </div>

              <el-form-item label="买入数量"
                            prop="orderAmount"
                            :rules="[
                             { validator: DetermineTheNumberOfPurchases, // 自定义验证
                              trigger: 'blur'
                            }]">
                <el-input v-model="stockTrading.orderAmount" placeholder="请输入买入股数"></el-input>
              </el-form-item>
              <div>
                <el-button @click="resetForm('stockTrading')">重新填写</el-button>
                <el-button @click="submitForm('stockTrading')" style="width: 92px;">提交</el-button>

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
    name: "BuyAtMarketPrice",

    data() {
      return {
        activeIndex: 'BuyAtLimitPrice',
        activeIndexBS: 'BuyAtMarketPrice',
        buyOrSell: '市价买入',
        client: null,

        //输入股票id后传入的相关信息
        stockTrading: {
          stockId: '',
          stockName: '',
          orderPrice: '',
          canorderAmount: '',
          orderAmount: '',
          tradeMarket: '',
          balance: '',
          //开盘价
          openPrice: '',
        },
        bz: '',
        //委托规则
        allDelegateType: [],
        msg: 0,
        //市价委托策略
        DelegateType: '',
        //规则
        rules: {
          stockId: [],
          value: [],
          orderPrice: [],
          orderAmount: []
        },
      }
    },
    components: {
      RealTime,
    },
    created() {

    },
    beforeMount() {
      let isLogin = this.$store.getters.isLogin
      if (!isLogin) {
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
        this.$router.push('/')
      }
    },
    methods: {
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      //导航栏需要
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

      /**
       * @since websockket传输
       * @author zh
       *
       */
      realTimeDataDisplay() {
        var self = this;
        Vue.axios.get('/api/realTimeDataDisplay')
          .then(function (response) {
            self.$message.success(response.data)
          })
          .catch(function (error) {
            self.$message.error(response.data)
          });
      },

      onConnected(frame) {
        console.log("Connected: " + frame);
        var exchange1 = "/exchange/realTimeExchange/stock.SZSE.600446";
        var exchange3 = "/exchange/timeShareExchange/stock.SZSE.600000";

        this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type": "text/plain"}, "来个订单");

        var subscription = this.client.subscribe(exchange1, this.onmessage);
        console.log(subscription);

        var subscription3 = this.client.subscribe(exchange3, this.onmessage);
        console.log(subscription3);
      },
      onFailed(frame) {
        console.log("Failed: " + frame.body);
        //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");

      },
      onmessage(message) {
        console.log("得到消息");
      },

      responseCallback(frame) {
        console.log("得到的消息 msg=>" + frame.body);
        //接收到服务器推送消息，向服务器发送确认消息
        // this.client.send("/exchange/exchange_pushmsg/rk_recivemsg", {"content-type":"text/plain"}, frame.body);
      },
      connect() {
        console.log("开始连接");
        this.client = Stomp.client("ws://localhost:15674/ws")
        console.log("创建");
        var headers = {
          "login": "guest",
          "passcode": "guest",
          //虚拟主机，默认“/”
          "heart-beat": "0,0"
        };
        this.client.connect(headers, this.onConnected, this.onFailed);
        console.log("连接结束");
      },

      /**
       *
       * 验证股票代码
       */
      verifyStockCode(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入股票代码'))
          console.log('请输入股票代码')
        } else {
          value = Number(value)
          if (typeof value === 'number' && !isNaN(value)) {
            if (this.bz === this.stockTrading.stockId) {
              callback()
            } else {
              this.bz = this.stockTrading.stockId;
              this.firstReturnStockRealtimeInformation()
            }
          } else {
            callback("请输入数字")
          }
        }

      },
      /**
       *
       * 自定义验证涨跌幅
       */
      LimitPrice(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入买入金额'))
          console.log('请输入买入金额')
        } else {
          value = Number(value)
          if (typeof value === 'number' && !isNaN(value)) {
            if (value > this.stockTrading.openPrice * 1.1) {
              callback(new Error('超过涨停价'))
            } else if (value < this.stockTrading.openPrice * 0.9) {
              callback(new Error('低于跌停价'))
            } else if (value < 0) {
              callback(new Error('请输入合适价格'))
            } else {
              callback()
              this.stockTrading.canorderAmount = this.CalculatingTax(this.stockTrading.balance, value)
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
          callback(new Error('请选择交易策略'))
          console.log('请选择交易策略')
        }
      },
      /**
       *
       * 自定义验证买入数量
       */
      DetermineTheNumberOfPurchases(rule, value, callback) {
        if (!value) {
          callback(new Error('请输入买入数量'))
          console.log('请输入买入数量')
        }
        value = Number(value)
        if (typeof value === 'number' && !isNaN(value)) {
          if (value > this.stockTrading.canorderAmount) {
            callback(new Error('超出可买数量'))
          } else if (value < 0) {
            callback(new Error('请输入合适数量'))
          } else if (Math.floor(value / 100) * 100 != value) {
            callback('请输入100的整数倍')
          } else {
            callback()
          }
        } else {
          callback("请输入数字")
        }
      },
      /**
       * 重新提交
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      ,
      /**
       *提交
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // ajaxSubmit()是ajax的提交，websocketSubmit()是websocket的提交
            this.ajaxSubmit();
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      },

      /**
       * @author 郑科宇
       * @date 05/28
       * @param 1.0
       * @since 第一次传输股票代码,与账户ID，服务器返回实时信息与账户金额
       */
      firstReturnStockRealtimeInformation() {
        let prom = {
          stockId: this.stockTrading.stockId,
          // userId: store.state.user.userId
          userId:this.$store.getters.getUserId
        };
        this.$api.http('get', "/api/QueryStockInformation", prom).then(res => {
          console.log(res);
          this.stockTrading = res.data;
          this.stockTrading.openPrice = res.data.openPrice;
          this.stockTrading.balance = res.data.balance;
          this.stockTrading.canorderAmount = this.CalculatingTax(this.stockTrading.balance, this.orderPrice)
        }).catch((res)=> {
          this.$message.error(res.message)
        })
        if (this.tradeMarket === 0) {
          this.allDelegateType = store.state.SDelegateType;
        } else {
          this.allDelegateType = store.state.HDelegateType;
        }
      },

      /**
       * 计算最多可买多少
       * @param params
       * @return {{articles: {stockId: number, stockName: string, orderPrice: number, canorderAmount: number, soh: number}}}
       */
      CalculatingTax(allFund, price) {
        if (Math.floor(allFund / (price * 1.030287 * 100)) * 100 * price > 166.6) {
          console.log('if');
          console.log(allFund / (price * 1.030287 * 100));
          return Math.floor(allFund / (price * 1.030287 * 100)) * 100;
        } else {
          return Math.floor((allFund - 5) / (price * 1.000287)) * 100;
        }
      }
      ,


      /**
       * @since ajax发送给后台委托单
       * @date 6.3
       */
      ajaxSubmit() {
        // this.firstReturnStockRealtimeInformation()
        if (this.$store.getters.getUserId == null) {
          this.alertBox('错误', '用户未登陆');
        } else if (this.stockTrading.stockId == null
          || this.stockTrading.orderAmount == null
          || this.DelegateType == null) {
          this.alertBox('错误', '有东西未输入');
        } else {
          let SentstockTrading = {
            // userId: store.state.user.userId,
            userId:this.$store.getters.getUserId,
            stockId: this.stockTrading.stockId,
            type: 0,//买卖标识
            orderAmount: this.stockTrading.orderAmount,
            tradeStraregy: this.DelegateType,
          }
          console.log(SentstockTrading);
          this.$api.http('post', "/api/buyOrSale", SentstockTrading).then(res => {
            this.$message.success('提交成功')
          }).catch((res)=> {
            this.$message.error(res.message)
          })
        }
      },

      /**
       * websocket发送给后台委托单
       */
      websocketSubmit() {
        // this.firstReturnStockRealtimeInformation()
        let SentstockTrading = {
          // userId: store.state.user.userId,
          userId:this.$store.getters.getUserId,
          stockId: this.stockTrading.stockId,
          type: 0,//买卖标识
          orderAmount: this.stockTrading.orderAmount,
          orderPrice: this.stockTrading.orderPrice,
          tradeStraregy: this.DelegateType,
        }
        console.log(SentstockTrading);
        this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type": "text/plain"}, SentstockTrading);
      },

      //0.25/0.5/0.75计算
      change1() {
        console.log("1/4");
        console.log(this.stockTrading.canorderAmount * 0.25);
        console.log(this.stockTrading);
        this.stockTrading.orderAmount = CalculatingTax(this.stockTrading.balance * 0.25, this.stockTrading.orderPrice)
        // this.stockTrading.orderAmount = Math.floor(this.stockTrading.canorderAmount * 0.25);
        console.log(this.stockTrading);
      },
      change2() {
        this.stockTrading.orderAmount = CalculatingTax(this.stockTrading.balance * 0.5, this.stockTrading.orderPrice)
        // this.stockTrading.orderAmount = Math.floor(this.stockTrading.canorderAmount * 0.5)
      },
      change3() {
        this.stockTrading.orderAmount = CalculatingTax(this.stockTrading.balance * 0.2575, this.stockTrading.orderPrice)
        // this.stockTrading.orderAmount = Math.floor(this.stockTrading.canorderAmount * 0.75)
      },
      change4() {
        this.stockTrading.orderAmount = this.stockTrading.canorderAmount
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
    /*width: 30%;*/
    /*margin-left: 27%;*/
    /*margin-right: 30%;*/
    width: 100%;
    margin-bottom: 2%;

  }

  .all {
    width: 100%;
    height: 100%;
    display: block;
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

  .all {
    float: left;
  }

  .card1 {
    height: 95%;

  }
</style>
