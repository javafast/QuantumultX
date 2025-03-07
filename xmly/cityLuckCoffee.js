console.log("瑞幸抢购校验");
var body = $response.body;
try {
    var obj = JSON.parse(body);
    if (obj.success !== undefined ) {
       obj.success = true
       obj.code = "0"
        console.log("修改瑞幸状态");
    }
    
    body = JSON.stringify(obj);
    $done({ body });
} catch(e) {
    console.log(e);
    $done(body);
}
