/*
16 1 * * * https://raw.githubusercontent.com/<你的用户名>/qx-coffee-task/main/send-task.js, tag=咖啡自动发送
*/

let url = $pref.valueForKey("claim_url");
let method = $pref.valueForKey("claim_method");
let body = $pref.valueForKey("claim_body");
let headersRaw = $pref.valueForKey("claim_headers");
let cookie = $pref.valueForKey("claim_cookie");

if (!url || !headersRaw) {
    console.log("未找到拦截数据，请先手动触发一次 coffee/claim 请求");
    $done();
}

let headers = JSON.parse(headersRaw);
if (cookie) headers["Cookie"] = cookie;  // 确保 cookie 设置正确

let request = {
    url,
    method,
    headers,
    body
};

$task.fetch(request).then(resp => {
    console.log("发送成功：" + resp.statusCode);
    console.log(resp.body);
    $done();
}).catch(err => {
    console.log("发送失败：" + err);
    $done();
});
