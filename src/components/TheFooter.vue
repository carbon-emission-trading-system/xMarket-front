<template>
    <div id="thisin">
      <div id="fleft">
        <el-image :src="theurl" style="width: 150px;height: 150px"></el-image>
        <p style="color: firebrick">自强不息，知行合一</p>
      </div>
      <div id="fright">
        <h4 class="h">友情链接</h4>
        <p>
          <a href="http://www.neu.edu.cn/main.htm">东北大学</a>
        </p>
        <p>
          <a href="http://www.szkingdom.com/welcome.html">金证股份</a>
        </p>

      </div>
      <div id="frightright">
        <h4 class="h">联系我们</h4>
        <p>
          <i class="el-icon-location-information"></i>
          <scan class="sc">地址：辽宁省沈阳市浑南区智慧大街500号东北大学浑南校区</scan>
        </p>
        <p>
          <i class="el-icon-phone-outline"></i>
          <scan class="sc">188-8888-8888</scan>
        </p>

      </div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
      data(){
          return{
            theurl:'../../../static/images/erweima.jpg',
          }
      }
    }
</script>

<style scoped>
  #thisin{
    margin: auto;
    width: 100%;
    display: inline-block;
    background-color: #292929;
  }
  #fleft{
    margin-left: 5%;
    margin-top: 3%;
    float: left;
    width: 30%;
  }
  #fright{
    margin-top: 3%;
    float: right;
    width: 30%;
    margin-right: 5%;
  }
  #frightright{
    margin-top: 3%;
    float: right;
    width: 30%;
    margin-left: -20%;
  }
  .sc{
    font-weight: 900;
    font-size: 15px;
    color: #8d8e93;
    font-family: "微软雅黑", "Microsoft Yahei", arial,"宋体";
  }
  /*h4{*/
  /*  color: #fff;*/
  /*  font-family: "微软雅黑", "Microsoft Yahei", arial,"宋体";*/
  /*}*/
  a {
    text-decoration: none;
    font-family: "微软雅黑", "Microsoft Yahei", arial,"宋体";
    color: #8d8e93;
  }

  .h{
    font-size: 20px;
    color: #fff;
    line-height: 25px;
    margin: 0 0 25px 0;
    font-weight: normal;
  }

</style>
