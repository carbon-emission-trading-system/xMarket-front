<template>
  <div id="sin">
    <div id="sLeft">

      <el-autocomplete
        class="inline-input"
        v-model="input"
        prefix-icon="el-icon-search"
        :fetch-suggestions="querySearch"
        placeholder="请输入股票简称或代码"
        :trigger-on-focus="false"
        style="width: 100%;">
      </el-autocomplete>
    </div>
    <div id="sRight">
      <el-button type="primary" icon="el-icon-search" @click="find">搜索</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Search",
    data() {
      return {
        input: '',
      }
    },
    created() {
      //    this.find();
    },
    mounted() {
      //this.$store.dispatch('stockList')
    },
    computed: {
      //生成搜索提示  stockId：stockName:stockPinyin
      stocks: function () {
        let theStocks = this.$store.state.stockList
        let theStocksList = [];
        for (let i = 0; i < theStocks.length; i++) {
          let id = theStocks[i].stockId
          let theStock = id + ":" + theStocks[i].stockName+":"+theStocks[i].stockPinyin
          let stock = {value: theStock}
          theStocksList.push(stock)
        }
        return theStocksList
      }
    },
    methods: {
      //向store传递input的stockId值
      find() {
        let input = this.input
        let stockList = this.$store.state.stockList
        //如果用户未按搜索建议
        if (input.indexOf(":") === -1) {
          console.log("用户未按搜索建议")
          let stockIds = []
          let stockNames = []
          let stockPinyins= []
          for (let i = 0; i < stockList.length; i++) {
            let stockId = stockList[i].stockId
            stockId = stockId.toString()
            let stockName = stockList[i].stockName
            let stockPinyin = stockList[i].stockPinyin
            stockIds.push(stockId)
            stockNames.push(stockName)
            stockPinyins.push(stockPinyin)
          }
          console.log(stockNames)
          //判断是否存在该股票

          if (stockIds.indexOf(input) !== -1 || stockNames.indexOf(input) !== -1) {
            //如果用户输入的是股票拼音
            if (input.length===4) {
              let index = stockPinyins.indexOf(input)
              let stockId = stockIds[index]
              let stockName = stockNames[index]
              this.$store.commit('stockId', stockId)
              this.$store.commit('stockName', stockName)
            }//如果用户输入的是股票代码
            else if(input.length===6){
              this.$store.commit('stockId', input)
              let index = stockIds.indexOf(input)
              let stockName = stockNames[index]
              this.$store.commit('stockName', stockName)
              console.log(this.$store.state.stockId)
              console.log(this.$store.state.stockName)
            }//如果用户输入的是股票名称
            else{
              this.$store.commit('stockName', input)
              let index = stockNames.indexOf(input)
              let stockId = stockIds[index]
              this.$store.commit('stockId', stockId)
              console.log(this.$store.state.stockId)
              console.log(this.$store.state.stockName)
            }
            this.$router.push('StockDisplay')
          } else { //不存在则提示
            this.$alert('该股票不存在，请重新输入', '搜索失败', {
              confirmButtonText: '确定',
            });
          }
        } else {//如果用户按搜索建议
          let stockId = this.input.split(":")[0]
          let stockName = this.input.split(":")[1]
          this.$store.commit('stockId', stockId)
          this.$store.commit('stockName', stockName)
          this.$router.push('StockDisplay')
        }

      },

      //搜索提示
      querySearch(queryString, cb) {
        let stocks = this.stocks
        let results = queryString ? stocks.filter(this.createFilter(queryString)) : stocks
        // 调用 callback 返回建议列表的数据
        // console.log(results)
        // cb(results)
        let theResults = []

        //设置返回建议列表的数据不包含缩写
        for(let i=0;i<results.length;i++){
          let result = results[i].value
          let theResult = {value:result.split(":")[0]+":"+result.split(":")[1]}
       //   console.log(theResult)
          theResults.push(theResult)
        }
        console.log(theResults)
        cb(theResults);
      },
      createFilter(queryString) {
        return (stocks) => {
          //所有包含关键字的都作为提醒内容
          return (stocks.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
        };
      },

    },
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  #sin {
    display: inline-block;
    width: 40%;
    margin: 0 auto;
  }

  #sLeft {
    margin-top: 7%;
    float: left;
    width: 60%;
  }

  #sRight {
    margin-top: 7%;
    float: right;
    width: 35%;
  }
</style>
