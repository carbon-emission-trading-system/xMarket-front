<template>
  <div>
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
        <el-menu-item index="BuyAtLimitPrice">股票买卖</el-menu-item>
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
      <div id="in">

        <div id="tag">
          <el-divider>当日委托</el-divider>
        </div>
        <!--      <el-table-column-->
        <!--        prop="date"-->
        <!--        label="委托日期"-->
        <!--        width="100"-->
        <!--        fixed-->
        <!--        align="center">-->
        <!--      </el-table-column>-->
        <div id="stock">
          <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            height=500
            @row-dblclick="handle"
            style="width: 100%;font-size: 8px;cursor: pointer"
            fit="true"
            :header-cell-style="{background:'#c2ccd0',color:'#606266'}">

            <el-table-column
              prop="time"
              label="委托时间"
              width="100"
              fixed
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockId"
              label="股票代码"
              width="85"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockName"
              label="股票简称"
              width="85"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="type"
              label="操作"
              width="80"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="state"
              label="委托状态"
              width="90"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tradeStraregy"
              label="订单类型"
              width="150"
              align="center">
            </el-table-column>
            <el-table-column
              prop="orderAmount"
              label="委托数量"
              width="85"
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
              prop="exchangeAveragePrice"
              label="成交均价"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="orderPrice"
              label="委托价格"
              width="80"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.orderPrice<=scope.row.exchangeAveragePrice" style="color: #ff3434">{{scope.row.orderPrice}}</span>
                <span v-else style="color: #02e602">{{scope.row.orderPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderId"
              label="合同编号"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              prop="tradeMarket"
              label="交易市场"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              label="操作"
              width="70"
              fixed="right"
              align="center"
            >
              <template slot-scope="scope">
                <el-button v-if="scope.row.state!=='未成交'" @click="cancel(scope.row.orderId)" type="text" size="small"
                           disabled>撤单
                </el-button>
                <el-button v-else @click="cancel(scope.row.orderId)" type="text" size="small">撤单</el-button>
              </template>
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

    name: "TodayOrder",

    data() {
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: 'TodayOrder',
        tableData: [],
        currentPage: 1,
        total: 20,
        pageSize: 15
      }
    },
    created() {
      this.setTodayOrderApi();
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
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      setTodayOrderApi: function () {
        let params = {
          userId: this.$store.getters.getUserId
          //   userId:1001
        }
        this.$api.http('get', '/api/todayOrder', params).then(res => {

          console.log('请求成功')
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === 0) {
              data[i].type = "买入"
            } else {
              data[i].type = "卖出"
            }

            if (data[i].tradeMarket === 0) {
              data[i].tradeMarket = "深市"
            }
            else {
              data[i].tradeMarket = "沪市"
            }

            if (data[i].state === 0) {
              data[i].state = "未成交"
            }
            else if (data[i].state === 1) {
              data[i].state = "正在撤单"
            }
            else if (data[i].state === 2) {
              data[i].state = "已成交"
            }
            else if (data[i].state === 3) {
              data[i].state = "部分撤单"
            }
            else if (data[i].state === 4) {
              data[i].state = "全部撤单"
            }
            else {
              data[i].tradeMarket = "部分成交"
            }


            if (data[i].tradeStraregy === 0) {
              data[i].tradeStraregy = "限价委托"
            } else if (data[i].tradeStraregy === 1) {
              data[i].tradeStraregy = "最优五档即时成交剩余撤销"
            } else if (data[i].tradeStraregy === 2) {
              data[i].tradeStraregy = "最优五档即时成交剩余转限价"
            } else if (data[i].tradeStraregy === 3) {
              data[i].tradeStraregy = "对手方最优价格"
            } else if (data[i].tradeStraregy === 4) {
              data[i].tradeStraregy = "本方最优价格"
            } else if (data[i].tradeStraregy === 5) {
              data[i].tradeStraregy = "最优五档即时成交剩余撤销"
            } else if (data[i].tradeStraregy === 6) {
              data[i].tradeStraregy = "即时成交并撤销"
            } else if (data[i].tradeStraregy === 7) {
              data[i].tradeStraregy = "全额成交或撤销"
            }
          }
          //设置保留小数点后两位
          for (let i = 0; i < data.length; i++) {
            for (let key in data[i]) {
              if (key == 'orderPrice' || key == 'exchangeAveragePrice') {
                data[i][key] = data[i][key].toFixed(2)
              }
            }
          }
          this.tableData = data

          let timer = setTimeout(() => {
            this.setTodayOrderApi()
          }, 10000)
          this.$once('hook:beforeDestroy', () => {
            clearInterval(timer)
          })
        }).catch((error) => {
          this.$message.error(error.message)
        });
      },
      //撤单
      cancel(orderId) {
        let x = '您确认对合同编号为' + orderId + '的订单进行撤单操作吗?'
        this.$confirm(x, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let code = this.cancelOrder(orderId)
          let message = ''
          if (code === 200) {
            message = '撤单成功!';
          }
          this.$message({
            type: 'success',
            message: message,
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤单'
          });
        });

      },
      cancelOrder(orderId) {
        let params = {
          orderId: orderId
        }
        this.$api.http('post', '/api/cancelOrder', params).then(res => {
          this.setTodayOrderApi()
          return res.code;
        }).catch((error) => {
          this.$message.error(error.message)
        })
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
  }

  #stock {
    margin-top: 2%;
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
    background-color: #fff;
  }
</style>

