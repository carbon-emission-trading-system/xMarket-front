<template>
  <div style="height: 100%;width: 100%">
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
        <el-submenu index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item index="BuyAtLimitPrice">股票买卖</el-menu-item>
        <el-menu-item index="Guide">股票指南</el-menu-item>
        <el-submenu index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange">当日成交</el-menu-item>
          <el-menu-item index="TodayOrder">当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;font-size: 6px;margin:auto">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div style="height: 90%;width: 100%;float: left">
        <!-------左侧导航栏--->
        <div style="float: left;height: 100%;width: 15%">
          <el-container style="height: 100%;">
            <el-aside width="100%">
              <el-menu :default-active="activeIndexSelfCenter"
                       router>
                <el-menu-item index="SelfCenter">资产信息</el-menu-item>
                <el-menu-item index="PositionStock">持仓股</el-menu-item>
                <el-menu-item index="SelfSelectedStock">自选股</el-menu-item>
                <el-menu-item index="SelfInfo" strle="">个人信息</el-menu-item>
              </el-menu>
            </el-aside>
          </el-container>
        </div>
        <div style="height: 100%;float: left;width: 70%">
          <div class="rightCard" style="height: 50%;width:95%;float: left;">
            <el-card style="margin-top:1%;margin-bottom: 2%;height: 50%;width: 100%;" shadow="hover">
              <div slot="header">
                <li class="el-icon-view" style="float: left;font-size: 20px;"></li>
                <span style="float: left">资金信息</span>
              </div>
              <div class="text item">
                <table style="align-content: left">
                  <tr>
                    <td style="padding-bottom: 2%; padding-left: 5%;">
                      总资产: {{ this.UserFundsInformation.totalFunds}}
                    </td>
                    <td style="padding-bottom: 2%;">
                      <span v-if="this.UserFundsInformation.holdPosProAndLos.indexOf('-')===-1" style="color: #ff3434 ">持仓盈亏: {{ this.UserFundsInformation.holdPosProAndLos}}</span>
                      <span v-else style="color: #02e602">持仓盈亏: {{ this.UserFundsInformation.holdPosProAndLos}}</span>
                    </td>
                    <td style="padding-bottom: 2%;">
                      可用资金: {{ this.UserFundsInformation.balance}}
                    </td>

                  </tr>
                  <tr>
                    <td style="padding-bottom: 2%;;padding-left:5%;">
                      总市值: {{ this.UserFundsInformation.totalMarketValue}}
                    </td>
                    <td style="align-content: left;padding-bottom: 2%;">
                      <span v-if="this.UserFundsInformation.todayProAndLos.indexOf('-')===-1" style="color: #ff3434 ">当日盈亏: {{ this.UserFundsInformation.todayProAndLos}}</span>
                      <span v-else style="color: #02e602">当日盈亏: {{ this.UserFundsInformation.todayProAndLos}}</span>
                    </td>
                    <td style="align-content: left;padding-bottom: 2%;">
                      冻结资金: {{ this.UserFundsInformation.frozenAmount}}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 2%;;padding-left:5%;">
                      资金余额: {{ this.UserFundsInformation.amountBalance}}
                    </td>
                  </tr>

                </table>
              </div>
            </el-card>
            <el-card style="width: 100%;height: 40%;text-align: center" shadow="hover">
              <div slot="header">
                <li class="el-icon-s-data" style="float: left;font-size: 20px;"></li>
                <span style="float: left">资产曲线</span>
              </div>
              <StockScreening style="width: 100%;"></StockScreening>
            </el-card>
          </div>
          <!-----右侧栏第二栏------>
          <!--<el-card class="rightCard" shadow="hover" style="float: left;height: 50%;width:100%;margin-top: 3%">-->
          <!--<div slot="header">-->
          <!--<span style="float: left">持仓信息</span>-->
          <!--</div>-->
          <!--<div style="width: 100%;">-->
          <!--<el-table-->
          <!--:data="tableData"-->
          <!--:header-cell-style="{background:'#eef1f6',color:'#606266'}"-->
          <!--border-->
          <!--height="250px"-->
          <!--@row-dblclick="handle"-->
          <!--style="width:100%;font-size: 6px;cursor: pointer">-->
          <!--<el-table-column-->
          <!--prop="stockId"-->
          <!--label="股票代码"-->
          <!--align="center"-->
          <!--fixed-->
          <!--width="100">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="stockName"-->
          <!--label="股票简称"-->
          <!--fixed-->
          <!--align="center"-->
          <!--width="100">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="presentPrice"-->
          <!--label="现价"-->
          <!--sortable-->
          <!--align="center"-->
          <!--width="80">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="costPrice"-->
          <!--label="成本价"-->
          <!--sortable-->
          <!--align="center"-->
          <!--width="100">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.costPrice<=scope.row.presentPrice" style="color: #ff3434 ">{{scope.row.costPrice}}</span>-->
          <!--<span v-else style="color: #02e602 ">{{scope.row.costPrice}}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="positionNumber"-->
          <!--label="股票余额"-->
          <!--sortable-->
          <!--align="center"-->
          <!--width="100">-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
          <!--prop="availableNumber"-->
          <!--label="可用数量"-->
          <!--align="center"-->
          <!--width="100">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="frozenNumber"-->
          <!--label="冻结数量"-->
          <!--align="center"-->
          <!--width="100">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="totalProfitAndLoss"-->
          <!--label="总盈亏"-->
          <!--sortable-->
          <!--align="center"-->
          <!--width="100">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.totalProfitAndLoss>=0"-->
          <!--style="color: #ff3434 ">{{scope.row.totalProfitAndLoss}}</span>-->
          <!--<span v-else style="color: #02e602 ">{{scope.row.totalProfitAndLoss}}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="todayProfitAndLoss"-->
          <!--label="当日盈亏"-->
          <!--align="center"-->
          <!--width="100">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.todayProfitAndLoss>=0"-->
          <!--style="color: #ff3434 ">{{scope.row.todayProfitAndLoss}}</span>-->
          <!--<span v-else style="color: #02e602 ">{{scope.row.todayProfitAndLoss}}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="profitAndLossRatio"-->
          <!--label="盈亏比例%"-->
          <!--align="center"-->
          <!--width="100">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.profitAndLossRatio>=0"-->
          <!--style="color: #ff3434 ">{{scope.row.profitAndLossRatio}}</span>-->
          <!--<span v-else style="color: #02e602 ">{{scope.row.profitAndLossRatio}}</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="marketValue"-->
          <!--label="市值"-->
          <!--sortable-->
          <!--align="center"-->
          <!--width="75">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="positionRatio"-->
          <!--label="仓位占比%"-->
          <!--sortable-->
          <!--align="center"-->
          <!--width="105">-->
          <!--</el-table-column>-->

          <!--</el-table>-->
          <!--</div>-->
          <!--</el-card>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import StockScreening from "./StockScreening";

  export default {
    name: "SelfCenter",
    components: {StockScreening},
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        userId: this.$store.getters.getUserId,
        activeIndex: 'SelfCenter',
        activeIndexSelfCenter: 'SelfCenter',
        UserFundsInformation: {
          totalFunds: '',//总资产
          holdPosProAndLos: '',//持仓盈亏
          balance: '',//可用资金
          totalMarketValue: '',//总市值
          todayProAndLos: '',//当日盈亏
          frozenAmount: '',//冻结资金
          amountBalance: '',//资金余额
        },
        //持仓信息
        tableData: []
      }
    },
    created() {
      this.$forceUpdate();
      this.ReceiveSelfHoldStock();
      this.ReceiveAccountInformation();
    },
    beforeMount() {
      let isLogin = this.$store.getters.isLogin;
      if (!isLogin) {
        this.$message('请先登录');
        this.$router.push('/')
      }
    },
    methods: {
      exit() {
        this.$store.commit('logout');
        this.$router.push('/')
      },
      handle(row) {
        // console.log(row.stockId)
        this.$store.commit('stockId', row.stockId);
        this.$store.commit('stockName', row.stockName);
        this.$router.push('StockDisplay')
      },


      /**
       * @author zky
       * @date
       * @since 接收用户账户信息
       * @version
       * @return
       */
      ReceiveAccountInformation() {
        console.log(this.userId);
        let poem = {
          userId: this.userId
        };
        this.$api.http('get', "/api/getFunds", poem).then(res => {
          let a = 3
          a.toFixed(2)
          console.log(a.toFixed(2))


          //totalFunds
          this.UserFundsInformation.totalFunds = this.changeIntoFloat(res.data.totalFunds)

          //holdPosProAndLos
          this.UserFundsInformation.holdPosProAndLos = this.changeIntoFloat(res.data.holdPosProAndLos)

          //balance
          this.UserFundsInformation.balance = this.changeIntoFloat(res.data.balance)

          //totalMarketValue
          this.UserFundsInformation.totalMarketValue = this.changeIntoFloat(res.data.totalMarketValue)

          //todayProAndLos
          this.UserFundsInformation.todayProAndLos = this.changeIntoFloat(res.data.todayProAndLos)

          //frozenAmount
          this.UserFundsInformation.frozenAmount = this.changeIntoFloat(res.data.frozenAmount)

          //amountBalance
          this.UserFundsInformation.amountBalance = this.changeIntoFloat(res.data.amountBalance)

        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      changeIntoFloat(value) {
        value = value.toFixed(2);
        let value1 = value.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
        return value.replace(value1, "$1,")
      },

      /**
       * @author
       * @date
       * @since 接收持仓股
       * @version
       * @constructor
       */
      ReceiveSelfHoldStock() {
        console.log(this.userId);
        let poem = {
          userId: this.userId
        };
        this.$api.http('get', "/api/presentHoldPositionInfo", poem).then(res => {
          // console.log(res);
          // console.log('到这里了');
          //设置保留小数点后两位
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
              if (key === 'presentPrice' || key === 'costPrice' || key === 'totalProfitAndLoss' || key === 'todayProfitAndLoss') {
                data[i][key] = data[i][key].toFixed(2)
              }
            }
          }
          this.tableData = data
          console.log(this.tableData)
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
    },
  }
</script>

<style scoped>

  a {
    text-decoration: none;
  }

  #exit {
    margin-top: 1.5%;
  }

  table {
    width: 100%;
  }

  td {
    padding-right: 5%;
    text-align: left;
  }

  .rightCard {
    margin-left: 13%;
    margin-right: 10%;
    width: 90%;
    margin-top: 3%;
  }

  #select {
    margin-top: 50px;
    float: right;
    width: 30%;
  }

  #stock {
    margin-top: 120px;
  }

  body .el-table th.gutter {
    display: table-cell !important;
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

