/**
 * Quantumult X 脚本：修改活动详情
 * 逻辑：匹配 activityPrizeId 为 595, 596 且 surplus 为 0 时，修改 name 并重置 surplus 为 100
 */
console.log("改写返回体");
let body = $response.body;
try {
    let obj = JSON.parse(body);
    
    if (obj.data && obj.data.activityPrizes) {
        let prizes = obj.data.activityPrizes;
        
        for (let i = 0; i < prizes.length; i++) {
            let p = prizes[i];
            let p_id = p.activityPrizeId;
            let old_surplus = p.surplus || 0;
            let old_name = p.name || "";

            // 核心判定逻辑
            if ((p_id === 595 || p_id === 596 || p_id ===604) && old_surplus === 0) {
                p.name = `${old_name}${old_surplus}-破解`;
                p.surplus = 100;
            } else {
                p.name = `${old_name}${old_surplus}`;
            }
        }
        
        // 重新写回 body
        body = JSON.stringify(obj);
    }
} catch (e) {
    console.log("解析 JSON 出错: " + e);
}

$done({ body });
