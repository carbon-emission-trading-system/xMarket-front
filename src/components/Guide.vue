<template>
  <div>

<<<<<<< HEAD
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
=======
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
      </div>
>>>>>>> 28a10a674d927e598d55e0b38647942a383af0e3

        <el-menu-item style="margin-left: 50px" index="SelfCenter">个人中心</el-menu-item>
      </el-menu>
    </div>

  </div>
</template>

<script>
<<<<<<< HEAD
  export default {
    name: "Guide",
    data() {
      return {
        activeIndex: 'Guide',
      }
    },
  }
=======
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
>>>>>>> 28a10a674d927e598d55e0b38647942a383af0e3
</script>

<style scoped>

</style>
