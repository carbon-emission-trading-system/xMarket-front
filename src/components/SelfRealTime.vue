
<template>

    <el-card class="list1" >
      <table class="mailTable" :style="styleObject" >
        <tr>
          <td class="column"></td>
          <td class="column" >价格</td>
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



      <table class="mailTable" :style="styleObject" >
        <tr>
          <td class="column" >涨停</td>
          <td >{{this.realTimeData.dailyLimit	}}</td>
        </tr>
        <tr>
          <td class="column">跌停</td>
          <td >{{this.realTimeData.downLimitBoard	}}</td>
        </tr>

        <tr>
          <td class="column">开盘价</td>
          <td >{{this.realTimeData.openPrice}}</td>
        </tr>

        <tr>
          <td class="column">最高价</td>
          <td>{{this.realTimeData.highestPrice	}}</td>
        </tr>

        <tr>
          <td class="column">最低价</td>
          <td>{{this.realTimeData.lowestPrice	}}</td>
        </tr>

        <tr>
          <td class="column">最新价</td>
          <td>{{this.realTimeData.latestPrice	}}</td>
        </tr>

        <tr>
          <td class="column">涨跌</td>
          <td>{{this.realTimeData.upsAndDowns	}}</td>
        </tr>

        <tr>
          <td class="column">涨幅</td>
          <td>{{this.realTimeData.increase	}}</td>
        </tr>

        <tr>
          <td class="column">外盘</td>
          <td>{{this.realTimeData.outMarket	}}</td>
        </tr>

        <tr>
          <td class="column">内盘</td>
          <td>{{this.realTimeData.inMarket}}</td>
        </tr>

        <tr>
          <td class="column">换手</td>
          <td>{{this.realTimeData.conversionHand	}}</td>
        </tr>

        <tr>
          <td class="column">总市值</td>
          <td>{{this.realTimeData.totalMarketCapitalization	}}</td>
        </tr>

        <tr>
          <!--//静态市盈率-->
          <td class="column">市盈率</td>
          <td>{{this.realTimeData.staticPERatio}}</td>
        </tr>

        <tr>
          <td class="column">市净值</td>
          <td>{{this.realTimeData.cityNet	}}</td>
        </tr>

      </table>
    </el-card>

</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'messageNotice',

    data() {
      return {
        client: null,
        realTimeData: {
          /**
           * 买卖十个价格
           */
          buyonePrice:121,
          buyoneCount:121,
          buyTwoPrice:51,
          buyTwoCount:54,
          buyThreePrice:54,
          buyThreeCount:56,
          buyFourPrice:95,
          buyFourCount:45,
          buyFivePrice:5,
          buyFiveCount:5,
          sellonePrice:121,
          selloneCount:121,
          sellTwoPrice:51,
          sellTwoCount:54,
          sellThreePrice:54,
          sellThreeCount:56,
          sellFourPrice:95,
          sellFourCount:45,
          sellFivePrice:5,
          sellFiveCount:5,

          openPrice:2.3,//开盘价
          highestPrice:2.3,//最高价
          lowestPrice:2.3,//最低价
          latestPrice:2.3,//最新价
          upsAndDowns:2.3,//涨跌
          increase:2.3,//涨幅
          outMarket:2.3,//外盘
          inMarket:2.3,//内盘
          conversionHand:2.3,//换手
          totalMarketCapitalization:2.3,//总市值
          staticPERatio:2.3,//静态市盈率
          dailyLimit:2.3,//涨停价
          downLimitBoard:2.3,//跌停价
          cityNet:2.3,//市净值

        }
      }
    },
    created() {

      this.styleObject = this.tableStyle;
      if (this.showByRow !== undefined) {
        this.s_showByRow = this.showByRow;
      };
    },

    methods: {
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

      onmessage(message) {
        console.log("得到消息");
        message={
          buyonePrice:121,
          buyoneCount:121,
          buyTwoPrice:51,
          buyTwoPrice:54,
          buyThreePrice:54,
          buyThreeCount:56,
          buyFourPrice:95,
          buyFourCount:45,
          buyFivePrice:5,
          buyFiveCount:5,
        };

        this.realTimeData = message;
      },

    }
  }

</script>
<style lang="scss">

  .mailTable{ font-size: 12px; color: #71787E; }
  .mailTable tr td{ width: 120px; height: 20px; line-height: 20px; box-sizing: border-box; padding: 0 10px; }
  .mailTable tr td.column { background-color: #EFF3F6; color: #393C3E; }
  .list1{
    width: 90%;
    float: left;
    height: 95%;
    text-align: center;
  }
  .column{
    width: 5%;
  }

</style>
