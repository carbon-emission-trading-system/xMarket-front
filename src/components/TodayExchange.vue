<template>
  <div style="height: 90%">
    <div>
      <el-menu :default-active="this.activeIndex"
               class="el-menu-demo"
               mode="horizontal"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
               v-bind:router= true>

        <el-menu-item style = "margin-left: 15%" index="AfterLogin" >首页</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="StockList" >股票列表</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="BuyAtLimitPrice" >股票买卖</el-menu-item>
        <el-menu-item style = "margin-left: 5%" index="Guide">股票指南</el-menu-item>
        <el-submenu style = "margin-left: 5%" index="1">
          <template slot="title" index = "1">信息统计</template>
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

    <div id="in">
      <div id="tag">
        <el-divider >当日成交</el-divider>
      </div>

      <div id="stock">
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        borderheight="100%"
        @row-dblclick="handle"
        style="width: 100%;font-size: 6px;cursor: pointer"
        :default-sort = "{prop: 'time', order: 'descending'}"
        :header-cell-style="{background:'#eef1f6',color:'#606266'}">
        <el-table-column
          prop="time"
          label="成交时间"
          width="100"
          align="center"
          fixed
          sortable>
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
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="stampTax"
          label="印花税"
          width="75"
          align="center">
        </el-table-column>
        <el-table-column
          prop="otherFee"
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
          prop="revokeAmount"
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

</template>

<script>

    export default {
        name: "TodayExchange",
      data() {
        return {
          activeIndex: 'TodayExchange',
          tableData: [],
          currentPage:1,
          total:20,
          pageSize:15
        }
      },
      created() {
        this.setTodayExchangeApi();
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
        handleSizeChange(val) {
          this.currentPage = 1;
          this.pageSize = val;
        },
        handleCurrentChange(val) {
          this.currentPage = val;
        },
        setTodayExchangeApi:function () {
          let params={
            userId: this.$store.getters.getUserId
          }
          this.$api.http('get','/api/todayExchange',params).then(res=>{

              console.log(res.data)
              this.tableData = res.data;
              for(let i =0;i<this.tableData.length;i++){
                if(this.tableData[i].type===0){
                  this.tableData[i].type="买入"
                }
                else{
                  this.tableData[i].type="卖出"
                }
                if(this.tableData[i].tradeMarket===0){
                  this.tableData[i].tradeMarket="深市"
                }
                else{
                  this.tableData[i].tradeMarket="沪市"
                }
              }
          }).catch((error) => {
            this.$message.error(error.message)
          });
        },
      }
    }
</script>

<style scoped>
  a{
    text-decoration: none;
  }
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
  #exit{
    margin-top: 1.5%;
  }

</style>
