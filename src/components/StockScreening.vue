<!----股票筛选------->
<template>
  <div style="width: 100%;height: 100%">
    <div style="width: 100%;height:10%" id="navigator">
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
          <el-menu-item index="StockScreening">股票筛选</el-menu-item>
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
    <div style="z-index: 1;position:relative;" >
    <div style="width: 100%;height: 80%">


      <div id="in" style="width: 100%;float: left;margin-left: 2%;margin-right: 3%">

        <el-collapse v-model="activeNames" @change="handleChange"
                     style="float: left;display: inline;width: 60%;  margin-top: 6%;margin-left: 5%">
          <el-collapse-item title="筛选 " name="1">
            <el-card style="height: 100%;width: 100%;float: left">
              <div style="width: 100%;">

                <!--总市值--->
                <div style="width: 50%;height: 80%;float: left">
                  <p style="float: left">总市值</p>
                  <div style="float: left;width: 10%;align-content: center;margin-right: 5%;margin-top: 3%">
                    {{this.maxMinData.maxTotalMarketCapitalization }}
                    <!--<el-input v-model="this.maxMinData.maxTotalMarketCapitalization"-->
                    <!--style="width: 55%;float: left"></el-input>-->
                  </div>

                  <div style="float: left;width: 50%;align-content: center">
                    <el-slider
                      v-model="TotalMarketCapitalizationValue"
                      range
                      step="0.01"
                      :min=this.maxMinData.minTotalMarketCapitalization
                      :max=this.maxMinData.maxTotalMarketCapitalization
                      style="margin-top: 2%">
                    </el-slider>
                  </div>
                  <div style="float: left;width: 10%;align-content: center;margin-left: 5%;margin-top: 3%">
                    {{ this.maxMinData.minTotalMarketCapitalization }}
                    <!--<el-input v-model="this.maxMinData.minTotalMarketCapitalization"-->
                    <!--style="width: 55%;float: left"></el-input>-->
                  </div>
                </div>

                <!---成交额--->
                <div style="width: 50%;height: 80%;float: left">
                  <p style="float: left">成交额</p>
                  <div style="float: left;width: 10%;align-content: center;margin-right: 5%;margin-top: 3%">
                    <!--<el-input v-model="this.maxMinData.maxTradeAmount" style="width: 55%;float: left"></el-input>-->
                    {{this.maxMinData.maxTradeAmount}}
                  </div>

                  <div style="float: left;width: 50%;align-content: center">
                    <el-slider
                      v-model="TradeAmountValue"
                      range
                      step="0.01"
                      :min=this.maxMinData.minTradeAmount
                      :max=this.maxMinData.maxTradeAmount
                      style="margin-top: 2%">
                    </el-slider>
                  </div>
                  <div style="float: left;width: 10%;align-content: center;margin-left: 5%;margin-top: 3%">
                    <!--<el-input v-model="this.maxMinData.minTradeAmount" style="width: 55%;float: left"></el-input>-->
                    {{ this.maxMinData.minTradeAmount}}
                  </div>
                </div>

                <!---市盈率--->
                <div style="width: 50%;height: 80%;float: left">
                  <p style="float: left">市盈率</p>
                  <div style="float: left;width: 10%;align-content: center;margin-right: 5%;margin-top: 3%">
                    <!--<el-input v-model="this.maxMinData.maxPeRatio" style="width: 55%;float: left"></el-input>-->
                    {{this.maxMinData.maxPeRatio }}
                  </div>

                  <div style="float: left;width: 50%;align-content: center">
                    <el-slider
                      v-model="PeRatioValue"
                      range
                      step="0.01"
                      :min=this.maxMinData.minPeRatio
                      :max=this.maxMinData.maxPeRatio
                      style="margin-top: 2%">
                    </el-slider>
                  </div>
                  <div style="float: left;width: 10%;align-content: center;margin-left: 5%;margin-top: 3%">
                    <!--<el-input v-model="this.maxMinData.minPeRatio" style="width: 55%;float: left"></el-input>-->
                    {{this.maxMinData.minPeRatio}}
                  </div>

                </div>

                <!---涨跌幅  --->
                <div style="width: 50%;height: 80%;float: left">
                  <p style="float: left">涨跌幅</p>
                  <div style="float: left;width: 10%;align-content: center;margin-right: 5%;margin-top: 3%">
                    <!--<el-input v-model="this.maxMinData.maxIncrease" style="width: 55%;float: left"></el-input>-->
                    {{this.maxMinData.maxIncrease}}
                  </div>

                  <div style="float: left;width: 50%;align-content: center">
                    <el-slider
                      v-model="IncreaseValue"
                      range
                      step="0.01"
                      :min=this.maxMinData.minIncrease
                      :max=this.maxMinData.maxIncrease
                      style="margin-top: 2%">
                    </el-slider>
                  </div>
                  <div style="float: left;width: 10%;align-content: center;margin-left: 5%;margin-top: 3%">
                    <!--<el-input v-model="this.maxMinData.minIncrease" style="width: 55%;float: left"></el-input>-->
                    {{ this.maxMinData.minIncrease }}
                  </div>

                </div>

              </div>
              <el-button type="primary" @click="submit">筛选</el-button>
            </el-card>
          </el-collapse-item>
        </el-collapse>

        <div id="select" style="display: inline">
          <el-button-group v-model="stockType">
            <el-button v-bind:class="{selectOn:this.index===2}" @click="typeList(2)">全部股票</el-button>
            <el-button v-bind:class="{selectOn:this.index===0}" @click="typeList(0)">深A</el-button>
            <el-button v-bind:class="{selectOn:this.index===1}" @click="typeList(1)">沪A</el-button>
          </el-button-group>
        </div>

        <!--background-color: gainsboro-->
        <div id="stock">
          <el-table
            :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            @row-dblclick="handle"
            style="width: 100%;font-size: 6px; cursor: pointer ;"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column
              prop="stockId"
              label="股票代码"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockName"
              label="股票简称"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="lastTradePrice"
              label="最新成交价"
              width="90"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.lastTradePrice>=scope.row.yesterdayClosePrice" style="color: #ff3434 ">{{scope.row.lastTradePrice}}</span>
                <span v-else style="color: #02e602 ">{{scope.row.lastTradePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="今日涨幅%"
              prop="increase"
              width="105"
              sortable
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.increase>=0" style="color: #ff3434 ">{{scope.row.increase}}</span>
                <span v-else style="color: #02e602 ">{{scope.row.increase}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="highestPrice"
              label="最高价"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="lowestPrice"
              label="最低价"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="yesterdayClosePrice"
              label="昨收盘"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="openPrice"
              label="今开盘"
              width="70"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.openPrice>=scope.row.yesterdayClosePrice" style="color: #ff3434 ">{{scope.row.openPrice}}</span>
                <span v-else style="color: #02e602 ">{{scope.row.openPrice}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="tradeAmount"
              label="成交额"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="totalMarketCapitalization"
              label="市值"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="peRatio"
              label="市盈率"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="pbRatio"
              label="市净率"
              align="center"

            >
            </el-table-column>

          </el-table>
          <div class="block" style="margin-top:30px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[20,50,100]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="list.length">
            </el-pagination>
          </div>

        </div>

      </div>

    </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'

  export default {
    name: "StockScreening",
    data() {
      return {
        activeIndex: 'StockScreening',
        stockType: '全部股票',
        currentPage: 1,
        total: 20,
        pageSize: 20,
        index: 2,
        maxMinData: {
          // 涨跌幅
          minIncrease: 0,
          maxIncrease: 0,
          // 成交额
          minTradeAmount: 0,
          maxTradeAmount: 0,
          // 市盈率
          minPeRatio: 0,
          maxPeRatio: 0,
          // 总市值
          minTotalMarketCapitalization: 0,
          maxTotalMarketCapitalization: 0,
        },
        IncreaseValue: [],
        TradeAmountValue: [],
        TotalMarketCapitalizationValue: [],
        PeRatioValue: [],

      }
    },
    mounted() {
      this.$store.dispatch('stockList')
    },
    created() {
      let prom = {};
      console.log(prom)
      this.$api.http('get', "/api/getCondition", prom).then(res => {
        console.log(res);
        this.$set(this.maxMinData, 'minIncrease', res.data.minIncrease);
        this.$set(this.maxMinData, 'maxIncrease', res.data.maxIncrease);
        this.$set(this.maxMinData, 'minTradeAmount', res.data.minTradeAmount);
        this.$set(this.maxMinData, 'maxTradeAmount', res.data.maxTradeAmount);
        this.$set(this.maxMinData, 'minPeRatio', res.data.minPeRatio);
        this.$set(this.maxMinData, 'maxPeRatio', res.data.maxPeRatio);
        this.$set(this.maxMinData, 'minTotalMarketCapitalization', res.data.minTotalMarketCapitalization);
        this.$set(this.maxMinData, 'maxTotalMarketCapitalization', res.data.maxTotalMarketCapitalization);
        console.log(this.maxMinData.maxTradeAmount)
        this.IncreaseValue = [this.maxMinData.minIncrease, this.maxMinData.maxIncrease];
        this.TradeAmountValue = [this.maxMinData.minTradeAmount, this.maxMinData.maxTradeAmount];
        this.TotalMarketCapitalizationValue = [this.maxMinData.minTradeAmount, this.maxMinData.maxTotalMarketCapitalization];
        this.PeRatioValue = [this.maxMinData.minPeRatio, this.maxMinData.maxPeRatio];
        console.log('+++++++++++++++')
      }).catch((error) => {
        this.$message.error(error.message)
      })
    },
    watch: {
      IncreaseValue(val, oldVal) {
        console.log("inputVal = " + val + " , oldValue = " + oldVal)
      },

    },
    methods: {
      submit() {
        let prom = {
          minIncrease: this.IncreaseValue[0],
          maxIncrease: this.IncreaseValue[1],
          // 成交额
          minTradeAmount: this.TradeAmountValue[0],
          maxTradeAmount: this.TradeAmountValue[1],
          // 市盈率
          minPeRatio: this.PeRatioValue[0],
          maxPeRatio: this.PeRatioValue[1],
          // 总市值
          minTotalMarketCapitalization: this.TotalMarketCapitalizationValue[0],
          maxTotalMarketCapitalization: this.TotalMarketCapitalizationValue[1],
        };
        console.log(prom);
        this.$api.http('post', "/api/conditionalStockList", prom).then(res => {
          console.log('555555555555555');
          console.log(res);
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].highestPrice === 5e-324) {
              data[i].highestPrice = null
            }
            if (data[i].lowestPrice === 1.7976931348623157e+308) {
              data[i].lowestPrice = null
            }
          }
          this.$store.commit('stockList', res.data)
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      typeList(index) {
        this.index = index
      },
      //处理列表点击事件
      handle(row) {
        // console.log(row.stockId)
        this.$store.commit('stockId', row.stockId);
        this.$store.commit('stockName', row.stockName);
        this.$store.commit('changeRout', 0);
        this.$router.push('StockDisplay')
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
    },
    computed: {
      tableData: function () {
        console.log('---  ')
        console.log(this.$store.state.stockList);
        return this.$store.state.stockList
      },
      isLogin: function () {
        console.log('isLogin')
        return this.$store.state.isLogin
      },
      list: function () {
        console.log('list')
        let list = []
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.index === 2) {
            list.push(this.tableData[i])
          }
          else {
            if (this.tableData[i].tradeMarket === this.index) {
              list.push(this.tableData[i])
            }
          }
        }
        console.log(list)
        return list
      }

    }
  }
</script>

<style scoped>
  .selectOn {
    background-color: #409EFF;
    color: black;
  }

  a {
    text-decoration: none;
  }

  #in {
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }

  #select {
    margin-top: 6%;
    float: right;
    width: 30%;
  }

  #stock {
    margin-top: 15%;
  }

  #search {
    width: 50%;
    margin: auto;
  }
  #navigator{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
  }
</style>
