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

          <el-menu-item style = "margin-left: 20%" @click="toFirst" >首页</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="StockList" >股票列表</el-menu-item>
          <el-menu-item style = "margin-left: 5%" @click="toRouterOrAlert('BuyAtLimitPrice')" >股票买卖</el-menu-item>
          <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
          <el-submenu style = "margin-left: 5%" index="1">
            <template slot="title">信息统计</template>
            <el-menu-item @click="toRouterOrAlert('TodayExchange')" >当日成交</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('TodayOrder')" >当日委托</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')" >历史持仓</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')" >历史成交</el-menu-item>
          </el-submenu>

          <el-menu-item style = "margin-left: 50px" @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
          <div id="exit" v-if="this.$store.state.isLogin">
            <el-link type="primary" @click="exit">退出</el-link>
          </div>
        </el-menu>
      </div>

    </div>
</template>

<script>
    export default {
        name: "Guide",
      data() {
        return {
          activeIndex: 'Guide',
        }
      },
      computed:{
        isLogin:function () {
          return this.$store.state.isLogin
        },
      },
      methods:{
        exit(){
          this.$store.commit('logout')
          this.$router.push('/')
        },
          toFirst(){
            console.log(this.$store.state.isLogin)
            console.log(this.isLogin)
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

      }
    }
</script>

<style scoped>
  #exit{
    margin-top: 1.5%;
  }

</style>
