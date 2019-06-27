<!----委托市价买入页面-->
<template>
  <div>
    <div class="NavigationBar" id="navigator">
      <el-image :src="url" style="height: 45px;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router=true

               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item index="AfterLogin">首页</el-menu-item>
        <el-submenu index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item index="BuyAtLimitPrice">股票买卖</el-menu-item>
        <el-menu-item index="Guide">股票指南</el-menu-item>
        <el-submenu index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange">当日成交</el-menu-item>
          <el-menu-item index="TodayOrder">当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;font-size: 6px;margin:auto">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>

    </div>
    <div style="z-index: 1;position:relative;">
      <div class="Subtitle" style="postion:fixed ">
        <el-menu :default-active="activeIndexBS"
                 class="el-menu-demo"
                 mode="horizontal"
                 text-color="#000000"
                 active-text-color="#ffd04b"
                 style="background-color: rgba(0,0,0,0);width: 30%;float: right;padding-right: 18%;height: 30px"
                 v-bind:router=true>
          <el-menu-item style="width: 25%;height: 100%;text-align: center;line-height: 20px;" index="BuyAtLimitPrice">买入
          </el-menu-item>
          <el-menu-item style="width: 25%;height: 100%;text-align: center;line-height: 20px;" index="SellAtLimitPrice">卖出
          </el-menu-item>
          <el-menu-item style="width: 25%;height: 100%;text-align: center;border-left: 3px solid #ffd04c;line-height: 20px;" index="BuyAtMarketPrice">市价买入
          </el-menu-item>
          <el-menu-item style="width: 25%;height: 100%;text-align: center;line-height: 20px;" index="SellAtMarketPrice">市价卖出
          </el-menu-item>
        </el-menu>

      </div>

      <div class="all">

        <div class="list1">
          <el-card class="card1" shadow="hover">
            <div style="height: 100%;width: 100%">

              <el-button v-show="rout" type="text" icon="el-icon-edit"
                         style="float: right; margin-left:4%;position: absolute;" @click="linkKline">去K线图
              </el-button>
              <el-form label-position="left" label-width="80px" :model="stockTrading" ref="stockTrading" size="mini">
                <p style="font-size: 30px; margin-top:10%;margin-left: -1% "> {{ buyOrSell }} </p>
                <div style="text-align: center;float: left;width: 100%;margin-left: 11%" class="elementInput">
                  <el-form-item label="证券代码"
                                style="float: left;width: 100%"
                                prop="stockId"
                                :rules="[{
                              validator: verifyStockCode, // 自定义验证
                              trigger: 'change'
                            }]">
                    <el-autocomplete v-model="stockTrading.stockId"
                                     :fetch-suggestions="querySearch"
                                     class="dx"
                                     @select="find"
                                     placeholder="请输入证券代码"></el-autocomplete>
                  </el-form-item>

                  <el-form-item label="证券名称">
                    {{ stockTrading.stockName }}
                    <!--<el-input v-model="stockTrading.stockName" placeholder="证券名称" :disabled="true"></el-input>-->
                  </el-form-item>

                  <!---->
                  <el-form-item label="交易策略"
                                prop="value"
                                style="float: left;width: 100%"
                                :rules="[{
                            validator: tradingStrategyVerification, // 自定义验证
                            trigger: 'blur'
                            }]">
                    <el-select v-model="stockTrading.DelegateType" @change="changeSelect" class="dx"
                               placeholder="请选择委托方案">
                      <el-option v-for="item in allDelegateType" :key="item.value" :label="item.label"
                                 :value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="可买数量"
                                style="float: left;">
                    {{ stockTrading.canorderAmount }}

                    <!--<el-input v-model="stockTrading.canorderAmount" placeholder="可买数量" :disabled="true"></el-input>-->
                  </el-form-item>

                  <div class="proportion">
                    <el-button type="text" @click="change1" class="TxTbutton">1/4</el-button>
                    <el-button type="text" @click="change2" class="TxTbutton">1/2</el-button>
                    <el-button type="text" @click="change3" class="TxTbutton">3/4</el-button>
                    <el-button type="text" @click="change4" class="TxTbutton">全部</el-button>
                  </div>

                  <el-form-item label="买入数量"
                                style="float: left;width: 100%"
                                prop="orderAmount"
                                :rules="[
                             { validator: DetermineTheNumberOfPurchases, // 自定义验证
                              trigger: 'change'
                            }]">
                    <el-input v-model="stockTrading.orderAmount" type="number" step="100" placeholder="请输入买入股数"
                              class="dx"></el-input>
                  </el-form-item>
                  <div style="float: left;width: 60%;margin-top: 5%">
                    <el-button @click="resetForm('stockTrading')" style="width: 50%;">重新填写</el-button>
                    <el-button @click="submitForm('stockTrading')" style="width: 40%;">提交</el-button>

                  </div>
                </div>
              </el-form>

            </div>
          </el-card>
        </div>
        <div class="list2">
          <RealTime></RealTime>
        </div>
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
        url: '../../../static/images/xMarket.png',
        activeIndex: 'BuyAtLimitPrice',
        activeIndexBS: 'BuyAtMarketPrice',
        buyOrSell: '市价买入',
        client: null,
        rout: false,
        //输入股票id后传入的相关信息
        stockTrading: {
          stockId: '',
          stockName: '',
          orderPrice: '',
          canorderAmount: '',
          orderAmount: '',
          tradeMarket: '',
          balance: '',
          //昨日收盘价
          openPrice: '',
          DelegateType: '',
        },
        //委托规则
        allDelegateType: [],
        msg: 0,
        //市价委托策略

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
    mounted() {
      this.$store.dispatch('stockList')
    }
    ,
    computed: {
      stock: function () {
        let theStocks = this.$store.state.stockList;
        let theStocksList = [];
        for (let i = 0; i < theStocks.length; i++) {
          let id = theStocks[i].stockId;
          let theStock = id + ":" + theStocks[i].stockName + ":" + theStocks[i].stockPinyin
          let stock = {value: theStock};
          theStocksList.push(stock)
        }
        return theStocksList
      },
    },
    created() {
      if (this.$store.state.temStockId !== '') {
        this.stockTrading.stockId = this.$store.state.temStockId;
        this.firstReturnStockRealtimeInformation();
        // this.$store.commit('temStockId', '');
      }
      console.log('console.log(this.$store.state.temStockId)');
      console.log(this.$store.state.temStockId)
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
      linkKline() {
        this.$store.commit('stockId', this.stockTrading.stockId);
        this.$store.commit('stockName', this.stockTrading.stockName);
        this.$store.commit('changeRout', 2);
        this.$router.push('/StockDisplay')
      },
      changeSelect(id) {
        this.$set(this.stockTrading, 'DelegateType', id);
        console.log(this.stockTrading.DelegateType)
      },
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      /***
      * @Description: 搜索提醒
      * @Param:
      * @return:
      * @Author: zky
      * @Date:
      */
      find() {
        let stockId = this.stockTrading.stockId;
        stockId = stockId.split(":")[0];
        this.$set(this.stockTrading, 'stockId', stockId);
        this.firstReturnStockRealtimeInformation();
      },
      //搜索提示
      querySearch(queryString, cb) {

        let stocks = this.stock;
        let results = queryString ? stocks.filter(this.createFilter(queryString)) : stocks;
        let theResults = [];
        if(queryString.length===6){
          cb([]);
        }else {
          //设置返回建议列表的数据不包含缩写
          for (let i = 0; i < results.length; i++) {
            let result = results[i].value;
            let theResult = {value: result.split(":")[0] + ":" + result.split(":")[1]}
            theResults.push(theResult)
          }
          cb(theResults);
        }
      },
      createFilter(queryString) {
        return (stocks) => {
          //所有包含关键字的都作为提醒内容
          return (stocks.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },
      /**
       *
       * 验证股票代码
       */
      verifyStockCode(rule, value, callback) {
        console.log('验证股票代码');
        this.$forceUpdate();
        if (value.length === 6) {
          callback()
          this.firstReturnStockRealtimeInformation();
        } else if (value.length > 6) {
          callback()
          this.stockTrading.stockId = '';
        } else {
          callback(new Error('请输入股票代码'));
        }
        // if (!value) {
        //   callback(new Error('请输入股票代码'))
        //   console.log('请输入股票代码')
        // } else {
        //   value = Number(value);
        //   if (typeof value === 'number' && !isNaN(value)) {
        //     if (this.msg === this.stockTrading.stockId) {
        //       callback()
        //     } else {
        //       this.firstReturnStockRealtimeInformation();
        //       callback();
        //     }
        //   }
        //   else {
        //     callback("请输入数字")
        //   }
        // }
      },
      /**
       *
       * 自定义验证买入数量
       */
      DetermineTheNumberOfPurchases(rule, value, callback) {
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
        if (!this.stockTrading.DelegateType) {
          callback(new Error('请选择交易策略'));
          console.log('请选择交易策略')
        } else {
          callback();
        }
      },
      /**
       * 重新提交
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.stockTrading.DelegateType = '';
        this.stockTrading.stockId = null;
        this.stockTrading.orderPrice = null;
        this.stockTrading.canorderAmount = null;
        this.stockTrading.orderAmount = null;
        this.stockTrading.stockName = null;
        this.msg = '';
      }
      ,
      /**
       *提交
       */
      submitForm(formName) {
        console.log(this.stockTrading.DelegateType);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // ajaxSubmit()是ajax的提交，websocketSubmit()是websocket的提交
            this.ajaxSubmit();
            this.stockTrading.DelegateType = '';
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
        this.rout = false;
        let prom = {
          stockId: this.stockTrading.stockId,
          // userId: store.state.user.userId
          userId: this.$store.getters.getUserId
        };
        this.$api.http('get', "/api/QueryStockInformation", prom).then(res => {
          console.log(res);
          this.rout = true;
          this.stockTrading = res.data;
          this.stockTrading.openPrice = res.data.yesterdayClosePrice;
          this.stockTrading.balance = res.data.balance;
          this.$set(this.stockTrading, 'canorderAmount', this.CalculatingTax(this.stockTrading.balance, this.stockTrading.openPrice * 1.1));
          this.$set(this.stockTrading, 'orderAmount', this.stockTrading.canorderAmount);


          console.log(res.data.tradeMarket);
          if (this.stockTrading.tradeMarket === 0) {
            this.allDelegateType = store.state.SDelegateType;
            console.log(this.allDelegateType)
          } else {
            this.allDelegateType = store.state.HDelegateType;
            console.log(this.allDelegateType)
          }

          
          this.msg = this.stockTrading.stockId;
          this.$store.commit('buyOrSellStock', 0);
          this.$store.commit('buyOrSellStock', this.stockTrading.stockId);
          this.$store.commit('temStockId', this.stockTrading.stockId)
        }).catch((res) => {
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
          return Math.floor((allFund - 5) / (price * 1.000287 * 100)) * 100;
        }
      }
      ,


      /**
       * @since ajax发送给后台委托单
       * @date 6.3
       */
      ajaxSubmit() {
        // this.firstReturnStockRealtimeInformation()
        console.log('***********************')
        console.log(this.stockTrading.stockId, this.stockTrading.orderAmount, this.stockTrading.DelegateType)
        if (this.$store.getters.getUserId == null) {
          this.alertBox('错误', '用户未登陆');
        } else if (this.stockTrading.stockId === null
          || this.stockTrading.orderAmount === null
          || this.stockTrading.DelegateType === ''
          || this.stockTrading.DelegateType === undefined) {
          this.stockTrading.DelegateType = '',
            alert('错误');
        } else {
          let SentstockTrading = {
            // userId: store.state.user.userId,
            userId: this.$store.getters.getUserId,
            stockId: this.stockTrading.stockId,
            type: 0,//买卖标识
            orderAmount: this.stockTrading.orderAmount,
            tradeStraregy: this.stockTrading.DelegateType,
          }
          console.log(SentstockTrading);
          this.$api.http('post', "/api/buyOrSale", SentstockTrading).then(res => {
            this.$message.success('提交成功')
          }).catch((res) => {
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
          userId: this.$store.getters.getUserId,
          stockId: this.stockTrading.stockId,
          type: 0,//买卖标识
          orderAmount: this.stockTrading.orderAmount,
          orderPrice: this.stockTrading.orderPrice,
          tradeStraregy: this.stockTrading.DelegateType,
        }
        console.log(SentstockTrading);
        this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type": "text/plain"}, SentstockTrading);
      },
      //0.25/0.5/0.75计算
      change1() {
        this.$set(this.stockTrading, 'orderAmount', this.CalculatingTax(this.stockTrading.balance * 0.25, this.stockTrading.openPrice * 1.1));
        this.$forceUpdate();
        // this.stockTrading.orderAmount = CalculatingTax(this.stockTrading.balance * 0.25, this.stockTrading.orderPrice)
        console.log(this.stockTrading);
      },
      change2() {
        this.$set(this.stockTrading, 'orderAmount', this.CalculatingTax(this.stockTrading.balance * 0.5, this.stockTrading.openPrice * 1.1));

        // this.stockTrading.orderAmount = CalculatingTax(this.stockTrading.balance * 0.5, this.stockTrading.orderPrice)
        this.$forceUpdate();
        // this.stockTrading.orderAmount = Math.floor(this.stockTrading.canorderAmount * 0.5)
      },
      change3() {
        this.$set(this.stockTrading, 'orderAmount', this.CalculatingTax(this.stockTrading.balance * 0.75, this.stockTrading.openPrice * 1.1));
        this.$forceUpdate();
        // this.stockTrading.orderAmount = CalculatingTax(this.stockTrading.balance * 0.2575, this.stockTrading.orderPrice)
        // this.stockTrading.orderAmount = Math.floor(this.stockTrading.canorderAmount * 0.75)
      },
      change4() {
        this.$set(this.stockTrading, 'orderAmount', this.stockTrading.canorderAmount);
        this.$forceUpdate();
        // this.stockTrading.orderAmount = this.stockTrading.canorderAmount
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
margin-top: 1%;
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
    float: left;
    width: 100%;
    margin-left: 0px;
    align-content: left;
    text-align: left;
  }

  .list1 {
     margin-left: 16%;
     width: 25%;
     font-size: 14px;
     height: 535px;
     float: left;
   }

  .list2 {
    margin-left: 2%;
    width: 50%;
    height: 535px;
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
    height: 100%;
  }

  .dx {
    width: 60%;
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
