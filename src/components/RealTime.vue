<template>
  <div class="allRealTime">

    <el-card class="list1RealTime">
      <table class="mailTable" :style="styleObject">
        <tr>
          <td class="column"></td>
          <td class="column">价格</td>
          <td class="column">数量</td>
        </tr>
        <tr>
          <td class="column">买一</td>
          <td>{{this.realTimeData.buyonePrice}}</td>
          <td>{{this.realTimeData.buyoneCount}}</td>
        </tr>
        <tr>
          <td class="column">买二</td>
          <td>{{this.realTimeData.buyTwoPrice}}</td>
          <td>{{this.realTimeData.buyTwoCount}}</td>
        </tr>
        <tr>
          <td class="column">买三</td>
          <td>{{this.realTimeData.buyThreePrice}}</td>
          <td>{{this.realTimeData.buyThreeCount}}</td>
        </tr>
        <tr>
          <td class="column">买四</td>
          <td>{{this.realTimeData.buyFourPrice}}</td>
          <td>{{this.realTimeData.buyFourCount}}</td>
        </tr>
        <tr>
          <td class="column">买五</td>
          <td>{{this.realTimeData.buyFivePrice}}</td>
          <td>{{this.realTimeData.buyFiveCount}}</td>
        </tr>
      </table>
      <table class="mailTable" :style="styleObject">
        <tr>
          <td class="column">涨停</td>
          <td class="column">{{this.realTimeData.dailyLimit }}</td>
          <td class="column">跌停</td>
          <td class="column">{{this.realTimeData.downLimitBoard }}</td>
        </tr>
      </table>
      <table class="mailTable" :style="styleObject">
        <!--卖一-->
        <tr>
          <td class="column">卖一</td>
          <td>{{this.realTimeData.sellonePrice}}</td>
          <td>{{this.realTimeData.selloneCount}}</td>
        </tr>
        <tr>
          <td class="column">卖二</td>
          <td>{{this.realTimeData.sellTwoPrice}}</td>
          <td>{{this.realTimeData.sellTwoCount}}</td>
        </tr>
        <tr>
          <td class="column">卖三</td>
          <td>{{this.realTimeData.sellThreePrice}}</td>
          <td>{{this.realTimeData.sellThreeCount}}</td>
        </tr>
        <tr>
          <td class="column">卖四</td>
          <td>{{this.realTimeData.sellFourPrice}}</td>
          <td>{{this.realTimeData.sellFourCount}}</td>
        </tr>
        <tr>
          <td class="column">卖五</td>
          <td>{{this.realTimeData.sellFivePrice}}</td>
          <td>{{this.realTimeData.sellFiveCount}}</td>
        </tr>
      </table>
      <table class="mailTable" :style="styleObject">
        <tr>
          <td class="column">开盘价</td>
          <td class="column">{{this.realTimeData.openPrice}}</td>
        </tr>
        <!--&lt;!&ndash;<td>{{realTimeData.buyone.value}}</td>&ndash;&gt;-->
      </table>
      <p style="display:none">
        {{ this.$store.state.buyOrSellStock}}

      </p>


    </el-card>
    <el-card class="list2RealTime">
      <table class="mailTable" :style="styleObject">
        <tr>
          <td class="column"></td>
          <td class="column">价格</td>
        </tr>

        <tr>
          <td class="column">最高价</td>
          <td>{{this.realTimeData.highestPrice }}</td>
        </tr>

        <tr>
          <td class="column">最低价</td>
          <td>{{this.realTimeData.lowestPrice }}</td>
        </tr>

        <tr>
          <td class="column">最新价</td>
          <td>{{this.realTimeData.latestPrice }}</td>
        </tr>

        <tr>
          <td class="column">涨跌</td>
          <td>{{this.realTimeData.upsAndDowns }}</td>
        </tr>

        <tr>
          <td class="column">涨幅</td>
          <td>{{this.realTimeData.increase }}</td>
        </tr>

        <tr>
          <td class="column">外盘</td>
          <td>{{this.realTimeData.outMarket }}</td>
        </tr>

        <tr>
          <td class="column">内盘</td>
          <td>{{this.realTimeData.inMarket}}</td>
        </tr>

        <tr>
          <td class="column">换手</td>
          <td>{{this.realTimeData.conversionHand }}</td>
        </tr>

        <tr>
          <td class="column">总市值</td>
          <td>{{this.realTimeData.totalMarketCapitalization }}</td>
        </tr>

        <tr>
          <!--//静态市盈率-->
          <td class="column">市盈率</td>
          <td>{{this.realTimeData.staticPERatio}}</td>
        </tr>


        <tr>
          <td class="column">市净值</td>
          <td>{{this.realTimeData.cityNet }}</td>
        </tr>
        <!--&lt;!&ndash;<td>{{realTimeData.buyone.value}}</td>&ndash;&gt;-->
      </table>

    </el-card>

  </div>
</template>
<script>
  import Vue from 'vue'
  import Stomp from 'stompjs'

  export default {
    name: 'messageNotice',

    data() {
      demo:this.$store.state.buyOrSellStock;
      return {
        client: null,
        realTimeData: {},
        buyOrSellStock: '',
        x: '',
      }
    },

    created() {
      this.styleObject = this.tableStyle;
      if (this.showByRow !== undefined) {
        this.s_showByRow = this.showByRow;
      }
      ;
      // this.connect();
    },
    updated() {
      console.log('update')
      this.buyOrSellStock = this.$store.state.buyOrSellStock;
      this.x = '';
      if (this.buyOrSellStock === this.x) {

      } else {
        this.x = this.buyOrSellStock;
        console.log(this.buyOrSellStock + 2);
        this.realTimeDataDisplay();
        this.connect();
      }
    },
    methods: {
      /**
       * @Description: 初次请求实时信息
       * @Param:
       * @return:
       * @Author: zky
       * @Date:
       */
      realTimeDataDisplay() {
        let params = {
          stockId: this.buyOrSellStock,
        }
        this.$api.http('get', '/api/realTimeInfo', params).then(res => {
          this.realTimeData = res.data
        }).catch((res) => {
          this.$message.error(res.message)
        })
      },
      onConnected(frame) {
        console.log("Connected: " + frame);
        var exchange3 = "/exchange/timeShareExchange/stock.SZSE.600000";

        let exchange = "/exchange/realTimeExchange/stock.SZSE." + buyOrSellStock


        var subscription = this.client.subscribe(exchange, this.onmessage);
        console.log(subscription);
        this.realTimeData = subscription;

        var subscription3 = this.client.subscribe(exchange3, this.onmessage);
        console.log(subscription3);
      },
      onFailed(frame) {
        console.log("Failed: " + frame.body);
        //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");

      },
      onmessage(message) {
        console.log("得到消息");
        this.realTimeData = message;
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
          "login": "guest",
          "passcode": "guest",
          //虚拟主机，默认“/”
          "heart-beat": "0,0"
        };
        this.client.connect(headers, this.onConnected, this.onFailed);
        console.log("连接结束");
      },
    }
  }

</script>
<style lang="scss">
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

  .allRealTime {
    height: 100%;
  }

  .list1RealTime {
    width: 50%;
    float: left;
    height: 95%;
    text-align: center;
  }

  .list2RealTime {
    width: 40%;
    float: left;
    height: 95%;
    text-align: center;
  }

  .column {
    width: 5%;
  }
</style>
