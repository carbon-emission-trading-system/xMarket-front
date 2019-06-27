<template>

  <div id="app">
    <router-view></router-view>
    <div style="margin-top: 8%;width: 100%;float: left">
      <the-footer></the-footer>
    </div>

  </div>

</template>

<script>

  import Stomp from 'stompjs'
  export default {
    name: 'App',
    data() {
      return {
        clientNotify: null,
        message:'qiqiqi',
      }
    },

    created(){
      this.connectNotify();
    },
    computed:{
      userId: function () {
        return this.$store.getters.getUserId
      }
    },
    watch:{
      userId(newValue,oldValue){
        if (this.clientNotify != null) {
          this.clientNotify.disconnect(
            function () {
              console.log("断开连接");
            });
        }
        this.connectNotify()
      }

    },


    destroyed(){
      if (this.clientNotify != null) {
        this.clientNotify.disconnect(
         function () {
            console.log("断开连接");
           });
  }
    },

    methods:{
      onConnectedNotify(frame)
      {
        console.log("Connected: " + frame);
        let exchange1 = "/exchange/notifyExchange/" + this.$store.getters.getUserId;
        console.log("id:"+this.$store.state.user.userId);
        this.clientNotify.subscribe(exchange1, this.onmessageNotify);

      },
      onFailedNotify(frame)
      {
        console.log("Failed: " + frame.body);
        //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");

      },
      onmessageNotify(message)
      {
        console.log("得到消息");
        this.message = message.body;
        console.log(this.message)
        this.$notify({
          message: this.message,
          type: 'success'
        });
      },

      connectNotify()
      {

        console.log("开始连接");
        this.clientNotify = Stomp.client("ws://192.168.137.1:15674/ws")
        console.log("创建");
        var headers = {
          "login": "zhang",
          "passcode": "648810",
          //虚拟主机，默认“/”
          "heart-beat": "0,0"
        };
        this.clientNotify.connect(headers, this.onConnectedNotify, this.onFailedNotify);
        console.log("连接结束");
      },

    }

  }

  !(function() {
    function n(n, e, t) {
      return n.getAttribute(e) || t;
    }

    function e(n) {
      return document.getElementsByTagName(n);
    }

    function t() {
      var t = e("script"),
        o = t.length,
        i = t[o - 1];

      return {
        l: o,
        z: n(i, "zIndex", -1),
        o: n(i, "opacity", 0.5),
        c: n(i, "color", "0,0,0"),
        n: n(i, "count", 99)
      };
    }

    function o() {
      (a = m.width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth),
        (c = m.height =
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight);
    }

    function i() {
      r.clearRect(0, 0, a, c);

      var n, e, t, o, m, l;

      s.forEach(function(i, x) {
        for (
          i.x += i.xa,
            i.y += i.ya,
            i.xa *= i.x > a || i.x < 0 ? -1 : 1,
            i.ya *= i.y > c || i.y < 0 ? -1 : 1,
            r.fillRect(i.x - 0.5, i.y - 0.5, 1, 1),
            e = x + 1;
          e < u.length;
          e++
        )
          (n = u[e]),
          null !== n.x &&
          null !== n.y &&
          ((o = i.x - n.x),
            (m = i.y - n.y),
            (l = o * o + m * m),
          l < n.max &&
          (n === y &&
          l >= n.max / 2 &&
          ((i.x -= 0.03 * o), (i.y -= 0.03 * m)),
            (t = (n.max - l) / n.max),
            r.beginPath(),
            (r.lineWidth = t / 2),
            (r.strokeStyle = "rgba(" + d.c + "," + (t + 0.2) + ")"),
            r.moveTo(i.x, i.y),
            r.lineTo(n.x, n.y),
            r.stroke()));
      }),
        x(i);
    }

    var a,
      c,
      u,
      m = document.createElement("canvas"),
      d = t(),
      l = "c_n" + d.l,
      r = m.getContext("2d"),
      x =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(n) {
          window.setTimeout(n, 1e3 / 45);
        },
      w = Math.random,
      y = { x: null, y: null, max: 2e4 };
    (m.id = l),
      (m.style.cssText =
        "position:fixed;top:0;left:0;z-index:" + d.z + ";opacity:" + d.o),
      e("body")[0].appendChild(m),
      o(),
      (window.onresize = o),
      (window.onmousemove = function(n) {
        (n = n || window.event), (y.x = n.clientX), (y.y = n.clientY);
      }),
      (window.onmouseout = function() {
        (y.x = null), (y.y = null);
      });

    for (var s = [], f = 0; d.n > f; f++) {
      var h = w() * a,
        g = w() * c,
        v = 2 * w() - 1,
        p = 2 * w() - 1;
      s.push({ x: h, y: g, xa: v, ya: p, max: 6e3 });
    }

    (u = s.concat([y])),
      setTimeout(function() {
        i();
      }, 100);
  })();

</script>


<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }

  html, body, #app {
    /*background-image: url("../static/images/8.png");*/
    /*background-repeat:no-repeat;*/
    /*width:100%;*/
    /*height: 100%;*/
    /*background-size:cover;*/
    /*background-color: #e9f1f6;*/
    /*background-attachment:fixed;*/
  }
  /*.el-button{*/
  /*background-color: #15c616;*/

  /*}*/
  /*.el-button:hover{*/
  /*background-color: #6b8c42;*/

  /*}*/
  /*.el-button:focus{*/
  /*background-color: #6b8c42;*/

  /*}*/
</style>
