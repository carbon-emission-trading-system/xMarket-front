<template>
  <div style="height:90%">
    <div id="navigator">
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router= true>

        <el-menu-item style = "margin-left: 15%" index="AfterLogin" >首页</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="3">
          <template slot="title">行情中心</template>
          <el-menu-item index="StockList" >股票列表</el-menu-item>
          <el-menu-item index="Rank" >排行榜</el-menu-item>
        </el-submenu>
        <el-menu-item style = "margin-left: 5%" index="BuyAtLimitPrice" >股票买卖</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange" >当日成交</el-menu-item>
          <el-menu-item index="TodayOrder" >当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo" >历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo" >历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style = "margin-left: 5%" index="SelfCenter">个人中心</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="2">
          <template slot="title" ><span style="color: #409EFF;margin: auto;font-size: 6px">欢迎您！{{this.$store.getters.getUsername}}</span></template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div style="z-index: 1;position:relative;" >
    <div style="height: 100%">
      <selectDate v-on:select="select"></selectDate>
      <div id="in">
        <div id="tag">
          <el-divider >历史成交</el-divider>
        </div>
        <!--            :default-sort = "{prop: 'date', order: 'descending'}"-->
        <div id="stock">
          <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            height=500
            style="width: 100%;font-size: 6px;cursor: pointer"
            @row-dblclick="handle"

            :header-cell-style="{background:'#eef1f6',color:'#606266'}">
            <el-table-column
              prop="date"
              label="成交日期"
              width="100"
              sortable
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="time"
              label="成交时间"
              width="80"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockId"
              label="股票代码"
              width="80"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockName"
              label="股票简称"
              width="80"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="type"
              label="操作"
              width="70"
              fixed
              align="center">
            </el-table-column>
            <el-table-column
              prop="exchangeAmount"
              label="成交数量"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tradePrice"
              label="成交价"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="totalExchangeMoney"
              label="成交金额"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockBalance"
              label="股票余额"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="orderId"
              label="合同编号"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="transactionOrderId"
              label="成交编号"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="serviceTax"
              label="手续费"
              width="75"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stampTax"
              label="印花税"
              width="70"
              align="center">
            </el-table-column>
              <el-table-column
                prop="transferFee"
                label="其他杂费"
                width="80"
                align="center">
            </el-table-column>
            <el-table-column
              prop="actualAmount"
              label="发生金额"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="tradeMarket"
              label="交易市场"
              width="80"
              align="center">
            </el-table-column>
            <el-table-column
              prop="cancelNumber"
              label="撤单数量"
              width="80"
              align="center">
            </el-table-column>

          </el-table>
          <div class="block" style="margin-top:30px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15,30,50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </div>

      </div>

    </div>
  </div>
  </div>
</template>

<script>
  import SelectDate from './SelectDate'
  import Vue from 'vue'
  Vue.component('selectDate',SelectDate)


  export default {
    name: "HistoryHoldPositionInfo",
    components:{
      SelectDate
    },
    data(){
      return{
        activeIndex: 'HistoryExchangeInfo',
        tableData:[],
        currentPage:1,
        total:20,
        pageSize:15,
        beginDate:'',
        endDate:''
      }
    },
    created() {
      this.setHistoryExchangeApi();
    },
    beforeMount(){
      let isLogin=this.$store.getters.isLogin
      if(!isLogin){
        this.$alert('请先登录！', {
          confirmButtonText: '确定',
        });
        this.$router.push('/')
      }
    },
    methods:{
      exit(){
        this.$store.commit('logout')
        this.$router.push('/')
      },

      handle(row){
        // console.log(row.stockId)
        this.$store.commit('stockId',row.stockId)
        this.$store.commit('stockName',row.stockName)
        this.$router.push('StockDisplay')
      },
      select:function(data){

        //数据预处理
        this.beginDate=data[0]
        this.endDate=data[1]
        console.log(this.beginDate)
        let date1=new Date(this.beginDate)
        let begin,year1,month1,day1
        year1 =date1.getFullYear()
        month1=date1.getMonth()+1
        day1=date1.getDate()
        begin=year1.toString() + (month1>9?month1:'0'+month1) + (day1>9?day1:'0'+day1)
        begin = parseInt(begin)
        console.log(begin)

        console.log(this.endDate)
        let date2=new Date(this.endDate)
        let end,year2,month2,day2
        year2 =date2.getFullYear()
        month2=date2.getMonth()+1
        day2=date2.getDate()
        end=year2.toString() + (month2>9?month2:'0'+month2) + (day2>9?day2:'0'+day2)
        end = parseInt(end)
        console.log(end)

        let list = []
        for(let i = 0;i<this.tableData.length;i++){
          let date=new Date(this.tableData[i].date)
          //   console.log(date)
          let theDate,year,month,day
          year =date.getFullYear()
          month=date.getMonth()+1
          day=date.getDate()
          theDate=year.toString() + (month>9?month:'0'+month) + (day>9?day:'0'+day)
          theDate = parseInt(theDate)

          //日期范围筛选
          if(theDate>=begin &&theDate<=end){
            list.push(this.tableData[i])
          }
        }
        this.tableData = list
      },
      handleSizeChange(val) {
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      setHistoryExchangeApi: function () {
        let params={
          userId: this.$store.getters.getUserId
        }
        this.$api.http('get','/api/historyExchangeInfo',params).then(res => {
            console.log(res);
            let data = res.data;
          for(let i =0;i<data.length;i++){
            if(data[i].type===0){
              data[i].type="买入"
            }
            else{
              data[i].type="卖出"
            }
            if(data[i].tradeMarket===0){
              data[i].tradeMarket="深市"
            }
            else{
              data[i].tradeMarket="沪市"
            }
          }
          //设置保留小数点后两位
          for(let i = 0; i<data.length; i++){
            for(let key in data[i]){
              if(key=='tradePrice' || key=='totalExchangeMoney'){
                data[i][key] = data[i][key].toFixed(2)
              }
              if(key=='serviceTax'|| key=='stampTax'|| key=='transferFee'|| key=='actualAmount'){
                data[i][key] = data[i][key].toFixed(3)
              }
            }
          }
          this.tableData = data
          }).catch((error) => {
          this.$message.error(error.message)
        });
      },
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
    margin-bottom: 5%;
  }
  #navigator{
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 2;
  }
</style>
