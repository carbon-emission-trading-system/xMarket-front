<template>
  <div>
    <div id="navigator">
      <el-image :src="url" style="height: 45px;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router=true

               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item index="AfterLogin" @click="toFirst">首页</el-menu-item>
        <el-submenu  index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item  @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
        <el-menu-item  index="Guide">股票指南</el-menu-item>
        <el-submenu  index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')">当日成交</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('TodayOrder')">当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')">历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item  @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
        <el-menu-item v-else style="padding-left: 4%;color: #409EFF" ><span @click="login">登录</span><span>/</span>
          <span style="color: #409EFF" @click="register">注册</span>
        </el-menu-item>

      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
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
          style="width: 100%;cursor: pointer ;"
          height="500"
          :header-cell-style="{background:'#c2ccd0',color:'#606266'}">
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

  </div>

</template>

<script>

  export default {
    name: "News",
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: '',
        news: []
      }
    },
    created() {
      this.setNewsApi();
    },
    methods: {
      setNewsApi: function () {
        this.$api.http('get', '/api/getNews').then(res => {
          this.news = res.data

        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      register(){
        this.$router.push('/Register')
      },
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      //处理列表点击事件
      handle(row) {
        // console.log(row.stockId)
        this.$store.commit('title', row.title)
        this.$router.push('OneNew')
      },
      toFirst() {
        if (this.$store.getters.isLogin) {
          this.$router.push('AfterLogin')
        } else {
          this.$router.push('/')
        }
      },
      login(){
        this.$router.push('/')
        this.$store.commit('position',1)
      },
      toRouterOrAlert(index) {
        if (this.$store.getters.isLogin) {
          this.$router.push(index)
        } else {
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
    margin: auto;
    width: 60%;

  }

  #navigator {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    display: inline-block;
    background-color: #fff;
  }

</style>
