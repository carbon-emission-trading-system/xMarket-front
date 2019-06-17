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

    <div id="in">

      <div id="tag">
        <el-divider >当日委托</el-divider>
      </div>
      <div id="stock">
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          height=500
          @row-dblclick="handle"
          style="width: 100%;font-size: 8px;cursor: pointer"
          :header-cell-style="{background:'#eef1f6',color:'#606266'}">
          <el-table-column
            prop="date"
            label="委托日期"
            width="100"
            fixed
            align="center">
          </el-table-column>
          <el-table-column
            prop="time"
            label="委托时间"
            width="100"
            fixed
            sortable
            align="center">
          </el-table-column>
          <el-table-column
            prop="stockId"
            label="股票代码"
            width="85"
            fixed
            align="center">
          </el-table-column>
          <el-table-column
            prop="stockName"
            label="股票简称"
            width="85"
            fixed
            align="center">
          </el-table-column>
          <el-table-column
            prop="type"
            label="操作"
            width="80"
            fixed
            align="center">
          </el-table-column>
          <el-table-column
            prop="state"
            label="委托状态"
            width="90"
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
            <template slot-scope="scope">
              <span v-if="scope.row.orderPrice<=scope.row.exchangeAveragePrice" style="color: #ff3434" >{{scope.row.orderPrice}}</span>
              <span v-else style="color: #02e602">{{scope.row.orderPrice}}</span>
            </template>
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
            width="150"
            align="center">
          </el-table-column>
          <el-table-column
            prop="orderId"
            label="合同编号"
            align="center"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="70"
            fixed="right"
            align="center"
          >
            <template slot-scope="scope">
              <el-button @click="cancel(scope.row.orderId)" type="text" size="small">撤单</el-button>
            </template>
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

    name: "TodayOrder",

    data() {
      return {
        activeIndex: 'TodayOrder',
        tableData: [],
        currentPage:1,
        total:20,
        pageSize:15
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

          console.log('请求成功')
          this.tableData = res.data;
          for(let i =0;i<this.tableData.length;i++) {
            if (this.tableData[i].type === 0) {
              this.tableData[i].type = "买入"
            } else {
              this.tableData[i].type = "卖出"
            }

            if(this.tableData[i].tradeMarket===0){
              this.tableData[i].tradeMarket="深市"
            }
            else{
              this.tableData[i].tradeMarket="沪市"
            }

            if(this.tableData[i].tradeStraregy===0){
              this.tableData[i].tradeStraregy="限价委托"
            }else if(this.tableData[i].tradeStraregy===1){
              this.tableData[i].tradeStraregy="最优五档即时成交剩余撤销"
            }else if(this.tableData[i].tradeStraregy===2){
              this.tableData[i].tradeStraregy="最优五档即时成交剩余转限价"
            }else if(this.tableData[i].tradeStraregy===3){
              this.tableData[i].tradeStraregy="对手方最优价格"
            }else if(this.tableData[i].tradeStraregy===4){
              this.tableData[i].tradeStraregy="本方最优价格"
            }else if(this.tableData[i].tradeStraregy===5){
              this.tableData[i].tradeStraregy="最优五档即时成交剩余撤销"
            }else if(this.tableData[i].tradeStraregy===6){
              this.tableData[i].tradeStraregy="即时成交并撤销"
            }else if(this.tableData[i].tradeStraregy===7){
              this.tableData[i].tradeStraregy="全额成交或撤销"
            }

          }

          let timer = setTimeout(()=>{
            this.setTodayOrderApi()
          },10000)
          this.$once('hook:beforeDestroy',()=>{
            clearInterval(timer)
          })
        }).catch((error) => {
          this.$message.error(error.message)
        });
      },
      //撤单
      cancel(orderId){
        let x = '您确认对合同编号为' + orderId + '的订单进行撤单操作吗?'
        this.$confirm(x, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let code = this.cancelOrder(orderId)
          let message =''
          if(code === 200) {
            message='撤单成功!';
          }
          this.$message({
            type: 'success',
            message: message,
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消撤单'
          });
        });

      },
      cancelOrder(orderId){
        let params={
          orderId:orderId
        }
        this.$api.http('post','/api/cancelOrder',params).then(res=>{
          return res.code;
        }).catch((error) => {
          this.$message.error(error.message)
        })
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

</style>

