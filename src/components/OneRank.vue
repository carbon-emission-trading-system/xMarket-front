<template>
    <div>
      <div id="navigator">
        <el-image :src="url" style="height: 45px;width: 15%;float: left;margin-left: 3%;margin-top: 1%"></el-image>
        <el-menu :default-active="this.activeIndex"
                 class="el-menu-demo"
                 mode="horizontal"
                 text-color="#000000"
                 active-text-color="#ffd04b"
                 v-bind:router= true

                 style=" background:rgba(0, 0, 0, 0); width: 60%;float: right;">

          <el-menu-item  index="AfterLogin"  @click="toFirst">首页</el-menu-item>
          <el-submenu  index="3">
            <template slot="title">行情中心</template>
            <el-menu-item index="StockList" >股票列表</el-menu-item>
            <el-menu-item index="Rank" >排行榜</el-menu-item>
          </el-submenu>
          <el-menu-item   @click="toRouterOrAlert('BuyAtLimitPrice')">股票买卖</el-menu-item>
          <el-menu-item  index="Guide">股票指南</el-menu-item>
          <el-submenu  index="1">
            <template slot="title">信息统计</template>
            <el-menu-item @click="toRouterOrAlert('TodayExchange')" >当日成交</el-menu-item>
            <el-menu-item  @click="toRouterOrAlert('TodayOrder')" >当日委托</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('HistoryHoldPositionInfo')" >历史持仓</el-menu-item>
            <el-menu-item @click="toRouterOrAlert('HistoryExchangeInfo')">历史成交</el-menu-item>
          </el-submenu>
          <el-menu-item  @click="toRouterOrAlert('SelfCenter')">个人中心</el-menu-item>
          <el-submenu v-if="this.$store.getters.isLogin" style="padding-left: 4%" index="2">
            <template slot="title"><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span></template>
            <el-menu-item @click="exit">退出</el-menu-item>
          </el-submenu>
          <el-menu-item v-else style="padding-left: 4%;color: #409EFF" ><span @click="login">登录</span><span>/</span>
            <span style="color: #409EFF" @click="register">注册</span>
          </el-menu-item>

        </el-menu>
      </div>
      <div style="z-index: 1;position:relative;" >
      <div id="in">

        <div id="tag">
          <el-divider >{{rankName}}</el-divider>
        </div>
        <div id="stock">

          <el-table
            :data="tableData"
            border
            @row-dblclick="handleStock"
            style="width: 100%;font-size: 6px; cursor: pointer ;"
            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column
              prop="stockId"
              label="股票代码"
              width="70"
              align="center"
            fixed>
            </el-table-column>
            <el-table-column
              prop="stockName"
              label="股票简称"
              width="75"
              align="center"
            fixed>
            </el-table-column>
            <el-table-column
              prop="lastTradePrice"
              label="最新成交价"
              width="85"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.lastTradePrice>=scope.row.yesterdayClosePrice" style="color: #ff3434 " >{{scope.row.lastTradePrice}}</span>
                <span v-else style="color: #02e602 ">{{scope.row.lastTradePrice}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="今日涨幅%"
              prop="increase"
              width="105"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.increase>=0" style="color: #ff3434 " >{{scope.row.increase}}</span>
                <span v-else style="color: #02e602 ">{{scope.row.increase}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="conversionHand"
              label="换手"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="highestPrice"
              label="最高价"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="lowestPrice"
              label="最低价"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="yesterdayClosePrice"
              label="昨收盘"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="openPrice"
              label="今开盘"
              width="70"
              align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.openPrice>scope.row.yesterdayClosePrice" style="color: #ff3434 " >{{scope.row.openPrice}}</span>
                <span v-else-if="scope.row.openPrice<scope.row.yesterdayClosePrice" style="color: #02e602 " >{{scope.row.openPrice}}</span>
                <span v-else >{{scope.row.openPrice}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="tradeAmount"
              label="成交额"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="totalMarketCapitalization"
              label="市值"
              width="75"
              align="center">
            </el-table-column>
            <el-table-column
              prop="peRatio"
              label="市盈率"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="pbRatio"
              label="市净率"
              align="center"

            >
            </el-table-column>

          </el-table>

        </div>
      </div>
      </div>


    </div>
</template>

<script>
    export default {
        name: "OneRank",
      data(){
          return{
            url:'../../../static/images/xMarket.png',
            tableData:[],
          }
      },
      created(){
        this.getOneRankApi();
      },
      computed:{
          rankName(){
            let index = this.$store.state.rankIndex
            if(index===1){
              return '涨幅排名'
            }
            else if(index===2){
              return '跌幅排名'
            }
            else if(index===3){
              return '成交额排名'
            }
            else{
              return '换手排名'
            }
          }
      },
      methods:{
        handleStock(row) {
          this.$store.commit('stockId', row.stockId)
          this.$store.commit('stockName', row.stockName)
          this.$store.commit('changeRout', 8);
          this.$router.push('StockDisplay')
        },
        exit() {
          this.$store.commit('logout')
          this.$router.push('/')
        },
        login(){
          this.$router.push('/')
          this.$store.commit('position',1)
        },
        register(){
          this.$router.push('/Register')
        },
        toFirst(){
          if(this.$store.getters.isLogin){
            this.$router.push('AfterLogin')
          }else{
            this.$router.push('/')
          }
        },
        toRouterOrAlert(index){
          if(this.$store.getters.isLogin){
            this.$router.push(index)
          }else{
            this.$message('请先登录');
          }
        },
          getOneRankApi(){
          console.log(this.$store.state.index)
            let params = {
              type:this.$store.state.rankIndex
            }
            this.$api.http('get', '/api/rankList',params).then(res => {
              let data = res.data
              for(let i =0;i<data.length;i++){
                if(data[i].highestPrice===5e-324){
                  data[i].highestPrice=null
                }
                if(data[i].lowestPrice===1.7976931348623157e+308){
                  data[i].lowestPrice=null
                }
              }
              //设置保留小数点后两位
              for(let i = 0; i<data.length; i++){
                for(let key in data[i]){
                  if(typeof(data[i][key])=="number"){
                    data[i][key] = data[i][key].toFixed(2)
                  }
                }
              }
              this.tableData = data
              }).catch((error) => {
              this.$message.error(error.message)
            })

          }
      }
    }
</script>

<style scoped>
  #in{
    width: 70%;
    margin: 0 auto;
    height: 90%;
  }
  #stock{
    margin-top: 2%;
    height: 100%;
  }
  #tag{
    margin-top: 5%;
    margin-bottom: 4%;
  }
  #navigator{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
    display: inline-block;
    background-color: #fff;
  }

</style>
