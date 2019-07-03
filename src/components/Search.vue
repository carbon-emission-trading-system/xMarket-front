<template>
  <div id="sin">
    <div id="input">
      <el-autocomplete
        class="inline-input"
        v-model="input"
        :fetch-suggestions="querySearch"
        placeholder="请输入股票简称、代码或缩写"
        :trigger-on-focus="false"
        style="width: 100%;border: 1px solid #409EFF ;border-radius:5px">
        <el-button slot="append" icon="el-icon-search" @click="find"></el-button>
      </el-autocomplete>
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
        let theStocks = this.$store.state.stockList;
        let theStocksList = [];
        for (let i = 0; i < theStocks.length; i++) {
          let id = theStocks[i].stockId;
          let theStock = id + ":" + theStocks[i].stockName + ":" + theStocks[i].stockPinyin;
          let stock = {value: theStock};
          theStocksList.push(stock)
        }
        return theStocksList
      }
    },
    methods: {
      //向store传递input的stockId值
      find() {
        let input = this.input;
        let stockList = this.$store.state.stockList;
        //如果用户未按搜索建议
        if (input.indexOf(":") === -1) {
          //将股票代码、简称、简称拼音缩写分别存入list中
          let stockIds = [];
          let stockNames = [];
          let stockPinyins = [];
          for (let i = 0; i < stockList.length; i++) {
            let stockId = stockList[i].stockId;
            let stockName = stockList[i].stockName;
            let stockPinyin = stockList[i].stockPinyin;
            stockIds.push(stockId);
            stockNames.push(stockName);
            stockPinyins.push(stockPinyin);
          }
          //判断是否存在该股票
          if (stockIds.indexOf(input) !== -1 || stockPinyins.indexOf(input.toUpperCase()) !== -1 || stockNames.indexOf(input) !== -1) {
            //用户输入的是股票代码
            if (input.length === 6) {
              this.$store.commit('stockId', input)
              let index = stockIds.indexOf(input)
              let stockName = stockNames[index]
              this.$store.commit('stockName', stockName)
              console.log("id")
            }
            //用户输入的是股票拼音
            else if (input.replace(/[\u0391-\uFFE5]/g, "aa").length <8 ) {
              let index = stockPinyins.indexOf(input.toUpperCase())
              let stockId = stockIds[index]
              let stockName = stockNames[index]
              this.$store.commit('stockId', stockId)
              this.$store.commit('stockName', stockName)
              console.log("pinyin")
            }
            //用户输入的是股票名称
            else {
              this.$store.commit('stockName', input)
              let index = stockNames.indexOf(input)
              let stockId = stockIds[index]
              this.$store.commit('stockId', stockId)
              console.log("name")
            }
            this.$store.commit('changeRout', 0);
            this.$router.push('StockDisplay')
          }
          //不存在则提示
          else {
            this.$message('该股票不存在，请重新输入！');
          }
        }
        //如果用户按搜索建议
        else {
          let stockId = this.input.split(":")[0]
          let stockName = this.input.split(":")[1]
          this.$store.commit('stockId', stockId)
          this.$store.commit('stockName', stockName)
          this.$store.commit('changeRout', 0);
          this.$router.push('StockDisplay')
        }
      },

      //搜索建议
      querySearch(queryString, cb) {
        let stocks = this.stocks;
        let results = queryString ? stocks.filter(this.createFilter(queryString)) : stocks;
        let theResults = [];

        //设置返回建议列表的数据不包含股票简称缩写
        for (let i = 0; i < results.length; i++) {
          let result = results[i].value;
          let theResult = {value: result.split(":")[0] + ":" + result.split(":")[1]};
          theResults.push(theResult)
        }
        // 调用 callback 返回建议列表的数据
        cb(theResults);
      },
      createFilter(queryString) {
        return (stocks) => {
          //所有包含关键字的都作为建议列表的数据
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
    margin: auto;
    width: 70%;
  }

  #input {
    margin-top: 6%;
    width: 100%;
  }

</style>
