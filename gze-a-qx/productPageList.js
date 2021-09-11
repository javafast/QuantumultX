   var body = $response.body;
   try {   
        var daJSON = JSON.parse(body);
        var tv = daJSON.data;
        var list = tv.list;
        var i =0;
        var listPage=[]; 
        for (var j=0;  j < list.length; j++) {
            let product =list[j];
            if (parseInt(product["proCount"]) ==0) {
                console.log("商品数量为0")
                continue;
            }
            console.log("------|商品数量|----："+ product["proCount"])
            let prodcutName = product["proName"];
            product["salePrice"]=1
            if (prodcutName.indexOf('茶') != -1) {
                continue;
            }
            if (parseInt(product["memberPrice"]) >158000) {
                console.log(prodcutName)
                console.log("价格大于1580")
                continue;
            }
           console.log(JSON.stringify(product))
           listPage[i] = product;
           i=i+1;

        }
        tv["list"] = listPage;
        body = JSON.stringify(daJSON);
        $done(body)
    } catch(e) {
        $done(body)
    }
