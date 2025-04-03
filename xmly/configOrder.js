console.log("🔧 Quantumult X");

// 获取当前请求的 URL
const url = $request ? $request.url : ($response ? $response.url : "");
const hostname = url ? new URL(url).hostname : "";

// 定义规则
const rules = [
    {
        domain: "mall-api2-demo.jw2008.cn",
        regex: /^https:\/\/mall-api2-demo\.jw2008\.cn\/mall-basic-portal\/v2\/oms\/order\/equityPoint\/confirmOrder/,
        action: "confirmOrder"
    }
];

// 匹配规则
let matchedRule = rules.find(rule => {
    return hostname.includes(rule.domain) && rule.regex.test(url);
});

if (!matchedRule) {
    console.log(`⛔ 当前请求 ${hostname}${url} 不符合匹配规则，跳过处理`);
    $done({});
    return;
}

let body = $response ? $response.body : null;

try {
    if ($response && body) {
        console.log(`📥 拦截到响应: ${url}`);
        let obj = JSON.parse(body);

        // 处理每个 action
        switch (matchedRule.action) {
            case "confirmOrder":
               obj = modifyConfirmOrder(obj);
                break;

            default:
                console.log(`🔧 未知的 action: ${matchedRule.action}`);
        }

        body = JSON.stringify(obj);
        $done({ body });
        return;
    }
} catch (e) {
    console.log("❌ 解析 JSON 失败:", e);
    $done({ body: "解析错误" });
}



function modifyConfirmOrder(obj) {
    console.log("✅ 订单确认返回新 JSON");
    return {
        "code": "0",
        "success": true,
        "value": {
            "productId": 16908,
            "productSpecPicture": "https://mall-1253894390.cos.ap-guangzhou.myqcloud.com/goods/image/4636c499-fed3-43fe-9590-1a8b9d008f44%40800x800",
            "orderAmount": "29.00",
            "productType": "VIRTUAL",
            "merchantId": 38,
            "smsId": 16629,
            "productSpecTitle": "默认",
            "mobile": "13091904140",
            "productTitle": "瑞幸咖啡32元券*10张",
            "productSpecId": 27050,
            "merchantName": "订单详情",
            "number": 1,
            "iseCardFlag": false,
            "rechargeType": "DIRECT_RECHARGE",
            "equityPointNumber": 1
        }
    };
}
