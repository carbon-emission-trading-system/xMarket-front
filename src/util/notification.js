
import Vue from 'vue';
import store from "../store/store";

let v = new Vue(
  {
    store,
  }
);
export default {
  message:'qiqiqi',
  onConnectedNotify(frame)
  {
    console.log("Connected: " + frame);
    let exchange1 = "/exchange/notifyExchange/" + v.$store.state.user.userId;

    let subscription = this.client.subscribe(exchange1, this.onmessage);
    console.log(subscription);


  },
  onFailedNotify(frame)
  {
    console.log("Failed: " + frame.body);
    //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");

  },
  onmessageNotify(message)
  {
    console.log("得到消息");
    this.message = JSON.parse(message.body);
  },
  responseCallbackNotify(frame)
  {
    console.log("得到的消息 msg=>" + frame.body);
  },
  connectNotify()
  {
    console.log("开始连接");
    this.client = Stomp.client("ws://192.168.137.1:15674/ws")
    console.log("创建");
    var headers = {
      "login": "zhang",
      "passcode": "648810",
      //虚拟主机，默认“/”
      "heart-beat": "0,0"
    };
    this.client.connect(headers, this.onConnectedNotify, this.onFailedNotify);
    console.log("连接结束");
  },

  notifiSuccess()
  {
    v.$notify({
      message: this.message,
      type: 'success'
    });
    console.log(v.$store.state.user.userId)
    console.log('notifisuccess')
  },
  notifiFailed()
  {
    v.$notify.error({
      message: this.message
    });
  },

}
