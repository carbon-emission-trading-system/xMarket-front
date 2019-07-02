<template>

  <el-card class="list1" shadow="hover">
    <table class="mailTabl" :style="styleObject" :header-cell-style="{background:'#c2ccd0',color:'#606266'}">
      <tr>
        <td class="column"></td>
        <td class="column">价格</td>
        <td class="column">数量</td>
        <td class="column">数量比</td>
      </tr>

      <tr>
        <td class="column">卖五</td>
        <td v-if="this.realTimeData.sellOneToFive[4].price>=0">
            <span v-if="this.realTimeData.sellOneToFive[4].price>this.realTimeData.yesterdayClosePrice"  style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[4].price}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[4].price<this.realTimeData.yesterdayClosePrice"  style="color:#02e602">
              {{this.realTimeData.sellOneToFive[4].price}}
            </span>
          <span v-else > {{this.realTimeData.sellOneToFive[4].price}} </span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[4].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[4].price>this.realTimeData.yesterdayClosePrice"
                  style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[4].quantity}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[4].price<this.realTimeData.yesterdayClosePrice"
                style="color:#02e602">
              {{this.realTimeData.sellOneToFive[4].quantity}}
            </span>
          <span v-else >   {{this.realTimeData.sellOneToFive[4].quantity}}</span>
        <td v-else></td>

        <td v-if="this.realTimeData.sellOneToFive[4].quantity>=0">
          <span v-if="this.realTimeData.sellOneToFive[4].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[4] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.sellOneToFive[4].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[4] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.sell[4]  :show-text="false"></el-progress></span></td>
        <td v-else></td>

      </tr>
      <tr>
        <td class="column">卖四</td>
        <td v-if="this.realTimeData.sellOneToFive[3].price>=0">
            <span v-if="this.realTimeData.sellOneToFive[3].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[3].price}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[3].price<this.realTimeData.yesterdayClosePrice" style="color: #02e602">
              {{this.realTimeData.sellOneToFive[3].price}}
            </span>
          <span v-else >  {{this.realTimeData.sellOneToFive[3].price}} </span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[3].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[3].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[3].quantity}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[3].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.sellOneToFive[3].quantity}}
            </span>
          <span v-else >  {{this.realTimeData.sellOneToFive[3].quantity}} </span>
        <td v-else></td>

        <td v-if="this.realTimeData.sellOneToFive[3].quantity>=0">
          <span v-if="this.realTimeData.sellOneToFive[3].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[3] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.sellOneToFive[3].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[3] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.sell[3]  :show-text="false"></el-progress></span></td>
        <td v-else></td>

      </tr>


      <tr>
        <td class="column">卖三</td>
        <td v-if="this.realTimeData.sellOneToFive[2].price>=0">
            <span v-if="this.realTimeData.sellOneToFive[2].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[2].price}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[2].price<this.realTimeData.yesterdayClosePrice" style="color: #02e602">
              {{this.realTimeData.sellOneToFive[2].price}}
            </span>
          <span v-else > {{this.realTimeData.sellOneToFive[2].price}} </span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[2].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[2].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[2].quantity}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[2].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.sellOneToFive[2].quantity}}
            </span>
          <span v-else >{{this.realTimeData.sellOneToFive[2].quantity}} </span>
        <td v-else></td>

        <td v-if="this.realTimeData.sellOneToFive[1].quantity>=0">
          <span v-if="this.realTimeData.sellOneToFive[2].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[2] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.sellOneToFive[2].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[2] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.sell[2]  :show-text="false"></el-progress></span></td>
        <td v-else></td>
      </tr>


      <tr>
        <td class="column">卖二</td>
        <td v-if="this.realTimeData.sellOneToFive[1].price>=0">
           <span v-if="this.realTimeData.sellOneToFive[1].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[1].price}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[1].price<this.realTimeData.yesterdayClosePrice" style="color: #02e602">
              {{this.realTimeData.sellOneToFive[1].price}}
            </span>
          <span v-else >{{this.realTimeData.sellOneToFive[1].price}} </span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[1].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[1].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[1].quantity}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[1].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.sellOneToFive[1].quantity}}
            </span>
          <span v-else >  {{this.realTimeData.sellOneToFive[1].quantity}}</span>
        <td v-else></td>

        <td v-if="this.realTimeData.sellOneToFive[1].quantity>=0">
          <span v-if="this.realTimeData.sellOneToFive[1].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[1] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.sellOneToFive[1].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[1] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.sell[1]  :show-text="false"></el-progress></span></td>
        <td v-else></td>
      </tr>


      <tr>
        <td class="column">卖一</td>
        <td v-if="this.realTimeData.sellOneToFive[0].price>=0">
            <span v-if="this.realTimeData.sellOneToFive[0].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[0].price}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[0].price<this.realTimeData.yesterdayClosePrice" style="color: #02e602">
              {{this.realTimeData.sellOneToFive[0].price}}
            </span>
          <span v-else >      {{this.realTimeData.sellOneToFive[0].price}} </span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.sellOneToFive[0].quantity>=0">
            <span v-if="this.realTimeData.sellOneToFive[0].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.sellOneToFive[0].quantity}}
            </span>
          <span v-else-if="this.realTimeData.sellOneToFive[0].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.sellOneToFive[0].quantity}}
            </span>
          <span v-else > {{this.realTimeData.sellOneToFive[0].quantity}} </span>
        <td v-else></td>

        <td v-if="this.realTimeData.sellOneToFive[0].quantity>=0">
          <span v-if="this.realTimeData.sellOneToFive[0].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[0] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.sellOneToFive[0].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.sell[0] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.sell[0]  :show-text="false"></el-progress></span></td>
        <td v-else></td>
      </tr>

<!--   买-->
      <tr>
        <td class="column"></td>
        <td class="column">价格</td>
        <td class="column">数量</td>
        <td class="column">数量比</td>
      </tr>

      <tr>
        <td class="column">买一</td>
        <td v-if="this.realTimeData.buyOneToFive[0].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[0].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[0].price}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[0].price<this.realTimeData.yesterdayClosePrice" style="color: #02e602">
              {{this.realTimeData.buyOneToFive[0].price}}
            </span>
          <span v-else > {{this.realTimeData.buyOneToFive[0].price}} </span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[0].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[0].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[0].quantity}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[0].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.buyOneToFive[0].quantity}}
            </span>
          <span v-else >{{this.realTimeData.buyOneToFive[0].quantity}} </span>

        <td v-else></td>

        <td v-if="this.realTimeData.buyOneToFive[0].quantity>=0">
          <span v-if="this.realTimeData.buyOneToFive[0].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[0] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.buyOneToFive[0].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[0] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.buy[0]  :show-text="false"></el-progress></span></td>
        <td v-else></td>

      </tr>


      <tr>
        <td class="column">买二</td>
        <td v-if="this.realTimeData.buyOneToFive[1].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[1].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[1].price}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[1].price<this.realTimeData.yesterdayClosePrice" style="color: #02e602">
              {{this.realTimeData.buyOneToFive[1].price}}
            </span>
          <span v-else > {{this.realTimeData.buyOneToFive[1].price}}</span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[1].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[1].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[1].quantity}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[1].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.buyOneToFive[1].quantity}}
            </span>
          <span v-else >{{this.realTimeData.buyOneToFive[1].quantity}}</span>
        <td v-else></td>

        <td v-if="this.realTimeData.buyOneToFive[1].quantity>=0">
          <span v-if="this.realTimeData.buyOneToFive[1].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[1] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.buyOneToFive[1].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[1] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.buy[1]  :show-text="false"></el-progress></span></td>
        <td v-else></td>
      </tr>


      <tr>
        <td class="column">买三</td>
        <td v-if="this.realTimeData.buyOneToFive[2].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[2].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[2].price}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[2].price<this.realTimeData.yesterdayClosePrice" style="color: #02e602">
              {{this.realTimeData.buyOneToFive[2].price}}
            </span>
          <span v-else >{{this.realTimeData.buyOneToFive[2].price}}</span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[2].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[2].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[2].quantity}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[2].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.buyOneToFive[2].quantity}}
            </span>
          <span v-else > {{this.realTimeData.buyOneToFive[2].quantity}}</span>
        <td v-else></td>

        <td v-if="this.realTimeData.buyOneToFive[2].quantity>=0">
          <span v-if="this.realTimeData.buyOneToFive[2].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[2] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.buyOneToFive[2].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[2] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.buy[2]  :show-text="false"></el-progress></span></td>
        <td v-else></td>
      </tr>

      <tr>
        <td class="column">买四</td>
        <td v-if="this.realTimeData.buyOneToFive[3].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[3].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[3].price}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[3].price<this.realTimeData.yesterdayClosePrice" style="color: #02e602">
              {{this.realTimeData.buyOneToFive[3].price}}
            </span>
          <span v-else > {{this.realTimeData.buyOneToFive[3].price}}</span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[3].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[3].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[3].quantity}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[3].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.buyOneToFive[3].quantity}}
            </span>
          <span v-else > {{this.realTimeData.buyOneToFive[3].quantity}} </span>
        <td v-else></td>

        <td v-if="this.realTimeData.buyOneToFive[3].quantity>=0">
          <span v-if="this.realTimeData.buyOneToFive[3].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[3] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.buyOneToFive[3].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[3] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.buy[3]  :show-text="false"></el-progress></span></td>
        <td v-else></td>
      </tr>


      <tr>
        <td class="column">买五</td>
        <td v-if="this.realTimeData.buyOneToFive[4].price>=0">
            <span v-if="this.realTimeData.buyOneToFive[4].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[4].price}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[4].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.buyOneToFive[4].price}}
            </span>
          <span v-else >{{this.realTimeData.buyOneToFive[4].price}}</span>
        </td>
        <td v-else></td>
        <td v-if="this.realTimeData.buyOneToFive[4].quantity>=0">
            <span v-if="this.realTimeData.buyOneToFive[4].price>this.realTimeData.yesterdayClosePrice" style="color: #ff3434">
              {{this.realTimeData.buyOneToFive[4].quantity}}
            </span>
          <span v-else-if="this.realTimeData.buyOneToFive[4].price<this.realTimeData.yesterdayClosePrice" style="color:#02e602">
              {{this.realTimeData.buyOneToFive[4].quantity}}
            </span>
          <span v-else > {{this.realTimeData.buyOneToFive[4].quantity}}</span>
        <td v-else></td>

        <td v-if="this.realTimeData.buyOneToFive[4].quantity>=0">
          <span v-if="this.realTimeData.buyOneToFive[4].price>this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[4] status="exception" :show-text="false"></el-progress></span>
          <span v-else-if="this.realTimeData.buyOneToFive[4].price<this.realTimeData.yesterdayClosePrice"><el-progress :percentage=this.percentage.buy[4] status="success" :show-text="false"></el-progress></span>
          <span v-else><el-progress :percentage=this.percentage.buy[4]  :show-text="false"></el-progress></span></td>
        <td v-else></td>
      </tr>

      <tr>
        <td class="column"></td>
        <td class="column"></td>
        <td class="column"></td>
        <td class="column"></td>
      </tr>
      <tr>
        <td class="column">最新价</td>
        <td
          v-if="this.realTimeData.lastTradePrice>this.realTimeData.yesterdayClosePrice"
          class="colorRed">{{this.realTimeData.lastTradePrice }}
        </td>
        <td
          v-else-if="this.realTimeData.lastTradePrice<this.realTimeData.yesterdayClosePrice"
          class="colorGreen">
          {{this.realTimeData.lastTradePrice }}
        </td>
        <td v-else>
          {{this.realTimeData.lastTradePrice }}
        </td>
        <td class="column">成交额</td>
        <td>{{this.realTimeData.tradeAmount}}</td>
      </tr>
      <tr>
        <td class="column">涨停</td>
        <td class="colorRed">{{this.realTimeData.dailyLimit }}</td>
        <td class="column">跌停</td>
        <td class="colorGreen">{{this.realTimeData.downLimit }}</td>
      </tr>

      <tr>
        <td class="column ">今开盘</td>
        <td
          v-if="this.realTimeData.openPrice>this.realTimeData.yesterdayClosePrice"
          class="colorRed">{{this.realTimeData.openPrice }}
        </td>
        <td
          v-else-if="this.realTimeData.openPrice<this.realTimeData.yesterdayClosePrice"
          class="colorGreen">
          {{this.realTimeData.openPrice }}
        </td>
        <td v-else>
          {{this.realTimeData.openPrice }}
        </td>

        <td class="column">昨收盘</td>
        <td>{{this.realTimeData.yesterdayClosePrice}}</td>
      </tr>


      <tr>
        <td class="column">最高价</td>

        <td
          v-if="this.realTimeData.highestPrice!==5e-324 && this.realTimeData.highestPrice>this.realTimeData.yesterdayClosePrice"
          class="colorRed">{{this.realTimeData.highestPrice }}
        </td>
        <td
          v-else-if="this.realTimeData.highestPrice!==5e-324 && this.realTimeData.highestPrice<this.realTimeData.yesterdayClosePrice"
          class="colorGreen">
          {{this.realTimeData.highestPrice }}
        </td>

        <td
          v-else-if="this.realTimeData.highestPrice!==5e-324 && this.realTimeData.highestPrice === this.realTimeData.yesterdayClosePrice">
          {{this.realTimeData.highestPrice }}
        </td>
        <td v-else></td>

        <td class="column">最低价</td>
        <td
          v-if="this.realTimeData.lowestPrice!==1.7976931348623157e+308 && this.realTimeData.lowestPrice>this.realTimeData.yesterdayClosePrice"
          class="colorRed">{{this.realTimeData.lowestPrice }}
        </td>
        <td
          v-else-if="this.realTimeData.lowestPrice!==1.7976931348623157e+308 && this.realTimeData.lowestPrice<this.realTimeData.yesterdayClosePrice"
          class="colorGreen">
          {{this.realTimeData.lowestPrice }}
        </td>

        <td
          v-else-if="this.realTimeData.lowestPrice!==1.7976931348623157e+308 && this.realTimeData.lowestPrice === this.realTimeData.yesterdayClosePrice">
          {{this.realTimeData.lowestPrice }}
        </td>
        <td v-else></td>
      </tr>


      <tr>
        <td class="column">涨跌</td>
        <td
          v-if="this.realTimeData.upsAndDowns>0."
          class="colorRed">{{this.realTimeData.upsAndDowns }}
        </td>
        <td
          v-else-if="this.realTimeData.upsAndDowns<0"
          class="colorGreen">
          {{this.realTimeData.upsAndDowns }}
        </td>
        <td v-else>
          {{this.realTimeData.upsAndDowns }}
        </td>


        <td class="column">涨幅(%)</td>
        <td
          v-if="this.realTimeData.increase>0"
          class="colorRed">{{this.realTimeData.increase }}
        </td>
        <td
          v-else-if="this.realTimeData.increase<0"
          class="colorGreen">
          {{this.realTimeData.increase }}
        </td>
        <td v-else>
          {{this.realTimeData.increase }}
        </td>
      </tr>


      <tr>
        <td class="column">外盘</td>
        <td class="colorRed">{{this.realTimeData.outMarket }}</td>
        <td class="column">内盘</td>
        <td class="colorGreen">{{this.realTimeData.inMarket}}</td>
      </tr>


      <tr>
        <td class="column">换手</td>
        <td>{{this.realTimeData.conversionHand }}</td>
        <td class="column">总市值(亿)</td>
        <td>{{this.realTimeData.totalMarketCapitalization }}</td>
      </tr>


      <tr>
        <!--//静态市盈率-->
        <td class="column">市盈率</td>
        <td>{{this.realTimeData.peRatio}}</td>
        <td class="column">市净率</td>
        <td>{{this.realTimeData.pbRatio }}</td>
      </tr>


    </table>


  </el-card>

</template>
<script>
  import Stomp from 'stompjs'

  export default {
    name: 'messageNotice',

    data() {
      return {
        client: null,
        percentage:{
          sell:[0,0,0,0,0],
          buy:[0,0,0,0,0],
        },
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

          if(this.realTimeData.lowestPrice!==1.7976931348623157e+308){
            this.realTimeData.lowestPrice  = this.realTimeData.lowestPrice.toFixed(2)
          }
          if(this.realTimeData.highestPrice!==5e-324){
            this.realTimeData.highestPrice = this.realTimeData.highestPrice.toFixed(2)
          }

          //设置保留小数点后两位

          for (let key in this.realTimeData) {
            if (key === 'dailyLimit' ||key ==='yesterdayClosePrice'||key ==='tradeAmount'|| key === 'downLimit'||key==='increase'||key==='lastTradePrice'||key==='openPrice'||key==='pbRatio'||key==='peRatio') {
              this.realTimeData[key] = this.realTimeData[key].toFixed(2)
            }
          }
          for(let i  = 0 ;i<this.realTimeData.buyOneToFive.length;i++){
            this.realTimeData.buyOneToFive[i].price = this.realTimeData.buyOneToFive[i].price.toFixed(2)
          }
          for(let i  = 0;i<this.realTimeData.sellOneToFive.length;i++){
            this.realTimeData.sellOneToFive[i].price = this.realTimeData.sellOneToFive[i].price.toFixed(2)
          }


          if(this.realTimeData.conversionHand>0 &&this.realTimeData.conversionHand<0.01){
            this.realTimeData.conversionHand = '<0.01'
          }

          //计算条
          // let sum = 0
          // for(let i = 0;i<5;i++){
          //   if(this.realTimeData.sellOneToFive[i].quantity>0){
          //     sum += this.realTimeData.sellOneToFive[i].quantity
          //   }
          //   if(this.realTimeData.buyOneToFive[i].quantity>0){
          //     sum += this.realTimeData.buyOneToFive[i].quantity
          //   }
          // }
          // for(let i = 0;i<5;i++){
          //   if(this.realTimeData.sellOneToFive[i].quantity>0){
          //     this.percentage.sell[i] = this.realTimeData.sellOneToFive[i].quantity*100/sum
          //   }
          //   if(this.realTimeData.buyOneToFive[i].quantity>0){
          //     this.percentage.buy[i] = this.realTimeData.buyOneToFive[i].quantity*100/sum
          //   }
          // }


          //计算条条
          let sum = 0
          let x=0;
          let y=0;
          for(let i = 0;i<5;i++){
            if(this.realTimeData.sellOneToFive[i].quantity>x){
              x= this.realTimeData.sellOneToFive[i].quantity
            }
            if(this.realTimeData.buyOneToFive[i].quantity>y){
              y= this.realTimeData.buyOneToFive[i].quantity
            }
          }
          if(x<y){
            x = y;
          }
          for(let i = 0;i<5;i++){
            if(this.realTimeData.sellOneToFive[i].quantity>0){
              this.percentage.sell[i] = this.realTimeData.sellOneToFive[i].quantity*100/x
            }
            if(this.realTimeData.buyOneToFive[i].quantity>0){
              this.percentage.buy[i] = this.realTimeData.buyOneToFive[i].quantity*100/x
            }
          }



        })
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
      onConnected(frame) {
        console.log("Connected: " + frame);
        var exchange1 = "/exchange/realTimeExchange/stock.SZSE." + this.$store.state.stockId;
        // var exchange2 = "/exchange/timeShareExchange/stock.SZSE." + this.$store.state.stockId;

        var subscription = this.client.subscribe(exchange1, this.onmessage);
        console.log(subscription);

      },
      onFailed(frame) {
        console.log("Failed: " + frame.body);
        //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");

      },
      onmessage(message) {
        console.log("得到消息");
        this.realTimeData = JSON.parse(message.body);
        //设置保留小数点后两位
        if(this.realTimeData.lowestPrice!==1.7976931348623157e+308){
          this.realTimeData.lowestPrice  = this.realTimeData.lowestPrice.toFixed(2)
        }
        if(this.realTimeData.highestPrice!==5e-324){
          this.realTimeData.highestPrice = this.realTimeData.highestPrice.toFixed(2)
        }

        for (let key in this.realTimeData) {
          if (key === 'dailyLimit' ||key ==='yesterdayClosePrice'||key==='tradeAmount'|| key === 'downLimit'||key==='increase'||key==='lastTradePrice'||key==='openPrice'||key==='pbRatio'||key==='peRatio') {
            this.realTimeData[key] = this.realTimeData[key].toFixed(2)
          }
        }
        for(let i  = 0 ;i<this.realTimeData.buyOneToFive.length;i++){
          this.realTimeData.buyOneToFive[i].price = this.realTimeData.buyOneToFive[i].price.toFixed(2)
        }
        for(let i  = 0;i<this.realTimeData.sellOneToFive.length;i++){
          this.realTimeData.sellOneToFive[i].price = this.realTimeData.sellOneToFive[i].price.toFixed(2)
        }
        //换手
        if(this.realTimeData.conversionHand>0 &&this.realTimeData.conversionHand<0.01){
          this.realTimeData.conversionHand = '<0.01'
        }

        // let sum = 0
        // for(let i = 0;i<5;i++){
        //   if(this.realTimeData.sellOneToFive[i].quantity>0){
        //     sum += this.realTimeData.sellOneToFive[i].quantity
        //   }
        //   if(this.realTimeData.buyOneToFive[i].quantity>0){
        //     sum += this.realTimeData.buyOneToFive[i].quantity
        //   }
        // }
        // for(let i = 0;i<5;i++){
        //   if(this.realTimeData.sellOneToFive[i].quantity>0){
        //     this.percentage.sell[i] = this.realTimeData.sellOneToFive[i].quantity*100/sum
        //   }
        //   if(this.realTimeData.buyOneToFive[i].quantity>0){
        //     this.percentage.buy[i] = this.realTimeData.buyOneToFive[i].quantity*100/sum
        //   }
        // }


        let sum = 0
        let x=0;
        let y=0;
        for(let i = 0;i<5;i++){
          if(this.realTimeData.sellOneToFive[i].quantity>x){
            x= this.realTimeData.sellOneToFive[i].quantity
          }
          if(this.realTimeData.buyOneToFive[i].quantity>y){
            y= this.realTimeData.buyOneToFive[i].quantity
          }
        }
        if(x<y){
          x = y;
        }
        for(let i = 0;i<5;i++){
          if(this.realTimeData.sellOneToFive[i].quantity>0){
            this.percentage.sell[i] = this.realTimeData.sellOneToFive[i].quantity*100/x
          }
          if(this.realTimeData.buyOneToFive[i].quantity>0){
            this.percentage.buy[i] = this.realTimeData.buyOneToFive[i].quantity*100/x
          }
        }




      },
      responseCallback(frame) {
        console.log("得到的消息 msg=>" + frame.body);
        //接收到服务器推送消息，向服务器发送确认消息
        // this.client.send("/exchange/exchange_pushmsg/rk_recivemsg", {"content-type":"text/plain"}, frame.body);
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
    height: 23px;
    line-height: 23px;
    box-sizing: border-box;
    padding: 0 10px;
    border: 0.5px solid #E6EAEE;
  }

  .mailTabl tr td.column {
    background-color: #EFF3F6;
    height: 23px;
    color: #393C3E;
  }

  .list1 {
    width: 90%;
    height: 95%;
    text-align: center;
  }

  .column {
    width: 5%;
  }
  .colorRed {
    color: #ff3434;
  }

  .colorGreen {
    color: #02e602;
  }
</style>

