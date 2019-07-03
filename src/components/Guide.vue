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
        <el-submenu index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList">股票列表</el-menu-item>
          <el-menu-item index="Rank">排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
        <el-menu-item index="Guide">股票指南</el-menu-item>
        <el-submenu index="1">
          <template slot="title">信息统计</template>
          <el-menu-item @click="toRouterOrAlert('TodayExchange')">当日成交</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('TodayOrder')">当日委托</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')">历史持仓</el-menu-item>
          <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
        </el-submenu>
        <el-menu-item @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
        <el-submenu v-if="this.$store.getters.isLogin" style="padding-left: 4%" index="2">
          <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span>
          </template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
        <el-menu-item v-else style="padding-left: 4%;color: #409EFF"><span @click="login">登录</span><span>/</span>
          <span style="color: #409EFF" @click="register">注册</span>
        </el-menu-item>


      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;">
      <div style="float: left;width: 100%;">
        <el-tabs :tab-position="tabPosition"
                 style="width: 80%;margin-left: 10%;margin-top: 5%" type="border-card"

                 pin="true">
          <!--<div style="width: 20%;height: 20%">-->
          <el-tab-pane label="交易规则" class="leftBox">
            <div class="rightCard">
              <span style="font-size:30px" sortable>虚市交易规则简章</span>
              <el-divider content-position="right" style="width: 100%"></el-divider>
              <div style=" margin-top:10%;margin-left:5%;margin-right: 5%;text-align: left">
                <h class="chouh">
                  一、交易时间
                </h>
                <p
                  class="choup">
                  北京时间 9 : 30 - 22 : 00
                </p>
                <p
                  class="choup">

                  9 : 15 - 9 : 30，开盘集合竞价，其中9 : 20 - 9 : 30不允许撤消委托；
                </p>
                <p
                  class="choup">
                  9 : 25 - 9 : 30，交易主机只接受申报，但不对买卖申报或撤销申报作处理
                </p>
                <p
                  class="choup">

                  21 : 57 - 22 : 00为收盘集合竞价，不允许撤消委托；
                </p>
                <p
                  class="choup">
                  附：周末及节假日不休市，可正常交易；
                </p>
                <h class="chouh">
                  二、竞价成交
                </h>
                <p class="choup">
                </p>
                <p class="choup">
                  (1) 竞价原则：价格优先、时间优先。价格较高的买进委托优先于价格较低买进委托，价格较低卖出委托优先于较高的卖出委托；同价位委托，则按时间顺序优先。
                </p>
                <p class="choup">
                  (2) 竞价方式：上午9：15--9：25进行集合竞价 (集中一次处理全部有效委托)； 9：30--21：57进行连续竞价 (对有效委托逐笔处理)。21:57—22:00进行集合竞价并给出收盘价。
                </p>
                <h class="chouh">
                  三、交易单位
                </h>
                <p class="choup">
                </p>
                <p class="choup">
                  股票的交易单位为“股”，100股＝1手，委托买入数量必须为100股或其整数倍；
                </p>
                <h class="chouh">
                  四、报价单位
                </h>
                <p class="choup">
                  股票以“股”为报价单位
                </p>
                <p class="choup">
                  例：行情 显示“深发展A”30元，即“深发展A”股现价30元／股。
                  交易委托价格最小变动单位：A股为人民币0.01元；
                </p>
                <h class="chouh">
                  五、涨跌幅限制
                </h>
                <p class="choup">
                  在一个交易日内，除首日上市证券外，每只证券的交易价格相对上一个交易日收市价的涨跌
                  幅度不得超过10%，超过涨跌限价的委托为无效委托。
                </p>
                <h class="chouh">
                  六、委托撤单
                </h>
                <p class="choup">
                  在委托未成交之前，投资者可以撤销委托。
                </p>
                <h class="chouh">
                  七、"T+1"交收
                </h>
                <p class="choup">
                  “T”表示交易当天，“T+1”表示交易日当天的第二天。“T+1”交易制度指投资者当天买
                  入的证券不能在当天卖出，需待第二天进行自动交割过户后方可卖出。(债券当天允许“T+0”
                  回转交易。)
                </p>
                <p class="choup">
                  资金使用上，当天卖出股票的资金回到投资者账户上可以用来买入股票，但不能当天提取，
                  必须到交收后才能提款。(A股为T+1交收，B股为T+3交收。)
                </p>
                <h class="chouh">
                  八、手续费
                </h>
                <p class="choup">
                  用户在委托单成交时需要缴纳额外的费用，包括印花税、券商交易佣金和证管费。买方在委托下单时会冻结这部分资金，卖方在股票交易完成时从实际成交款中扣取。其中印花税向出让方单边征收（卖出缴），费用为实际成交金额的千分之一；券商交易佣金向双边征收，费用为实际成交金额的万分之二点五（0.025%）；证管费向双边征收，费用为实际成交金额的0.002%。
                </p>
                <h class="chouh">
                  九、冻结资金、冻结股票
                </h>
                <p class="choup">
                  在用户进行委托下单时，系统会冻结用户账户内资金或股票。委托完成时解冻。
                </p>
                <p class="choup">
                  (1)冻结资金的计算方式
                </p>
                <p class="choup">
                  限价买入：按用户当前价格乘以股票数量加上手续费的总和冻结资金。
                </p>
                <p class="choup">
                  市价买入：按股票当前涨停价格乘以股票数量加上手续费的总和冻结资金。
                </p>
                <p class="choup">
                  (2)冻结股票的计算方式
                  按照用户卖出数量冻结。
                </p>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="指标说明" class="leftBox" sortable>
            <div class="rightCard">
              <span style="font-size:30px" sortable>指标说明</span>
              <el-divider content-position="right" style="width: 100%"></el-divider>
              <div style="margin-top:10%;margin-left:5%;margin-right: 5%;text-align: left">
                <h1>
                  K线图指标
                </h1>
                <h3>
                  VOL指标（成交量）
                </h3>
                <p class="choup">
                  功能名称 VOL指标（成交量）
                </p>
                <p class="choup">
                  功能描述 VOL是成交量指标，成交量是指个股或大盘的成交总手
                </p>
                <p class="choup">
                  业务规则 VOL是当日实际成交量的反映。
                </p>
                <p class="choup">
                  用公式可以表现为:
                </p>
                <p class="choup">
                  VOL=∑nVi/N
                </p>
                <p>
                  其中,i=1,2,3,......,n；
                </p>
                <p class="choup">
                  N=选定的时间参数,如10或30；
                </p>
                <p class="choup">
                  Vi:i日成交量。
                </p>
                <p class="choup">
                  真实计算 VOL
                </p>
                <h3>
                  EXPMA指标
                </h3>
                <p class="choup">
                  功能名称 EXPMA指标
                </p>
                <p class="choup">
                  功能描述 指数移动平均值,是一种趋向类指标，指数移动平均值是以指数式递减加权的移动平均。
                </p>
                <p class="choup">
                  业务规则 12日EMA：EMA（12）=前一日EMA（12）×11/13+今日收盘价×2/13
                </p>
                <p class="choup">
                  26日EMA：EMA（26）=前一日EMA（26）×25/27+今日收盘价×2/27
                </p>
                <p class="choup">
                  附：
                </p>
                <p class="choup">
                  EMA的初值，用第一天的收盘价
                </p>
                <p class="choup">
                  真实计算 EMA（12）、EMA（24）
                </p>
                <h3>
                  MACD指标
                </h3>
                <p class="choup">
                  功能名称 MACD指标
                </p>
                <p class="choup">
                  功能描述 MACD是利用收盘价的短期（常用为12日）指数移动平均线与长期（常用为26日）指数移动平均线之间的聚合与分离状况，对买进、卖出时机作出研判的技术指标。
                </p>
                <p class="choup">
                  业务规则 快速线为DIF DIF=今日EMA（12）－ 今日EMA（26）
                </p>
                <p class="choup">
                  慢速线为DEM 今日DEA（MACD）=前一日DEA×8/10+今日DIF×2/10。
                </p>
                <p class="choup">
                  柱状图为MACD （DIF-DEA）×2
                </p>
                <p class="choup">
                  真实计算 DIF DEM MACD
                </p>
                <h3>
                  W&R指标
                </h3>
                <p class="choup">
                  功能名称 W&R指标
                </p>
                <p class="choup">
                  功能描述 由Larry williams创造，是一种利用振荡点来反映市场超买超卖现象，预测循环周期内的高点和低点，用来判断市场强弱分界的指标。
                </p>
                <p class="choup">
                  业务规则 R=HY-LY
                </p>
                <p class="choup">
                  Q=HY-今天的收盘价
                </p>
                <p class="choup">
                  W&R=Q/R*100
                </p>
                <p class="choup">
                  附：
                </p>
                <p class="choup">
                  HY=N天中的最高价
                </p>
                <p class="choup">
                  LY=N天中的最低价
                </p>
                <p class="choup">
                  N一般取值为6,10
                </p>
                <p class="choup">
                  真实计算 W&R（N）） 上限值线80 中间线50 下限值线20
                </p>
                <h3>
                  KDJ指标
                </h3>

                <p class="choup">
                  功能名称 KDJ指标
                </p>
                <p class="choup">
                  功能描述
                </p>
                <p class="choup">
                  随机指标KDJ一般是用于股票分析的统计体系，根据统计学原理，通过一个特定的周期（常为9日、9周等）内出现过的最高价、最低价及最后一个计算周期的收盘价及这三者之间的比例关系，来计算最后一个计算周期的未成熟随机值RSV，然后根据平滑移动平均线的方法来计算K值、D值与J值，并绘成曲线图来研判股票价格走势。
                </p>
                <p class="choup">
                  业务规则 K值：当日K值 = 2/3×前一日K值+1/3×当日RSV
                </p>
                <p class="choup">
                  D值：当日D值 = 2/3×前M日D值+1/3×当日K值
                </p>
                <p class="choup">
                  J值： 当日J值 = 3*当日K值-2*当日D值
                </p>
                <p class="choup">
                  附：
                  1、 先计算：未成熟随机指标值RSV
                  RSV=（Cn－Ln）/（Hn－Ln）×100
                  （Cn为第n日收盘价；Ln为n日内的最低价；Hn为n日内的最高价）
                </p>
                <p class="choup">
                  2、 N、M1、M2 天数，一般取9、3、3
                </p>
                <p class="choup">
                  3、 若无前一日K 值与D值，则可分别用50来代替。
                  真实计算 K值：当日K值 = M1日平均 RSV
                  D值：当日D值 = M2日平均K值
                  J值： 当日J值 = 3*当日K值-2*当日D值
                </p>
                <h3>
                  BIAS指标
                </h3>

                <p class="choup">
                  功能名称 BIAS指标
                </p>
                <p class="choup">
                  功能描述 乖离率(BIAS)，又称偏离率，简称Y值，是通过计算市场指数或收盘价与某条移动平均线之间的差距百分比，以反映一定时期内价格与其MA偏离程度的指标
                </p>
                <p class="choup">
                  业务规则 乖离率=（当日收盘价-N日内移动平均价）/N日内移动平均价╳100%
                </p>
                <p class="choup">
                  5日乖离率=（当日收盘价-5日内移动平均价）/5日内移动平均价╳100%
                </p>
                <p class="choup">
                  BIAS1 : (CLOSE-MA(CLOSE,L1））/MA(CLOSE,L1）*100;

                </p>
                <p class="choup">
                  BIAS2 : (CLOSE-MA(CLOSE,L2））/MA(CLOSE,L2）*100;
                </p>
                <p class="choup">
                  BIAS3 : (CLOSE-MA(CLOSE,L3））/MA(CLOSE,L3）*100
                </p>
                <p class="choup">
                  附：
                </p>
                <p class="choup">
                  CLOSE为当日收盘价
                </p>
                <p class="choup">
                  MA(CLOSE,N)为N日均线的当前数值。
                </p>
                <p class="choup">
                  L1 = 6，L2 = 12，L3=24
                </p>
                <h3>
                  PSY指标
                </h3>
                <p class="choup">

                  功能名称 PSY指标
                </p>
                <p class="choup">

                  功能描述 心理线（PSY）指标将一定时期内投资者趋向买方或卖方的心理事实转化为数值，从而判断股价的未来趋势。
                </p>
                <p class="choup">
                  业务规则 1、PSY=N日内上涨天数/N*100
                </p>
                <p class="choup">
                  2、PSYMA=PSY的M日简单移动平均
                </p>
                <p class="choup">
                  3、参数N设置为12日，参数M设置为6日
                </p>
                <p class="choup">
                  真实计算 PSY　PSYMA

                </p>
                <h3>
                  RSI指标
                </h3>
                <p class="choup">

                  功能名称 RSI指标
                </p>
                <p class="choup">
                  功能描述
                </p>
                <p class="choup">
                  RSI指标正是根据供求平衡的原理，通过测量某一个期间内股价上涨总幅度占股价变化总幅度平均值的百分比，来评估多空力量的强弱程度，进而提示具体操作的。相对强弱指数RSI是根据一定时期内上涨和下跌幅度之和的比率制作出的一种技术曲线。能够反映出市场在一定时期内的景气程度。
                </p>
                <p class="choup">
                  业务规则 N日RSI =N日内收盘涨幅的平均值/(N日内收盘涨幅均值+N日内收盘跌幅均值) ×100
                </p>
                <p class="choup">
                  由上面算式可知RSI指标的技术含义，即以向上的力量与向下的力量进行比较，若向上的力量较大，则计算出来的指标上升；若向下的力量较大，则指标下降，由此测算出市场走势的强弱。
                  真实计算 N日RSI N日内收盘涨幅的平均值 N日内收盘跌幅均值
                </p>

                <h3>
                  ASI指标
                </h3>
                功能名称 ASI指标
                </p>
                <p class="choup">
                  功能描述 （振动升降指标）ASI指标以开盘、最高、最低、收盘价与前一交易日的各种价格相比较作为计算因子。
                </p>
                <p class="choup">
                  业务规则 1、A=∣当天最高价-前一天收盘价∣
                </p>
                <p class="choup">
                  B=∣当天最低价-前一天收盘价∣
                </p>
                <p class="choup">
                  C=∣当天最高价-前一天最低价∣
                </p>
                <p class="choup">
                  D=∣前一天收盘价-前一天开盘价∣
                </p>
                <p class="choup">
                  2、比较A、B、C三数值：若A最大，R=A+1/2B+1/4D(*A>B与A>C不可能同时成立，因A>B指前日收盘价位于当日振幅的下半部分，即前日收盘价低于当日最高价；而A>C指的是当日最高价低于前日收盘价；故A最大不存在）；若B最大，R=B+1/2A+1/4D；若C最大，R=C+1/4D
                </p>
                <p class="choup">
                  3、E=当天收盘价-前一天收盘价
                </p>
                <p class="choup">
                  F=当天收盘价-当天开盘价
                </p>
                <p class="choup">
                  G=前一天收盘价-前一天开盘价
                </p>
                <p class="choup">
                  4、X=E+1/2F+G
                </p>
                <p class="choup">
                  5、K=A、B之间的最大值
                </p>
                <p class="choup">
                  6、L=3；SI=50*X/R*K/L；ASI=累计每日之SI值
                </p>
                <p class="choup">
                  真实计算 ASI
                </p>
                <h1>分时图指标信息：</h1>
                <h3>
                  RSIFS指标
                </h3>
                <p class="choup">
                  功能名称 RSIFS指标
                </p>
                <p class="choup">
                  功能描述 RSIFS是分时图下的RSI指标，计算方法和k线图下的RSI指标相同
                </p>
                <p class="choup">
                  RSIFS指标正是根据供求平衡的原理，通过测量某一个期间内股价上涨总幅度占股价变化总幅度平均值的百分比，来评估多空力量的强弱程度，进而提示具体操作的。相对强弱指数RSI是根据一定时期内上涨和下跌幅度之和的比率制作出的一种技术曲线。能够反映出市场在一定时期内的景气程度。
                </p>
                <p class="choup">
                  业务规则 N日RSIFS =N日内收盘涨幅的平均值/(N日内收盘涨幅均值+N日内收盘跌幅均值) ×100
                </p>
                <p class="choup">
                  由上面算式可知RSI指标的技术含义，即以向上的力量与向下的力量进行比较，若向上的力量较大，则计算出来的指标上升；若向下的力量较大，则指标下降，由此测算出市场走势的强弱。
                </p>
                <p class="choup">
                  真实计算 N日RSIFS N日内收盘涨幅的平均值 N日内收盘跌幅均值
                </p>
                <h3>
                  MACDFS指标
                </h3>
                <p class="choup">
                  功能名称 MACDFS指标
                </p>
                <p class="choup">

                  功能描述 MACDFS是分时图下的MACD指标，计算方法和k线图下的MACD指标相同
                </p>
                <p class="choup">
                  MACDFS是利用收盘价的短期（常用为12日）指数移动平均线与长期（常用为26日）指数移动平均线之间的聚合与分离状况，对买进、卖出时机作出研判的技术指标。
                </p>
                <p class="choup">
                  业务规则 快速线为DIF DIF=今日EMA（12）－ 今日EMA（26）
                </p>
                <p class="choup">
                  慢速线为DEM 今日DEA（MACDFS）=前一日DEA×8/10+今日DIF×2/10。
                </p>
                <p class="choup">
                  柱状图为MACDFS （DIF-DEA）×2
                </p>
                <p class="choup">
                  真实计算 DIF DEM MACDFS
                </p>
                <h3>
                  KDJFS指标
                </h3>

                <p class="choup">
                  功能名称 KDJFS指标
                </p>
                <p class="choup">
                  功能描述 KDJFS是分时图下的KDJ指标，计算方法和k线图下的KDJ指标相同
                </p>
                <p class="choup">
                  随机指标KDJFS一般是用于股票分析的统计体系，根据统计学原理，通过一个特定的周期（常为9日、9周等）内出现过的最高价、最低价及最后一个计算周期的收盘价及这三者之间的比例关系，来计算最后一个计算周期的未成熟随机值RSV，然后根据平滑移动平均线的方法来计算K值、D值与J值，并绘成曲线图来研判股票价格走势。
                </p>
                <p class="choup">
                  业务规则 K值：当日K值 = 2/3×前一日K值+1/3×当日RSV
                </p>
                <p class="choup">
                  D值：当日D值 = 2/3×前M日D值+1/3×当日K值
                </p>
                <p class="choup">
                  J值： 当日J值 = 3*当日K值-2*当日D值
                </p>
                <p class="choup">
                  附：
                </p>
                <p class="choup">
                  4、 先计算：未成熟随机指标值RSV
                </p>
                <p class="choup">
                  RSV=（Cn－Ln）/（Hn－Ln）×100
                </p>
                <p class="choup">
                  （Cn为第n日收盘价；Ln为n日内的最低价；Hn为n日内的最高价）
                </p>
                <p class="choup">
                  5、 N、M1、M2 天数，一般取9、3、3
                </p>
                <p class="choup">
                  6、 若无前一日K 值与D值，则可分别用50来代替。
                </p>
                <p class="choup">
                  真实计算 K值：当日K值 = M1日平均 RSV
                </p>
                <p class="choup">
                  D值：当日D值 = M2日平均K值
                </p>
                <p class="choup">
                  J值： 当日J值 = 3*当日K值-2*当日D值
                </p>

              </div>
            </div>
          </el-tab-pane>
          <!--</div>-->
          <el-tab-pane label="交易规则" class="leftBox" sortable>
            <div class="rightCard">
              <span style="font-size:30px" sortable>交易规则</span>
              <el-divider content-position="right" style="width: 100%"></el-divider>
              <div style="margin-top:10%;margin-left:5%;margin-right: 5%;text-align: left">
                <h class="chouh">
                 委托与申报
                </h>
                <p
                  class="choup">
                  北京时间 9 : 30 - 22 : 00
                </p>
                <p
                  class="choup">

                  9 : 15 - 9 : 30，开盘集合竞价，其中9 : 20 - 9 : 30不允许撤消委托；
                </p>
                <p
                  class="choup">
                  9 : 25 - 9 : 30，交易主机只接受申报，但不对买卖申报或撤销申报作处理
                </p>
                <p
                  class="choup">

                  21 : 57 - 22 : 00为收盘集合竞价，不允许撤消委托；
                </p>
                <p
                  class="choup">
                  附：周末及节假日不休市，可正常交易；
                </p>
                <h class="chouh">
                  涨跌幅限制
                </h>
                <p
                  class="choup">

                  1. 普通股
                </p>
                <p
                  class="choup">

                  - 对股票交易实行价格涨跌幅限制，涨跌幅限制比例为10%，ST和*ST等被实施特别处理的股票价格涨跌幅限制比例为5% </p>
                <p
                  class="choup">

                  - 涨跌幅限制价格的计算公式为：涨跌幅限制价格=前收盘价×（1±涨跌幅限制比例）。 </p>
                <p
                  class="choup">

                  - 计算结果按照四舍五入原则取至价格最小变动单位 </p>
                <p
                  class="choup">

                  - 涨跌幅限制价格与前收盘价之差的绝对值低于价格最小变动单位的，以前收盘价增减一个价格最小变动单位为涨跌幅限制价格。 </p>
                <p
                  class="choup">

                  2. 新股 </p>
                <p
                  class="choup">

                  沪市 </p>
                <p
                  class="choup">

                  - 集合竞价阶段有效申报价格不得高于发行价格的120%且不得低于发行价格的80%； </p>
                <p
                  class="choup">

                  - 连续竞价阶段有效申报价格不得高于发行价格的144%且不得低于发行价格的64%。其中，14:55至15:00有效申报价格不得高于当日开盘价的120%且不得低于当日开盘价的80%。 </p>
                <p
                  class="choup">

                  深市 </p>
                <p
                  class="choup">

                  - 股票上市首日开盘集合竞价的有效竞价范围为发行价的上下20%。 </p>
                <p
                  class="choup">

                  - 首日开盘价不能通过集合竞价产生的，以连续竞价第一笔成交价作为开盘价。 </p>
                <p
                  class="choup">

                  - 股票上市首日14:57至15:00采用收盘集合定价，即对集中申报簿中，以最近成交价为申报价格的买卖申报进行一次性集中撮合。期间，投资者可以申报，也可以撤销申报。
                </p>
                <h class="chouh">
                  委托
                </h>

                <p
                  class="choup">
                  投资者可以采用限价委托或市价委托的方式委托会员买卖证券
                </p>
                <p
                  class="choup">
                  限价委托与申报
                </p>
                <p
                  class="choup">
                  限价委托是指投资者委托会员按其限定的价格买卖证券，会员必须按限定的价格或低于限定的价格申报买入证券；按限定的价格或高于限定的价格申报卖出证券。
                </p>
                <p
                  class="choup">
                  限价申报指令应当包括证券账户号码、证券代码、买卖方向、数量、价格。
                </p>
                <p
                  class="choup">
                  限价指令仅限当日有效。
                </p>
                <p
                  class="choup">
                  市价委托与申报
                </p>
                <p
                  class="choup">
                  市价委托是指投资者委托会员按市场价格买卖证券。
                </p>
                <p
                  class="choup">
                  市价申报指令应当包括申报类型、证券账户号码、证券代码、买卖方向、数量。
                </p>
                <p
                  class="choup">
                  上海市价委托 </p>
                <p
                  class="choup">


                  深圳市价委托
                </p>
                <p
                  class="choup">

                  对手方最优价格申报，以申报进入交易主机时集中申报簿中对手方队列的最优价格为其申报价格。
                </p>
                <p
                  class="choup">

                  本方最优价格申报，以申报进入交易主机时集中申报簿中本方队列的最优价格为其申报价格。
                </p>
                <p
                  class="choup">

                  最优五档即时成交剩余撤销申报，以对手方价格为成交价，与申报进入交易主机时集中申报簿中对手方最优五个价位的申报队列依次成交，未成交部分自动撤销。
                </p>
                <p
                  class="choup">

                  即时成交并撤销申报，以对手方价格为成交价，与申报进入交易主机时集中申报簿中对手方所有申报队列依次成交，未成交部分自动撤销。
                </p>
                <p
                  class="choup">

                  全额成交或撤销申报，以对手方价格为成交价，如与申报进入交易主机时集中申报簿中对手方所有申报队列依次成交能够使其完全成交的，则依次成交，否则申报全部自动撤销。
                </p>
                <p
                  class="choup">

                  注意
                </p>
                <p
                  class="choup">
                  - 市价申报只适用于有价格涨跌幅限制证券连续竞价期间的交易。其他交易时间，交易主机不接受市价申报。
                </p>
                <p
                  class="choup">
                  - 本方最优价格申报进入交易主机时，集中申报簿中本方无申报的，申报自动撤销。
                </p>
                <p
                  class="choup">
                  - 其他市价申报类型进入交易主机时，集中申报簿中对手方无申报的，申报自动撤销。
                </p>
                <h class="chouh">
                  撤单
                </h>
                <p
                  class="choup">
                  投资者可以撤销委托的未成交部分，被撤销或失效的委托，会员应当在确认后及时向投资者返还相应的资金或证券。市价委托撤单见上。
                </p>
                <p
                  class="choup">
                  资金冻结
                </p>
                <p
                  class="choup">
                  冻结金额是指委托买入证券时被冻结的资金。
                </p>

                <h class="chouh">
                  冻结资金还款：
                </h>
                <p
                  class="choup">
                  - 如果撤销委托，就会立即解除冻结，还原为可用金额。
                </p>
                <p
                  class="choup">
                  - 如果当天没有撤销委托，需待第二天会自动解除冻结，还原为可用金额。
                </p>
                <p
                  class="choup">
                  - 如果这笔资金不是当天卖出证券还返的资金，而是你帐户上原有的资金，则是可取金额，当天即可从证券转银行取出来。
                </p>
                <p
                  class="choup">
                  - 如果这笔资金是当天卖出证券还返的资金，则必须等第二天才可从证券转银行取出来。
                </p>
                <p
                  class="choup">

                  附：只考虑隔天失效委托
                </p>
                <h class="chouh">
                  市价委托的冻结金额:
                </h>
                <p
                  class="choup">
                  - 在清算完毕的非交易时间(凌晨)市价委托：（建议不要在此时间段操作）股票按清算前收盘价的125%来计算和冻结资金。
                </p>
                <p
                  class="choup">
                  - 在连续竞价期间市价委托买入，按涨停价冻结资金。
                </p>
                <h class="chouh">
                  限价委托的冻结金额：
                </h>
                <p
                  class="choup">
                  - 市价委托成交价格具有不确定性，使用市价委托买入时，系统先按涨停价冻结资金，成交后按实际成交价格冻结和计算所需资金，对实际成交价没有影响。
                </p>
                <p
                  class="choup">
                  细则（限制规则）
                </p>
                <p
                  class="choup">
                  - 申报当日有效。每笔竞价交易的申报不能一次全部成交时，未成交部分继续参加当日竞价除第3.3.4条第（三）、（四）、（五）项市价申报类型除外。
                </p>
                <p
                  class="choup">
                  - 通过竞价交易买入股票或基金的，申报数量应当为100股（份）或其整数倍。
                </p>
                <p
                  class="choup">
                  - 卖出股票时，余额不足一手的部分，应当一次性申报卖出。
                </p>
                <p
                  class="choup">
                  - 股票竞价交易单笔申报最大数量不得超过100万股（份）
                </p>
                <p
                  class="choup">
                  - 股票交易的计价单位为“每股价格”
                </p>
                <p
                  class="choup">
                  - A股交易的申报价格最小变动单位为0.01元人民币
                </p>
                <p
                  class="choup">
                  - 税和手续费的最小变动单位是0.001元人民币
                </p>
                <h class="chouh">竞价与成交</h>
                <p
                  class="choup">
                证券竞价交易采用集合竞价和连续竞价两种方式。
                </p>
                <p
                  class="choup">
                  买卖有价格涨跌幅限制的证券，其有效竞价范围与涨跌幅限制范围一致，在价格涨跌幅限制以内的申报为有效申报，超过涨跌幅限制的申报为无效申报。
                </p>
                <p
                  class="choup">
                  时间
                  每个交易日的9︰15 至9︰25为开盘集合竞价时间，9︰30至11︰30
                </p>
                <p
                  class="choup">
                  每个交易日的13︰00至14︰57为连续竞价时间，14︰57至15︰00为收盘集合竞价时间（深交所和上交所都是）
                </p>
                <p
                  class="choup">
                  原则
                </p>
                <p
                  class="choup">
                  证券竞价交易按价格优先、时间优先的原则撮合成交。
                </p>
                <p
                  class="choup">
                  价格优先的原则为：较高价格买入申报优先于较低价格买入申报，较低价格卖出申报优先于较高价格卖出申报。
                </p>
                <p
                  class="choup">
                  时间优先的原则为：买卖方向、价格相同的，先申报者优先于后申报者。先后顺序按交易主机接受申报的时间确定。
                </p>
                <p
                  class="choup">

                  集合竞价
                </p>
                <p
                  class="choup">

                  指对一段时间内接受的买卖申报一次性集中撮合的竞价方式。
                </p>
                <p
                  class="choup">
                  集合竞价时，成交价的确定原则为：
                </p>
                <p
                  class="choup">
                  （一）可实现最大成交量；
                </p>
                <p
                  class="choup">
                  （二）高于该价格的买入申报与低于该价格的卖出申报全部成交；
                </p>
                <p
                  class="choup">
                  （三）与该价格相同的买方或卖方至少有一方全部成交。
                </p>
                <p
                  class="choup">
                  深市：两个以上价格符合上述条件的，取在该价格以上的买入申报累计数量与在该价格以下的卖出申报累计数量之差最小的价格为成交价；买卖申报累计数量之差仍存在相等情况的，开盘集合竞价时取最接近即时行情显示的前收盘价为成交价，收盘集合竞价时取最接近最近成交价的价格为成交价。
                </p>
                <p
                  class="choup">
                  沪市：两个以上申报价格符合上述条件的，使未成交量最小的申报价格为成交价格；仍有两个以上使未成交量最小的申报价格符合上述条件的，其中间价为成交价格。
                </p>
                <p
                  class="choup">
                  附：不考虑临时停牌复盘行为。
                </p>
                <p
                  class="choup">
                  集合竞价的所有交易以同一价格成交。

                </p>
                <p
                  class="choup">
                  连续竞价
                </p>
                <p
                  class="choup">

                  是指对买卖申报逐笔连续撮合的竞价方式。
                </p>
                <p
                  class="choup">
                  连续竞价时，成交价的确定原则为：
                </p>
                <p
                  class="choup">
                  （一）最高买入申报与最低卖出申报价格相同，以该价格为成交价；
                </p>
                <p
                  class="choup">
                  （二）买入申报价格高于集中申报簿当时最低卖出申报价格时，以集中申报簿当时的最低卖出申报价格为成交价；
                </p>
                <p
                  class="choup">
                  （三）卖出申报价格低于集中申报簿当时最高买入申报价格时，以集中申报簿当时的最高买入申报价格为成交价。
                </p>
                <p
                  class="choup">

                  买卖申报经交易主机撮合成交后，交易即告成立。符合本规则各项规定达成的交易于成立时生效，买卖双方必须承认交易结果，履行清算交收义务。
                </p>
                <p
                  class="choup">
                  开盘价与收盘价
                </p>
                <p
                  class="choup">
                  - 证券的开盘价为当日该证券的第一笔成交价。
                </p>
                <p
                  class="choup">
                  - 证券的开盘价通过集合竞价方式产生，不能通过集合竞价产生的，以连续竞价方式产生。
                </p>
                <p
                  class="choup">
                  - 证券的收盘价通过集合竞价的方式产生。收盘集合竞价不能产生收盘价或未进行收盘集合竞价的，以当日该证券最后一笔交易前一分钟所有交易的成交量加权平均价（含最后一笔交易）为收盘价。
                </p>
                <p
                  class="choup">
                  - 当日无成交的，以前收盘价为当日收盘价。
                </p>
                <p
                  class="choup">

                  附：开盘价若无集合竞价，也没有连续竞价，开盘价是多少
                </p>
                <h class="chouh">
                  费用
                </h>
                <p
                  class="choup">
                  印花税
                </p>
                <p
                  class="choup">
                  成交金额的1‰
                </p>
                <p
                  class="choup">
                  2008年9月19日至今由向双边征收改为向出让方单边征收（卖出缴）。受让者不再缴纳印花税。投资者在买卖成交后支付给财税部门的税收。上海股票及深圳股票均按实际成交金额的千分之一支付，此税收由券商代扣后由交易所统一代缴。
                </p>
                <p
                  class="choup">
                  证管费
                </p>
                <p
                  class="choup">
                  成交金额的0.002%双向收取
                </p>
                <p
                  class="choup">
                  证券交易经手费
                </p>
                <p
                  class="choup">
                  A股，按成交金额的0.00487%双向收取；
                </p>
                <p
                  class="choup">
                  A股证管费与证券交易经手费合计称为交易规费，合计收取成交金额的0.00687%，包含在券商交易佣金中。
                </p>
                <p
                  class="choup">
                  过户费
                </p>
                <p
                  class="choup">
                  从2015年8月1日起已经更改为上海和深圳都进行双向收取：这是指股票成交后，更换户名所需支付的费用。此费用按成交金额的0.02‰收取。
                </p>
                <p
                  class="choup">
                  券商交易佣金
                </p>
                <p
                  class="choup">
                  双向收取，最高不超过成交金额的3‰，最低5元起，单笔交易佣金不满5元按5元收取。
                </p>


              </div>
            </div>
          </el-tab-pane>
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
        url: '../../../static/images/xMarket.png',
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
      }
      ,
      exit() {
        this.$store.commit('logout')
        this.$router.push('/')
      },
      register() {
        this.$router.push('/Register')
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
          this.$message('请先登录');
        }
      },
      login() {
        this.$router.push('/')
        this.$store.commit('position', 1)
      },

    }
  }
</script>

<style>
  .rightCard {
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
  }

  .choup {
    text-align: left;
    text-indent: 2em;
    line-height: 25px;
    font-family: 微软雅黑;
    font-size: medium;
  }

  .chouh {
    text-align: left;
    text-indent: 2em;
    line-height: 25px;
    font-family: 微软雅黑;
    font-size: medium;
    font-weight: bold;
  }

  .leftBox {
    width: 100%;
  }

  .el-tabs__header {
    width: 15%;
    margin-bottom: auto;

  }

  .el-tabs__nav {
    /*position:fixed;*/
    text-align: left;
  }

  #navigator {
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: #fff;
    display: inline-block;
  }

</style>
