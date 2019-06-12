<template>
  <div style=" height: 100%;margin: 0px; padding: 0px;">

    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router=true>

        <el-menu-item style="margin-left: 15%" @click="toFirst">首页</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="StockList">股票列表</el-menu-item>
        <el-menu-item style="margin-left: 5%" @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
        <el-menu-item style="margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style="margin-left: 5%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')">当日成交</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('TodayOrder')">当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')">历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style="margin-left: 50px" @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="margin-left: 5%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>

      </el-menu>
    </div>

    <div style="height: 90%;float: left">
      <!-------左侧导航栏--->
      <div style="float: left; height: 100%;margin: 0px;padding: 0px;">
        <el-container style="border: 1px solid #eee; height: 100%;margin: 0px;
    padding: 0px;">
          <el-aside width="200px" style="background-color: rgb(238, 241, 246); height: 100%;
    margin: 0px;
    padding: 0px;">
            <el-menu :default-active="activeIndexSelfCenter"
                     router>
              <el-menu-item index="Guide">交易规则</el-menu-item>
            </el-menu>
          </el-aside>
        </el-container>
      </div>
    </div>

    <div class="rightCard">
      <span style="font-size:20px">交易规则</span>
      <el-divider content-position="right"></el-divider>
      {{ msg }}
    </div>

  </div>
</template>

<script>
  export default {
    name: "Guide",
    data() {
      return {
        activeIndex: 'Guide',
        msg: '',
        help: {
          name: '',
          type: '',
          content: '',
        }
      }
    },
    created: {},
    computed: {
      isLogin: function () {
        return this.$store.state.isLogin
      },
    },
    methods: {
      getGuide() {
        this.$api.http('post', "/api/getHelp", SentstockTrading).then(res => {
          this.$message.success('提交成功')
        }).catch((res) => {
          this.$message.error(res.message)
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
  #exit {
    margin-top: 1.5%;
  }

  .rightCard {
    margin-top: 5%;
    margin-left: 20%;
    margin-right: 10%;
  }

</style>
