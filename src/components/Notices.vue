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
        <template slot="title" index="1">信息统计</template>
        <el-menu-item index="TodayExchange">当日成交</el-menu-item>
        <el-menu-item index="TodayOrder">当日委托</el-menu-item>
        <el-menu-item index="HistoryHoldPositionInfo">历史持仓</el-menu-item>
        <el-menu-item index="HistoryExchangeInfo">历史成交</el-menu-item>
      </el-submenu>

      <el-menu-item style="margin-left: 50px" index="SelfCenter">个人中心</el-menu-item>
    </el-menu>

    <div id="bread">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 14px">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>更多公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div id="table">
      <el-table
        :data="notices"
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
  import api from "../api";

  export default {
    name: "Notices",
    data() {
      return {
        activeIndex: '/',
        notices: []
      }
    },
    created() {
      this.setNoticesApi();
    },
    methods: {
      setNoticesApi: function () {
        api.JH_news('/notices/index')
          .then(res => {
            console.log(res);
            this.notices = res.notices;
          });
      },
      //处理列表点击事件
      handle(row) {
        // console.log(row.stockId)
        this.$store.commit('title', row.title)
        this.$router.push('OneNotice')
      }
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
