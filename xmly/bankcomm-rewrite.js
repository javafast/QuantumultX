let body = $response.body;
 console.log("开始破解买单吧");
try {
    let obj = JSON.parse(body);

    if (obj.data) {

        // 1️⃣ shareContent.title 加后缀
        if (obj.data.shareContent && obj.data.shareContent.title) {
            obj.data.shareContent.title += "-破解";
        }

        // 2️⃣ hasBuy
        obj.data.hasBuy = false;

        // 3️⃣ activeBuyCount
        obj.data.activeBuyCount = 1;

        // 4️⃣ buttonType
        obj.data.buttonType = "01";
    }

    body = JSON.stringify(obj);

} catch (e) {
    console.log("JSON parse error");
}

$done({ body });
