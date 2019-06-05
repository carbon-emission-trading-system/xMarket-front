import Vue from 'vue'
import Vuex from 'vuex'

import qs from 'qs'
import api from "../api"

//import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex)

export  default new Vuex.Store({
 // plugins: [createPersistedState()],
  //定义数据
  state: {
    isLogin:true,
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
    },
    isLogin(state){
   //   if(state.user.username){
    //    state.username=sessionStorage.getItem('username')
    //  }
      return state.user.username
    }
  },
  //定义改变数据的方法
  mutations: {
    login(state, payload) {
      state.isLogin = true
      state.user.username = payload.username
      state.user.userId = payload.userId
   //   sessionStorage.setItem("username",payload.username)
    },
    logout(state) {
      state.isLogin = false
      state.user.username = ''
      state.user.userId = ''
   //   sessionStorage.removeItem("username");
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

      let p =new Promise((resolve, reject) => {
              alert(JSON.stringify(payload))
              api.http('post','/api/login',payload).then(res => {
                //context.commit('login',payload)
                resolve(res)
              })
              .catch(err => {
                reject(err)
              });

          })

return p;



    },
    register(context, payload) {

        let p =new Promise((resolve, reject) => {
                alert(JSON.stringify(payload))
                api.http('post','/api/register',payload).then(res => {
                  //context.commit('login',payload)
                  alert("store发送resolve:"+JSON.stringify(res))
                  resolve(res)
                })
                .catch(err => {
                  alert("store发送reject："+JSON.stringify(err))
                  reject(err)
                });

            })

        return p;
    },


    stockList(context, payload) {
      api.http('get','/api/stockList')
        .then(res => {
          payload = res.data
          context.commit('stockList', payload)
        });
    },
  }

})
