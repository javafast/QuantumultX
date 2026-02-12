let body = $response.body;

try {
    let obj = JSON.parse(body);

    // 新门店对象
    const newStore = {
        "da_config": null,
        "business": null,
        "store_name": "广州黄埔南岗店",
        "phone": null,
        "store_class": "2",
        "longitude": "100",
        "latitude": "85.051128",
        "math": null,
        "address": "广东省广州市黄埔区黄埔东路3611号",
        "tip": null,
        "image": "https://crm2.xidesheng.com/Uploads/tempImage/2024-04-18/6620b542048463534.png",
        "store_id": "6916",
        "distance": 6913.8999999999996
    };

    // 1️⃣ 替换 store[0]
    if (obj.store && obj.store.length > 0) {
        obj.store[0] = newStore;
    } else {
        obj.store = [newStore];
    }

    // 2️⃣ 强制修改 vip 信息
    obj.vip_store_id = "6916";
    obj.vip_store_name = "广州黄埔南岗店";

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("rewrite error: " + e);
    $done({});
}
