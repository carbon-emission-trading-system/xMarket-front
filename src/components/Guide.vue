<template>
  <div style=" height: 100%;margin: 0px; padding: 0px;">

    <div id="navigator">
      <el-image :src="url" style="height: 10%;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               text-color="#000000"
               active-text-color="#ffd04b"
               v-bind:router= true

               style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

        <el-menu-item  index="AfterLogin"  @click="toFirst">首页</el-menu-item>
        <el-submenu style = "padding-left: 2%" index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList" >股票列表</el-menu-item>
          <el-menu-item index="Rank" >排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item style = "padding-left: 1%"  @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
        <el-menu-item style = "padding-left: 1%" index="Guide">股票指南</el-menu-item>
        <el-submenu style = "padding-left: 1%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')" >当日成交</el-menu-item>
          <el-menu-item  @click="toRouterOrAlert('TodayOrder')" >当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')" >历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item style = "padding-left: 1%" @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span></template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;" >
    <div style="height:100%;float: left;width: 100%;">
      <el-tabs :tab-position="tabPosition"
               style="height:auto;width: 80%;margin-left: 10%;margin-top: 5%" type="border-card"

               pin="true">
        <!--<div style="width: 20%;height: 20%">-->
        <el-tab-pane label="交易规则" class="leftBox">
          <div class="rightCard">
            <span style="font-size:30px" sortable>交易规则</span>
            <el-divider content-position="right" style="width: 100%"></el-divider>
            <div style="height:auto; margin-top:10%;margin-left:5%;margin-right: 5%;text-align: left">
              <p>
                一、交易时间
                周一至周五 (法定休假日除外)
                上午9：30 --11：30
                下午1：00 -- 3：00
              </p>
              <p>
                二、竞价成交
                (1) 竞价原则：价格优先、时间优先。价格较高的买进委托优先于价格较低买进委托，价
                格较低卖出委托优先于较高的卖出委托；同价位委托，则按时间顺序优先。
                (2) 竞价方式：上午9：15--9：25进行集合竞价 (集中一次处理全部有效委托)；上午
                9：30--11：30、下午1：00--3：00进行连续竞价 (对有效委托逐笔处理)。
              </p>
              <p>
                三、交易单位
                (1) 股票的交易单位为“股”，100股＝1手，委托买入数量必须为100股或其整数倍；
                (2) 基金的交易单位为“份”，100份＝1手，委托买入数量必须为100份或其整数倍；
                (3) 国债现券和可转换债券的交易单位为“手”，1000元面额＝1手，委托买入数量必须为1
                手或其整数倍；
                (4)当委托数量不能全部成交或分红送股时可能出现零股 (不足1手的为零股)，零股只能委
                托卖出，不能委托买入零股。
              </p>
              <p>
                四、报价单位
                股票以“股”为报价单位；基金以“份”为报价单位；债券以“手”为报价单位。例：行情
                显示“深发展A”30元，即“深发展A”股现价30元／股。
                交易委托价格最小变动单位：A股、基金、债券为人民币0.01元；深B为港币0.01元；沪B为
                美元0.001元；上海债券回购为人民币0.005元。
              </p>
              <p>
                五、涨跌幅限制
                在一个交易日内，除首日上市证券外，每只证券的交易价格相对上一个交易日收市价的涨跌
                幅度不得超过10%，超过涨跌限价的委托为无效委托。
              </p>
              <p>
                六、"ST"股票
                在股票名称前冠以“ST”字样的股票表示该上市公司最近两年连续亏损，或亏损一年，但净
                资产跌破面值、公司经营过程中出现重大违法行为等情况之一，交易所对该公司股票交易进行
                特别处理。股票交易日涨跌幅限制5%。
              </p>
              <p>
                七、委托撤单
                在委托未成交之前，投资者可以撤销委托。
              </p>
              <p>
                八、"T+1"交收
                “T”表示交易当天，“T+1”表示交易日当天的第二天。“T+1”交易制度指投资者当天买
                入的证券不能在当天卖出，需待第二天进行自动交割过户后方可卖出。(债券当天允许“T+0”
                回转交易。)
                资金使用上，当天卖出股票的资金回到投资者账户上可以用来买入股票，但不能当天提取，
                必须到交收后才能提款。(A股为T+1交收，B股为T+3交收。)
              </p>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="指标说明" class="leftBox" sortable>
          <div class="rightCard">
            <span style="font-size:30px" sortable>指标说明</span>
            <el-divider content-position="right" style="width: 100%"></el-divider>
            <div style="height:auto; margin-top:10%;margin-left:5%;margin-right: 5%;text-align: left">
              <h1>
                K线图指标
              </h1>
              <h3>
                VOL指标（成交量）
              </h3>
              <p>
                功能名称 VOL指标（成交量）
              </p>
              <p>
                功能描述 VOL是成交量指标，成交量是指个股或大盘的成交总手
              </p>
              <p>
                业务规则 VOL是当日实际成交量的反映。
              </p>
              <p>
                用公式可以表现为:
              </p>
              <p>
                VOL=∑nVi/N
              </p>
              <p>
                其中,i=1,2,3,......,n；
              </p>
              <p>
                N=选定的时间参数,如10或30；
              </p>
              <p>
                Vi:i日成交量。
              </p>
              <p>
                真实计算 VOL
              </p>
              <h3>
                EXPMA指标
              </h3>
              <p>
                功能名称 EXPMA指标
              </p>
              <p>
                功能描述 指数移动平均值,是一种趋向类指标，指数移动平均值是以指数式递减加权的移动平均。
              </p>
              <p>
                业务规则 12日EMA：EMA（12）=前一日EMA（12）×11/13+今日收盘价×2/13
              </p>
              <p>
                26日EMA：EMA（26）=前一日EMA（26）×25/27+今日收盘价×2/27
              </p>
              <p>
                附：
              </p>
              <p>
                EMA的初值，用第一天的收盘价
              </p>
              <p>
                真实计算 EMA（12）、EMA（24）
              </p>
              <h3>
                MACD指标
              </h3>
              <p>
                功能名称 MACD指标
              </p>
              <p>
                功能描述 MACD是利用收盘价的短期（常用为12日）指数移动平均线与长期（常用为26日）指数移动平均线之间的聚合与分离状况，对买进、卖出时机作出研判的技术指标。
              </p>
              <p>
                业务规则 快速线为DIF DIF=今日EMA（12）－ 今日EMA（26）
              </p>
              <p>
                慢速线为DEM 今日DEA（MACD）=前一日DEA×8/10+今日DIF×2/10。
              </p>
              <p>
                柱状图为MACD （DIF-DEA）×2
              </p>
              <p>
                真实计算 DIF DEM MACD
              </p>
              <h3>
                W&R指标
              </h3>
              <p>
                功能名称 W&R指标
              </p>
              <p>
                功能描述 由Larry williams创造，是一种利用振荡点来反映市场超买超卖现象，预测循环周期内的高点和低点，用来判断市场强弱分界的指标。
              </p>
              <p>
                业务规则 R=HY-LY
              </p>
              <p>
                Q=HY-今天的收盘价
              </p>
              <p>
                W&R=Q/R*100
              </p>
              <p>
                附：
              </p>
              <p>
                HY=N天中的最高价
              </p>
              <p>
                LY=N天中的最低价
              </p>
              <p>
                N一般取值为6,10
              </p>
              <p>
                真实计算 W&R（N）） 上限值线80 中间线50 下限值线20
              </p>
              <h3>
                KDJ指标
              </h3>

              <p>
                功能名称 KDJ指标
              </p>
              <p>
                功能描述
              </p>
              <p>
                随机指标KDJ一般是用于股票分析的统计体系，根据统计学原理，通过一个特定的周期（常为9日、9周等）内出现过的最高价、最低价及最后一个计算周期的收盘价及这三者之间的比例关系，来计算最后一个计算周期的未成熟随机值RSV，然后根据平滑移动平均线的方法来计算K值、D值与J值，并绘成曲线图来研判股票价格走势。
              </p>
              <p>
                业务规则 K值：当日K值 = 2/3×前一日K值+1/3×当日RSV
              </p>
              <p>
                D值：当日D值 = 2/3×前M日D值+1/3×当日K值
              </p>
              <p>
                J值： 当日J值 = 3*当日K值-2*当日D值
              </p>
              <p>
                附：
                1、 先计算：未成熟随机指标值RSV
                RSV=（Cn－Ln）/（Hn－Ln）×100
                （Cn为第n日收盘价；Ln为n日内的最低价；Hn为n日内的最高价）
              </p>
              <p>
                2、 N、M1、M2 天数，一般取9、3、3
              </p>
              <p>
                3、 若无前一日K 值与D值，则可分别用50来代替。
                真实计算 K值：当日K值 = M1日平均 RSV
                D值：当日D值 = M2日平均K值
                J值： 当日J值 = 3*当日K值-2*当日D值
              </p>
              <h3>
                BIAS指标
              </h3>

              <p>
                功能名称 BIAS指标
              </p>
              <p>
                功能描述 乖离率(BIAS)，又称偏离率，简称Y值，是通过计算市场指数或收盘价与某条移动平均线之间的差距百分比，以反映一定时期内价格与其MA偏离程度的指标
              </p>
              <p>
                业务规则 乖离率=（当日收盘价-N日内移动平均价）/N日内移动平均价╳100%
              </p>
              <p>
                5日乖离率=（当日收盘价-5日内移动平均价）/5日内移动平均价╳100%
              </p>
              <p>
                BIAS1 : (CLOSE-MA(CLOSE,L1））/MA(CLOSE,L1）*100;

              </p>
              <p>
                BIAS2 : (CLOSE-MA(CLOSE,L2））/MA(CLOSE,L2）*100;
              </p>
              <p>
                BIAS3 : (CLOSE-MA(CLOSE,L3））/MA(CLOSE,L3）*100
              </p>
              <p>
                附：
              </p>
              <p>
                CLOSE为当日收盘价
              </p>
              <p>
                MA(CLOSE,N)为N日均线的当前数值。
              </p>
              <p>
                L1 = 6，L2 = 12，L3=24
              </p>
              <h3>
                PSY指标
              </h3>
              <p>

                功能名称 PSY指标
                功能描述 心理线（PSY）指标将一定时期内投资者趋向买方或卖方的心理事实转化为数值，从而判断股价的未来趋势。
                业务规则 1、PSY=N日内上涨天数/N*100
                2、PSYMA=PSY的M日简单移动平均
                3、参数N设置为12日，参数M设置为6日
                真实计算 PSY　PSYMA

              </p>
              <h3>
                RSI指标
              </h3>
              <p>

                功能名称 RSI指标
                功能描述
                RSI指标正是根据供求平衡的原理，通过测量某一个期间内股价上涨总幅度占股价变化总幅度平均值的百分比，来评估多空力量的强弱程度，进而提示具体操作的。相对强弱指数RSI是根据一定时期内上涨和下跌幅度之和的比率制作出的一种技术曲线。能够反映出市场在一定时期内的景气程度。
                业务规则 N日RSI =N日内收盘涨幅的平均值/(N日内收盘涨幅均值+N日内收盘跌幅均值) ×100
                由上面算式可知RSI指标的技术含义，即以向上的力量与向下的力量进行比较，若向上的力量较大，则计算出来的指标上升；若向下的力量较大，则指标下降，由此测算出市场走势的强弱。
                真实计算 N日RSI N日内收盘涨幅的平均值 N日内收盘跌幅均值
              </p>

              <h3>
                ASI指标
              </h3>
              功能名称 ASI指标
              功能描述 （振动升降指标）ASI指标以开盘、最高、最低、收盘价与前一交易日的各种价格相比较作为计算因子。
              业务规则 1、A=∣当天最高价-前一天收盘价∣
              B=∣当天最低价-前一天收盘价∣
              C=∣当天最高价-前一天最低价∣
              D=∣前一天收盘价-前一天开盘价∣
              2、比较A、B、C三数值：若A最大，R=A+1/2B+1/4D(*A>B与A>C不可能同时成立，因A>B指前日收盘价位于当日振幅的下半部分，即前日收盘价低于当日最高价；而A>C指的是当日最高价低于前日收盘价；故A最大不存在）；若B最大，R=B+1/2A+1/4D；若C最大，R=C+1/4D
              3、E=当天收盘价-前一天收盘价
              F=当天收盘价-当天开盘价
              G=前一天收盘价-前一天开盘价
              4、X=E+1/2F+G
              5、K=A、B之间的最大值
              6、L=3；SI=50*X/R*K/L；ASI=累计每日之SI值
              真实计算 ASI

              <h1>分时图指标信息：</h1>
              <h3>
                RSIFS指标
              </h3>
              功能名称 RSIFS指标
              功能描述 RSIFS是分时图下的RSI指标，计算方法和k线图下的RSI指标相同
              RSIFS指标正是根据供求平衡的原理，通过测量某一个期间内股价上涨总幅度占股价变化总幅度平均值的百分比，来评估多空力量的强弱程度，进而提示具体操作的。相对强弱指数RSI是根据一定时期内上涨和下跌幅度之和的比率制作出的一种技术曲线。能够反映出市场在一定时期内的景气程度。
              业务规则 N日RSIFS =N日内收盘涨幅的平均值/(N日内收盘涨幅均值+N日内收盘跌幅均值) ×100
              由上面算式可知RSI指标的技术含义，即以向上的力量与向下的力量进行比较，若向上的力量较大，则计算出来的指标上升；若向下的力量较大，则指标下降，由此测算出市场走势的强弱。
              真实计算 N日RSIFS N日内收盘涨幅的平均值 N日内收盘跌幅均值

              <h3>
                MACDFS指标
              </h3>
              功能名称 MACDFS指标
              功能描述 MACDFS是分时图下的MACD指标，计算方法和k线图下的MACD指标相同
              MACDFS是利用收盘价的短期（常用为12日）指数移动平均线与长期（常用为26日）指数移动平均线之间的聚合与分离状况，对买进、卖出时机作出研判的技术指标。
              业务规则 快速线为DIF DIF=今日EMA（12）－ 今日EMA（26）
              慢速线为DEM 今日DEA（MACDFS）=前一日DEA×8/10+今日DIF×2/10。
              柱状图为MACDFS （DIF-DEA）×2
              真实计算 DIF DEM MACDFS
              <h3>
                KDJFS指标
              </h3>
              功能名称 KDJFS指标
              功能描述 KDJFS是分时图下的KDJ指标，计算方法和k线图下的KDJ指标相同
              随机指标KDJFS一般是用于股票分析的统计体系，根据统计学原理，通过一个特定的周期（常为9日、9周等）内出现过的最高价、最低价及最后一个计算周期的收盘价及这三者之间的比例关系，来计算最后一个计算周期的未成熟随机值RSV，然后根据平滑移动平均线的方法来计算K值、D值与J值，并绘成曲线图来研判股票价格走势。
              业务规则 K值：当日K值 = 2/3×前一日K值+1/3×当日RSV
              D值：当日D值 = 2/3×前M日D值+1/3×当日K值
              J值： 当日J值 = 3*当日K值-2*当日D值
              附：
              4、 先计算：未成熟随机指标值RSV
              RSV=（Cn－Ln）/（Hn－Ln）×100
              （Cn为第n日收盘价；Ln为n日内的最低价；Hn为n日内的最高价）
              5、 N、M1、M2 天数，一般取9、3、3
              6、 若无前一日K 值与D值，则可分别用50来代替。
              真实计算 K值：当日K值 = M1日平均 RSV
              D值：当日D值 = M2日平均K值
              J值： 当日J值 = 3*当日K值-2*当日D值

            </div>
          </div>
        </el-tab-pane>
        <!--</div>-->

      </el-tabs>
    </div>
    </div>


  </div>
</template>

<script>
  export default {
    name: "Guide",
    data() {
      return {
        tabPosition: 'left',
        activeIndex: 'Guide',
        activeIndexSelfCenter: 'Guide',
        url:'../../../static/images/xMarket.png',
        msg:'',
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

<style  >
  #exit {
    margin-top: 1.5%;
  }

  .rightCard {
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
    height: 100%;
  }

  p {
    text-align: left;
    text-indent: 2em;
    line-height: 25px;
    font-family: 微软雅黑;
    font-size: medium;
  }

  .leftBox {
    width: 100%;
    height: auto;
  }
  .el-tabs__header {
    width: 15%;
    margin-bottom: auto;

  }
  .el-tabs__nav{
    /*position:fixed;*/
    text-align: left;
  }
  #navigator{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    display: inline-block;
  }

</style>
