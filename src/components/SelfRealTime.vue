<template>

  <el-card class="list1">
    <table class="mailTabl" :style="styleObject">
      <tr>
        <td class="column"></td>
        <td class="column">价格</td>
        <td class="column">数量</td>
      </tr>

      <!--<tr>-->
      <!--<td class="column">卖五</td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[4].price>=0">{{this.realTimeData.sellOneToFive[4].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[4].quantity>=0">{{this.realTimeData.sellOneToFive[4].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td class="column">卖四</td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[3].price>=0">{{this.realTimeData.sellOneToFive[3].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[3].quantity>=0">{{this.realTimeData.sellOneToFive[3].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td class="column">卖三</td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[2].price>=0">{{this.realTimeData.sellOneToFive[2].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[2].quantity>=0">{{this.realTimeData.sellOneToFive[2].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td class="column">卖二</td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[1].price>=0">{{this.realTimeData.sellOneToFive[1].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[1].quantity>=0">{{this.realTimeData.sellOneToFive[1].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td class="column">卖一</td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[0].price>=0">{{this.realTimeData.sellOneToFive[0].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.sellOneToFive[0].quantity>=0">{{this.realTimeData.sellOneToFive[0].quantity}}</td><td v-else></td>-->
      <!--</tr>-->

      <tr>
        <td class="column">卖五</td>
        <td v-if="this.realTimeData.sellOneToFive[4].price>=0">
            <span v-if="this.realTimeData.sellOneToFive[4].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[4].price}}
            </span>
          <span v-else style="color:forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[4].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[4].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[4].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>

        <td v-else></td>

      </tr>
      <tr>
        <td class="column">卖四</td>
        <td v-if="this.realTimeData.sellOneToFive[3].price>=0">
            <span v-if="this.realTimeData.sellOneToFive[3].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[3].price}}
            </span>
          <span v-else style="color: forestgreen"></span>
        </td>

        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[3].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[3].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[3].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>


        <td v-else></td>
      </tr>
      <tr>
        <td class="column">卖三</td>
        <td v-if="this.realTimeData.sellOneToFive[2].price>=0">
            <span v-if="this.realTimeData.sellOneToFive[2].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[2].price}}
            </span>
          <span v-else style="color: forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[2].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[2].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[2].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>

        <td v-else></td>
      </tr>
      <tr>
        <td class="column">卖二</td>
        <td v-if="this.realTimeData.sellOneToFive[1].price>=0">
           <span v-if="this.realTimeData.sellOneToFive[1].price>=this.realTimeData.yesterdayOpenPrice"
                 style="color: firebrick">
              {{this.realTimeData.sellOneToFive[1].price}}
            </span>
          <span v-else style="color: forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[1].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[1].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[1].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>

        <td v-else></td>
      </tr>
      <tr>
        <td class="column">卖一</td>
        <td v-if="this.realTimeData.sellOneToFive[0].price>=0">
            <span v-if="this.realTimeData.sellOneToFive[0].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[0].price}}
            </span>
          <span v-else style="color: forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[0].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[0].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.sellOneToFive[0].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>

        <td v-else></td>
      </tr>
    </table>

    <table class="mailTabl" :style="styleObject">
      <!--卖一-->
      <tr>
        <td class="column"></td>
        <td class="column">价格</td>
        <td class="column">数量</td>
      </tr>
      <!--<tr>-->
      <!--<td class="column">买一</td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[0].price>=0">{{this.realTimeData.buyOneToFive[0].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[0].quantity>=0">{{this.realTimeData.buyOneToFive[0].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td class="column">买二</td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[1].price>=0">{{this.realTimeData.buyOneToFive[1].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[1].quantity>=0">{{this.realTimeData.buyOneToFive[1].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td class="column">买三</td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[2].price>=0">{{this.realTimeData.buyOneToFive[2].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[2].quantity>=0">{{this.realTimeData.buyOneToFive[2].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td class="column">买四</td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[3].price>=0">{{this.realTimeData.buyOneToFive[3].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[3].quantity>=0">{{this.realTimeData.buyOneToFive[3].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <!--<tr>-->
      <!--<td class="column">买五</td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[4].price>=0">{{this.realTimeData.buyOneToFive[4].price}}</td><td v-else></td>-->
      <!--<td v-if="this.realTimeData.buyOneToFive[4].quantity>=0">{{this.realTimeData.buyOneToFive[4].quantity}}</td><td v-else></td>-->
      <!--</tr>-->
      <tr>
        <td class="column">买一</td>
        <td v-if="this.realTimeData.buyOneToFive[0].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[0].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[0].price}}
            </span>
          <span v-else style="color: forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[0].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[0].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[0].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>

        <td v-else></td>
      </tr>
      <tr>
        <td class="column">买二</td>
        <td v-if="this.realTimeData.buyOneToFive[1].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[1].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[1].price}}
            </span>
          <span v-else style="color: forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[1].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[1].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[1].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>

        <td v-else></td>
      </tr>
      <tr>
        <td class="column">买三</td>
        <td v-if="this.realTimeData.buyOneToFive[2].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[2].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[2].price}}
            </span>
          <span v-else style="color: forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[2].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[2].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[2].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>

        <td v-else></td>
      </tr>
      <tr>
        <td class="column">买四</td>
        <td v-if="this.realTimeData.buyOneToFive[3].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[3].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[3].price}}
            </span>
          <span v-else style="color: forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[3].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[3].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[3].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>

        <td v-else></td>
      </tr>
      <tr>
        <td class="column">买五</td>
        <td v-if="this.realTimeData.buyOneToFive[4].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[4].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[4].price}}
            </span>
          <span v-else style="color:forestgreen"></span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[4].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[4].price>=this.realTimeData.yesterdayOpenPrice"
                  style="color: firebrick">
              {{this.realTimeData.buyOneToFive[4].quantity}}
            </span>
          <span v-else style="color:forestgreen"></span>
        <td v-else></td>
      </tr>
    </table>


    <table class="mailTabl" :style="styleObject">
      <tr>
        <td class="column">涨停</td>
        <td>{{this.realTimeData.dailyLimit }}</td>
      </tr>
      <tr>
        <td class="column">跌停</td>
        <td>{{this.realTimeData.downLimit }}</td>
      </tr>

      <tr>
        <td class="column">开盘价</td>
        <td>{{this.realTimeData.openPrice}}</td>
      </tr>

      <tr>
        <td class="column">最高价</td>
        <td v-if="this.realTimeData.highestPrice!==5e-324">{{this.realTimeData.highestPrice }}</td>
        <td v-else></td>
      </tr>

      <tr>
        <td class="column">最低价</td>
        <td v-if="this.realTimeData.lowestPrice!==1.7976931348623157e+308">{{this.realTimeData.lowestPrice }}</td>
        <td v-else></td>
      </tr>

      <tr>
        <td class="column">最新价</td>
        <td>{{this.realTimeData.lastTradePrice }}</td>
      </tr>

      <tr>
        <td class="column">涨跌</td>
        <td>{{this.realTimeData.upsAndDowns }}</td>
      </tr>

      <tr>
        <td class="column">涨幅</td>
        <td>{{this.realTimeData.increase }}</td>
      </tr>

      <!--        <tr>-->
      <!--          <td class="column">外盘</td>-->
      <!--          <td>{{this.realTimeData.outMarket	}}</td>-->
      <!--        </tr>-->

      <!--        <tr>-->
      <!--          <td class="column">内盘</td>-->
      <!--          <td>{{this.realTimeData.inMarket}}</td>-->
      <!--        </tr>-->

      <!--        <tr>-->
      <!--          <td class="column">换手</td>-->
      <!--          <td>{{this.realTimeData.conversionHand	}}</td>-->
      <!--        </tr>-->

      <tr>
        <td class="column">总市值</td>
        <td>{{this.realTimeData.totalMarketCapitalization }}</td>
      </tr>

      <tr>
        <!--//静态市盈率-->
        <td class="column">市盈率</td>
        <td>{{this.realTimeData.peRatio}}</td>
      </tr>

      <tr>
        <td class="column">市净率</td>
        <td>{{this.realTimeData.pbRatio }}</td>
      </tr>

    </table>
  </el-card>

</template>
<script>
  import Vue from 'vue'
  import Stomp from 'stompjs'

  export default {
    name: 'messageNotice',

    data() {
      return {
        client: null,
        realTimeData: {
          sellOneToFive: [
            {price: '', quantity: ''},
            {price: '', quantity: ''},
            {price: '', quantity: ''},
            {price: '', quantity: ''},
            {price: '', quantity: ''},
          ],
          buyOneToFive: [
            {price: '', quantity: ''},
            {price: '', quantity: ''},
            {price: '', quantity: ''},
            {price: '', quantity: ''},
            {price: '', quantity: ''},
          ]
        },

      }
    },
    created() {
      this.realTimeDataDisplay()
      this.styleObject = this.tableStyle;
      if (this.showByRow !== undefined) {
        this.s_showByRow = this.showByRow;
      }
      ;
      this.connect();
    },
    destroyed() {
      if (this.client != null) {
        this.client.disconnect(
          function () {
            console.log("断开连接");
          });
      }
      ;
    },

    methods: {
      realTimeDataDisplay() {
        let params = {
          stockId: this.$store.state.stockId
        }
        this.$api.http('get', '/api/realTimeInfo', params).then(res => {
          console.log(res.data)
          this.realTimeData = res.data
        })
      },

      onConnected(frame) {
        console.log("Connected: " + frame);
        var exchange1 = "/exchange/realTimeExchange/stock.SZSE." + this.$store.state.stockId;
        var exchange2 = "/exchange/timeShareExchange/stock.SZSE." + this.$store.state.stockId;

        var subscription = this.client.subscribe(exchange1, this.onmessage);
        console.log(subscription.data());
        // this.realTimeData = subscription.data();

        var subscription2 = this.client.subscribe(exchange2, this.onmessage);
        console.log(subscription2);

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
          "login": "zhang",
          "passcode": "648810",
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

  .mailTabl {
    font-size: 12px;
    color: #71787E;
  }

  .mailTabl tr td {
    width: 120px;
    height: 20px;
    line-height: 20px;
    box-sizing: border-box;
    padding: 0 10px;
    border: 0.5px solid #E6EAEE;
  }

  .mailTabl tr td.column {
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

</style>
