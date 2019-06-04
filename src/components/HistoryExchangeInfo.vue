<template>
  <div>
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               @select="handleSelect"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               router="true">

        <el-menu-item style = "margin-left: 20%" index="AfterLogin" >首页</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="StockList" >股票列表</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="BuyAtLimitPrice" >股票买卖</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="1">
          <template slot="title">信息统计</template>
          <el-menu-item index="TodayExchange" >当日成交</el-menu-item>
          <el-menu-item index="TodayOrder" >当日委托</el-menu-item>
          <el-menu-item index="HistoryHoldPositionInfo" >历史持仓</el-menu-item>
          <el-menu-item index="HistoryExchangeInfo" >历史成交</el-menu-item>
        </el-submenu>

        <el-menu-item style = "margin-left: 50px" index="SelfCenter">个人中心</el-menu-item>
        <div id="exit">
          <el-link type="primary" @click="exit">退出</el-link>
        </div>
      </el-menu>
    </div>
    <div>
      <selectDate v-on:select="select"></selectDate>
      <div id="in">
        <div id="tag">
          <el-divider >历史成交</el-divider>
        </div>

        <div id="stock">
          <el-table
            :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            border
            style="width: 100%;font-size: 6px"
            @row-click="handle"
            :default-sort = "{prop: 'exchangeDate', order: 'descending'}">
            <el-table-column
              prop="exchangeDate"
              label="成交日期"
              width="100"
              sortable
              align="center">
            </el-table-column>
            <el-table-column
              prop="exchangeTime"
              label="成交时间"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockID"
              label="股票代码"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockName"
              label="股票简称"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="operation"
              label="操作"
              width="60"
              align="center">
            </el-table-column>
            <el-table-column
              prop="exchangeAmount"
              label="成交数量"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="exchangeAveragePrice"
              label="成交均价"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="exchangePrice"
              label="成交金额"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stockBalance"
              label="股票余额"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="contractNumber"
              label="合同编号"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="exchangeNumber"
              label="成交编号"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="serviceTax"
              label="手续费"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="stampTax"
              label="印花税"
              width="70"
              align="center">
            </el-table-column>
              <el-table-column
                prop="incidentalCharge"
                label="其他杂费"
                width="70"
                align="center">
            </el-table-column>
            <el-table-column
              prop="actualAmount"
              label="发生金额"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="market"
              label="交易市场"
              width="70"
              align="center">
            </el-table-column>
            <el-table-column
              prop="revokeAmount"
              label="撤单数量"
              width="70"
              align="center">
            </el-table-column>

          </el-table>
          <div class="block" style="margin-top:30px;">
            <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,5,10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
            </el-pagination>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  import SelectDate from './SelectDate'
  import Vue from 'vue'
  import api from "../api";
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
        pageSize:5,
        beginDate:'',
        endDate:''
      }
    },
    created() {
      this.setHistoryExchangeApi();
    },
    beforeMount(){
      console.log(this.$store.state.isLogin)
      if(this.$store.state.isLogin===false){
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
        this.$store.commit('stockID',row.stockID)
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
          let date=new Date(this.tableData[i].buildPositionDate)
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
        api.JH_news('/api/historyExchangeInfo',{
          params: {
            userId: this.$store.state.user.userId
          }
        })
          .then(res => {
            console.log(res);
            this.tableData = res.data;
          });
      },
    }
  }
</script>

<style scoped>
  #in{
    width: 70%;
    margin: 0 auto;
  }
  #stock{
    margin-top: 2%;
  }
  #tag{
    margin-top: 5%;
    margin-bottom: 5%;
  }
  #exit{
    margin-top: 1.5%;
    margin-left: 3%;
  }

</style>
