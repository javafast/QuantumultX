let body = $response.body;
try {
    let obj = JSON.parse(body);
    if (obj.data && obj.data.activityPrizes) {
        let prizes = obj.data.activityPrizes;

        // 1. 先执行你的“名称拼接/破解”逻辑
        for (let p of prizes) {
            let p_id = p.activityPrizeId;
            let old_surplus = p.surplus || 0;
            let old_name = p.name || "";
            if ([595, 596, 604].includes(p_id) && old_surplus === 0) {
                p.name = `${old_name}${old_surplus}-破解`;
                p.surplus = 100; // 破解后变 100
            } else {
                p.name = `${old_name}${old_surplus}`;
            }
        }

        // 2. 执行排序逻辑
        prizes.sort((a, b) => {
            const specialIds = [595, 596, 604];
            
            // 获取优先级：0为最高，1为有货，2为无货
            const getPriority = (item) => {
                if (specialIds.includes(item.activityPrizeId)) return 0;
                if (item.surplus > 0) return 1;
                return 2;
            };

            let priA = getPriority(a);
            let priB = getPriority(b);

            if (priA !== priB) {
                return priA - priB; // 优先级小的排前面
            }
            
            // 如果同属于 specialIds，按指定顺序排
            if (priA === 0) {
                return specialIds.indexOf(a.activityPrizeId) - specialIds.indexOf(b.activityPrizeId);
            }
            
            return 0; // 其他情况保持原序
        });

        body = JSON.stringify(obj);
    }
} catch (e) {
    console.log("排序出错: " + e);
}
$done({ body });
