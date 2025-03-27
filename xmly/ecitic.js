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
        regex: /^https:\/\/mall-api2-demo\.jw2008\.cn\/mall-basic-portal\/v2\/portal\/pms\/equityPoint\/activityPage\/[A-Z0-9]{20}/,
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
    },
    {
        domain: "ldp.creditcard.ecitic.com",
        regex: /^https:\/\/ldp\.creditcard\.ecitic\.com\/citiccard\/lottery-gateway-pay\/prizes\.do\?actId=QDXFDBCJ/,
        action: "modifyJifengDuiHuan"
    }
    ,
    {
        domain: "ldp.creditcard.ecitic.com",
        regex: /^https:\/\/ldp\.creditcard\.ecitic\.com\/citiccard\/lottery-gateway-pay\/get-server-time\.do/,
        action: "getServerTime"
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
            case "modifyJifengDuiHuan":
                modifyJifengDuiHuan(obj);
                break;
            case "getServerTime":
                getServerTime(obj);
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
    if (obj.code === "-1" && !obj.success) {
        console.log("ConfirmOrder检测到库存售罄，修改返回值...");
        obj.code = "0";  
        obj.success = true;
        obj.value = {
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
        };
    }
}

function modifyJifengDuiHuan(obj) {
    // 仅在 code = "-1" 且 success = false 时修改
    if (obj.resultCode === "0000000" && obj.resultData) {
        // 检查每个商品的数据
        obj.resultData.forEach(item => {
            const targetGoodsIds = ["ESXFDBCJ10", "ESXFDBCJ37", "ESXFDBCJ25"];
            if (targetGoodsIds.includes(item.goodsId)) {
                // 计算 goodsNumDaily 的一半，并向上取整
                item.saleNumDaily = Math.ceil(item.goodsNumDaily / 2);
                console.log(`已修改 ${item.goodsId} 的 saleNumDaily 为: ${item.saleNumDaily}`);
            }
        });
    }
}

function getServerTime(obj) {
    // 获取当前时间,js
    const now = new Date();
    
    // 设定今天的上午 10:00:01
    const tenAM = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 0, 1, 0);
    
    // 获取时间戳
    const tenAMTimestamp = tenAM.getTime();
    
    // 如果当前时间小于上午 10:00:00，则修改 timeMillis
    if (now.getTime() < tenAMTimestamp) {
        obj.resultData.timeMillis = tenAMTimestamp;
        console.log("⏰ 当前时间小于 10:00:00，timeMillis 修改为:", obj.resultData.timeMillis);
    } else {
        console.log("✅ 当前时间已过 10:00:00，无需修改");
    }
}

