let body = $response.body;

try {
    let obj = JSON.parse(body);

    // 强制改写
    obj.vip_store_id = "6916";
    obj.vip_store_name = "广州黄埔南岗店";

    $done({ body: JSON.stringify(obj) });

} catch (e) {
    console.log("JSON parse error");
    $done({});
}
