//
// import Vue from 'vue';
// import store from "../store/store";
//
// let v = new Vue(
//   {
//     store,
//   }
// );
// let self=this;
// export default {
//   message:'qiqiqi',
//   clientNotify:null,
//
//   onConnectedNotify(frame)
//   {
//     console.log(self.message);
//     console.log(self.clientNotify)
//     console.log("Connected: " + frame);
//     let exchange1 = "/exchange/notifyExchange/" + v.$store.state.user.userId;
//     let subscription = self.clientNotify.subscribe(exchange1, self.onmessageNotify);
//
//   },
//   onFailedNotify(frame)
//   {
//     console.log("Failed: " + frame.body);
//     //this.client.send("/exchange/orderExchange/orderRoutingKey", {"content-type":"text/plain"}, "订阅失败");
//
//   },
//   onmessageNotify(message)
//   {
//     console.log("得到消息");
//     self.message = JSON.parse(message.body);
//   },
//
//   connectNotify()
//   {
//
//     console.log("开始连接");
//     self.clientNotify = Stomp.client("ws://192.168.137.1:15674/ws")
//     console.log("创建"+self.clientNotify);
//     var headers = {
//       "login": "zhang",
//       "passcode": "648810",
//       //虚拟主机，默认“/”
//       "heart-beat": "0,0"
//     };
//     self.clientNotify.connect(headers, this.onConnectedNotify, this.onFailedNotify);
//     console.log("连接结束");
//   },
//
//   notifiSuccess()
//   {
//     v.$notify({
//       message: this.message,
//       type: 'success'
//     });
//     console.log(v.$store.state.user.userId)
//     console.log('notifisuccess')
//   },
//   notifiFailed()
//   {
//     v.$notify.error({
//       message: this.message
//     });
//   },
//
// }
