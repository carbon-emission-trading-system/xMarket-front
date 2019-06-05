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

          <el-menu-item style = "margin-left: 20%" index="AfterLogin" >首页</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="StockList" >股票列表</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="BuyAtLimitPrice" >股票买卖</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
          <el-submenu style = "margin-left: 5%" index="1">
            <template slot="title">信息统计</template>
            <el-menu-item index="TodayExchange" >当日成交</el-menu-item>
            <el-menu-item index="TodayOrder" >当日委托</el-menu-item>
            <el-menu-item index="HistoryHoldPositionInfo" >历史持仓</el-menu-item>
            <el-menu-item index="HistoryExchangeInfo" >历史成交</el-menu-item>
          </el-submenu>

          <el-menu-item style = "margin-left: 50px" index="SelfCenter">个人中心</el-menu-item>
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


        <!-----右侧栏第二栏------>
        <div>
          <el-card class="rightCard">
            <div slot="header">
              <span style="float: left">自选股</span>
            </div>
            <div style="width: 100%">
              <el-table
                :data="tableData"
                @row-click="handle"
                border
                style="width:100%">
                <el-table-column
                  prop="stockID"
                  label="股票代码"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="stockName"
                  label="股票简称"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="lastTradePrice"
                  label="最新价"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="increase"
                  label="涨幅"
                  sortable
                  align="center">
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
                  prop="yesterdayOpenPrice"
                  label="昨开盘"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="todayOpenPrice"
                  label="今开盘"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="turnover"
                  label="成交额"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="marketValue"
                  label="市值"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="priceEarningsRatio"
                  label="市盈率"
                  align="center">
                </el-table-column>
                <el-table-column
                  prop="priceToBookRatio"
                  label="市净率"
                  align="center">
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="清除"
                  width="100">
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.stockID,scope.row.stockName)" type="text" size="small">删除
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-card>
        </div>
      </div>


    </div>
</template>

<script>
  import api from './../api/index.js'
  export default {
    name: "SelfSelectedStock",
    data() {
      return {
        userID: this.$store.state.user.userId,
        activeIndex: 'SelfCenter',
        activeIndexSelfCenter: 'SelfSelectedStock',
        //持仓信息
        tableData: []
      }
    },
    created() {
      this.ReceiveSelfSelectedStock();
    },
    beforeMount(){
      if(this.$store.state.isLogin===false){
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
        this.$router.push('/')
      }
    },
    methods: {
      exit(){
        this.$store.commit('logout')
        this.$router.push('/')
      },
      handle(row){
        // console.log(row.stockId)
        this.$store.commit('stockId',row.stockId)
        this.$store.commit('stockName',row.stockName)
        this.$router.push('StockDisplay')
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
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
            mess:this.deleteSelfSelectStock(id),
            if(mess =200){
              message: '删除成功!';
            },
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
        let poem={
          userId: this.userId
        }
        this.$api.http('get',"/api/selfSelectedStock",poem)
          .then(res => {
            console.log(res);
            console.log('到这里了');
            this.tableData = res.data;
            console.log(this.tableData)
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
          userID: this.userId,
          stockId: delStock
        }
        this.$api.http('post',"/api/deleteSelfSelectStock", params).then(res => {
            console.log(res);
            let mess = res.data;
          return mess;
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
  #exit{
    margin-top: 1.5%;
  }

  .rightCard {
    margin-left: 20%;
    margin-right: 10%;
    margin-top: 2%;
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

  el-table-column {
    width: 8%;
    align: "center"
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
</style>
