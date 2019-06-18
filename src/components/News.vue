<template>
  <div>

    <el-menu :default-active="this.activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             v-bind:router=true>

      <el-menu-item style = "margin-left: 15%" @click="toFirst" >首页</el-menu-item>
      <el-submenu style = "margin-left: 5%" index="3">
        <template slot="title">行情中心</template>
        <el-menu-item index="StockList" >股票列表</el-menu-item>
        <el-menu-item index="Rank" >排行榜</el-menu-item>
      </el-submenu>
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

    <div id="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 14px">
        <el-breadcrumb-item :to="{ path: '' }"><span @click="toFirst">首页</span></el-breadcrumb-item>
        <el-breadcrumb-item>更多公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="table">
      <el-table
        :data="news"
        stripe
        @row-click="handle"
        style="width: 100%">
        <el-table-column
          prop="title"
          label="标题"
          style="width: 40%"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          style="width: 40%"
          align="center">
        </el-table-column>
      </el-table>

    </div>

  </div>

</template>

<script>

  export default {
    name: "News",
    data() {
      return {
        activeIndex: '',
        news: []
      }
    },
    created() {
      this.setNewsApi();
    },
    methods: {
      setNewsApi: function () {
        this.$api.http('get','/api/getNews').then(res=>{
          this.news = res.data

        }).catch((error) => {
          this.$message.error(error.message)
        })
      },

      exit(){
        this.$store.commit('logout')
        this.$router.push('/')
      },
      //处理列表点击事件
      handle(row) {
        // console.log(row.stockId)
        this.$store.commit('title', row.title)
        this.$router.push('OneNew')
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

    },

  }
</script>

<style scoped>
  #bread {
    margin-top: 3%;
    margin-left: 15%;
    margin-bottom: 3%;

  }

  #table {
    margin-left: 15%;
    width: 60%;

  }

</style>
