// Quantumult X 响应脚本示例

console.log("开始修改数量")
var body = $response.body;
 try {   
      var daJSON = JSON.parse(body);
      var data = daJSON.data;
      var list = data.stocks;
      var i =0;
      for (var j=0;  j < list.length; j++) {
        let productNow =list[j];
        var name = productNow["stockName"];
        var send = productNow["send"];
        console.log(name)
        console.log(send)
        var send = productNow["send"];
        if (send === 0) {
          productNow["send"] = 1;
        }
      }
      console.log("修改结束")
      body = JSON.stringify(daJSON);
      $done(body)
} catch(e) {
      console.log(e)
      $done(body)
}


