<template>
  <div>
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router=true>

        <el-menu-item style="margin-left: 15%" @click="toFirst">首页</el-menu-item>
        <el-submenu style="margin-left: 5%" index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item style="margin-left: 5%" @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="margin-left: 5%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')">当日成交</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('TodayOrder')">当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')">历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style="margin-left: 5%" @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="margin-left: 5%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

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
        <el-breadcrumb-item>{{this.stockName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div id="both">
      <div id="card">

        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{this.stockName}}</span>
            <span v-if="this.chosen===false">
        <el-tooltip class="item" effect="dark" content="添加自选股" placement="top-start">
        <i class="el-icon-circle-plus-outline" style="font-size: 20px; color: #409EFF; float: right; padding: 1% 2%"
           @click="add()"></i>
        </el-tooltip>

          </span>
            <span v-if="this.chosen===true">
        <el-tooltip class="item" effect="dark" content="删除自选股" placement="top-start">
        <i class="el-icon-remove-outline" style="font-size: 20px; color: #409EFF; float: right; padding: 1% 2%"
           @click="remove()"></i>
        </el-tooltip>
          </span>
            <el-button style="float: right; padding: 1% 3%" type="text" @click="sell">卖出</el-button>
            <el-button style="float: right; padding: 1% 0" type="text" @click="buy">买入</el-button>


          </div>

          <div>
            <el-tabs v-model="activeName">
              <el-tab-pane label="日K" name="first">
                <ve-candle :data="kChartData" width="700px" height="450px" :settings="kChartSettings"
                           :colors="kColor"></ve-candle>
              </el-tab-pane>

              <el-tab-pane label="分时" name="second" >
                <div id="myChart" style="width: 700px;height: 450px"></div>
              </el-tab-pane>
            </el-tabs>

          </div>
        </el-card>
      </div>

      <div id="table">
        <realTime></realTime>
      </div>
    </div>

  </div>
</template>

<script>
  import VCharts from 'v-charts'
  import RealTime from './SelfRealTime'
  import echarts from 'echarts' //引入echarts
  import Vue from 'vue'
  import {formatDate} from "../util/data-format";

  Vue.prototype.$echarts = echarts //引入组件

  Vue.use(VCharts)
  Vue.component('realTime', RealTime);

  export default {
    components: {
      RealTime,
    },
    data() {
      pa:0,
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
        activeIndex: 'StockList',
        activeName: 'first',
        chosen: false,     //后端返回该股是否为用户的自选股
        kChartData: {
          columns: ['date', 'openPrice', 'closePrice', 'lowestPrice', 'highestPrice', 'volume'],
          rows: []
        },
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
      this.setSelfApi()
    },
    mounted() {
      // this.drawLine();
      this.connect();

    },
    computed: {
      isLogin: function () {
        return this.$store.state.isLogin
      },
      stockName: function () {
        return this.$store.getters.getStockName
      },
    },

    methods: {

      onConnected(frame) {
        console.log("Connected: " + frame);
        let exchange = "/exchange/timeShareExchange/stock.SZSE." + this.$store.state.stockId;

        this.client.subscribe(exchange, this.onmessage);


      },
      onFailed(frame) {
        console.log("Failed: " + frame.body);
        //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");

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
      //添加自选股
      add() {
        this.chosen = true
        let params = {
          userId: this.$store.getters.getUserId,
          stockId: this.$store.getters.getStockId
        }
        this.$api.http('post', "/api/addSelfSelectStock", params).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '自选股添加成功！',
              type: 'success',
              center: true
            }).catch((error) => {
              this.$message.error(error.message)
            });
          }
        })

      },
      //删除自选股
      remove() {
        this.chosen = false
        let params = {
          userId: this.$store.getters.getUserId,
          stockId: this.$store.getters.getStockId
        }
        this.$api.http('post', "/api/deleteSelfSelectStock", params).then(res => {
          if (res.code === 200) {
            this.$message({
              message: '自选股删除成功！',
              type: 'success',
              center: true
            }).catch((error) => {
              this.$message.error(error.message)
            });
          }
        })
      },
      sell: function () {
        this.$store.commit('temStockId', this.$store.state.stockId)
        this.$router.push('SellAtLimitPrice')
      },
      buy: function () {
        this.$store.commit('temStockId', this.$store.state.stockId)
        this.$router.push('BuyAtLimitPrice')
      },
      //查看该股票是否为自选股
      setSelfApi: function () {
        let params = {
          stockId: this.$store.getters.getStockId,
          userId: this.$store.getters.getUserId
        }
        this.$api.http('get', '/api/isSelfSelectStock', params).then(res => {
          console.log(res);
          this.chosen = res.data;
        }).catch((error) => {
          this.$message.error(error.message)
        });
      },
      //获取k线图数据
      setKlineApi: function () {
        let params = {
          stockId: this.$store.getters.getStockId
        }
        console.log("dawe")
        console.log(this.$store.getters.getStockId)
        this.$api.http('get', '/api/KlineDiagramDisplay', params).then(res => {
          console.log(res);
          this.kChartData.rows = res.data;
        }).catch((error) => {
          this.$message.error(error.message)
        });
      },
      //首次获取分时图数据
      setFirstTimeApi: function () {
        let params = {
          stockId: this.$store.getters.getStockId
        }
        this.$api.http('get', '/api/firstTimeSharingDisplay', params).then(res => {
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

      // //后次获取分时图数据
      // setTimeApi:function () {
      //   let params={
      //     stockId: this.$store.getters.getStockId
      //   }
      //   this.$api.http('get','/api/timeSharingDisplay',params).then(res => {
      //     let data = res.data
      //     for(let i =0;i<data.length;i++){
      //       this.timeData.push(data[i].realTime)
      //       this.averagePrice.push(data[i].averagePrice)
      //       this.latestPrice.push(data[i].latestPrice)
      //       this.volume.push(data[i].volume)
      //     }
      //     this.drawLine()
      //     let timer = setTimeout(()=>{
      //       this.setTimeApi()
      //     },60000)
      //     this.$once('hook:beforeDestroy',()=>{
      //       clearInterval(timer)
      //     })
      //   });
      // },

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
          // dataZoom: [
          //   {
          //     show: true,
          //     realtime: true,
          //     start: 0,
          //     end: 100,
          //     xAxisIndex: [0, 1]
          //   },
          //   {
          //     type: 'inside',
          //     realtime: true,
          //     start: 0,
          //     end: 100,
          //     xAxisIndex: [0, 1]
          //   }
          // ],
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
<style scoped>
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

  #exit {
    margin-top: 1.5%;
  }

</style>
