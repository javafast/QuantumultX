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
                modifyActivityPageNew(obj);
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
    console.log("🛒 修改库存...-");
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
                product.spuName = `${product.spuName} - 不要传播`; // 改进拼接方式
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

function modifyActivityPageNew(obj) {
    console.log("✅ 进入修改库存");
    // 直接修改 obj 而不是返回一个新的对象
    obj.code = "0";
    obj.message = "成功";
    obj.value = {
        "equityPointActivityVO": {
            "idNum": 1885509954898931712,
            "activityId": "QYD1885509954898931712",
            "equityName": "36+1新生活权益——修改返回",
            "startDate": "2025-02-01 00:00:00",
            "endDate": "2025-12-31 23:59:59",
            "activityStyle": "https://mall-1253894390.cos.ap-guangzhou.myqcloud.com/goods/file/381c0107-655e-4937-85ce-c14ffe371e0f.jpg",
            "backgroundColor": "#ffffff",
            "activityDesc": "<p>1、权益内容：</p><p>2025年1月1日-2025年3月31日，您可使用1个“36+1”新生活权益点+29元兑换10张瑞幸咖啡32元饮品券。具体权益及兑换金额详见页面下方“服务项目”内容。每月商品投放数量、卡券面额将于每月1号更新，具体以活动页面显示为准。</p><p><br></p><p>2、兑换说明：</p><p>1、瑞幸咖啡32元饮品券*10张：包含瑞幸咖啡32元饮品券*10张。活动期间每日权益总量100份。每日12点开始抢兑，先到先得，兑完为止。（每人每月限制兑换1次）</p><p>2、充值成功后，可前往瑞幸咖啡APP/小程序-我的-咖啡钱包账户内查看，如在使用瑞幸咖啡通用券过程中对产品或服务产生疑问，请联系瑞幸咖啡客服:4000100100。</p><p>3、用户通过瑞幸咖啡APP/小程序下单时，本券可用于抵扣相应面值的饮品费用(但不可抵扣另行选配的风味糖浆、奶油等附加费用及配送费）。1杯饮品限用1张券；不做退换，不予提现，不设找零抵用金额不可开具发票。</p><p>4、本券核销渠道为瑞幸咖啡APP/小程序，展示划线价为瑞幸咖啡建议零售价，可在全国门店购买饮品时使用。</p><p>5、本券为虚拟权益产品，兑换成功后，不退不换。需在有效期内使用，饮品券一经使用，无法支持退款。</p><p>6、本券不支持转赠，不可兑换现金，不找零，超额需补差价，本券不与其他优惠同享。</p><p>7、商品有效期：自充值成功之日期1年内有效（请在有效期内使用），逾期不退不换。</p><p>8、本产品由深圳市金文网络科技有限公司提供，兑换过程中如有疑问，请咨询服务商客服电话：4008077022，服务时间: 9: 00-18:30；</p><p>9、中信银行信用卡客服热线：400-889-5558</p><p><br></p><p><br></p>",
            "agreementLinkUrl": "https://mall2-demo.jw2008.cn/index?id=6597d09e851ce92bdc65f1152&appkey=NIBjFewXdd2SB3DMxv5YRP7FUwPwlp"
        },
        "equityPointActivityProductList": [
            {
                "skuCode": "SKU0027050",
                "skuImg": "https://mall-1253894390.cos.ap-guangzhou.myqcloud.com/goods/image/4636c499-fed3-43fe-9590-1a8b9d008f44%40800x800",
                "spuName": "瑞幸咖啡32元券*10张",
                "skuName": "默认",
                "skuStock": 20,
                "skuPrice": "29.00",
                "skuEquityPoint": 1
            }
        ],
        "userEquityPoint": "3.00",
        "isAuth": true
    };
}
