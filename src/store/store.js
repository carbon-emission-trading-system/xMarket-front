import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api";
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export  default new Vuex.Store({
  plugins: [createPersistedState()],
  //定义数据
  state: {
    stockList: [],
    //搜索的股票id
    stockID:'',
    //搜索的股票Name
    stockName:'',
    //用于查看详情的公告title
    title:'',
    //设置导航栏
    user:{
      userId:''
    }
  },
  getters: {
    getStockList(state) {
      return state.stockList
    }
  },
  //定义改变数据的方法
  mutations: {
    stockList: (state, payload) => {
      state.stockList = payload
    },
    stockID:(state,payload)=>{
      state.stockID=payload
    },
    stockName:(state,payload)=>{
      state.stockName=payload
    },
    title:(state,payload)=>{
      state.title=payload
    },

  },
  //在actions中提交mutations的方法达到改变state的目的 .commit()
  actions: {
    stockList(context, payload) {
      api.JH_news('/api/stockList')
        .then(res => {
          payload = res.data
          context.commit('stockList', payload)
        });
    },
  }

})

