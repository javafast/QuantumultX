
console.log("返回京东E卡")
var body = $response.body;
try {   
    var obj = {
        "data": "W7oK+MTzfndz3e56adOqr2+ZjoMRer5rZXNs6/3rsYXMHjZoR46gdf6cQ/Xie/Fk",
        "resultCode": true,
        "msg": "成功",
        "status": "S00000"
    };
      body = JSON.stringify(obj);
      $done({ body });
} catch(e) {
      console.log(e)
      $done(body)
}
