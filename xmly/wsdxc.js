console.log("🔧 Quantumult X");

// 获取当前请求的 URL
const url = $request ? $request.url : ($response ? $response.url : "");
const hostname = url ? new URL(url).hostname : "";


let body = $response ? $response.body : null;

try {
    if ($response && body) {
        console.log(`📥 拦截到响应: ${url}`);
        let obj = JSON.parse(body);
        obj = modifyConfirmOrder(obj);
        body = JSON.stringify(obj);
        $done({ body });
        return;
    }
} catch (e) {
    console.log("❌ 解析 JSON 失败:", e);
    $done({ body: "解析错误" });
}


function modifyConfirmOrder(obj) {
    console.log("✅ 当前返回", obj.msg);

    
    return {
        "msg": "S00000",
        "status": "S00000"
    };
}
