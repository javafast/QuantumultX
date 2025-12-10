let url = $persistentStore.read("claim_url");
let method = $persistentStore.read("claim_method");
let headers = $persistentStore.read("claim_headers");
let body = $persistentStore.read("claim_body");
let cookie = $persistentStore.read("claim_cookie");

// 检查数据
if (!url || !method || !headers) {
    console.log("❌ No stored request found. Please trigger it at least once.");
    $done();
}

try {
    headers = JSON.parse(headers);
} catch (e) {
    console.log("❌ Failed to parse headers: " + e);
    $done();
}

// 强制覆盖 cookie
if (cookie) {
    headers["Cookie"] = cookie;
    headers["cookie"] = cookie;
}

let req = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

console.log("📤 Sending stored claim request...");

$task.fetch(req).then(resp => {
    console.log("✔ Request sent. Status: " + resp.statusCode);
    console.log("Response: " + resp.body);
    $done();
}).catch(err => {
    console.log("❌ Request failed: " + err);
    $done();
});
