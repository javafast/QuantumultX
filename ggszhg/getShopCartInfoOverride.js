 var body = $response.body;
   try {   
        console.log("进入购物方法")
        var daJSON = JSON.parse(body);
        var tv = daJSON.data;
        var list = tv.products;
        var i =0;
        for (var j=0;  j < list.length; j++) {
            if (parseInt(product["marketPrice"]) >16800000) {
                 $notify("贵高速", "温馨提示", "价格大于1680")
            }
            let productNow =list[j];
            let product = productNow["product"];
            let nowPrice = parseInt(product["marketPrice"]);
            let top = parseInt("14000000");
            let prodcutName = product["productName"];
            let needCount =Math.ceil(top/nowPrice);
            if((needCount * nowPrice) > parseInt("16800000")){
               needCount = needCount - 1;
            }
            var sous = parseInt("10000");
            product["productName"]= "("+needCount+"/"+(needCount*nowPrice/sous)+")"+prodcutName;
           // console.log(JSON.stringify(product))
        }
        body = JSON.stringify(daJSON);
        $done(body)
    } catch(e) {
        console.log(e)
        $done(body)
    }
