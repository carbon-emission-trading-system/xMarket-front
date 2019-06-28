<template>
  <div>
    <div id="navigator">
      <el-image :src="url" style="height: 45px;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router=true

               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item index="AfterLogin">首页</el-menu-item>
        <el-submenu  index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item  index="BuyAtLimitPrice">股票买卖</el-menu-item>
        <el-menu-item  index="Guide">股票指南</el-menu-item>
        <el-submenu  index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange">当日成交</el-menu-item>
          <el-menu-item index="TodayOrder">当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item  index="SelfCenter">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
        <el-menu-item v-else style="padding-left: 4%;color: #409EFF" ><span @click="login">登录</span><span>/</span>
          <span style="color: #409EFF" @click="register">注册</span>
        </el-menu-item>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div id="bread">
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 14px">
          <el-breadcrumb-item v-if="this.$store.state.rout===0" :to="{ path:'/StockList' }">股票列表
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$store.state.rout===1" :to="{ path:'/BuyAtLimitPrice' }">限价买入
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$store.state.rout===2" :to="{ path:'/BuyAtMarketPrice' }">市价买入
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$store.state.rout===3" :to="{ path:'/SellAtLimitPrice' }">限价卖出
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="this.$store.state.rout===4" :to="{ path:'/SellAtMarketPrice'}">市价卖出
          </el-breadcrumb-item>

          <!--<el-breadcrumb-item v-else :to="{ path:'/StockList' }">股票列表</el-breadcrumb-item>-->
          <el-breadcrumb-item>{{this.indexName}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div id="both">
        <div id="card">

          <el-card class="box-card" shadow="hover">
            <div slot="header" class="clearfix">
              <span>{{this.indexName}}</span>

            </div>

            <div>
              <el-tabs v-model="activeName">
                <el-tab-pane label="日K" name="first">
                  <ve-candle :data="kChartData" width="700px" height="450px" :settings="kChartSettings"
                             :colors="kColor"></ve-candle>
                </el-tab-pane>

                <el-tab-pane label="分时" name="second">
                  <div id="myChart" style="width: 700px;height: 450px"></div>
                </el-tab-pane>
              </el-tabs>

            </div>
          </el-card>
        </div>

        <div id="table">
          <!--        <realTime></realTime>-->
          <el-card class="list1" shadow="hover">
            <table class="mailTab2" :style="styleObject">
              <tr>
                <td class="column">最新指数</td>
                <td v-if="this.realTimeData.yesterdayCloseIndex<=this.realTimeData.lastIndex" style="color:#ff3434;">
                  {{this.realTimeData.lastIndex}}
                </td>
                <td v-else style="color:#02e602;">{{this.realTimeData.lastIndex}}</td>

              </tr>
              <tr>
                <td class="column">今日开盘</td>
                <td>{{this.realTimeData.todayOpenIndex}}</td>
              </tr>
              <tr>
                <td class="column">指数涨跌</td>
                <td>{{this.realTimeData.upsAndDowns}}</td>
              </tr>
              <tr>
                <td class="column">指数涨幅</td>
                <td>{{this.realTimeData.increase}}</td>
              </tr>
              <tr>
                <td class="column">总成交量</td>
                <td>{{this.realTimeData.volume}}</td>
              </tr>
              <tr>
                <td class="column">最高指数</td>
                <td>{{this.realTimeData.highestIndex}}</td>
              </tr>
              <tr>
                <td class="column">最低指数</td>
                <td>{{this.realTimeData.lowestIndex}}</td>
              </tr>
              <!--            <tr>-->
              <!--              <td class="column">总股份</td>-->
              <!--              <td class="column">{{this.realTimeData.}}</td>-->
              <!--            </tr>-->
              <tr>
                <td class="column">总市值</td>
                <td>{{this.realTimeData.marketCapitalization}}</td>
              </tr>
              <tr>
                <td class="column">涨家数</td>
                <td style="color: #ff3434">{{this.realTimeData.increaseStocks}}</td>
              </tr>
              <tr>
                <td class="column">跌家数</td>
                <td style="color: #02e602">{{this.realTimeData.decreaseStocks}}</td>
              </tr>
              <tr>
                <td class="column">持平家数</td>
                <td>{{this.realTimeData.flatStocks}}</td>
              </tr>
            </table>
          </el-card>
        </div>


      </div>
    </div>

  </div>
</template>

<script>
  import VCharts from 'v-charts'
  import RealTime from './SelfRealTime'
  import echarts from 'echarts' //引入echarts
  import Vue from 'vue'

  Vue.prototype.$echarts = echarts //引入组件

  Vue.use(VCharts)
  Vue.component('realTime', RealTime);

  export default {
    components: {
      RealTime,
    },
    data() {
      this.kChartSettings = {
        symbol: 'none',
        showMA: true,
        showVol: true,
        //
        showDataZoom: true,
        upColor: 'mediumseagreen',
        downColor: 'crimson',
        labelMap: {
          openPrice: '开盘价',
          closePrice: '收盘价',
          highestPrice: '最高价',
          lowestPrice: '最低价',
          Volume: '成交量'
        },
      }

      this.kColor = ['#c23531', '#2f4554', '#61a0a8', '#d48265']
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: 'StockList',
        activeName: 'first',
        //指数种类
        indexId: this.$store.state.indexId,
        kChartData: {
          columns: ['date', 'openPrice', 'closePrice', 'lowestPrice', 'highestPrice', 'volume'],
          rows: []
        },
        realTimeData: {},
        //分时图的横坐标
        timeData: [],
        averagePrice: [],
        lastTradePrice: [],
        volume: []
      }
    },
    created() {
      this.setKlineApi();
      this.setFirstTimeApi();
      this.realTimeDataDisplay()
    },
    mounted() {
      // this.drawLine();
      this.connect();

    },
    computed: {
      isLogin: function () {
        return this.$store.state.isLogin
      },
      indexName: function () {
        if (this.indexId === '100000') {
          return '上证指数'
        }
        else {
          return '深证成指'
        }
      },
    },

    methods: {

      onConnected(frame) {
        console.log("Connected: " + frame);
        let exchange = "/exchange/timeShareExchange/stock.SZSE." + this.$store.state.stockId;
        let subscription = this.client.subscribe(exchange, this.onmessage);
        console.log(subscription);

        let exchange2 = "/exchange/realTimeExchange/index." + this.indexId;
        let subscription2 = this.client.subscribe(exchange2, this.onmessage2);
        console.log(subscription2);
      },
      onFailed(frame) {
        console.log("Failed: " + frame.body);
        //this.client.send("/exchange/orderExchange/o rderRoutingKey", {"content-type":"text/plain"}, "订阅失败");

      },
      onmessage(message) {
        console.log("得到消息");
        let data = JSON.parse(message.body);
        console.log(data.averagePrice);
        console.log(data);
        this.timeData.push(data.realTime)
        this.averagePrice.push(data.averagePrice)
        this.lastTradePrice.push(data.lastTradePrice)
        this.volume.push(data.volume)

        this.drawLine()
      },
      onmessage2(message) {
        console.log("得到消息");
        this.realTimeData = JSON.parse(message.body);
      },
      responseCallback(frame) {
        console.log("得到的消息 msg=>" + frame.body);
        //接收到服务器推送消息，向服务器发送确认消息
        // this.client.send("/exchange/exchange_pushmsg/rk_recivemsg", {"content-type":"text/plain"}, frame.body);
      },
      connect() {
        console.log("开始连接");
        this.client = Stomp.client("ws://192.168.137.1:15674/ws")
        console.log("创建");
        var headers = {
          "login": "zhang",
          "passcode": "648810",
          //虚拟主机，默认“/”
          "heart-beat": "0,0"
        };
        this.client.connect(headers, this.onConnected, this.onFailed);
        console.log("连接结束");
      },


      register(){
        this.$router.push('/Register')
      },
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      toFirst() {
        if (this.$store.getters.isLogin) {
          this.$router.push('AfterLogin')
        } else {
          this.$router.push('/')
        }
      },
      toRouterOrAlert(index) {
        if (this.$store.getters.isLogin) {
          this.$router.push(index)
        } else {
          this.$alert('请先登录！', {
            confirmButtonText: '确定',
          });
        }
      },
      login(){
        this.$router.push('/')
        this.$store.commit('position',1)
      },

      //获取k线图数据
      setKlineApi: function () {
        let params = {
          indexId: this.$store.state.indexId
        }
        this.$api.http('get', '/api/indexKlineDiagramDisplay', params).then(res => {
          console.log(res);
          this.kChartData.rows = res.data;
        }).catch((error) => {
          this.$message.error(error.message)
        });
      },
      //首次获取分时图数据
      setFirstTimeApi: function () {
        let params = {
          indexId: this.$store.state.indexId
        }
        this.$api.http('get', '/api/firstIndexTimeSharingDisplay', params).then(res => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            this.timeData.push(data[i].realTime)
            this.averagePrice.push(data[i].averagePrice)
            this.lastTradePrice.push(data[i].lastTradePrice)
            this.volume.push(data[i].volume)
          }
          this.drawLine()
        }).catch((error) => {
          this.$message.error(error.message)
        });
      },
      realTimeDataDisplay() {
        let params = {
          indexId: this.$store.state.indexId
        }
        this.$api.http('get', '/api/indexInfo', params).then(res => {
          console.log(res.data)
          this.realTimeData = res.data
        })
      },

      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          legend: {
            data: ['最新价', '均价'],
          },
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },
          grid: [{
            height: '50%'
          }, {
            top: '70%',
            height: '15%'
          }],
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              axisLine: {onZero: false},
              max: 330,

              data: this.timeData
            },
            {
              gridIndex: 1,
              show: false,
              type: 'category',
              boundaryGap: true,
              max: 330,
              axisLine: {onZero: false},
              splitLine: {
                "show": false
              },
              data: this.timeData
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
            },
            {
              gridIndex: 1,
              show: false,
              type: 'value',
              splitLine: {     //网格线
                "show": false
              }
            }
          ],
          series: [
            {
              name: '最新价',
              type: 'line',
              symbol: 'none',
              smooth: 0.2,
              hoverAnimation: false,
              data: this.lastTradePrice
            },
            {
              name: '均价',
              type: 'line',
              symbol: 'none',
              smooth: 0.2,
              hoverAnimation: false,
              data: this.averagePrice
            },
            {
              name: '成交量',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              symbolSize: 8,
              barGap: '-100%',
              hoverAnimation: false,
              data: this.volume
            }
          ]
        });
      }
    }

  }
</script>

<style lang="scss">

  .mailTab2 {
    font-size: 14px;
    color: #71787E;
  }

  .mailTab2 tr td {
    width: 120px;
    height: 40px;
    line-height: 20px;
    box-sizing: border-box;
    padding: 0 15px;
    border: 0.5px solid #E6EAEE;
  }

  .mailTab2 tr td.column {
    background-color: #EFF3F6;
    color: #393C3E;
  }

  .list1 {
    width: 90%;
    float: left;
    height: 95%;
    text-align: center;
  }

  .column {
    width: 5%;
  }

  #bread {
    margin-top: 3%;
    margin-left: 15%;
  }

  #both {
    display: inline-block;
    width: 80%;
    margin: 0 auto;
  }

  #card {
    margin-top: 5%;
    float: left;
    width: 65%;
  }

  #table {
    margin-top: 5%;
    float: right;
    width: 30%;
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
