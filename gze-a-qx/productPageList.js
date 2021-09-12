var body = $response.body;
   try {   
        var daJSON = JSON.parse(body);
        var tv = daJSON.data;
        var list = tv.list;
        var i =0;
        var flag = 0;
        var listPage=[]; 
        for (var j=0;  j < list.length; j++) {
            let product =list[j];
            var count =  parseInt(product["proCount"]);
            if (count==0) {
                console.log("商品数量为0")
                continue;
            }
            let nowPrice = parseInt(product["proIntegral"]);
            let top = parseInt("1400");
            console.log("------||商品数量||----："+ count)
            let prodcutName = product["proName"];     
            if (prodcutName.indexOf('茶') != -1) {   
                flag = 1;
                continue;
            }
    
            if (nowPrice >1580) {
                console.log(prodcutName)
                console.log("价格大于1580")
                continue;
            }
            let needCount =Math.ceil(top/nowPrice);
            if((needCount * nowPrice) > parseInt("1580")){
               needCount = needCount - 1;
            }
             var nowName = prodcutName.substring(0,10);
            product["proName"]= "("+count+">"+needCount+")"+nowName;
           //console.log(JSON.stringify(product))
           listPage[i] = product;
           i=i+1;
           flag = 1;

        }
        if (parseInt(flag)==0 && tv.page >1 ){
           $notify("机场云商", "温馨提示", "剩下的都是数量为0的商品了")
        }
        tv["list"] = listPage;
  
        body = JSON.stringify(daJSON);
        $done(body)
    } catch(e) {
        var bj = {
             "message": "操作成功",
             "code": 0,
             "data": {
                 "page": 1,
                 "pages": 5,
                 "total": 50,
                 "list": [{
    "proType": 2,
    "marketPrice": 149900,
    "parkFee": 0,
    "sumQuantity": 0,
    "supportSmartCard": 0,
    "expressFee": 0,
    "avgProScore": 4.8,
    "orgId": "817425775685795840",
    "proSpecs": "500ML",
    "shipMode": 2,
    "id": "830564228048879616",
    "proName": "53°飞天茅台酒",
    "iconUrl": "https://gza-1302529981.cos.ap-guangzhou.myqcloud.com/16313710111338539.jpg",
    "proIntegralPrice": 149900,
    "orgName": "贵州空港新元",
    "salePrice": 149900,
    "memberPrice": 149900,
    "preferenceConfig": "",
    "useCoupon": 0,
    "sortValue": 99999,
    "sellObject": 1,
    "startAmount": 0,
    "bigType": 1,
    "typeId": "729031120640802816",
    "proIntegral": 0,
    "proCount": 13602,
    "needIntegral": 700,
    "status": 1
}]
             }
         }
        console.log(e)
        $done(bj)
    }
