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

        <el-menu-item index="AfterLogin" @click="toFirst">首页</el-menu-item>
        <el-submenu  index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
        <el-menu-item  index="Guide">股票指南</el-menu-item>
        <el-submenu  index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')">当日成交</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('TodayOrder')">当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')">历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item  @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div id="rank">
        <div class="line">
          <div class="left">
            <el-card class="box-card" shadow="always">
              <div slot="header" class="clearfix">
                <span>涨幅排名</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toOneRank(1)">查看更多</el-button>
              </div>
              <el-table
                :data="rankByIncrease"
                @row-dblclick="handleStock"

                style="width: 100%;font-size: 6px;cursor: pointer">
                <el-table-column
                  prop="stockId"
                  label="股票代码"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="stockName"
                  label="股票简称"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="increase"
                  label="涨幅%"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="lastTradePrice"
                  label="最新成交价"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="highestPrice"
                  label="最高价"
                  align="center"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="lowestPrice"
                  label="最低价"
                  align="center"
                  width="70">
                </el-table-column>
              </el-table>
            </el-card>
          </div>

          <div class="right">
            <el-card class="box-card" shadow="always">
              <div slot="header" class="clearfix">
                <span>跌幅排名</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toOneRank(2)">查看更多</el-button>
              </div>

              <el-table
                :data="rankByDecrease"
                @row-dblclick="handleStock"
                style="width: 100%;font-size: 6px;cursor: pointer">
                <el-table-column
                  prop="stockId"
                  label="股票代码"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="stockName"
                  label="股票简称"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="increase"
                  label="跌幅%"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="lastTradePrice"
                  label="最新成交价"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="highestPrice"
                  label="最高价"
                  align="center"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="lowestPrice"
                  label="最低价"
                  align="center"
                  width="70">
                </el-table-column>
              </el-table>

            </el-card>
          </div>
        </div>

        <div class="line">
          <div class="left">
            <el-card class="box-card" shadow="always">
              <div slot="header" class="clearfix">
                <span>成交额</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toOneRank(3)">查看更多</el-button>
              </div>
              <el-table
                :data="rankByTradeAmount"
                @row-dblclick="handleStock"
                style="width: 100%;font-size: 6px;cursor: pointer">
                <el-table-column
                  prop="stockId"
                  label="股票代码"
                  align="center"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="stockName"
                  label="股票简称"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="tradeAmount"
                  label="成交额"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="lastTradePrice"
                  label="最新成交价"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="highestPrice"
                  label="最高价"
                  align="center"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="lowestPrice"
                  label="最低价"
                  align="center"
                  width="70">
                </el-table-column>
              </el-table>
            </el-card>
          </div>

          <div class="right">
            <el-card class="box-card" shadow="always">
              <div slot="header" class="clearfix">
                <span>换手排名</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="toOneRank(4)">查看更多</el-button>
              </div>
              <el-table
                :data="rankByConversionHand"
                @row-dblclick="handleStock"
                style="width: 100%;font-size: 6px;cursor: pointer">
                <el-table-column
                  prop="stockId"
                  label="股票代码"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="stockName"
                  label="股票简称"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="conversionHand"
                  label="换手"
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="lastTradePrice"
                  label="最新成交价"
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="highestPrice"
                  label="最高价"
                  align="center"
                  width="70">
                </el-table-column>
                <el-table-column
                  prop="lowestPrice"
                  label="最低价"
                  align="center"
                  width="70">
                </el-table-column>
              </el-table>

            </el-card>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Rank",
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: 'Rank',
        rankByIncrease: [],
        rankByDecrease: [],
        rankByTradeAmount: [],
        rankByConversionHand: [],

      }
    },
    created() {
      this.rankByIncreaseApi();
      this.rankByDecreaseApi();
      this.rankByTradeAmountApi();
      this.rankByConversionHandApi();
    },
    methods: {
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
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      toOneRank(index) {
        this.$store.commit('rankIndex', index)
        this.$router.push('OneRank')
      },
      handleStock(row) {
        this.$store.commit('stockId', row.stockId)
        this.$store.commit('stockName', row.stockName)
        this.$router.push('StockDisplay')
      },

      rankByIncreaseApi() {
        let params = {
          type: 1
        }
        this.$api.http('get', '/api/rankList', params).then(res => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].highestPrice === 5e-324) {
              data[i].highestPrice = null
            }
            if (data[i].lowestPrice === 1.7976931348623157e+308) {
              data[i].lowestPrice = null
            }
          }
          //设置保留小数点后两位
          for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
              if (typeof(data[i][key]) == "number") {
                data[i][key] = data[i][key].toFixed(2)
              }
            }
          }
          if (data.length >= 4) {
            this.rankByIncrease = data.slice(0, 4)
          }
          else {
            this.rankByIncrease = data;
          }
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      rankByDecreaseApi() {
        let params = {
          type: 2
        }
        this.$api.http('get', '/api/rankList', params).then(res => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].highestPrice === 5e-324) {
              data[i].highestPrice = null
            }
            if (data[i].lowestPrice === 1.7976931348623157e+308) {
              data[i].lowestPrice = null
            }
          }
          //设置保留小数点后两位
          for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
              if (typeof(data[i][key]) == "number") {
                data[i][key] = data[i][key].toFixed(2)
              }
            }
          }
          if (data.length >= 4) {
            this.rankByDecrease = data.slice(0, 4)
          }
          else {
            this.rankByDecrease = data;
          }
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      rankByTradeAmountApi() {
        let params = {
          type: 3
        }
        this.$api.http('get', '/api/rankList', params).then(res => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].highestPrice === 5e-324) {
              data[i].highestPrice = null
            }
            if (data[i].lowestPrice === 1.7976931348623157e+308) {
              data[i].lowestPrice = null
            }
          }
          //设置保留小数点后两位
          for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
              if (typeof(data[i][key]) == "number") {
                data[i][key] = data[i][key].toFixed(2)
              }
            }
          }
          if (data.length >= 4) {
            this.rankByTradeAmount = data.slice(0, 4)
          }
          else {
            this.rankByTradeAmount = data;
          }
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      rankByConversionHandApi() {
        let params = {
          type: 4
        }
        this.$api.http('get', '/api/rankList', params).then(res => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].highestPrice === 5e-324) {
              data[i].highestPrice = null
            }
            if (data[i].lowestPrice === 1.7976931348623157e+308) {
              data[i].lowestPrice = null
            }
          }
          //设置保留小数点后两位
          for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
              if (typeof(data[i][key]) == "number") {
                data[i][key] = data[i][key].toFixed(2)
              }
            }
          }
          if (data.length >= 4) {
            this.rankByConversionHand = data.slice(0, 4)
          }
          else {
            this.rankByConversionHand = data;
          }
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },

    }
  }
</script>

<style scoped>
  #rank {
    margin: auto;
    width: 80%;
  }

  .line {
    display: inline-block;
    margin-top: 5%;
    width: 100%;
  }

  .left {
    float: left;
    width: 45%;
    height: 50%
  }

  .right {
    float: right;
    width: 45%;
    height: 50%
  }

  .box-card {
    width: 100%;
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
