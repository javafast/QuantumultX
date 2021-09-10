   var body = $response.body;
   try {   
        var daJSON = JSON.parse(body);
        var tv = daJSON.data;
        console.log("查询了一次")
        var list = tv.list;
        var i =0;
        var listPage=[]; 
        for (var j=0;  j < list.length; j++) {
            let product =list[j];
            if (parseInt(product["proCount"]) ==0) {
                console.log(product["proName"])
                continue;
            }
            if (parseInt(product["memberPrice"]) >138000) {
                continue;
            }
           listPage[i] = product;
           i=i+1;

        }
        tv["list"] = listPage;
        body = JSON.stringify(daJSON);
        $done(body)
    } catch(e) {
        $done(body)
    }
