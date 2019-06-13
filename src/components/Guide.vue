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
      <div style="margin-left: 10%;margin-right: 10%;text-align: left">
        <p>
          {{ msg }}
        </p>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "Guide",
    data() {
      return {
        activeIndex: 'Guide',
        activeIndexSelfCenter: 'Guide',
        msg: '一、交易时间\n' +
        '周一至周五 (法定休假日除外)\n' +
        '上午9：30 --11：30\n' +
        '下午1：00 -- 3：00\n' + '\n' +
        '二、竞价成交\n' +
        '(1) 竞价原则：价格优先、时间优先。价格较高的买进委托优先于价格较低买进委托，价\n' +
        '格较低卖出委托优先于较高的卖出委托；同价位委托，则按时间顺序优先。\n' +
        '(2) 竞价方式：上午9：15--9：25进行集合竞价 (集中一次处理全部有效委托)；上午\n' +
        '9：30--11：30、下午1：00--3：00进行连续竞价 (对有效委托逐笔处理)。\n' +
        '三、交易单位\n' +
        '(1) 股票的交易单位为“股”，100股＝1手，委托买入数量必须为100股或其整数倍；\n' +
        '(2) 基金的交易单位为“份”，100份＝1手，委托买入数量必须为100份或其整数倍；\n' +
        '(3) 国债现券和可转换债券的交易单位为“手”，1000元面额＝1手，委托买入数量必须为1\n' +
        '手或其整数倍；\n' +
        '(4)当委托数量不能全部成交或分红送股时可能出现零股 (不足1手的为零股)，零股只能委\n' +
        '托卖出，不能委托买入零股。\n' +
        '四、报价单位\n' +
        '股票以“股”为报价单位；基金以“份”为报价单位；债券以“手”为报价单位。例：行情\n' +
        '显示“深发展A”30元，即“深发展A”股现价30元／股。\n' +
        '交易委托价格最小变动单位：A股、基金、债券为人民币0.01元；深B为港币0.01元；沪B为\n' +
        '美元0.001元；上海债券回购为人民币0.005元。\n' +
        '五、涨跌幅限制\n' +
        '在一个交易日内，除首日上市证券外，每只证券的交易价格相对上一个交易日收市价的涨跌\n' +
        '幅度不得超过10%，超过涨跌限价的委托为无效委托。\n' +
        '六、"ST"股票\n' +
        '在股票名称前冠以“ST”字样的股票表示该上市公司最近两年连续亏损，或亏损一年，但净\n' +
        '资产跌破面值、公司经营过程中出现重大违法行为等情况之一，交易所对该公司股票交易进行\n' +
        '特别处理。股票交易日涨跌幅限制5%。\n' +
        '七、委托撤单\n' +
        '在委托未成交之前，投资者可以撤销委托。\n' +
        '八、"T+1"交收\n' +
        '“T”表示交易当天，“T+1”表示交易日当天的第二天。“T+1”交易制度指投资者当天买\n' +
        '入的证券不能在当天卖出，需待第二天进行自动交割过户后方可卖出。（债券当天允许“T+0”\n' +
        '回转交易。）\n' +
        '资金使用上，当天卖出股票的资金回到投资者账户上可以用来买入股票，但不能当天提取，\n' +
        '必须到交收后才能提款。(A股为T+1交收，B股为T+3交收。）',
        help: {
          name: '',
          type: '',
          content: '',
        }
      }
    },
    created: {
    },
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
      }
      ,
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      }
      ,
      toFirst() {
        if (this.$store.getters.isLogin) {
          this.$router.push('AfterLogin')
        } else {
          this.$router.push('/')
        }
      }
      ,
      toRouterOrAlert(index) {
        if (this.$store.getters.isLogin) {
          this.$router.push(index)
        } else {
          this.$alert('请先登录！', {
            confirmButtonText: '确定',
          });
        }
      }
      ,

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

  p {
    text-align: left;
    text-indent: 2em;
    line-height: 25px;
    font-family: 微软雅黑;
    font-size: medium;
  }

</style>
