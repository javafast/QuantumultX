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
            let needCount =Math.floor(top/nowPrice);
            var nowName = prodcutName.substring(0,10);
            product["proName"]= "("+count+">"+needCount+")"+nowName;
            if (nowPrice >1580) {
                console.log(prodcutName)
                console.log("价格大于1580")
                continue;
            }
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
        console.log(e)
        $done(body)
    }
