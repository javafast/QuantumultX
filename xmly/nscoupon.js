let body = $response.body;

try {
  const data = JSON.parse(body);

  // 北京时间当天：YYYY-MM-DD
  const today = new Date(Date.now() + 8 * 3600 * 1000)
    .toISOString()
    .slice(0, 10);

  for (const item of data.list) {
    if ((item.issuestarttime || "").slice(0, 10) === today) {
      item.runstatus = 302;
      item.countdown = 0;
      item.isstockout = 100;
    }
  }

  body = JSON.stringify(data);
} catch (e) {
  console.log("响应修改失败：" + e);
}

$done({ body });
