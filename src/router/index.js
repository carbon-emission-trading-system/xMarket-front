import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import TheFooter from '../components/TheFooter'
import AfterLogin from '../components/AfterLogin'
import Search from '../components/Search'
import StockList from "../components/StockList";
import Guide from "../components/Guide";
import RealTime from "../components/RealTime";
import TodayExchange from "../components/TodayExchange";
import TodayOrder from "../components/TodayOrder";
import SelectDate from "../components/SelectDate";
import StockDisplay from "../components/StockDisplay";
import HistoryHoldPositionInfo from "../components/HistoryHoldPositionInfo";
import HistoryExchangeInfo from "../components/HistoryExchangeInfo";
import SelfRealTime from "../components/SelfRealTime";
import News from "../components/News";
import OneNew from "../components/OneNew"
import SelfCenter from "../components/SelfCenter"
import SelfSelectedStock from "../components/SelfSelectedStock";
import BuyAtLimitPrice from "../components/BuyAtLimitPrice";
import BuyAtMarketPrice from "../components/BuyAtMarketPrice";
import SellAtLimitPrice from "../components/SellAtLimitPrice";
import SellAtMarketPrice from "../components/SellAtMarketPrice";
import Register from "../components/Register";
import SelfInfo from "../components/SelfInfo";
import ForPasVal from "../components/ForPasVal";
import Rank from "../components/Rank";
import OneRank from "../components/OneRank";
import NotFund from "../components/404";
import ForgetPassword from "../components/ForgetPassword"
import FundCurve from "../components/FundCurve"
import StockScreening from "../components/StockScreening"
import IndexDisplay from "../components/IndexDisplay"
import PositionStock from "../components/PositionStock"
import LoginCompon from "../components/LoginCompon"

Vue.use(Router)
//配置路由
export default new Router({
  //把Router的mode修改为history模式,VueRouter默认的模式为HASH模式
  mode: 'history',
  routes: [
    {
      path: '/AfterLogin',
      name: 'afterLogin',
      component: AfterLogin
    }, {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/Register',
      name: 'register',
      component: Register
    }, {
      path: '/Search',
      name: 'search',
      component: Search
    }, {
      path: '/SelectDate',
      name: 'selectDate',
      component: SelectDate
    }, {
      path: '/StockList',
      name: 'stockList',
      component: StockList
    }, {
      path: '/Guide',
      name: 'guide',
      component: Guide
    },{
      path: '/TodayExchange',
      name: 'todayExchange',
      component: TodayExchange
    }, {
      path: '/TodayOrder',
      name: 'todayOrder',
      component: TodayOrder
    }, {
      path: '/StockDisplay',
      name: 'stockDisplay',
      component: StockDisplay,
    }, {
      path: '/HistoryHoldPositionInfo',
      name: 'historyHoldPositionInfo',
      component: HistoryHoldPositionInfo
    }, {
      path: '/RealTime',
      name: 'realTime',
      component: RealTime
    }, {
      path: '/HistoryExchangeInfo',
      name: 'historyExchangeInfo',
      component: HistoryExchangeInfo
    },
    {
      path: '/SelfRealTime',
      name: 'selfRealTime',
      component: SelfRealTime
    },
    {
      path: '/News',
      name: 'news',
      component: News
    },
    {
      path: '/TheFooter',
      name: 'theFooter',
      component: TheFooter
    },
    {
      path: '/Rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/OneRank',
      name: 'oneRank',
      component: OneRank
    },
    {
      path: '/OneNew',
      name: 'oneNew',
      component: OneNew
    },
    {
      path: '/IndexDisplay',
      name: 'indexDisplay',
      component: IndexDisplay
    },
    {
      path: '/SelfCenter',
      name: 'selfCenter',
      component: SelfCenter
    }, {
      path: '/SelfSelectedStock',
      name: 'selfSelectedStock',
      component: SelfSelectedStock
    }, {
      path: '/BuyAtLimitPrice',
      name: 'buyAtLimitPrice',
      component: BuyAtLimitPrice
    }, {
      path: '/BuyAtMarketPrice',
      name: 'buyAtMarketPrice',
      component: BuyAtMarketPrice
    }, {
      path: '/SellAtLimitPrice',
      name: 'sellAtLimitPrice',
      component: SellAtLimitPrice
    }, {
      path: '/SellAtMarketPrice',
      name: 'sellAtMarketPrice',
      component: SellAtMarketPrice
    }, {
      path: '/SelfInfo',
      name: 'selfInfo',
      component: SelfInfo
    }, {
      path: '/ForPasVal',
      name: 'forPasVal',
      component: ForPasVal
    }, {
      path: '/404',
      name: 'notFund',
      component: NotFund
    }, {
      path: '/ForgetPassword',
      name: 'forgetPassword',
      component: ForgetPassword
    }, {
      path: '/FundCurve',
      name: 'fundCurve',
      component: FundCurve
    }, {
      path: '/StockScreening',
      name: 'stockScreening',
      component: StockScreening
    }, {
      path: '/PositionStock',
      name: 'positionStock',
      component: PositionStock
    }, {
    path:'/LoginCompon',
      name:'loginCompon',
      component:LoginCompon
    },{
      path: '*',
      redirect: '/404'
    }
  ]
})
