<template>
  <div>
    <div id="navigator">
      <el-image :src="url" style="height: 45px;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router= true

               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item  index="AfterLogin" >首页</el-menu-item>
        <el-submenu  index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList" >股票列表</el-menu-item>
          <el-menu-item index="Rank" >排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item index="BuyAtLimitPrice" >股票买卖</el-menu-item>
        <el-menu-item  index="Guide">股票指南</el-menu-item>
        <el-submenu  index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange" >当日成交</el-menu-item>
          <el-menu-item index="TodayOrder" >当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo" >历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo" >历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style = "padding-left: 4%" index="2">
          <template slot="title" ><span style="color: #409EFF;font-size: 6px;margin:auto">欢迎您！{{this.$store.getters.getUsername}}</span></template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;" >
      <div style="width: 50%;margin: auto">
        <search></search>
      </div>
<!--指数-->
      <div style="margin-top: 2%;display: inline-block;width: 30%">
        <div style="float: left;width: 40%">
          <el-button v-if="this.shenIndex.lastIndex>this.shenIndex.yesterdayCloseIndex" type="text" class="index" style="color: #ff3434" @click="gotoIndexDisplay(shenIndex.indexId)">深证成指：{{shenIndex.lastIndex}}</el-button>
          <el-button v-else-if="this.shenIndex.lastIndex<this.shenIndex.yesterdayCloseIndex" type="text" class="index" style="color: #02e602" @click="gotoIndexDisplay(shenIndex.indexId)">深证成指：{{shenIndex.lastIndex}}</el-button>
          <el-button v-else type="text" class="index"  @click="gotoIndexDisplay(shenIndex.indexId)">深证成指：{{shenIndex.lastIndex}}</el-button>
        </div>
        <div style="float: right;width: 40%">
          <el-button v-if="this.shangIndex.lastIndex>this.shangIndex.yesterdayCloseIndex" type="text" class="index" style="color: #ff3434" @click="gotoIndexDisplay(shangIndex.indexId)">上证指数：{{shangIndex.lastIndex}}</el-button>
          <el-button v-else-if="this.shangIndex.lastIndex<this.shangIndex.yesterdayCloseIndex" type="text" class="index" style="color: #02e602" @click="gotoIndexDisplay(shangIndex.indexId)">上证指数：{{shangIndex.lastIndex}}</el-button>
          <el-button v-else type="text" class="index"  @click="gotoIndexDisplay(shangIndex.indexId)">上证指数：{{shangIndex.lastIndex}}</el-button>
        </div>
      </div>
    <div id="in">
      <!--公告 background-color: lavender -->
      <div id="left">
        <el-card class="box-card" style="height: 350px; " shadow="always">
          <div slot="header" class="clearfix" >
            <i class="el-icon-postcard" style="font-size: 25px"></i>
            <span style="font-size: 25px;">公告</span>
            <router-link to="/News">
            <el-button style="float: right; padding: 3px 0" type="text">更多公告</el-button>
            </router-link>
          </div>

          <el-table
            :data="news"
            @row-dblclick="handleNews"
            style="width: 100%;font-size: 6px;cursor: pointer;"
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
        <el-card class="box-card" style="height: 350px; "shadow="always">
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
                <span v-if="scope.row.lastTradePrice>scope.row.yesterdayClosePrice" style="color: #ff3434" >{{scope.row.lastTradePrice}}</span>
                <span v-else-if="scope.row.lastTradePrice===scope.row.yesterdayClosePrice">{{scope.row.lastTradePrice}}</span>
                <span v-else style="color: #02e602">{{scope.row.lastTradePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="今日涨幅%"
              prop="increase"
              width="95"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.increase>0" style="color: #ff3434" >{{scope.row.increase}}</span>
                <span v-else-if="scope.row.increase<0" style="color: #02e602">{{scope.row.increase}}</span>
                <span v-else >{{scope.row.increase}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="openPrice"
              label="今开盘"
              width="80"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.openPrice>scope.row.yesterdayClosePrice" style="color: #ff3434" >{{scope.row.openPrice}}</span>
                <span v-else-if="scope.row.openPrice===scope.row.yesterdayClosePrice">{{scope.row.openPrice}}</span>
                <span v-else style="color: #02e602">{{scope.row.openPrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="yesterdayClosePrice"
              label="昨收盘"
              width="80"
              align="center">
            </el-table-column>
          </el-table>
        </el-card>

      </div>


    </div>

    </div>


  </div>
</template>

<script>
  import Vue from 'vue'
  import Search from './Search'
  import TheFooter from './TheFooter'

  Vue.component( 'search',Search);
  Vue.component( 'theFooter',TheFooter);

  export default {
    components: {
      Search,
      TheFooter
    },
    data() {
      return {
        activeIndex: 'AfterLogin',
        url:'../../../static/images/xMarket.png',
        url1:'../../../static/images/jzgf.jpg',
        url2:'../../../static/images/db1.png',
        url3:'../../../static/images/db2.png',
        url4:'../../../static/images/db3.png',
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
        this.$message('请先登录');
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
        this.$store.commit('changeRout', 5);
        this.$router.push('StockDisplay')
      },
      handleNews(row){
        this.$store.commit('title',row.title)
        this.$router.push('OneNew')
      },
      gotoIndexDisplay(index){
        this.$store.commit('indexId',index)
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
              this.shangIndex.indexId = data[i].indexId
            }
            else{
              this.shenIndex.lastIndex = data[i].lastIndex
              this.shenIndex.yesterdayCloseIndex = data[i].yesterdayCloseIndex
              this.shenIndex.indexId = data[i].indexId
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
          //设置保留小数点后两位
          for(let i = 0; i<data.length; i++){
            for(let key in data[i]){
              if(typeof(data[i][key])==="number"){
                data[i][key] = data[i][key].toFixed(2)
              }
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
    width: 80%;
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
    width: 40%;
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
    font-size: 16px;
    font-family: "Century Gothic";
  }
  #navigator{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    background-color: #fff;
    top: 0;
    z-index: 2;
    display: inline-block;
  }

</style>
