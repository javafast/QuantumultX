console.log("🔧 Quantumult X");

// 获取当前请求的 URL
const url = $request ? $request.url : ($response ? $response.url : "");
const hostname = url ? new URL(url).hostname : "";

// 定义规则
const rules = [
    {
        domain: "jf.creditcard.ecitic.com",
        regex: /^https:\/\/jf\.creditcard\.ecitic\.com\/citiccard\/jfxd-api-gateway\/jfxd-app-goods\/sku\/sku-stock\?skuId=\d+$/,
        action: "modifyStock"
    },
    {
        domain: "mall-api2-demo.jw2008.cn",
        regex: /^https:\/\/mall-api2-demo\.jw2008\.cn\/mall-basic-portal\/v2\/portal\/pms\/equityPoint\/activityPage\/QYD1885509954898931712$/,
        action: "modifyActivityPage"
    },
    {
        domain: "ldp.creditcard.ecitic.com",
        regex: /^https:\/\/ldp\.creditcard\.ecitic\.com\/citiccard\/lottery-gateway-pay\/user-acts-group-qualification\.do$/,
        action: "modifyQualification"
    },
    {
        domain: "mall-api2-demo.jw2008.cn",
        regex: /^https:\/\/mall-api2-demo\.jw2008\.cn\/mall-basic-portal\/v2\/oms\/order\/equityPoint\/validOrder/,
        action: "validOrder"
    },
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
            case "modifyStock":
                modifyStock(obj);
                break;

            case "modifyActivityPage":
                modifyActivityPage(obj);
                break;

            case "modifyQualification":
                modifyQualification(obj);
                break;

            case "validOrder":
                modifyValidOrder(obj);
                break;

            case "confirmOrder":
                modifyConfirmOrder(obj);
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

// 以下是各个 action 的处理函数

function modifyStock(obj) {
    console.log("🛒 修改库存...");
    if (obj.data && obj.data.stockNum === 0) {
        obj.data.stockNum = 1000;
        console.log("✅ 库存已修改为 1000");
    }
}

function modifyActivityPage(obj) {
    // 修改 equityPointActivityProductList.skuStock 值为 100
    if (obj.value && obj.value.equityPointActivityProductList) {
        obj.value.equityPointActivityProductList.forEach(product => {
            if (product.skuStock !== undefined) {
                console.log(`修改 skuStock: ${product.skuStock} -> 100`);
                product.spuName = `${product.spuName} - ${product.skuStock}`; // 改进拼接方式
                product.skuStock = 100;
            }
        });
    }
}

function modifyQualification(obj) {
    if (obj.resultData && Array.isArray(obj.resultData)) {
        obj.resultData.forEach(item => {
            if (item.lotteryCount !== undefined) {
                item.lotteryCount = 10; // 修改 lotteryCount 数量为 10
            }
        });
    }
}

function modifyValidOrder(obj) {
    // 仅在 code = "-1" 且 success = false 时修改
    if (obj.code === "-1" && !obj.success) {
        console.log("validOrder检测到库存售罄，修改返回值...");
        obj.code = "0";  
        obj.success = true;
    }
}

function modifyConfirmOrder(obj) {
    // 仅在 code = "-1" 且 success = false 时修改
    console.log("📑 订单确认响应内容：");
    console.log(JSON.stringify(obj, null, 2));  // 美化输出 JSON 格式
}
