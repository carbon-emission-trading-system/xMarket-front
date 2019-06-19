<template>
  <div>
    hello
  </div>
</template>

<script>
  import VCharts from 'v-charts'
  import RealTime from './SelfRealTime'
  import echarts from 'echarts' //引入echarts
  import Vue from 'vue'

  Vue.prototype.$echarts = echarts //引入组件

  export default {
    name: "FundCurve",
    data() {
      return {

      }
    },
    methods:{
      asdad(){
        let myChart = this.$echarts.init(document.getElementById('myChart'))
      },
    },

  }
</script>

<style scoped>

</style>
