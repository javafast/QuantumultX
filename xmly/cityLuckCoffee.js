console.log("开始修改返回体");
var body = $response.body;
try {
    var obj = JSON.parse(body);

    // 仅在 code = "-1" 且 success = false 时修改
    if (obj.code === "-1") {
        console.log("检测到库存售罄，修改返回值...");
        obj.code = "0";  
        obj.success = true;
    }

    body = JSON.stringify(obj);
    $done({ body });
} catch (e) {
    console.log("解析 JSON 失败:", e);
    $done(body);
}
