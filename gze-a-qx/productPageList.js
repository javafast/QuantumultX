   var body = $response.body;
   try {   
        var tv = body.data;
        var list = tv.list;
        var i =0;
        var listPage=[]; 
        for (var j=0;  j < list.length; j++) {
            let product =list[j];
            if (parseInt(product["proCount"]) ==0) {
                console.log(product["proName"])
                continue;
            }
            if (parseInt(product["memberPrice"]) >158000) {
                continue;
            }
           listPage[i] = product;
           i=i+1;

        }
        tv["list"] = listPage;
        $done(body)
    } catch(e) {
        $done(body)
    }
