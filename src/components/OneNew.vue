<template>
  <div>
    <div id="navigator">
      <el-image :src="url" style="height: 10%;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
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


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div id="all">
        <div id="bread">
          <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 14px">
            <el-breadcrumb-item :to="{ path: '' }"><span @click="toFirst">首页</span></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/News' }">更多公告</el-breadcrumb-item>
            <el-breadcrumb-item>公告详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div id="title" style="margin-top: 50px">
          <h2>{{this.news.title}}</h2>
          <span style="float: right">{{this.news.date}}</span>
        </div>

        <div id="tag">
          <el-divider></el-divider>
        </div>
        <p>{{this.news.content}}</p>

      </div>
    </div>

  </div>
</template>

<script>

  export default {
    name: "OneNotice",
    data() {
      return {
        url: '../../../static/images/xMarket.png',
        activeIndex: '',
        news: {},
      }
    },
    created() {
      this.setOneNewApi()
    },
    methods: {
      setOneNewApi() {
        let params = {
          title: this.$store.state.title
        }
        this.$api.http('get', '/api/getOneNews', params).then(res => {
          this.news = res.data;
          console.log(res.data)
        }).catch((error) => {
          this.$message.error(error.message)
        })
      },
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      toFirst() {
        if (this.$store.getters.isLogin) {
          this.$router.push('AfterLogin')
        } else {
          this.$router.push('/')
        }
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
    }
  }
</script>

<style scoped>
  #all {
    width: 60%;
    margin: 0 auto;
    height: 90%;
  }

  #tag {
    margin-top: 5%;
    margin-bottom: 4%;
  }

  #bread {
    margin-top: 5%;
    margin-bottom: 3%;

  }

  #navigator {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    display: inline-block;
  }

</style>
