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
               v-bind:router= true>

        <el-menu-item style = "margin-left: 15%" index="AfterLogin" >首页</el-menu-item>
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
        <el-submenu style = "margin-left: 5%" index="2">
          <template slot="title" ><span style="color: #409EFF;font-size: 6px;margin:auto">欢迎您！{{this.$store.getters.getUsername}}</span></template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>

      </el-menu>
    </div>
    <search></search>
  <div id="in">
    <!--公告-->
    <div id="left">
      <el-card class="box-card" style="height: 350px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-postcard" style="font-size: 25px"></i>
          <span style="font-size: 25px">公告</span>
          <router-link to="/Notices">
          <el-button style="float: right; padding: 3px 0" type="text">更多公告</el-button>
          </router-link>
        </div>

        <el-table
          :data="notices"
          style="width: 100%">
          <el-table-column
            prop="title"
            label="标题"
            width="280">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
          >
          </el-table-column>
        </el-table>

      </el-card>

    </div>
    <!--自选股-->
    <div id="right">
      <el-card class="box-card" style="height: 350px;">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting" style="font-size: 25px"></i>
          <span style="font-size: 25px">自选股</span>
          <router-link to="/SelfSelectedStock"><el-button style="float: right; padding: 3px 0" type="text">管理自选</el-button></router-link>
        </div>
        <el-table
          :data="stock"
          @row-dblclick="handle"
          style="width: 100%;font-size: 6px"
          height="250">
          <el-table-column
            prop="stockId"
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
            prop="openPrice"
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
            prop="tradeAmount"
            label="成交额"
            width="70"
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
      </el-card>

    </div>
  </div>


  </div>
</template>

<script>
  import Vue from 'vue'
  import Search from './Search'


  Vue.component( 'search',Search);

  export default {
    components: {
      Search,
    },
    data() {
      return {
        activeIndex: 'AfterLogin',
        notices: [],
        stock: []
      }
    },
    created() {
      this.setNoticesApi();
      this.setStocksApi();
    },
    beforeMount(){
      let isLogin=this.$store.getters.isLogin
      if(!isLogin){
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
        this.$router.push('/')
      }
    },
    methods: {
      /**
       * @since 导航栏需要
       * @param key
       * @param keyPath
       */
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
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
      //获取公告
      setNoticesApi:function () {
        this.$api.http('post','/api/getNews').then(res=>{
            this.notices = res.data;
          }).catch((error)=>{

        })
      },
      //获取自选股
      setStocksApi:function () {
        let  params={
          userId: this.$store.getters.getUserId
        }
        this.$api.http('get','/api/selfSelectStockList',params).then(res=>{
            console.log(res);
            this.stock=res.data
          })
      }
    },
  }
</script>


<style scoped>
  #in{
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }
  #left{
    margin-top: 5%;
    float:left;
    width:45%;
    height: 50%
  }
  #right{
    margin-top: 5%;
    float: right;
    width: 45%;
    height: 50%
  }
  #exit{
    margin-top: 1.5%;
  }

  a{
    text-decoration: none;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
  }

</style>
