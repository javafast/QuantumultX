 var body = $response.body;
   try {   
        var daJSON = JSON.parse(body);
        var tv = daJSON.data;
        var list = tv.products;
        var i =0;
        for (var j=0;  j < list.length; j++) {
            let productNow =list[j];
            let product = productNow["product"];
            let nowPrice = parseInt(product["marketPrice"]);
            let top = parseInt("14000000");
            let prodcutName = product["productName"];
            let needCount =Math.floor(top/nowPrice);
            product["productName"]= "("+needCount+")"+prodcutName;
            if (parseInt(product["marketPrice"]) >16800000) {
                 $notify("贵高速", "温馨提示", "价格大于1680")
            }
           console.log(JSON.stringify(product))
        }
        body = JSON.stringify(daJSON);
        $done(body)
    } catch(e) {
        console.log(e)
        $done(body)
    }
