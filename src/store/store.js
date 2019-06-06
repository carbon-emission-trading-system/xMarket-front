import Vue from 'vue'
import Vuex from 'vuex'
import api from "../api"

Vue.use(Vuex)

export  default new Vuex.Store({
  //定义数据
  state: {
    isLogin:false,
    stockList: [],
    //搜索的股票id
    stockId:'',
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
    //路由跳转时判断当前用户权限
    isLogin(state){
      if(!state.user.username){
        state.user.username=sessionStorage.getItem('username')
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
      sessionStorage.setItem("username",payload.username)
    },
    logout(state) {
      state.isLogin = false
      state.user.username = ''
      state.user.userId = ''
      sessionStorage.removeItem("username");
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
    stockId:(state,payload)=>{
      state.stockId=payload
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
                payload.userId=res.data
                console.log(payload)
             //   payload.push(temp)
                context.commit('login',payload)
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
                  context.commit('register',payload)
                   resolve(res)
                })
                .catch(err => {
                 reject(err)
                });

             })

         return p;
    },


    stockList(context, payload) {
      api.http('get','/api/stockList').then(res => {
          payload = res.data
          context.commit('stockList', payload)
        });
    },
  }

})
