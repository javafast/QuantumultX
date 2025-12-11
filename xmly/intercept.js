/*
^https:\/\/mcc\.xunliandata\.com\/plus\/service\/coffee\/claim.* url script-request-body, type=module
*/

let req = $request;

// 保存数据
$pref.setValueForKey(req.url, "claim_url");
$pref.setValueForKey(req.method, "claim_method");
$pref.setValueForKey(req.body || "", "claim_body");

let headers = req.headers || {};
$pref.setValueForKey(JSON.stringify(headers), "claim_headers");

let cookie = headers["Cookie"] || headers["cookie"] || "";
$pref.setValueForKey(cookie, "claim_cookie");

// 返回拦截提示
$done({
  status: 200,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    msg: "已经拦截，等待自动发送",
    status: "S00000"
  })
});
