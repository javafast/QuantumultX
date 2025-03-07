console.log("开始修改数量");
var body = $response.body;
try {
    var obj = JSON.parse(body);
    
    // 修改 equityPointActivityProductList.skuStock 值为 100
    if (obj.value && obj.value.equityPointActivityProductList) {
        obj.value.equityPointActivityProductList.forEach(product => {
            if (product.skuStock !== undefined) {
                console.log("修改 skuStock: " + product.skuStock + " -> 100");
                product.skuStock = 100;
            }
        });
    }
    
    body = JSON.stringify(obj);
    $done({ body });
} catch(e) {
    console.log(e);
    $done(body);
}
