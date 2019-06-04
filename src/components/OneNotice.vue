<template>
  <div>
    <el-menu :default-active="activeIndex"
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
        <template slot="title" >信息统计</template>
        <el-menu-item index="TodayExchange">当日成交</el-menu-item>
        <el-menu-item index="TodayOrder">当日委托</el-menu-item>
        <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
        <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
      </el-submenu>

      <el-menu-item style="margin-left: 50px" index="SelfCenter">个人中心</el-menu-item>
    </el-menu>

  </div>
</template>

<script>
  import api from "../api";

  export default {
    name: "OneNotice",
    data() {
      return {
        title: ''
      }
    },
    created() {
      api.JH_news('/oneNotice/index', {
        params: {
          stockId: this.$store.state.stockId
        }
      })
    }
  }
</script>

<style scoped>

</style>
