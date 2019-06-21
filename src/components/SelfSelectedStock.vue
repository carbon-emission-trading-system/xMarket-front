<template>
  <div style="height: 100%;width: 100%">
    <div id="navigator">
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router=true>

        <el-menu-item style="margin-left: 15%" index="AfterLogin">首页</el-menu-item>
        <el-submenu style="margin-left: 5%" index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item style="margin-left: 5%" index="BuyAtLimitPrice">股票买卖</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="margin-left: 5%" index="1">
          <template slot="title">信息统计</template>
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

    <div style="z-index: 1;position:relative;" >
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
        <el-card class="rightCard" style="margin-left: 10%;width:100%;margin-top: 8%;height: auto">
          <div slot="header">
            <span style="float: left; margin-bottom: 2%;">自选股</span>
          </div>
          <div style="width: 100%;font-size: 6px">
            <el-table
              :data="tableData"
              @row-dblclick="handle"
              border
              style="width:100%;cursor: pointer;font-size: 6px;"
              :header-cell-style="{background:'#c2ccd0',color:'#606266'}">
              <el-table-column
                prop="stockId"
                label="股票代码"
                fixed
                align="center">
              </el-table-column>
              <el-table-column
                prop="stockName"
                label="股票简称"
                fixed
                align="center">
              </el-table-column>
              <el-table-column
                prop="lastTradePrice"
                label="最新价"
                align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.lastTradePrice>=scope.row.yesterdayClosePrice" style="color: #ff3434 ">{{scope.row.lastTradePrice}}</span>
                  <span v-else style="color: #02e602 ">{{scope.row.lastTradePrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="今日涨幅%"
                prop="increase"
                align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.increase>=0" style="color: #ff3434 ">{{scope.row.increase}}</span>
                  <span v-else style="color: #02e602 ">{{scope.row.increase}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="lowestPrice"
                label="最低价"
                align="center">
              </el-table-column>
              <el-table-column
                prop="highestPrice"
                label="最高价"
                align="center">
              </el-table-column>
              <el-table-column
                prop="yesterdayClosePrice"
                label="昨收盘"
                align="center">
              </el-table-column>
              <el-table-column
                prop="openPrice"
                label="今开盘"
                align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.openPrice>=scope.row.yesterdayClosePrice" style="color: #ff3434 ">{{scope.row.openPrice}}</span>
                  <span v-else style="color: #02e602 ">{{scope.row.openPrice}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="tradeAmount"
                label="成交额"
                align="center"
                width="100">
              </el-table-column>
              <el-table-column
                prop="totalMarketCapitalization"
                label="市值(亿)"
                align="center">
              </el-table-column>
              <el-table-column
                prop="peRatio"
                label="市盈率"
                align="center">
              </el-table-column>
              <el-table-column
                prop="pbRatio"
                label="市净率"
                align="center">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="70"
                align="center">
                <template slot-scope="scope">
                  <el-button @click="handleClick(scope.row.stockId,scope.row.stockName)" type="text" size="small">删除
                  </el-button>
                </template>
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
    name: "SelfSelectedStock",
    data() {
      return {
        userId: this.$store.getters.getUserId,
        activeIndex: 'SelfCenter',
        activeIndexSelfCenter: 'SelfSelectedStock',
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
        let poem = {
          userId: this.userId
        }
        this.$api.http('get', "/api/selfSelectStockList", poem).then(res => {
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
          for(let i = 0; i<data.length; i++){
            for(let key in data[i]){
              if(typeof(data[i][key])=="number"){
                data[i][key] = data[i][key].toFixed(2)
              }

            }
          }
          this.tableData = data;
          console.log(this.tableData)
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },

      /**
       * @author 郑科宇
       * @date 5/30
       * @since 删除自选股
       * @version -0.1
       * @param delStock
       * @return {number}
       */
      deleteSelfSelectStock(delStock) {
        let params = {
          userId: this.userId,
          stockId: delStock
        }
        this.$api.http('post', "/api/deleteSelfSelectStock", params).then(res => {
          console.log(res);
          let mess = res.code;
          this.ReceiveSelfSelectedStock()
          return mess;
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
  #navigator{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
  }
</style>
