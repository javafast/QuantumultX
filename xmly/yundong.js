// Quantumult X 响应脚本示例
let body = $response.body; // 获取响应体
let obj = JSON.parse(body); // 解析 JSON
  console.log("开始修改数量")

// 遍历修改 sent 字段
if (obj?.data?.stocks) {
  obj.data.stocks.forEach(stock => {
    if (stock.sent === 0) {
      stock.sent = 1;
    }
  });
}

// 将修改后的对象重新转换为 JSON
body = JSON.stringify(obj);
$done({ body }); // 返回修改后的响应体
