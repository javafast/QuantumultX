
var obj = {
  "message": "操作成功",
  "code": 0,
  "data": [
    {
      "id": "817425775685795840",
      "orgName": "---贵州空港新元---",
      "luckyNum": 20
    },
    {
      "id": "727549979857518592",
      "orgName": "---贵州航食--",
      "luckyNum": 20
    }

  ]
};
var  body = $response.body;
body = JSON.stringify(obj);
$done(body);
