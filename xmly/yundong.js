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
        var total = productNow["total"];
        var sent = productNow["sent"];
        let result = Number(total) - Number(sent);
        console.log(name)
        console.log(result)
        if (result === 0) {
          productNow["sent"] = total;
            console.log("修改结束"+productNow["sent"])
        }
      }
      console.log("修改结束")
      body = JSON.stringify(daJSON);
      $done(body)
} catch(e) {
      console.log(e)
      $done(body)
}


