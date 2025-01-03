// Quantumult X 响应脚本示例

console.log("开始修改数量")
var body = $response.body;
 try {   
      console.log("进入修改")
      var daJSON = JSON.parse(body);
      var data = daJSON.data;
      var list = data.stocks;
      var i =0;
      for (var j=0;  j < list.length; j++) {
        let productNow =list[j];
        var name = productNow["stockName"];
        console.log(name)
        var send = productNow["send"];
        if (send == 0) {
          productNow["send"] = 1;
        }
      }
      body = JSON.stringify(daJSON);
      $done(body)
} catch(e) {
      console.log(e)
      $done(body)
}


