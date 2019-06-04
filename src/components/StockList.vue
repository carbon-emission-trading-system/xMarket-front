<template>
<<<<<<< HEAD
  <div id="StockList">
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               router="true">

        <el-menu-item style="margin-left: 20%" index="/">首页</el-menu-item>
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
      </el-menu>
    </div>
    <search></search>

    <div id="in">
      <div id="select">
        <el-button-group v-model="stockType">
          <el-button v-bind:class="{selectOn:this.index===2}" @click="typeList(2)">全部股票</el-button>
          <el-button v-bind:class="{selectOn:this.index===0}" @click="typeList(0)">深A</el-button>
          <el-button v-bind:class="{selectOn:this.index===1}" @click="typeList(1)">沪A</el-button>
        </el-button-group>
=======
    <div id="StockList">
      <div>
        <el-menu :default-active="this.activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 @select="handleSelect"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b"
                 router="true">

          <el-menu-item style = "margin-left: 20%" @click="toFirst" >首页</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="StockList" >股票列表</el-menu-item>
          <el-menu-item style = "margin-left: 5%" @click="toRouterOrAlert('BuyAtLimitPrice')" >股票买卖</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
          <el-submenu style = "margin-left: 5%" >
            <template slot="title">信息统计</template>
            <el-menu-item @click="toRouterOrAlert('TodayExchange')" >当日成交</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('TodayOrder')" >当日委托</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')" >历史持仓</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')" >历史成交</el-menu-item>
          </el-submenu>

          <el-menu-item style = "margin-left: 50px" @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        </el-menu>
>>>>>>> 28a10a674d927e598d55e0b38647942a383af0e3
      </div>

      <div id="stock">
        <el-table
          :data="list.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          @row-click="handle"
          style="width: 100%;font-size: 6px">
          <el-table-column
            prop="stockID"
            label="股票代码"
            width="85"
            align="center">
          </el-table-column>
          <el-table-column
            prop="stockName"
            label="股票简称"
            width="85"
            align="center">
          </el-table-column>
          <el-table-column
            prop="lastTradePrice"
            label="最新成交价"
            width="90"
            align="center">
          </el-table-column>
          <el-table-column
            prop="increase"
            label="今日涨幅"
            width="100"
            sortable
            align="center">
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
            prop="todayOpenPrice"
            label="今开盘"
            width="70"
            align="center">
          </el-table-column>
          <el-table-column
            prop="yesterdayOpenPrice"
            label="昨开盘"
            width="70"
            align="center">
          </el-table-column>
          <el-table-column
            prop="turnover"
            label="成交额"
            width="70"
            align="center">
          </el-table-column>
          <el-table-column
            prop="marketValue"
            label="市值"
            width="70"
            align="center">
          </el-table-column>
          <el-table-column
            prop="priceEarningsRatio"
            label="市盈率"
            width="70"
            align="center">
          </el-table-column>
          <el-table-column
            prop="priceToBookRatio"
            label="市净率"
            align="center"
          >
          </el-table-column>

        </el-table>
        <div class="block" style="margin-top:30px;">
          <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange"
                         :current-page="currentPage" :page-sizes="[1,5,10]" :page-size="pageSize"
                         layout="total, sizes, prev, pager, next, jumper" :total="list.length">
          </el-pagination>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import Search from './Search'

  Vue.component('search', Search);

  export default {
    name: "StockList",
    components: {
      Search
    },
    data() {
      return {
        activeIndex: 'StockList',
        stockType: '全部股票',
        currentPage: 1,
        total: 20,
        pageSize: 5,
        index: 2
      }
    },
    mounted() {
      this.$store.dispatch('stockList')
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      typeList(index) {
        this.index = index
      },
<<<<<<< HEAD
      //处理列表点击事件
      handle(row) {
        // console.log(row.stockId)
        this.$store.commit('stockID', row.stockID)
        this.$store.commit('stockName', row.stockName)
        this.$router.push('StockDisplay')
      }
    },
    computed: {
      tableData: function () {
        return this.$store.state.stockList
      },
      list: function () {
        let list = []
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.index === 2) {
            list.push(this.tableData[i])
          }
          else {
            if (this.tableData[i].type === this.index) {
              list.push(this.tableData[i])
=======
      methods:{
        toFirst(){
          if(this.isLogin===true){
            this.$router.push('AfterLogin')
          }else{
            this.$router.push('/')
          }
        },
        toRouterOrAlert(index){
          if(this.isLogin===true){
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
          this.$store.commit('stockID',row.stockID)
          this.$store.commit('stockName',row.stockName)
          this.$router.push('StockDisplay')
        }
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
                if(this.tableData[i].type===this.index){
                  list.push(this.tableData[i])
                }
              }
>>>>>>> 28a10a674d927e598d55e0b38647942a383af0e3
            }
          }
        }
        return list
      }

    }
  }
</script>

<style scoped>
  .selectOn {
    background-color: #409EFF;
  }

  a {
    text-decoration: none;
  }

  #in {
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }

  #select {
    margin-top: 6%;
    float: right;
    width: 30%;
  }

  #stock {
    margin-top: 15%;
  }

</style>
