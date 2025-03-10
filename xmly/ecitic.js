console.log("🔧 Quantumult X 多功能脚本已加载");

// 获取当前请求的 URL
const url = $request ? $request.url : ($response ? $response.url : "");
const hostname = url ? new URL(url).hostname : "";

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
let headers = $request ? $request.headers : null;

try {
    if ($response && body) {
        console.log(`📥 拦截到响应: ${url}`);
        let obj = JSON.parse(body);

        switch (matchedRule.action) {
            case "modifyStock":
                console.log("🛒 修改库存...");
                if (obj.data && obj.data.stockNum === 0) {
                    obj.data.stockNum = 1000;
                    console.log("✅ 库存已修改为 1000");
                }
                break;

            case "modifyActivityPage":
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
                break;
            case "modifyQualification":
                if (obj.resultData && Array.isArray(obj.resultData)) {
                    obj.resultData.forEach(item => {
                        if (item.lotteryCount !== undefined) {
                            item.lotteryCount = 10; // 修改 lotteryCount 数量为 10
                        }
                    });
                }
                break;
        }

        body = JSON.stringify(obj);
        $done({ body });
        return;
    }
} catch (e) {
    console.log("❌ 解析 JSON 失败:", e);
    $done({ body: "解析错误" }); // 增加错误反馈
}
