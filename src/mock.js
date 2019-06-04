//引入mockjs
const Mock = require('mockjs');
//获取mock.Random对象
const Random = Mock.Random;
import qs from 'qs'

//模拟公告数据
const produceNoticesData = function () {
  let data = [];
  for(let i = 0;i<4;i++){
    let newNoticeObject = {
      title:Random.cword(4,10),
      content:Random.csentence(20,100),
      date:Random.date()
    }
    data.push(newNoticeObject)
  }
 let notices={
    code:500,
   message:"success",
   data:data
  }
  return{
    notices:notices
  }
}
//模拟自选股数据
const produceSelfStockData = function () {
  let selfStocks = [];
  for(let i = 0;i<4;i++){
    let newSelfStocksObject = {
      stockID:Random.integer(600000,700000),
      stockName:Random.cword(4),
      lastTradePrice:Random.float(20,100,2,2),
      increase:Random.float(20,100,2,2),
      highestPrice:Random.float(20,100,2,2),
      lowestPrice:Random.float(20,100,2,2),
      yesterdayOpenPrice:Random.float(20,100,2,2),
      todayOpenPrice:Random.float(20,100,2,2),
      turnover:Random.float(0,6,2,2)+'亿',
      marketValue:Random.float(300,1000,2,2),
      priceEarningsRatio:Random.float(10,30,2,2),
      priceToBookRatio:Random.float(1,15,2,2)
    }
    selfStocks.push(newSelfStocksObject)
  }
  return{
    selfStocks:selfStocks
  }
}
//模拟股票列表数据
const produceStockListData = function () {
  let data = [];
  for(let i = 0;i<30;i++){
    let newStockListObject = {
      type:Random.integer(0,1),
      stockID:Random.integer(600000,700000),
      stockName:Random.cword(4),
      lastTradePrice:Random.float(20,100,2,2),
      increase:Random.float(20,100,2,2),
      highestPrice:Random.float(20,100,2,2),
      lowestPrice:Random.float(20,100,2,2),
      yesterdayOpenPrice:Random.float(20,100,2,2),
      todayOpenPrice:Random.float(20,100,2,2),
      turnover:Random.float(0,6,2,2)+'亿',
      marketValue:Random.float(300,1000,2,2),
      priceEarningsRatio:Random.float(10,30,2,2),
      priceToBookRatio:Random.float(1,15,2,2)

    }
    data.push(newStockListObject)
  }
  return{
    data:data
  }
}

//模拟当日成交数据
const produceTodayExchangeData = function () {
  let todayExchange = [];
  for(let i = 0;i<5;i++){
    let newTodayExchangeObject = {
      exchangeTime:Random.time(),
      stockID:Random.integer(600000,700000),
      stockName:Random.cword(4),
      operation:Random.integer(1,2),
      exchangeAmount:Random.integer(1000,5000,100),
      exchangeAveragePrice:Random.float(10,50,2,2),
      exchangePrice:Random.float(10,50,2,2),
      stockBalance:Random.integer(1000,5000,100),
      contractNumber:Random.integer(1000000,9999999),
      exchangeNumber:Random.integer(1000000,9999999),
      serviceTax:Random.float(1,200,2,2),
      stampTax:Random.float(1,200,2,2),
      incidentalCharge:Random.float(1,200,2,2),
      actualAmount:Random.float(10000,50000,2,2),
      market:Random.integer(1,2),
      revokeAmount:Random.integer(1000,5000,100)
    }
    todayExchange.push(newTodayExchangeObject)
  }
  return{
    todayExchange:todayExchange
  }
}

//模拟历史持仓
const produceHistoryHoldPositionData = function () {
  let historyHoldPosition = [];
  for(let i = 0;i<5;i++){
    let newHistoryHoldPositionObject = {
      stockID: Random.integer(600000, 700000),
      stockName: Random.cword(4),
      buildPositionDate:Random.date(),
      clearPositionDate:Random.date(),
      holdStockDays: Random.integer(),
      totalProfitAndLoss: Random.integer(1000, 5000, 100),
      profitAndLossRatio: Random.float(10, 50, 2, 2),
    }
    historyHoldPosition.push(newHistoryHoldPositionObject)
  }
  return{
    historyHoldPosition:historyHoldPosition
  }
}




//模拟K线图数据
const produceKlineData = function () {
  let kline = [];
  for(let i = 0;i<30;i++){
    let newKlineObject = {
      'date':'2019-'+'03-'+Random.increment(1),
      'openPrice':Random.float(10400,10700,2,2),
      'closePrice':Random.float(10400,10700,2,2),
      'highestPrice':Random.float(10550,10700,2,2),
      'lowestPrice':Random.float(10400,10550,2,2),
      'volume':Random.integer(10000000,150000000),
    }
    kline.push(newKlineObject)
  }
  return{
    kline:kline
  }
}

//模拟返回数据
const search=function(options){
  let stockId = JSON.parse(options.body).params.stockId;
  console.log("数据获取"+ stockId);
}


//Mock.mock(url,post/get,返回的数据);
Mock.mock('/api/getNews','post',produceNoticesData);
Mock.mock('/selfStocks/index','post',produceSelfStockData);
Mock.mock('/api/KlineDiagramDisplay','post',produceKlineData);
Mock.mock('/search/index','post',search);
Mock.mock('/api/stockList','post',produceStockListData);
Mock.mock('/todayExchange/index','post',produceTodayExchangeData);
Mock.mock('/historyHoldPosition/index','post',produceHistoryHoldPositionData);

