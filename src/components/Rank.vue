<template>
    <div>
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
      </div>
    </div>
</template>

<script>
    export default {
        name: "Rank",
      data(){
          return{
            activeIndex: 'Rank',
          }
      },
      methods:{
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
      }
    }
</script>

<style scoped>

</style>
