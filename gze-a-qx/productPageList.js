
   var body = $response.body;
   try {   
        var daJSON = JSON.parse(body);
        var tv = daJSON.data;
        var list = tv.list;
        var i =0;
        int flag = 0;
        var listPage=[]; 
        for (var j=0;  j < list.length; j++) {
            let product =list[j];
            let nowPrice = parseInt(product["salePrice"]);
            let top = parseInt("140000");
            var count =  product["proCount"];
            if (parseInt(product["proCount"]) ==0) {
                console.log("商品数量为0")
                continue;
            }
            console.log("------||商品数量||----："+ count)
            let prodcutName = product["proName"];
            var spec  = product["proSpecs"];
            product["proSpecs"]= spec.substring(0,6)           
            if (prodcutName.indexOf('茶') != -1) {
                flag = 1;
                continue;
            }
            let needCount =Math.floor(top/nowPrice);
            var nowName = prodcutName.substring(0,10);
            product["proName"]= "("+count+">"+needCount+")"+nowName;
            if (parseInt(product["salePrice"]) >158000) {
                console.log(prodcutName)
                console.log("价格大于1580")
                continue;
            }
           console.log(JSON.stringify(product))
           listPage[i] = product;
           i=i+1;
           flag = 1;

        }
        if (parseInt(flag)==0){
          $notify("机场云商", "温馨提示", "剩下的都是数量为0的商品了")
        }
        tv["list"] = listPage;
        body = JSON.stringify(daJSON);
        $done(body)
    } catch(e) {
        console.log(e)
        $done(body)
    }
