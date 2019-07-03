<!----股票筛选------->
<template>

  <div style="width: 100%;height: 100%">
    <div id="fundLine" style="width:100%;height:260px;" v-show="StockScreening"></div>
    <div v-show="!StockScreening"
         style="font-weight: 900;font-size: 15px;color: rgba(0,0,0,0.27);">暂无资金曲线
    </div>
    <!--<ve-line :data="fundLine" :settings="fundLineSettings"></ve-line>-->
  </div>

</template>

<script>
  import Vue from 'vue'
  import VCharts from 'v-charts'
  import echarts from 'echarts' //引入echarts
  Vue.use(VCharts)
  Vue.prototype.$echarts = echarts //引入组件


  export default {

    name: "StockScreening",
    data() {
      return {
        xaa: [],
        timeDate: [],
        fundIncrease: [],
        szcz: [],
        szzs: [],
        totalFunds: [],
        activeIndex: 'StockScreening',
        // 'data', '总资产','持仓盈亏: ','上证指数','深圳成指'
        StockScreening: true,

      }
    },

    created() {
      this.setKlineApi();
    }
    ,
    methods: {
      setKlineApi: function () {
        let params = {
          userId: this.$store.getters.getUserId,
        };

        console.log(params)
        this.$api.http('get', '/api/userFundLineDisplay', params).then(res => {
          console.log(res.data);

          let data = res.data;
          for (let i = 0; i < data.length; i++) {
            this.timeDate.push(data[i].date);
            this.fundIncrease.push(data[i].fundIncrease);
            this.szcz.push(data[i].szcz);
            this.szzs.push(data[i].szzs);
            this.totalFunds.push(data[i].totalFunds);
          }
          console.log(this.timeDate);
          this.drawLine();
        }).catch((error) => {
          if (error.code === 10003) {
            this.StockScreening = false;
          } else {
            this.$message.error(error.message)
          }
        });
      }
      ,
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('fundLine'));
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            }
          },
          legend: {
            data: ['总资产', '持仓盈亏', '上证指数', '深圳成指'],
            // ,
          },
          axisPointer: {
            link: {xAxisIndex: 'all'}
          },
          grid: [{
            height: '50%'
          }, {
            top: '70%',
            height: '15%'
          }],
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              axisLine: {onZero: false},
              data: this.timeDate,
              splitArea: {
                color: ['rgba(0, 0, 0, 0.81)', 'rgba(200,200,200,0.3)'],
                shadowBlur: 10
              },
              splitLine: {
                splitNumber: 3
              },
            },
          ],
          yAxis: [
            {
              name: '值',
              type: 'value',
              yAxisIndex: 0,
              min: 'dataMin',
              max: 'dataMax',
            },
            {
              name: '百分比',
              yAxisIndex: 1,
              splitLine: {
                "show": false
              },
              type: 'value',
            }
          ],
          series: [
            {
              name: '总资产',
              type: 'line',
              data: this.totalFunds,
              smooth:0.2,
            },
            {
              name: '持仓盈亏',
              type: 'line',
              yAxisIndex: 1,
              smooth:0.2,
              data: this.fundIncrease,
            },
            {
              name: '上证指数',
              type: 'line',
              yAxisIndex: 1,
              data: this.szzs,
            },
            {
              name: '深圳成指',
              type: 'line',
              yAxisIndex: 1,
              data: this.szcz
            },
          ]
        });
        console.log(this.totalFunds)
      },
    }
    ,
  }
</script>

<style scoped>

  a {
    text-decoration: none;
  }


</style>
