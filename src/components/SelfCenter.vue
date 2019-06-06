<template>
  <div>
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               router="true">

        <el-menu-item style="margin-left: 20%" index="AfterLogin">首页</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="StockList">股票列表</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="BuyAtLimitPrice">股票买卖</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="margin-left: 5%" index="1">
          <template slot="title" index="1">信息统计</template>
          <el-menu-item index="TodayExchange">当日成交</el-menu-item>
          <el-menu-item index="TodayOrder">当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style="margin-left: 50px" index="SelfCenter">个人中心</el-menu-item>
        <div id="exit">
          <el-link type="primary" @click="exit">退出</el-link>
        </div>
      </el-menu>
    </div>

    <div>
      <!-------左侧导航栏--->
      <div style="float: left">
        <el-container style="height: 500px; border: 1px solid #eee">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-active="activeIndexSelfCenter"
                     @select="handleSelect"
                     router>
              <el-menu-item index="SelfCenter">资产信息</el-menu-item>
              <el-menu-item index="SelfSelectedStock">自选股</el-menu-item>
              <el-menu-item index="1-3" strle="">个人信息</el-menu-item>
            </el-menu>
          </el-aside>
        </el-container>
      </div>
    </div>
    <div>
      <!-----右侧栏------>
      <div>
        <!-----右侧栏第一栏------>
        <div class="rightCard">
          <el-card style="margin-top:2%;margin-bottom: 2%">
            <div slot="header">
              <span style="float: left">资金信息</span>
            </div>
            <div class="text item">
              <table>
                <tr>
                  <td style="padding-bottom: 2%">
                    总资产: {{ this.UserFundsInformation.totalFunds}}
                  </td>
                  <td style="padding-bottom: 2%">
                    持仓盈亏: {{this.UserFundsInformation.holdPosProAndLos}}
                  </td>
                  <td style="padding-bottom: 2%">
                    可用资金: {{ this.UserFundsInformation.balance}}
                  </td>
                </tr>
                <tr>
                  <td>
                    总市值: {{ this.UserFundsInformation.totalMarketValue}}
                  </td>
                  <td>
                    当日盈亏: {{ this.UserFundsInformation.todayProAndLos}}
                  </td>
                  <td>
                    冻结资金: {{ this.UserFundsInformation.frozenAmount}}
                  </td>
                </tr>
              </table>
            </div>
          </el-card>
        </div>
        <!-----右侧栏第二栏------>
        <div>
          <el-card class="rightCard">
            <div slot="header">
              <span style="float: left">持仓信息</span>
            </div>
            <div style="width: 100%;">
              <el-table
                :data="tableData"
                border
                @row-click="handle"
                style="width:100%;font-size: 6px">
                <el-table-column
                  prop="stockId"
                  label="股票代码"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="stockName"
                  label="股票简称"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="presentPrice"
                  label="现价"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="costPrice"
                  label="成本价"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="actualAmont"
                  label="实际数量"
                  sortable
                  align="center">
                </el-table-column>

                <el-table-column
                  prop="todayProfitAndLoss"
                  label="当日盈亏"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="totalProfitAndLoss"
                  label="总盈亏"
                  sortable
                  align="center">
                </el-table-column>

                <el-table-column
                  prop="profitAndLossRatio"
                  label="盈亏比例"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="marketValue"
                  label="市值"
                  sortable
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="positionRatio"
                  label="仓位占比"
                  sortable
                  align="center">
                </el-table-column>

              </el-table>
            </div>
          </el-card>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import api from './../api/index.js'

  export default {
    name: "SelfCenter",

    data() {
      return {
        userI: this.$store.state.user.userId,
        activeIndex: 'SelfCenter',
        activeIndexSelfCenter: 'SelfCenter',
        UserFundsInformation: {
          totalFunds: '',//总资产
          holdPosProAndLos: '',//持仓盈亏
          balance: '',//可用资金
          totalMarketValue: '',//总市值
          todayProAndLos: '',//当日盈亏
          frozenAmount: '',//冻结资金
        },
        //持仓信息
        tableData: []
      }
    },
    created() {
      this.ReceiveAccountInformation();
      this.ReceiveSelfHoldStock();
    },
    beforeMount() {
      let isLogin = this.$store.getters.isLogin;
      if (!isLogin) {
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
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
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
          console.log(res);
          console.log('到这里了');
          this.UserFundsInformation = res.data;
        }).catch(
          this.$message.error(res.message),
        )
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
          console.log(res);
          console.log('到这里了');
          this.tableData = res.data;
          console.log(this.tableData)
        }).catch(
          this.$message.error(res.message),
        )
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
  }

  .rightCard {
    margin-left: 20%;
    margin-right: 10%;
  }

  el-table-column {
    width: 8%;
    align: "center"
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
</style>

