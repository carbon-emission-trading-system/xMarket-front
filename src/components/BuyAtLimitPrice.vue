<!-- 委托限价买入页面-->
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
          <template slot="title" index="1">信息统计</template>
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
            <p style="font-size: 30px; margin-top:10% "> {{ buyOrSell }} </p>
            <div style="text-align: center;float: left;width: 100%" class="elementInput">
              <el-form-item label="证券代码"
                            style="float: left;width: 100%"
                            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )"
                            prop="stockId"
                            :rules="[{
                              validator: verifyStockCode, // 自定义验证
                              trigger: 'blur'
                            }]"

              >
                <el-input v-model.number="stockTrading.stockId" type="number" class="dx" placeholder="请输入证券代码"></el-input>
                <!--@blur.prevent="firstReturnStockRealtimeInformation()"-->
              </el-form-item>

              <el-form-item label="证券名称"  >
                {{ stockTrading.stockName }}
                <!--<el-input v-model="stockTrading.stockName" placeholder="证券名称" :disabled="true"></el-input>-->
              </el-form-item>

              <el-form-item label="买入价格"
                            style="float: left;width: 100%"
                            prop="orderPrice"

                            :rules="[
                            { validator: LimitPrice, // 自定义验证
                              trigger: 'blur',
                            }
                            ]"
                          >
                <el-input v-model="stockTrading.orderPrice"   class="dx" placeholder="请输入买入价格" clearable></el-input>
                <!--@blur.prevent="LimitPrice()"-->
              </el-form-item>
              <el-form-item label="可买数量"
                            style="float: left;"
                           >
                {{ stockTrading.canorderAmount }}

                <!--<el-input v-model="stockTrading.canorderAmount" placeholder="可买数量" :disabled="true"></el-input>-->
              </el-form-item>

              <div class="proportion"
                   style=" float: left; width: 100%; margin-left: 0px; align-content: left">
                <el-button type="text" @click="change1" class="TxTbutton">1/4</el-button>
                <el-button type="text" @click="change2" class="TxTbutton">1/2</el-button>
                <el-button type="text" @click="change3" class="TxTbutton">3/4</el-button>
                <el-button type="text" @click="change4" class="TxTbutton">全部</el-button>
              </div>

              <el-form-item label="买入数量"
                            prop="orderAmount"
                            :rules="[
                             { validator: DetermineTheNumberOfPurchases, // 自定义验证
                              trigger: 'change'
                            }]"
                            style="float: left;width: 100%"
              >
                <el-input v-model="stockTrading.orderAmount" placeholder="请输入买入股数" class="dx" clearable></el-input>
              </el-form-item>
              <div  style="float: left;width: 60%;margin-top: 5%">
                <el-button @click="resetForm('stockTrading')" style="width: 50%;">重新填写</el-button>
                <!-- ajaxSubmit()是ajax的提交，websocketSubmit()是websocket的提交-->
                <!--<el-button @click="ajaxSubmit" style="width: 92px;">提交</el-button>-->
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
  import Vue from 'vue'

  export default {
    name: "BuyAtLimitPrice",
    data() {
      return {
        activeIndex: 'BuyAtLimitPrice',
        activeIndexBS: 'BuyAtLimitPrice',
        buyOrSell: '买入股票',
        client: null,
        bz: '',
        //用户可用金额
        stockTrading: {
          balance: '',
          stockId: '',
          stockName: '',
          orderPrice: '',
          openPrice: '',
          canorderAmount: '',
          orderAmount: '',
          tradeMarket: '',
        },
        msg: 0,
        realTimeData: {}
      }
    },
    components: {
      RealTime,
    },
    created() {
      this.styleObject = this.tableStyle;
      if (this.showByRow !== undefined) {
        this.s_showByRow = this.showByRow;
      }
      ;
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

      updataStock() {
        this.stockTrading = this.stockTrading;
      },
      onConnected(frame) {
        console.log("Connected: " + frame);
        var exchange1 = "/exchange/realTimeExchange/stock.SZSE.600446";
        var exchange3 = "/exchange/timeShareExchange/stock.SZSE.600000";


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

        console.log('----');
        this.$forceUpdate();
        if (!value) {
          callback(new Error('请输入股票代码'))
          console.log('请输入股票代码')
        } else {
          value = Number(value)
          if (typeof value === 'number' && !isNaN(value)) {
            this.firstReturnStockRealtimeInformation();
            callback();
            // if (this.bz === this.stockTrading.stockId) {
            //   console.log('000000', this.bz);
            //   callback()
            // } else {
            //   this.bz = this.stockTrading.stockId;
            //   this.firstReturnStockRealtimeInformation()
            // }
          } else {
            callback("请输入数字")
          }
        }
      },
      /**
       *
       * 自定义验证涨
       * 跌幅
       */
      LimitPrice(rule, value, callback) {
        this.$forceUpdate();
        if (!value) {
          callback(new Error('请输入买入金额'));
          console.log('请输入买入金额')
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
              callback();
              this.stockTrading.canorderAmount = this.CalculatingTax(this.stockTrading.balance, value);
              this.stockTrading.orderAmount = this.stockTrading.canorderAmount;
              // Vue.set(this.stockTrading, this.stockTrading.canorderAmount, this.CalculatingTax(this.stockTrading.balance, value));
              this.$forceUpdate();
              // this.updataStock()
            }
          } else {
            callback("请输入数字")
          }
        }
        console.log(this.stockTrading.canorderAmount)
      },
      /**
       * 自定义验证买入数量
       */
      DetermineTheNumberOfPurchases(rule, value, callback) {
          console.log(value)
        // this.stockTrading.orderAmount = value;
        console.log(value)
        this.$forceUpdate();
        if (!value) {
          callback(new Error('请输入买入数量'))
          console.log('请输入买入数量')
        } else {
          value = Number(value)
          if (typeof value === 'number' && !isNaN(value)) {
            if (value > this.stockTrading.canorderAmount) {
              callback(new Error('超出可买数量'))
            } else if (value < 0) {
              callback(new Error('请输入合适数量'))
            } else if (Math.floor(value / 100) * 100 != value) {
              callback('请输入100的整数倍')
            } else {
              callback();
              this.$forceUpdate();
              // Vue.set(this.stockTrading, this.stockTrading.orderPrice, this.stockTrading.orderPrice);
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
        console.log('asd');
        this.stockTrading.stockId = null;
        this.stockTrading.orderPrice = null;
        this.stockTrading.canorderAmount = null;
        this.stockTrading.orderAmount = null;
        this.stockTrading.stockName = null;
      }
      ,
      /**
       *提交
       */

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ajaxSubmit();
          } else {
            alert('error submit!!');
            console.log('error submit!!');
            return false;
          }
        });
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
          userId: this.$store.getters.getUserId
        };

        api.http('get', "/api/QueryStockInformation", prom).then(res => {
          alert('yes')

          this.stockTrading = res.data;
          // this.stockTrading.openPrice = res.data.yesterdayClosePrice;
          this.$set(this.stockTrading, 'openPrice', res.data.yesterdayClosePrice);

          console.log(this.stockTrading.orderPrice)

          // this.stockTrading.canorderAmount = this.CalculatingTax(this.stockTrading.balance, this.stockTrading.orderPrice)
          // Vue.set(this.stockTrading, 'canorderAmount', this.CalculatingTax(this.basicInfoStok.balance, this.basicInfoStok.orderPrice));
          this.$forceUpdate();

          this.$set(this.stockTrading, 'canorderAmount', this.CalculatingTax(this.stockTrading.balance, this.stockTrading.orderPrice));
          // this.stockTrading.orderAmount = this.stockTrading.canorderAmount;
          this.$set(this.stockTrading, 'orderAmount', this.stockTrading.canorderAmount);


          this.connect();

        }).catch((res) => {
          this.$message.error(res.message)
        });


        // console.log('st'+this.basicInfoStok)
      }
      ,

      /**
       * 计算最多可买多少
       * @param params
       * @return {{articles: {stockId: number, stockName: string, orderPrice: number, canorderAmount: number, soh: number}}}
       */
      CalculatingTax(allFund, price) {
        let res = '';
        if (Math.floor(allFund / (price * 1.030287 * 100)) * 100 * price > 166.6) {
          console.log('if');
          console.log(allFund / (price * 1.030287 * 100));
          res = Math.floor(allFund / (price * 1.030287 * 100)) * 100;
        } else {
          res = Math.floor((allFund - 5) / (price * 1.000287)) * 100;
        }
        return res;
      }
      ,

      /**
       * websocket发送给后台委托单
       */
      websocketSubmit() {
        let SentstockTrading = {
          userId: this.$store.getters.getUserId,
          stockId: this.stockTrading.stockId,
          type: 0,
          orderAmount: this.stockTrading.orderAmount,
          orderPrice: this.stockTrading.orderPrice,
          tradeStraregy: 0,
        };
        console.log(SentstockTrading);
        this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type": "text/plain"}, JSON.stringify(SentstockTrading));
      }
      ,
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
          this.firstReturnStockRealtimeInformation();
          let SentstockTrading = {
            // userId: store.state.user.userId,
            userId: this.$store.getters.getUserId,
            stockId: this.stockTrading.stockId,
            type: 0,//买卖标识
            orderAmount: this.stockTrading.orderAmount,
            orderPrice: this.stockTrading.orderPrice,
            tradeStraregy: 0,
          };
          console.log('SentstockTrading');
          console.log(SentstockTrading);
          this.$api.http('post', "/api/buyOrSale", SentstockTrading).then(res => {
            this.$message.success('提交成功')
          }).catch((res) => {
            this.$message.error(res.message)
          })
        }
      }
      ,


      //0.25/0.5/0.75计算
      change1() {
        // this.$set(this.stockTrading, 'orderAmount', 9);
        this.$set(this.stockTrading, 'orderAmount', this.CalculatingTax(this.stockTrading.balance * 0.25, this.stockTrading.orderPrice));
        // this.stockTrading.orderAmount = this.CalculatingTax(this.stockTrading.balance * 0.25, this.stockTrading.orderPrice)
        this.$forceUpdate();
        console.log(this.stockTrading.orderAmount);
      },
      change2() {
        this.$set(this.stockTrading, 'orderAmount', this.CalculatingTax(this.stockTrading.balance * 0.5, this.stockTrading.orderPrice));
        // this.stockTrading.orderAmount = this.CalculatingTax(this.stockTrading.balance * 0.5, this.stockTrading.orderPrice)
        this.$forceUpdate();
        console.log(this.stockTrading)
      },
      change3() {
        this.$set(this.stockTrading, 'orderAmount', this.CalculatingTax(this.stockTrading.balance * 0.75, this.stockTrading.orderPrice));
        // this.stockTrading.orderAmount = this.CalculatingTax(this.stockTrading.balance * 0.75, this.stockTrading.orderPrice)
        this.$forceUpdate();
      },
      change4() {
        this.$set(this.stockTrading, 'orderAmount', this.stockTrading.canorderAmount);
        // this.stockTrading.orderAmount = this.stockTrading.canorderAmount
        this.$forceUpdate();
      },
      change() {
        console.log('orderAmount')
        console.log(this.stockTrading.orderAmount)
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

    /*margin-left: 27%;*/
    /*margin-right: 30%;*/
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

  .all {
    float: left;
  }

  .card1 {
    height: 95%;
  }

  .mailTable, .mailTable tr, .mailTable tr td {
    border: 1px solid #E6EAEE;
  }

  .mailTable {
    font-size: 12px;
    color: #71787E;
  }

  .mailTable tr td {
    border: 1px solid #E6EAEE;
    width: 150px;
    height: 35px;
    line-height: 35px;
    box-sizing: border-box;
    padding: 0 10px;
  }

  .mailTable tr td.column {
    background-color: #EFF3F6;
    color: #393C3E;
  }
  .dx{
    width: 60%;
  }

</style>
