<template>
    <div id="StockList">
      <div>
        <el-menu :default-active="this.activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 v-bind:router=true>

          <el-menu-item style = "margin-left: 15%" @click="toFirst" >首页</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="StockList" >股票列表</el-menu-item>
          <el-menu-item style = "margin-left: 5%" @click="toRouterOrAlert('BuyAtLimitPrice')" >股票买卖</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
          <el-submenu style = "margin-left: 5%" index="1">
            <template slot="title">信息统计</template>
            <el-menu-item @click="toRouterOrAlert('TodayExchange')" >当日成交</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('TodayOrder')" >当日委托</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')"  >历史持仓</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')" >历史成交</el-menu-item>
          </el-submenu>

          <el-menu-item style = "margin-left: 5%" @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
          <el-submenu v-if="this.$store.getters.isLogin" style = "margin-left: 5%" index="2">
            <template slot="title" ><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span></template>
            <el-menu-item @click="exit">退出</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <search></search>

      <div id="in">
        <div id="select">
          <el-button-group v-model="stockType">
            <el-button v-bind:class="{selectOn:this.index===2}" @click="typeList(2)">全部股票</el-button>
            <el-button v-bind:class="{selectOn:this.index===0}" @click="typeList(0)" >深A</el-button>
            <el-button v-bind:class="{selectOn:this.index===1}" @click="typeList(1)" >沪A</el-button>
          </el-button-group>
        </div>

        <!--background-color: gainsboro-->
        <div id="stock">
          <el-table
            :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            @row-dblclick="handle"
            style="width: 100%;font-size: 6px; cursor: pointer ;"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column
              prop="stockId"
              label="股票代码"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockName"
              label="股票简称"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="lastTradePrice"
              label="最新成交价"
              width="90"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.lastTradePrice>=scope.row.yesterdayClosePrice" style="color: #ff3434 " >{{scope.row.lastTradePrice}}</span>
                <span v-else style="color: #02e602 ">{{scope.row.lastTradePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="今日涨幅%"
               prop="increase"
               width="105"
               sortable
               align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.increase>=0" style="color: #ff3434 " >{{scope.row.increase}}</span>
                <span v-else style="color: #02e602 ">{{scope.row.increase}}</span>
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
                <span v-if="scope.row.openPrice>=scope.row.yesterdayClosePrice" style="color: #ff3434 " >{{scope.row.openPrice}}</span>
                <span v-else style="color: #02e602 ">{{scope.row.openPrice}}</span>
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
              label="市值"
              width="70"
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

            >
            </el-table-column>

          </el-table>
          <div class="block" style="margin-top:30px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20,50,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="list.length">
            </el-pagination>
          </div>

        </div>

      </div>

    </div>
</template>

<script>
  import Vue from 'vue'
  import Search from './Search'

  Vue.component( 'search',Search);

  export default {
        name: "StockList",
      components: {
        Search
      },
      data() {
        return {
          activeIndex: 'StockList',
          stockType:'全部股票',
          currentPage:1,
          total:20,
          pageSize:20,
          index:2
        }
      },
      mounted () {
          this.$store.dispatch('stockList')
      },
      methods:{
        exit(){
          this.$store.commit('logout')
          this.$router.push('/')
        },
        toFirst(){
          if(this.$store.getters.isLogin){
            this.$router.push('AfterLogin')
          }else{
            this.$router.push('/')
          }
        },
        toRouterOrAlert(index){
          if(this.$store.getters.isLogin){
            this.$router.push(index)
          }else{
            this.$alert('请先登录！', {
              confirmButtonText: '确定',
            });
          }
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
        typeList(index){
          this.index = index
        },
        //处理列表点击事件
        handle(row){
         // console.log(row.stockId)
          this.$store.commit('stockId',row.stockId)
          this.$store.commit('stockName',row.stockName)
          this.$router.push('StockDisplay')
        },

      },
      computed:{
          tableData:function(){
            return this.$store.state.stockList
          },
        isLogin:function () {
          return this.$store.state.isLogin
        },
          list:function () {

            let list = []
            for(let i = 0;i<this.tableData.length;i++){
              if(this.index===2){
                list.push(this.tableData[i])
              }
              else
              {
                if(this.tableData[i].tradeMarket===this.index){
                  list.push(this.tableData[i])
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
  .selectOn{
    background-color: #409EFF;
  }
  a{
    text-decoration: none;
  }
  #in{
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }
  #select{
    margin-top: 6%;
    float: right;
    width: 30%;
  }
  #stock{
    margin-top: 15%;
  }
</style>
