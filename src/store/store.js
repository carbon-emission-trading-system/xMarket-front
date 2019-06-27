import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api"

Vue.use(Vuex)

export default new Vuex.Store({
  //定义数据
  state: {
    isLogin: false,
    stockList: [],
    //搜索的股票id
    stockId: '',
    //搜索的股票Name
    stockName: '',
    //用于查看详情的公告title
    title: '',
    //查看更多排名的rankIndex
    rankIndex:'',
    //查看大盘指数
    indexId:'',
    temStockId: '',
    //设置导航栏
    user: {
      userId: '',
      username: '',
    },
    /**
     * 设置连接路由
     */
    rout:'',
    buyOrSellStock: '',
    HDelegateType: [
      {
        value: 1, label: '最优五档即时成交剩余撤销',
      },
      {
        value: 2, label: '最优五档即时成交剩余转限价',
      }],
    SDelegateType: [
      {
        value: 3, label: '对手方最优价格',
      },
      {
        value: 4, label: '本方最优价格',
      },
      {
        value: 5, label: '最优五档即时成交剩余撤销',
      },
      {
        value: 6, label: '即时成交剩余撤销',
      },
      {
        value: 7, label: '全额成交或撤销',
      }],
  },
  getters: {
    getStockList(state) {
      return state.stockList
    },
    getStockId(state) {
      if (!state.stockId) {
        state.stockId = sessionStorage.getItem('stockId')
      }
      return state.stockId
    },
    getStockName(state) {
      if (!state.stockName) {
        state.stockName = sessionStorage.getItem('stockName')
      }
      return state.stockName
    },
    getUsername(state) {
      if (!state.user.username) {
        state.user.username = sessionStorage.getItem('username')
      }
      return state.user.username
    },
    getUserId(state) {
      if (!state.user.userId) {
        state.user.userId = sessionStorage.getItem('userId')
      }
      return state.user.userId
    },
    //路由跳转时判断当前用户权限
    isLogin(state) {
      if (!state.user.username) {
        state.user.username = sessionStorage.getItem('username')
      }
      return state.user.username
    }
  },
  //定义改变数据的方法
  mutations: {
    login(state, payload) {
      state.isLogin = true
      state.user.username = payload.username
      state.user.userId = payload.userId
      sessionStorage.setItem("username", payload.username)
      sessionStorage.setItem("userId", payload.userId)
    },
    logout(state) {
      state.isLogin = false
      state.user.username = ''
      state.user.userId = ''
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("userId");
      console.log("logout被调用")
    },
    register(state, payload) {
      // state.isLogin = true
      // state.user.username = payload.username
      // state.user.userId = payload.userId
    },
    stockList: (state, payload) => {
      state.stockList = payload
    },
    stockId: (state, payload) => {
      state.stockId = payload
      sessionStorage.setItem("stockId", payload)
    },
    stockName: (state, payload) => {
      state.stockName = payload
      sessionStorage.setItem("stockName", payload)
    },
    title: (state, payload) => {
      state.title = payload
    },
    rankIndex: (state, payload) => {
      state.rankIndex = payload
    },
    indexId: (state, payload) => {
      state.indexId = payload
    },
    buyOrSellStock: (state, payload) => {
      state.buyOrSellStock = payload
    },
    temStockId: (state, payload) => {
      state.temStockId = payload
    },
    changeUserName:(state,payload)=>{
      state.user.username=payload
      sessionStorage.setItem("username", payload)
    },
    changeRout:(state,payload)=>{
      state.rout = payload
    }
  },
  //在actions中提交mutations的方法达到改变state的目的 .commit()
  actions: {
    login(context, payload) {

      let p = new Promise((resolve, reject) => {
        api.http('post', '/api/login', payload).then(res => {
          payload.userId = res.data
          console.log(payload)
          //   payload.push(temp)
          context.commit('login', payload)
          resolve(res)
        })
          .catch(err => {
            reject(err)
          });
      })

      return p;


    },
    register(context, payload) {
      let p = new Promise((resolve, reject) => {
        api.http('post', '/api/register', payload).then(res => {
          context.commit('register', payload)
          resolve(res)
        })
          .catch(err => {
            reject(err)
          });

      })

      return p;
    },

    stockList(context, payload) {
      api.http('get', '/api/stockList').then(res => {
        let data = res.data
        for(let i =0;i<data.length;i++){
          if(data[i].highestPrice===5e-324){
            data[i].highestPrice=null
          }
          if(data[i].lowestPrice===1.7976931348623157e+308){
            data[i].lowestPrice=null
          }
        }
        payload = data
        context.commit('stockList', payload)
      });
    },
  }

})

