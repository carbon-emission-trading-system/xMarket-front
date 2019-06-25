<template>
    <div id="body">
      <div id="fleft">
        <el-image :src="theurl" style="width: 150px;height: 150px"></el-image>
        <p style="color: firebrick">自强不息，知行合一</p>
      </div>
      <div id="fright">
        <h4>友情链接</h4>
        <p>东北大学</p>
        <p>金证股份</p>
      </div>
      <div id="frightright">
        <h4>联系我们</h4>
        <p>地址：辽宁省沈阳市浑南区智慧大街500号东北大学浑南校区</p>
        <p>联系电话：188-8888-8888</p>

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
  #body{
    margin: auto;
    width: 100%;
    display: inline-block;
    background-color: #292929;
  }
  #fleft{
    margin-top: 3%;
    float: left;
    width: 30%;
  }
  #fright{
    margin-top: 3%;
    float: right;
    width: 30%;
    margin-right: 10%;
  }
  #frightright{
    margin-top: 3%;
    float: right;
    width: 30%;
    margin-left: -20%;
  }
  p{
    font-weight: 900;
    font-size: 15px;
    color: #fff;
    font-family: "微软雅黑", "Microsoft Yahei", arial,"宋体";
  }
  h4{
    color: #fff;
    font-family: "微软雅黑", "Microsoft Yahei", arial,"宋体";
  }

</style>
