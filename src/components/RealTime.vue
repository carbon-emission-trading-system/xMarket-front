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
          <td class="column">卖五</td>
          <td v-if="this.realTimeData.sellOneToFive[4].price>=0">{{this.realTimeData.sellOneToFive[4].price}}</td>
          <td v-if="this.realTimeData.sellOneToFive[4].quantity>=0">{{this.realTimeData.sellOneToFive[4].quantity}}</td>
        </tr>
        <tr>
          <td class="column">卖四</td>
          <td v-if="this.realTimeData.sellOneToFive[3].price>=0">{{this.realTimeData.sellOneToFive[3].price}}</td>
          <td v-if="this.realTimeData.sellOneToFive[3].quantity>=0">{{this.realTimeData.sellOneToFive[3].quantity}}</td>
        </tr>
        <tr>
          <td class="column">卖三</td>
          <td v-if="this.realTimeData.sellOneToFive[2].price>=0">{{this.realTimeData.sellOneToFive[2].price}}</td>
          <td v-if="this.realTimeData.sellOneToFive[2].quantity>=0">{{this.realTimeData.sellOneToFive[2].quantity}}</td>
        </tr>
        <tr>
          <td class="column">卖二</td>
          <td v-if="this.realTimeData.sellOneToFive[1].price>=0">{{this.realTimeData.sellOneToFive[1].price}}</td>
          <td v-if="this.realTimeData.sellOneToFive[1].quantity>=0">{{this.realTimeData.sellOneToFive[1].quantity}}</td>
        </tr>
        <tr>
          <td class="column">卖一</td>
          <td v-if="this.realTimeData.sellOneToFive[0].price>=0">{{this.realTimeData.sellOneToFive[0].price}}</td>
          <td v-if="this.realTimeData.sellOneToFive[0].quantity>=0">{{this.realTimeData.sellOneToFive[0].quantity}}</td>
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
          <td class="column">买一</td>
          <td v-if="this.realTimeData.buyOneToFive[0].price>=0">{{this.realTimeData.buyOneToFive[0].price}}</td>
          <td v-if="this.realTimeData.buyOneToFive[0].quantity>=0">{{this.realTimeData.buyOneToFive[0].quantity}}</td>
        </tr>
        <tr>
          <td class="column">买二</td>
          <td v-if="this.realTimeData.buyOneToFive[1].price>=0">{{this.realTimeData.buyOneToFive[1].price}}</td>
          <td v-if="this.realTimeData.buyOneToFive[1].quantity>=0">{{this.realTimeData.buyOneToFive[1].quantity}}</td>
        </tr>
        <tr>
          <td class="column">买三</td>
          <td v-if="this.realTimeData.buyOneToFive[2].price>=0">{{this.realTimeData.buyOneToFive[2].price}}</td>
          <td v-if="this.realTimeData.buyOneToFive[2].quantity>=0">{{this.realTimeData.buyOneToFive[2].quantity}}</td>
        </tr>
        <tr>
          <td class="column">买四</td>
          <td v-if="this.realTimeData.buyOneToFive[3].price>=0">{{this.realTimeData.buyOneToFive[3].price}}</td>
          <td v-if="this.realTimeData.buyOneToFive[3].quantity>=0">{{this.realTimeData.buyOneToFive[3].quantity}}</td>
        </tr>
        <tr>
          <td class="column">买五</td>
          <td v-if="this.realTimeData.buyOneToFive[4].price>=0">{{this.realTimeData.buyOneToFive[4].price}}</td>
          <td v-if="this.realTimeData.buyOneToFive[4].quantity>=0">{{this.realTimeData.buyOneToFive[4].quantity}}</td>
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
        realTimeData: {
          sellOneToFive: [
            {price: '', quantity: ''},
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
            {price: '', quantity: ''}, 1
          ]
        },
      }
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

    created() {
      this.styleObject = this.tableStyle;
      if (this.showByRow !== undefined) {
        this.s_showByRow = this.showByRow;
      }
      ;
    },
    /**
     * @Description: 监听store中的state buyOrSellStock看其改变则运行方法
     * @Param:
     * @return:
     * @Author: zky
     * @Date:
     */
    updated() {
      console.log('update');
      console.log(this.$store.state.buyOrSellStock);
      this.buyOrSellStock = this.$store.state.buyOrSellStock;
      if (this.buyOrSellStock === this.x) {
      } else {
        this.x = this.buyOrSellStock;
        console.log('----------')
        console.log(this.x)
        console.log(this.buyOrSellStock)
        console.log('updated   else')
        this.realTimeDataDisplay();
        this.connect();
      }
    }
    ,
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
      }
      ,
      onConnected(frame) {
        console.log("Connected: " + frame);

        let exchange = "/exchange/realTimeExchange/stock.SZSE." + this.buyOrSellStock;

        this.client.subscribe(exchange, this.onmessage);

      }
      ,
      onFailed(frame) {
        console.log("Failed: " + frame.body);
        //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");

      }
      ,
      onmessage(message) {
        console.log("得到消息msg=>" + message.body);
        // alert("haha"+message.body);
        //alert("wowo"+this.realTimeData);
        this.realTimeData = JSON.parse(message.body);
      }
      ,
      responseCallback(frame) {
        console.log("得到的消息 msg=>" + frame.body);
        //接收到服务器推送消息，向服务器发送确认消息
        // this.client.send("/exchange/exchange_pushmsg/rk_recivemsg", {"content-type":"text/plain"}, frame.body);
      }
      ,
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
        //连接结束后需要回复x的值为‘’！！！！
      }
      ,
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
    line-height: 35px;
    box-sizing: border-box;
    padding: 0 10px;
    width: 120px;
    height: 20px;
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
