var body = $response.body;
   try {   
        var daJSON = JSON.parse(body);
        var list = daJSON.data;
        var listPage=[]; 
        
        for (var j=0;  j < list.length; j++) {
            let product =list[j];
            let nowPrice = parseInt(product["salePrice"]);
            let top = parseInt("140000");
            var count =  product["stock"];
            if (parseInt(count) ==0) {
                $notify("贵高速", "温馨提示", "商品数量为0")
            }
            console.log("------||商品数量||----："+ count)
            let prodcutName = product["name"];
            let needCount =Math.floor(top/nowPrice);
            var name = prodcutName.substring(0,10);
            product["proName"]= "("+count+">"+needCount+")"+nowName;
            if (parseInt(product["salePrice"]) >168000) {
                $notify("贵高速", "温馨提示", "价格大于168000")
            }
           console.log(JSON.stringify(product))
           listPage[i] = product;
        }
        daJSON["data"] = listPage;
        body = JSON.stringify(daJSON);
        $done(body)
    } catch(e) {
        console.log(e)
        $done(body)
    }
