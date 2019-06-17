  <template>
  <div id="sdin">
    <div id="sdleft">
      <el-date-picker
        v-model="value"
        type="daterange"
        :picker-options="pickerBeginDateBefore"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        unlink-panels="false">
      </el-date-picker>
    </div>
    <div id="sdright">
      <el-button type="primary" icon="el-icon-search" @click="select">搜索</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: '',
        beginDate:'',
        endDate:'',
        pickerBeginDateBefore:{
          disabledDate(time){
            return time.getTime()>Date.now();
          }
        },

      };
    },
    methods:{
      select(){
        this.beginDate=this.value[0]
        this.endDate=this.value[1]
        this.$emit("select",[this.beginDate,this.endDate])
      }
    }
  };
</script>

<style scoped>
  #sdin {
    display: inline-block;
    width: 40%;
    margin: 0 auto;
  }
  #sdleft{
    margin-top: 7%;
    float:left;
    width:60%;
  }

  #sdright{
    margin-top: 7%;
    float:right;
    width:35%;
  }

</style>
