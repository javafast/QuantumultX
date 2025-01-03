// Quantumult X 响应脚本示例

console.log("开始修改数量")
var body = $response.body;
 try {   
      var obj = JSON.parse(body);
      obj.data.stocks.forEach(stock => { 
        console.log(stock.stockName)
        var total = Number(stock.total);
        var sent = Number(stock.sent);
        if (total - sent === 0) {
           console.log("修改："+name)
           stock.sent = 0;
        }
     });
      body = JSON.stringify(obj);
      $done({ body });
} catch(e) {
      console.log(e)
      $done(body)
}
