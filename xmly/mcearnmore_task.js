let body = $response.body;
try {
    let obj = JSON.parse(body);
    if (obj.data && obj.data.activityPrizes) {
        let prizes = obj.data.activityPrizes;
        const specialIds = [595, 596, 604];

        for (let p of prizes) {
            let p_id = p.activityPrizeId;
            // 记录原始值用于判断和显示
            let real_surplus = parseInt(p.surplus) || 0;
            let old_name = p.name || "";

            // 1. 处理名称拼接：surplus 追加到 name 前面
            let newName = `【${real_surplus}】${old_name}`;
            
            // 2. 只有原始 surplus 为 0 时，才加上“-【破解】”
            if (real_surplus === 0) {
                newName += "-破解";
            }
            p.name = newName;

            // 3. 处理排序权重：特定 ID 永远排最前
            if (p_id === 595) {
                p.surplus = 10003;
            } else if (p_id === 596) {
                p.surplus = 10002;
            } else if (p_id === 604) {
                p.surplus = 10001;
            } else {
                // 普通商品按实际库存排序
                p.surplus = real_surplus;
            }
        }

        // 4. 执行降序排列（权重大的在前）
        prizes.sort((a, b) => (b.surplus - a.surplus));

        // 5. (可选) 如果前端展示数字，可在此将 10000+ 还原回 100
        prizes.forEach(p => {
            if (p.surplus > 10000) p.surplus = 100;
        });

        body = JSON.stringify(obj);
    }
} catch (e) {
    console.log("QuanX 逻辑修正失败: " + e);
}
$done({ body });
