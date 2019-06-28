<template>
  <div id="StockList">
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
        <el-menu-item index="Guide">股票指南</el-menu-item>
        <el-submenu  index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')">当日成交</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('TodayOrder')">当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')">历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
        <el-menu-item v-else style="padding-left: 4%;color: #409EFF" @click="login">登录</el-menu-item>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div id="search">
        <search></search>
      </div>


      <div id="in">

        <div id="select" style="display: inline;max-width: 100%;float: right ">
          <div style="display: inline;width: 20%;float: left;max-width: 5%">
            <el-button type="primary" @click="screening">{{ screenRestart }}</el-button>
            <!--<el-button type="primary" @click="ret" v-show="!seen">收起筛选器</el-button>-->
          </div>
          <el-button-group v-model="stockType" style="max-width: 70%">
            <el-button v-bind:class="{selectOn:this.index===2}" @click="typeList(2)">全部股票</el-button>
            <el-button v-bind:class="{selectOn:this.index===0}" @click="typeList(0)">深A</el-button>
            <el-button v-bind:class="{selectOn:this.index===1}" @click="typeList(1)">沪A</el-button>
          </el-button-group>
        </div>


        <el-collapse-transition>
          <el-card style="height: 100%;width: 80%;float: left;margin-top: 2%;margin-left: 10%;margin-bottom: 2%"
                   v-show="!seen"
                   shadow="hover">
            <div style="width: 100%;">

              <!--总市值--->
              <div style="width: 50%;height: 80%;float: left">
                <p style="float: left">总市值</p>
                <div style="float: left;width: 10%;align-content: center;margin-right: 5%;margin-top: 3%">
                  {{ this.maxMinData.minTotalMarketCapitalization }}
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
                  {{this.maxMinData.maxTotalMarketCapitalization }}
                  <!--<el-input v-model="this.maxMinData.minTotalMarketCapitalization"-->
                  <!--style="width: 55%;float: left"></el-input>-->
                </div>
              </div>

              <!---成交额--->
              <div style="width: 50%;height: 80%;float: left">
                <p style="float: left">成交额</p>
                <div style="float: left;width: 10%;align-content: center;margin-right: 5%;margin-top: 3%">
                  <!--<el-input v-model="this.maxMinData.maxTradeAmount" style="width: 55%;float: left"></el-input>-->
                  {{ this.maxMinData.minTradeAmount}}
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
                  {{this.maxMinData.maxTradeAmount}}
                </div>
              </div>

              <!---市盈率--->
              <div style="width: 50%;height: 80%;float: left">
                <p style="float: left">市盈率</p>
                <div style="float: left;width: 10%;align-content: center;margin-right: 5%;margin-top: 3%">
                  <!--<el-input v-model="this.maxMinData.maxPeRatio" style="width: 55%;float: left"></el-input>-->
                  {{this.maxMinData.minPeRatio}}
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
                  {{this.maxMinData.maxPeRatio }}
                </div>

              </div>

              <!---涨跌幅  --->
              <div style="width: 50%;height: 80%;float: left">
                <p style="float: left">涨跌幅</p>
                <div style="float: left;width: 10%;align-content: center;margin-right: 5%;margin-top: 3%">
                  <!--<el-input v-model="this.maxMinData.maxIncrease" style="width: 55%;float: left"></el-input>-->
                  {{ this.maxMinData.minIncrease }}
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
                  {{this.maxMinData.maxIncrease}}
                </div>

              </div>

            </div>
            <el-button type="primary" @click="submit"> 筛选</el-button>
            <el-button type="primary" @click="restart">重置</el-button>
          </el-card>
        </el-collapse-transition>

        <!--        <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop>-->
        <!--background-color: gainsboro-->
        <div id="stock">
          <el-table
            :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            @row-dblclick="handle"
            style="width: 100%;font-size: 6px; cursor: pointer;"
            :header-cell-style="{background:'#c2ccd0',color:'#606266'}">
            <el-table-column
              prop="stockId"
              label="股票代码"
              width="75"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockName"
              label="股票简称"
              width="75"
              align="center">
            </el-table-column>
            <el-table-column
              prop="lastTradePrice"
              label="最新成交价"
              width="90"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.lastTradePrice>scope.row.yesterdayClosePrice" style="color: #ff3434 ">{{scope.row.lastTradePrice}}</span>
                <span v-else-if="scope.row.lastTradePrice<scope.row.yesterdayClosePrice" style="color: #02e602 ">{{scope.row.lastTradePrice}}</span>
                <span v-else >{{scope.row.lastTradePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="今日涨幅%"
              prop="increase"
              width="100"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.increase>0" style="color: #ff3434 ">{{scope.row.increase}}</span>
                <span v-else-if="scope.row.increase<0" style="color: #02e602 ">{{scope.row.increase}}</span>
                <span v-else >{{scope.row.increase}}</span>
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
                <span v-if="scope.row.openPrice>scope.row.yesterdayClosePrice" style="color: #ff3434 ">{{scope.row.openPrice}}</span>
                <span v-else-if="scope.row.openPrice<scope.row.yesterdayClosePrice" style="color: #02e602 ">{{scope.row.openPrice}}</span>
                <span v-else >{{scope.row.openPrice}}</span>
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
              label="市值(亿)"
              width="80"
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
              width="70"

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
</template>

<script>
  import Vue from 'vue'
  import Search from './Search'

  Vue.component('search', Search);

  export default {
    name: "StockList",
    components: {
      Search
    },
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: 'StockList',
        stockType: '全部股票',
        currentPage: 1,
        total: 20,
        pageSize: 20,
        index: 2,
        submitTrue: 0,
        tableData: '',
        seen: true,
        screenRestart: '展开筛选器',
        srFlag: 0,
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
    }
    ,
    mounted() {
      this.$store.dispatch('stockList')
    }
    ,
    created() {
      this.getRange()
    },
    watch: {
      IncreaseValue(val, oldVal) {
        console.log("inputVal = " + val + " , oldValue = " + oldVal)
      },

    },
    methods: {
      getRange() {
        let prom = {};
        console.log(prom)
        this.$api.http('get', "/api/getCondition", prom).then(res => {
          console.log(res)
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

      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      login(){
        this.$router.push('/')
        this.$store.commit('position',1)
      },
      toFirst() {
        if (this.$store.getters.isLogin) {
          this.$router.push('AfterLogin')
        } else {
          this.$router.push('/')
        }
      }
      ,
      toRouterOrAlert(index) {
        if (this.$store.getters.isLogin) {
          this.$router.push(index)
        } else {
          this.$alert('请先登录！', {
            confirmButtonText: '确定',
          });
        }
      }
      ,
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      }
      ,
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      }
      ,
      typeList(index) {
        this.index = index
      }
      ,
      //处理列表点击事件
      handle(row) {
        // console.log(row.stockId)
        this.$store.commit('stockId', row.stockId);
        this.$store.commit('stockName', row.stockName);
        this.$store.commit('changeRout', 0);
        this.$router.push('StockDisplay')
      },
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
          this.submitTrue = 1;
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].highestPrice === 5e-324) {
              data[i].highestPrice = null
            }
            if (data[i].lowestPrice === 1.7976931348623157e+308) {
              data[i].lowestPrice = null
            }
          }
          this.tableData = data
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      restart() {
        this.IncreaseValue = [this.maxMinData.minIncrease, this.maxMinData.maxIncrease];
        this.TradeAmountValue = [this.maxMinData.minTradeAmount, this.maxMinData.maxTradeAmount];
        this.TotalMarketCapitalizationValue = [this.maxMinData.minTradeAmount, this.maxMinData.maxTotalMarketCapitalization];
        this.PeRatioValue = [this.maxMinData.minPeRatio, this.maxMinData.maxPeRatio];
      },
      screening() {
        if (this.srFlag === 0) {
          this.srFlag = 1;
          this.seen = false;
          this.screenRestart = "收起筛选器";
        } else {
          this.srFlag = 0;
          this.seen = true;
          this.screenRestart = "展开筛选器";
        }
      },
    },

    computed: {
      isLogin: function () {
        console.log('isLogin')
        return this.$store.state.isLogin
      },
      list: function () {
        console.log(this.tableData)
        console.log('list')
        if (this.submitTrue === 0) {
          this.tableData = this.$store.state.stockList
        }


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

        //设置保留小数点后两位
        for (let i = 0; i < list.length; i++) {
          for (let key in list[i]) {
            if (typeof(list[i][key]) === "number" && key !== 'tradeMarket') {
              list[i][key] = list[i][key].toFixed(2)
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
    width: 50%;
  }

  #stock {
    margin-top: 15%;
  }

  #search {
    width: 50%;
    margin: auto;
  }

  #navigator {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #fff;
    display: inline-block;
  }
</style>
