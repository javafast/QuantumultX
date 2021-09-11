var body = $response.body;
   try {   
        console.log("进入商品明细")
        var daJSON = JSON.parse(body);
        var list = daJSON.data;        
        for (var j=0;  j < list.length; j++) {
            let product =list[j];
            let prodcutName = product["name"];
            if (product["isSellOut"]) {
                $notify("贵高速", "温馨提示", prodcutName+"卖完了")
            }
            let nowPrice = parseInt(product["integral"]);
            let top = parseInt("1400");
            console.log("------||商品价格||----："+ nowPrice)
            let needCount =Math.ceil(top/nowPrice);
            if((needCount * nowPrice) > parseInt("1680")){
              needCount = needCount - 1;
            }
            product["name"]= "("+needCount+")"+prodcutName;
            product["goodsSpec"] = product["goodsSpec"] + "----" + (needCount * nowPrice);
            if (nowPrice >1680) {
                $notify("贵高速", "温馨提示", prodcutName+"价格大于1680")
            }
           //console.log(JSON.stringify(product))
        }
        body = JSON.stringify(daJSON);
        console.log("商品明细-完成")
        $done(body)
    } catch(e) {
        console.log(e)
        $done(body)
    }
