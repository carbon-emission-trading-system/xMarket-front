<!-- 个人中心信息--->
<template>
  <div style="height: 100%">
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router=true>

        <el-menu-item style="margin-left: 15%" index="AfterLogin">首页</el-menu-item>
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

        <el-menu-item style="margin-left: 5%" index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style="margin-left: 5%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div style="height: 100%">
      <!-------左侧导航栏--->
      <div style="float: left;height: 100%;">
        <el-container style="height: 100%; border: 1px solid #eee;background-color: #78ff13">
          <el-aside width="200px" style="background-color: rgba(59,64,82,0.73)">
            <el-menu :default-active="activeIndexSelfCenter"
                     router>
              <el-menu-item index="SelfCenter">资产信息</el-menu-item>
              <el-menu-item index="SelfSelectedStock">自选股</el-menu-item>
              <el-menu-item index="SelfInfo" strle="">个人信息</el-menu-item>
            </el-menu>
          </el-aside>
        </el-container>
      </div>
    </div>
    <div style="height: 100%;float: left">


    </div>


  </div>
</template>

<script>
  import api from './../api/index.js'

  export default {
    name: "SelfCenter",

    data() {
      return {
        userId: this.$store.getters.getUserId,
        activeIndex: 'SelfInfo',
        activeIndexSelfCenter: 'SelfInfo',
        UserFundsInformation: {
          totalFunds: '',//总资产
          holdPosProAndLos: '',//持仓盈亏
          balance: '',//可用资金
          totalMarketValue: '',//总市值
          todayProAndLos: '',//当日盈亏
          frozenAmount: '',//冻结资金
          amountBalance:'',//资金余额
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
          // console.log(res);
          // console.log('到这里了');
          this.UserFundsInformation = res.data;
        }).catch((error) => {
          this.$message.error(error.message)
        })
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
          this.tableData = res.data;
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
    margin-left: 20%;
    margin-right: 10%;
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

