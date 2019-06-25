<template>
  <div style="height: 100%;width: 100%">
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
        <el-menu-item  index="Guide">股票指南</el-menu-item>
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
      <div style="height: 90%;width: 100%;float: left">
        <!-------左侧导航栏--->
        <div style="float: left;height: 100%;width: 15%">
          <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="100%" style="background-color: rgb(238, 241, 246)">
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
        <!-----右侧栏------>

        <div style="height: 100%;float: left;width: 70%">
          <el-card class="rightCard" shadow="hover" style="margin-left: 10%;width:100%;margin-top: 8%;height: auto">
            <div slot="header">
              <span style="float: left;margin-bottom: 2%;">持仓信息</span>
            </div>
            <div style="width: 100%;font-size: 6px">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#c2ccd0',color:'#606266'}"
                border
                height="250px"
                @row-dblclick="handle"
                style="width:100%; font-size: 6px;cursor: pointer">
                <el-table-column
                  prop="stockId"
                  label="股票代码"
                  align="center"
                  fixed
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="stockName"
                  label="股票简称"
                  fixed
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="presentPrice"
                  label="现价"
                  sortable
                  align="center"
                  width="80">
                </el-table-column>
                <el-table-column
                  prop="costPrice"
                  label="成本价"
                  sortable
                  align="center"
                  width="100">
                  <template slot-scope="scope">
                    <span v-if="scope.row.costPrice<=scope.row.presentPrice" style="color: #ff3434 ">{{scope.row.costPrice}}</span>
                    <span v-else style="color: #02e602 ">{{scope.row.costPrice}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="positionNumber"
                  label="股票余额"
                  sortable
                  align="center"
                  width="100">
                </el-table-column>

                <el-table-column
                  prop="availableNumber"
                  label="可用数量"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="frozenNumber"
                  label="冻结数量"
                  align="center"
                  width="100">
                </el-table-column>
                <el-table-column
                  prop="totalProfitAndLoss"
                  label="总盈亏"
                  sortable
                  align="center"
                  width="100">
                  <template slot-scope="scope">
                  <span v-if="scope.row.totalProfitAndLoss>=0"
                        style="color: #ff3434 ">{{scope.row.totalProfitAndLoss}}</span>
                    <span v-else style="color: #02e602 ">{{scope.row.totalProfitAndLoss}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="todayProfitAndLoss"
                  label="当日盈亏"
                  align="center"
                  width="100">
                  <template slot-scope="scope">
                  <span v-if="scope.row.todayProfitAndLoss>=0"
                        style="color: #ff3434 ">{{scope.row.todayProfitAndLoss}}</span>
                    <span v-else style="color: #02e602 ">{{scope.row.todayProfitAndLoss}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="profitAndLossRatio"
                  label="盈亏比例%"
                  align="center"
                  width="100">
                  <template slot-scope="scope">
                  <span v-if="scope.row.profitAndLossRatio>=0"
                        style="color: #ff3434 ">{{scope.row.profitAndLossRatio}}</span>
                    <span v-else style="color: #02e602 ">{{scope.row.profitAndLossRatio}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="marketValue"
                  label="市值"
                  sortable
                  align="center"
                  width="75">
                </el-table-column>
                <el-table-column
                  prop="positionRatio"
                  label="仓位占比%"
                  sortable
                  align="center"
                  width="105">
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
  export default {
    name: "PositionStock",
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        userId: this.$store.getters.getUserId,
        activeIndex: 'SelfCenter',
        activeIndexSelfCenter: 'PositionStock',
        //持仓信息
        tableData: []
      }
    },
    created() {
      this.ReceiveSelfSelectedStock();
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

      handleClick(id, name) {

        let x = '此操作将永久删除“' + id + name + '”股票, 是否继续?'
        this.$confirm(x, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
            // 删除自选股消息
            mess: this.deleteSelfSelectStock(id),
            if(mess = 200) {
              message: '删除成功!';
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      /**
       * @author
       * @date
       * @since 接收自选股
       * @version
       * @param
       * @return
       */
      ReceiveSelfSelectedStock() {
        console.log(this.userId);
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
              if (key == 'presentPrice' || key == 'costPrice' || key == 'totalProfitAndLoss' || key == 'todayProfitAndLoss') {
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

  table {
    width: 100%;
  }

  td {
    padding-left: 10%;
  }

  #exit {
    margin-top: 1.5%;
  }

  .rightCard {
    margin-left: 20%;
    margin-right: 10%;
    width: 90%;
    margin-top: 3%;
  }

  .NavigationBar {
    width: 100%;
    margin-bottom: 1%;
  }

  .box-card {
    margin: 10%;
  }

  #in {
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }

  /*.weigh_el-table-column {*/
  /**/
  /*}*/
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
