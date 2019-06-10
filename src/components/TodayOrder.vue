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

        <el-menu-item style = "margin-left: 15%" index="AfterLogin" >首页</el-menu-item>
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
        <el-submenu style = "margin-left: 5%" index="2">
          <template slot="title" ><p style="color: #409EFF;margin: auto">欢迎您！{{this.$store.getters.getUsername}}</p></template>
          <el-menu-item @click="exit">退出</el-menu-item>
        </el-submenu>
      </el-menu>

    </div>

<div id="in">

      <div id="tag">
        <el-divider >当日委托</el-divider>
      </div>
      <div id="stock">
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          @row-dblclick="handle"
          style="width: 100%;font-size: 8px"
          :default-sort = "{prop: 'orderTime', order: 'descending'}">
          <el-table-column
            prop="date"
            label="委托日期"
            width="100"
            align="center">
          </el-table-column>
          <el-table-column
            prop="time"
            label="委托时间"
            width="100"
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="stockId"
            label="股票代码"
            width="85"
            align="center">
          </el-table-column>
          <el-table-column
            prop="stockName"
            label="股票简称"
            width="85"
            align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            label="操作"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="orderAmount"
            label="委托数量"
            width="85"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exchangeAmount"
            label="成交数量"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="exchangeAveragePrice"
            label="成交均价"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="orderPrice"
            label="委托价格"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="cancelNumber"
            label="撤单数量"
            width="80"
            align="center">
          </el-table-column>
          <el-table-column
            prop="tradeStraregy"
            label="订单类型"
            width="85"
            align="center">
          </el-table-column>
          <el-table-column
            prop="contractNumber"
            label="合同编号"
            align="center"
          >
          </el-table-column>

        </el-table>
        <div class="block" style="margin-top:30px;">
          <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,5,10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
          </el-pagination>
        </div>
      </div>

    </div>
  </div>

</template>

<script>



  export default {

    name: "TodayOrder",

    data() {
      return {
        activeIndex: 'TodayOrder',
        tableData: [],
        currentPage:1,
        total:20,
        pageSize:5
      }
    },
    created() {
      this.setTodayOrderApi();
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
        console.log(`每页 ${val} 条`);
        this.currentPage = 1;
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
      },
      setTodayOrderApi:function () {
        let params={
          userId: this.$store.getters.getUserId
       //   userId:1001
        }
        this.$api.http('get','/api/todayOrder',params).then(res=>{
            if(res){

              console.log('请求成功')
              this.tableData = res.data;
        //      alert(JSON.stringify(this.tableData))
              setTimeout(()=>{
                self.setTodayOrderApi()
              },3000)
            }else{
              console.log('请求失败')
              return
            }

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
  }
  #stock{
    margin-top: 2%;
  }
  #tag{
    margin-top: 5%;
    margin-bottom: 4%;
  }
  #exit{
    margin-top: 1.5%;
  }

</style>
