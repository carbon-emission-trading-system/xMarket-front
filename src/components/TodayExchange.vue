<template>
  <div style="height: 90%">
    <div id="navigator">
      <el-image :src="url" style="height: 10%;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router=true
               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item index="AfterLogin">首页</el-menu-item>
        <el-submenu  index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item  index="BuyAtLimitPrice">股票买卖</el-menu-item>
        <el-menu-item index="Guide">股票指南</el-menu-item>
        <el-submenu  index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange">当日成交</el-menu-item>
          <el-menu-item index="TodayOrder">当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item  index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;font-size: 6px;margin:auto">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div id="in">
        <div id="tag">
          <el-divider>当日成交</el-divider>
        </div>

        <div id="stock">
          <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            height=500
            @row-dblclick="handle"
            style="width: 100%;font-size: 6px;cursor: pointer"
            :header-cell-style="{background:'#c2ccd0',color:'#606266'}">
            <el-table-column
              prop="time"
              label="成交时间"
              width="100"
              align="center"
              fixed
              sortable>
            </el-table-column>
            <el-table-column
              prop="stockId"
              label="股票代码"
              width="80"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockName"
              label="股票简称"
              width="80"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="type"
              label="操作"
              width="70"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="exchangeAmount"
              label="成交数量"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="cancelNumber"
              label="撤单数量"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tradePrice"
              label="成交价"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="totalExchangeMoney"
              label="成交金额"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockBalance"
              label="股票余额"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="orderId"
              label="合同编号"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="transactionOrderId"
              label="成交编号"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="serviceTax"
              label="手续费"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stampTax"
              label="印花税"
              width="75"
              align="center">
            </el-table-column>
            <el-table-column
              prop="transferFee"
              label="过户费"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="actualAmount"
              label="发生金额"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tradeMarket"
              label="交易市场"
              width="80"
              align="center">
            </el-table-column>


          </el-table>
          <div class="block" style="margin-top:30px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                           :current-page="currentPage" :page-sizes="[15,30,50]" :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script>

  export default {
    name: "TodayExchange",
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: 'TodayExchange',
        tableData: [],
        currentPage: 1,
        total: 20,
        pageSize: 15
      }
    },
    created() {
      this.setTodayExchangeApi();
    },
    beforeMount() {
      let isLogin = this.$store.getters.isLogin
      if (!isLogin) {
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
        this.$router.push('/')
      }
    },
    methods: {
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      handle(row) {
        // console.log(row.stockId)
        this.$store.commit('stockId', row.stockId)
        this.$store.commit('stockName', row.stockName)
        this.$router.push('StockDisplay')
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      setTodayExchangeApi: function () {
        let params = {
          userId: this.$store.getters.getUserId
        }
        this.$api.http('get', '/api/todayExchange', params).then(res => {

          console.log(res.data)
          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === 0) {
              data[i].type = "买入"
            }
            else {
              data[i].type = "卖出"
            }
            if (data.tradeMarket === 0) {
              data[i].tradeMarket = "深市"
            }
            else {
              data[i].tradeMarket = "沪市"
            }
          }
          //设置保留小数点后两位
          for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
              if (key == 'tradePrice' || key == 'totalExchangeMoney') {
                data[i][key] = data[i][key].toFixed(2)
              }
              if (key == 'serviceTax' || key == 'stampTax' || key == 'transferFee' || key == 'actualAmount') {
                data[i][key] = data[i][key].toFixed(3)
              }
            }
          }

          this.tableData = data;
        }).catch((error) => {
          this.$message.error(error.message)
        });
      },
    }
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  #in {
    width: 70%;
    margin: 0 auto;
    height: 90%;
  }

  #stock {
    margin-top: 2%;
    height: 100%;
  }

  #tag {
    margin-top: 5%;
    margin-bottom: 4%;
  }

  #navigator {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    display: inline-block;
  }

</style>
