var obj = {"message":"操作成功","code":0,"data":{"userInfo":{"id":"1000000","addUser":0,"addTime":"2021-06-11 09:55:46","lastOpUser":0,"lastOpTime":"2021-08-23 10:24:21","status":1,"userType":1,"mobilePhone":"13800138000","openid":"xxxxxxxxxxxx","smartCard":0,"integral":0,"wineIntegral":0,"groupIntegral":8,"nickName":"你正在用 charles","sex":1,"city":"0","headImgUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/SQ0J94Irut6iczfOTZlxB7RoN2Phm6VGPe23wIWpDk5Naib9PvDmqSwsZ2b1rCnWwmvOhOLHI0A21JrKTteCibxRg/132","cardNo":"431081199001143493","trueName":"好样的","isAuthentication":1,"realNameTime":"2021-06-11 09:55:46","authenticationAddress":"自己的地址，你自己选择","isSend":1,"sendTime":"2021-07-23 10:00:31"},"userOrg":null}};
var  body = $response.body;
body = JSON.stringify(obj);
$done(body);

