let body = $response.body;

try {
  const data = JSON.parse(body);

  const today = new Date(Date.now() + 8 * 3600 * 1000)
    .toISOString()
    .slice(0, 10);

  data.data.time = Math.floor(
    Date.parse(today + "T12:00:00+08:00") / 1000
  );

  body = JSON.stringify(data);
} catch (e) {
  console.log("时间响应修改失败：" + e);
}

$done({ body });
