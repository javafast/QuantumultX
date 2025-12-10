// 保存 URL
$persistentStore.write($request.url, "claim_url");

// 保存 method
$persistentStore.write($request.method, "claim_method");

// 保存 headers
let headers = $request.headers || {};
$persistentStore.write(JSON.stringify(headers), "claim_headers");

// 保存 body
$persistentStore.write($request.body || "", "claim_body");

// 单独保存 cookie
let cookie = headers["Cookie"] || headers["cookie"] || "";
$persistentStore.write(cookie, "claim_cookie");

console.log("📌 Claim request captured.");
console.log("Cookie saved: " + cookie);

$done({
  body: JSON.stringify({
    code: 0,
    msg: "Captured OK"
  })
});
