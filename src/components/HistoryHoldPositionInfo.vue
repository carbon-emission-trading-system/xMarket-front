<template>
  <div >
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
      <div >
        <selectDate v-on:select="select"></selectDate>
        <div id="in">
          <div id="tag">
            <el-divider>历史持仓</el-divider>
          </div>

          <div id="stock">
            <el-table
              :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
              @row-dblclick="handle"
              border
              height="500"
              style="font-size: 6px;cursor: pointer"
              :header-cell-style="{background:'#c2ccd0',color:'#606266'}">
              <el-table-column
                prop="stockId"
                label="股票代码"
                width="110"
                align="center">
              </el-table-column>
              <el-table-column
                prop="stockName"
                label="股票简称"
                width="110"
                align="center">
              </el-table-column>
              <el-table-column
                prop="buildPositionDate"
                label="建仓日期"
                width="110"
                align="center">
              </el-table-column>
              <el-table-column
                prop="clearPositionDate"
                label="清仓日期"
                width="110"
                align="center">
              </el-table-column>
              <el-table-column
                prop="stockHoldDay"
                label="持股天数"
                width="110"
                align="center">
              </el-table-column>
              <el-table-column
                prop="totalProfitAndLoss"
                label="总盈亏"
                width="100"
                align="center">
              </el-table-column>
              <el-table-column
                prop="profitAndLossRatio"
                label="盈亏比例%"
                align="center"
              >
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
  </div>
</template>

<script>
  import SelectDate from './SelectDate'
  import Vue from 'vue'

  Vue.component('selectDate', SelectDate)

  export default {
    name: "HistoryHoldPositionInfo",
    components: {
      SelectDate,
    },
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: 'HistoryHoldPositionInfo',
        tableData: [],
        currentPage: 1,
        total: 20,
        pageSize: 15,
        beginDate: '',
        endDate: ''
      }
    },
    created() {
      this.setHistoryHoldPositionApi();
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
        this.$store.commit('changeRout', 7);
        this.$router.push('StockDisplay')
      },
      //日期筛选
      select: function (data) {

        //数据预处理
        this.beginDate = data[0]
        this.endDate = data[1]
        console.log(this.beginDate)
        let date1 = new Date(this.beginDate)
        let begin, year1, month1, day1
        year1 = date1.getFullYear()
        month1 = date1.getMonth() + 1
        day1 = date1.getDate()
        begin = year1.toString() + (month1 > 9 ? month1 : '0' + month1) + (day1 > 9 ? day1 : '0' + day1)
        begin = parseInt(begin)
        console.log(begin)

        console.log(this.endDate)
        let date2 = new Date(this.endDate)
        let end, year2, month2, day2
        year2 = date2.getFullYear()
        month2 = date2.getMonth() + 1
        day2 = date2.getDate()
        end = year2.toString() + (month2 > 9 ? month2 : '0' + month2) + (day2 > 9 ? day2 : '0' + day2)
        end = parseInt(end)
        console.log(end)

        let list = []
        for (let i = 0; i < this.tableData.length; i++) {
          let date = new Date(this.tableData[i].buildPositionDate)
          //   console.log(date)
          let theDate, year, month, day
          year = date.getFullYear()
          month = date.getMonth() + 1
          day = date.getDate()
          theDate = year.toString() + (month > 9 ? month : '0' + month) + (day > 9 ? day : '0' + day)
          theDate = parseInt(theDate)

          //日期范围筛选
          if (theDate >= begin && theDate <= end) {
            list.push(this.tableData[i])
          }
        }
        this.tableData = list

      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      setHistoryHoldPositionApi: function () {
        let params = {
          userId: this.$store.getters.getUserId
        }
        this.$api.http('get', '/api/historyHoldPositionInfo', params).then(res => {
          console.log(res);
          this.tableData = res.data;
        }).catch((error) => {
          this.$message.error(error.message)
        });
      },
    }
  }
</script>

<style scoped>
  #in {
    width: 70%;
    margin: 0 auto;
    text-align: center;
  }

  #stock {
    margin: auto;
    width: 80%;
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
