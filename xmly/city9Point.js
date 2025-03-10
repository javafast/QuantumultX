console.log("修改中信九积分库存");
var body = $response.body;
try {
    var obj = JSON.parse(body);

    // 仅在 stockNum = 0 时修改
    if (obj.data && obj.data.stockNum === 0) {
        console.log("检测到库存售罄，修改返回值...");
        obj.data.stockNum = 1000;
    }

    body = JSON.stringify(obj);
    $done({ body });
} catch (e) {
    console.log("解析 JSON 失败:", e);
    $done({ body });
}
