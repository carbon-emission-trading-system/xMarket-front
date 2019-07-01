<!--委托限价卖出页面-->
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
      <div class="Subtitle" style="postion:fixed ">
        <el-menu :default-active="activeIndexBS"
                 class="el-menu-demo"
                 mode="horizontal"
                 text-color="#000000"
                 active-text-color="#ffd04b"
                 style="background-color: rgba(0,0,0,0);width: 30%;float: right;padding-right: 18%;height: 30px"
                 v-bind:router=true>
          <el-menu-item style="width: 25%;height: 100%;text-align: center;line-height: 20px;" index="BuyAtLimitPrice">
            买入
          </el-menu-item>
          <el-menu-item
            style="width: 25%;height: 100%;text-align: center;line-height: 20px;border-left: 3px solid #ffd04c;"
            index="SellAtLimitPrice">卖出
          </el-menu-item>
          <el-menu-item style="width: 25%;height: 100%;text-align: center;line-height: 20px;"
                        index="BuyAtMarketPrice">市价买入
          </el-menu-item>
          <el-menu-item style="width: 25%;height: 100%;text-align: center;line-height: 20px;"
                        index="SellAtMarketPrice">市价卖出
          </el-menu-item>
        </el-menu>

      </div>
    </div>

    <div style="z-index: 1;position:relative;">


      <div class="all">

        <div class="list1">
          <el-card class="card1" shadow="hover">
            <el-button v-show="rout" type="text" icon="el-icon-edit"
                       style="float: right; margin-left:4%;position: absolute;" @click="linkKline">去K线图
            </el-button>
            <el-form label-position="left" label-width="80px" :model="stockTrading" ref="stockTrading" size="mini">
              <p style="font-size: 30px; margin-top:10% ;margin-left: -1%"> {{ buyOrSell }} </p>
              <div style="text-align: center ;float: left;width: 100%;margin-left: 11%" class="elementInput">
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
                  {{stockTrading.stockName}}
                  <!--<el-input v-model="stockTrading.stockName" placeholder="证券名称" :disabled="true"></el-input>-->
                </el-form-item>
                <el-form-item label="卖出价格"
                              prop="orderPrice"
                              style="float: left;width: 100%"
                              :rules="[
                            { validator: LimitPrice, // 自定义验证
                            trigger: 'change'
                            }
                            ]">
                  <el-input v-model="stockTrading.orderPrice" class="dx" type="number" step="0.01"
                            id="input"
                            placeholder="请输入卖出价格"></el-input>
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
                              style="float: left;width: 100%">
                  <el-input v-model="stockTrading.orderAmount" class="dx" type="number" step="100"
                            placeholder="请输入卖出股数"></el-input>
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
        rout: false,
        url: '../../../static/images/xMarket.png',
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
      }

      console.log(this.$store.state.temStockId)
    },
    beforeMount() {
      let isLogin = this.$store.getters.isLogin;
      if (!isLogin) {
        this.$message('请先登录');
        this.$router.push('/')
      }
    },
    methods: {
      linkKline() {
        this.$store.commit('stockId', this.stockTrading.stockId);
        this.$store.commit('stockName', this.stockTrading.stockName);
        this.$store.commit('changeRout', 3);
        this.$router.push('/StockDisplay')
      },
      exit() {
        this.$store.commit('logout');
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
        if (queryString.length === 6) {
          cb([]);
        } else {
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
          if (this.msg === this.stockTrading.stockId) {
            callback()
          } else {
            callback();
            this.firstReturnStockRealtimeInformation();
            this.msg = this.stockTrading.stockId;
          }
        } else if (value.length > 6) {
          callback();
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
              if (value > this.stockTrading.openPrice) {
                document.getElementById('input').style.color = "#ff3434";
              } else {
                document.getElementById('input').style.color = "#02e602";
              }
            }
          } else {
            callback("请输入数字")
          }
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
              callback(new Error('超出可卖数量'))
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
        console.log('asd');
        this.stockTrading.stockId = '';
        this.stockTrading.orderPrice = '';
        this.stockTrading.canorderAmount = '';
        this.stockTrading.orderAmount = '';
        this.stockTrading.stockName = '';
        this.msg = '';
      }
      ,
      /**
       *提交
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //ajaxSubmit()是ajax的提交，websocketSubmit()是websocket的提交-->
            // this.ajaxSubmit();
            this.open();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      open() {
        const h = this.$createElement;
        this.$msgbox({
          title: '卖出订单',
          message: h('div', {style: "margin-left:30%;margin-bottom:5%;width:100%;"}, [
            h('p', null, '证券代码:  ' + this.stockTrading.stockId),
            h('p', null, '证券名称:  ' + this.stockTrading.stockName),
            h('p', null, '卖出价格:  ' + this.stockTrading.orderPrice),
            h('p', null, '卖出数量:  ' + this.stockTrading.orderAmount),
            h('p', null, '预估金额:  ' + this.estimatedAmount(this.stockTrading.orderPrice, this.stockTrading.orderAmount)),
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.ajaxSubmit();
              done()
            } else if (action === 'cancel') {
              done();
            } else {
              done()
            }
          }
        }).then(action => {
        });

      },
      estimatedAmount(mo, co) {
        if (mo * co * 1.00002 > 20000) {
          return (mo * co * 0.99873).toFixed(2)
        } else {
          return (mo * co * 0.99898 - 5).toFixed(2)
        }
      },
      /**
       * @author 郑科宇
       * @date 05/28
       * @param 1.0
       * @since 第一次传输股票代码,与账户ID，服务器返回实时信息与可卖股票数量
       */
      firstReturnStockRealtimeInformation() {
        this.rout = false;
        let prom = {
          stockId: this.stockTrading.stockId,
          // userId: store.state.user.userId
          userId: this.$store.getters.getUserId
        }

        this.$api.http('get', "/api/QueryStockInformation", prom).then(res => {
          this.rout = true;
          console.log(res);
          this.stockTrading = res.data;
          console.log("this.basicInfoStok)");
          this.$set(this.stockTrading, 'openPrice', res.data.yesterdayClosePrice);

          this.$set(this.stockTrading, 'orderAmount', this.stockTrading.availableNumber);

          this.msg = this.stockTrading.stockId;
          this.$store.commit('buyOrSellStock', 0);
          this.$store.commit('buyOrSellStock', this.stockTrading.stockId);

          this.$store.commit('temStockId', this.stockTrading.stockId)
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
            this.firstReturnStockRealtimeInformation()
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
    margin-top: 1%;
    position: -webkit-sticky;
    position: sticky;
    z-index: 5;
    display: inline-block;
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
    margin-top: 2%;

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
    margin-left: 16%;
    width: 25%;
    font-size: 14px;
    height: 535px;
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
