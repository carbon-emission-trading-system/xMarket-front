import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api";
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export  default new Vuex.Store({
 // plugins: [createPersistedState()],
  //定义数据
  state: {
    isLogin:false,
    stockList: [],
    //搜索的股票id
    stockID:'',
    //搜索的股票Name
    stockName:'',
    //用于查看详情的公告title
    title:'',
    //设置导航栏
    user:{
      userId:'',
      username:''
    }
  },
  getters: {
    getStockList(state) {
      return state.stockList
    },

    getUsername(state) {
      return state.user.username
    }
  },
  //定义改变数据的方法
  mutations: {
    login(state, payload) {
      state.isLogin = true
      state.user.username = payload.username
      state.user.userId = payload.userId
    },
    logout(state, payload) {
      state.isLogin = false
      state.user.username = payload.username
      state.user.userId = payload.userId
    },
    register(state, payload) {
      state.isLogin = true
      state.user.username = payload.username
      state.user.userId = payload.userId
    },
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
    login(context, payload) {
      return new Promise((resolve, reject) => {
        alert(JSON.stringify(payload));
        Vue.axios.post('/api/login', qs.stringify(payload))
          .then(function (response) {
            var result = response.data;
            if (result.code == 200) {
              context.commit('login', payload)
              resolve(response)
            } else {
              reject(response)
            }
          })
          .catch(function (error) {
            var errorData = {
              message: '系统出错'
            }
            error.data = errorData
            reject(error)
          });

      })

    },
    register(context, payload) {

      return new Promise((resolve, reject) => {

        Vue.axios.post('/api/register', qs.stringify(payload))
          .then(function (response) {
            var result = response.data;
            if (result.code == 200) {
              context.commit('register', payload)
              resolve(response)
            } else {
              reject(response)
            }
          })
          .catch(function (error) {
            var errorData = {
              message: '系统出错'
            }
            error.data = errorData
            reject(error)
          });

      })

    },


    stockList(context, payload) {
      api.JH_news('/api/stockList')
        .then(res => {
          payload = res.data
          context.commit('stockList', payload)
        });
    },
  }

})

