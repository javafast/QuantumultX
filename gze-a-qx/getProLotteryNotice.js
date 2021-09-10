
var obj = {"message":"操作成功","code":0,"data":{"id":1,"addUser":0,"addTime":"2021-05-07 10:55:36","lastOpUser":"737618007081091072","lastOpTime":"2021-08-28 16:23:56","status":1,"noticeContent":"                                                                  如果你能看到这个界面，说明你的 charle 生效了"}};
var  body = $response.body;
body = JSON.stringify(obj);
$done(body);
