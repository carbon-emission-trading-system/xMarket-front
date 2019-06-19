<template>
  <div>
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router= true>

        <el-menu-item style = "margin-left: 15%" index="AfterLogin" >首页</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList" >股票列表</el-menu-item>
          <el-menu-item index="Rank" >排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item style = "margin-left: 5%" index="BuyAtLimitPrice" >股票买卖</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange" >当日成交</el-menu-item>
          <el-menu-item index="TodayOrder" >当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo" >历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo" >历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item style = "margin-left: 5%" index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="2">
          <template slot="title" ><span style="color: #409EFF;font-size: 6px;margin:auto">欢迎您！{{this.$store.getters.getUsername}}</span></template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>

      </el-menu>
    </div>
    <div id="sin">

      <div id="sleft">
      <search></search>
      </div>
      <div id="sright">
        <el-button v-if="this.shenIndex.lastIndex>=this.shenIndex.yesterdayCloseIndex" type="text" class="index" style="color: #ff3434" @click="gotoIndexDisplay(0)">深证成指：{{shenIndex.lastIndex}}</el-button>
        <el-button v-else type="text" class="index" style="color: #02e602" @click="gotoIndexDisplay(0)">深证成指：{{shenIndex.lastIndex}}</el-button>
        <el-button v-if="this.shangIndex.lastIndex>=this.shangIndex.yesterdayCloseIndex" type="text" class="index" style="color: #ff3434" @click="gotoIndexDisplay(1)">上证指数：{{shangIndex.lastIndex}}</el-button>
        <el-button v-else type="text" class="index" style="color: #02e602" @click="gotoIndexDisplay(1)">上证指数：{{shangIndex.lastIndex}}</el-button>
    </div>

    </div>
  <div id="in">
    <!--公告 background-color: lavender -->
    <div id="left">
      <el-card class="box-card" style="height: 350px; ">
        <div slot="header" class="clearfix">
          <i class="el-icon-postcard" style="font-size: 25px"></i>
          <span style="font-size: 25px">公告</span>
          <router-link to="/News">
          <el-button style="float: right; padding: 3px 0" type="text">更多公告</el-button>
          </router-link>
        </div>

        <el-table
          :data="news"
          @row-dblclick="handleNews"
          style="width: 100%;font-size: 6px;cursor: pointer"
          >
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
      <el-card class="box-card" style="height: 350px; ">
        <div slot="header" class="clearfix">
          <i class="el-icon-setting" style="font-size: 25px"></i>
          <span style="font-size: 25px">自选股</span>
          <router-link to="/SelfSelectedStock"><el-button style="float: right; padding: 3px 0" type="text">管理自选</el-button></router-link>
        </div>
        <el-table
          :data="stock"
          @row-dblclick="handle"
          style="width: 100%;font-size: 6px;cursor: pointer"
          height="250">
<!--          <el-table-column-->
<!--            prop="stockId"-->
<!--            label="股票代码"-->
<!--            width="85"-->
<!--            fixed-->
<!--            align="center">-->
<!--          </el-table-column>-->
          <el-table-column
            prop="stockName"
            label="股票简称"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="lastTradePrice"
            label="最新成交价"
            width="85"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.lastTradePrice>=scope.row.yesterdayClosePrice" style="color: #ff3434" >{{scope.row.lastTradePrice}}</span>
              <span v-else style="color: #02e602">{{scope.row.lastTradePrice}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="今日涨幅%"
            prop="increase"
            width="95"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.increase>=0" style="color: #ff3434" >{{scope.row.increase}}</span>
              <span v-else style="color: #02e602">{{scope.row.increase}}</span>
            </template>
          </el-table-column>
<!--          <el-table-column-->
<!--            prop="highestPrice"-->
<!--            label="最高价"-->
<!--            width="70"-->
<!--            align="center">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="lowestPrice"-->
<!--            label="最低价"-->
<!--            width="70"-->
<!--            align="center">-->
<!--          </el-table-column>-->
          <el-table-column
            prop="openPrice"
            label="今开盘"
            width="65"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.openPrice>=scope.row.yesterdayClosePrice" style="color: #ff3434" >{{scope.row.openPrice}}</span>
              <span v-else style="color: #02e602">{{scope.row.openPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="yesterdayClosePrice"
            label="昨收盘"
            width="65"
            align="center">
          </el-table-column>
<!--          <el-table-column-->
<!--            prop="tradeAmount"-->
<!--            label="成交额"-->
<!--            width="100"-->
<!--            align="center">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="totalMarketCapitalization"-->
<!--            label="市值"-->
<!--            width="70"-->
<!--            align="center">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="peRatio"-->
<!--            label="市盈率"-->
<!--            width="70"-->
<!--            align="center">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            prop="pbRatio"-->
<!--            label="市净率"-->
<!--            align="center"-->
<!--          >-->
<!--          </el-table-column>-->


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
        news: [],
        stock: [],
        shenIndex:{
          lastIndex:'',
          yesterdayCloseIndex:''
        },
        shangIndex:{
          lastIndex:'',
          yesterdayCloseIndex:''
        },
      }
    },
    created() {
      this.setNewsApi();
      this.setStocksApi();
      this.setIndexApi();
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
      handleNews(row){
        this.$store.commit('title',row.title)
        this.$router.push('OneNew')
      },
      gotoIndexDisplay(index){
        this.$store.commit('marketIndex',index)
        this.$router.push('IndexDisplay')
      },
      //获取公告
      setNewsApi:function () {
        this.$api.http('get','/api/getNews').then(res=>{
          let data = res.data
          if(data.length>=4){
            this.news = data.slice(0,4)
          }
          else{
            this.news = data;
          }
          }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      //获取指数
      setIndexApi:function () {
        this.$api.http('get','/api/getIndex').then(res=>{
          let data = res.data
          for(let i = 0; i<data.length; i++){
            if(data[i].indexName ==='上证指数'){
              this.shangIndex.lastIndex = data[i].lastIndex
              this.shangIndex.yesterdayCloseIndex = data[i].yesterdayCloseIndex
            }
            else{
              this.shenIndex.lastIndex = data[i].lastIndex
              this.shenIndex.yesterdayCloseIndex = data[i].yesterdayCloseIndex
            }
          }
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      //获取自选股
      setStocksApi:function () {
        let  params={
          userId: this.$store.getters.getUserId
        }
        this.$api.http('get','/api/selfSelectStockList',params).then(res=>{
          let data = res.data
          for(let i =0;i<data.length;i++){
            if(data[i].highestPrice===5e-324){
              data[i].highestPrice=null
            }
            if(data[i].lowestPrice===1.7976931348623157e+308){
              data[i].lowestPrice=null
            }
          }
          this.stock=data
          }).catch((error) => {
          this.$message.error(error.message)
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

  #sin{
    display: inline-block;
    width: 70%;
    margin: 0 auto;
  }
  #sleft{
    margin-top: 3%;
    float:left;
    width:60%;
    height: 50%
  }
  #sright{
    margin-top: 6%;
    float: right;
    width: 35%;
    height: 50%
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
  .index{
    font-size: 20px;
    font-family: "Century Gothic";
  }

</style>
