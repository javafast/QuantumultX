
console.log("开始修改数量")
var body = $response.body;
try {   
    var obj = {
        "data": {
            "A": 80,
            "B": 10,
            "C": 10
        },
        "resultCode": "success",
        "resultDesc": null
    };
      body = JSON.stringify(obj);
      $done({ body });
} catch(e) {
      console.log(e)
      $done(body)
}
