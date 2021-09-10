var obj = {"message":"操作成功","code":0,"data":{"todayIsPeople":false}};
var  body = $response.body;
body = JSON.stringify(obj);
$done(body);

