
var WooCommerceAPI = require('woocommerce-api');
 
var WooCommerce = new WooCommerceAPI({
  url: 'http://boiling-machine.am',
  consumerKey: 'ck_0cae26d5dc3c2643971ecd101bc7e844353d873d',
  consumerSecret: 'cs_15aec1342a0fc114985ac103471b3fc57499768b',
  wpAPI: true,
  version: 'wc/v1'
});


async function main(){

  var products = await getProducts()

  await updateProducts(products)

}



/* 
Получение товаров с помощью REST API (получение товаров происходит по категории, возможно приложить любой фильтр, который необходим)
*/
async function getProducts(){

  var categeryProd = await WooCommerce.getAsync('products?category=1260')
  categeryProd = JSON.parse(categeryProd.body)

  var products = []
  for (let i = 0; i < categeryProd.length; i++){
    var product = {}

    product.id = categeryProd[i].id
    product.name = categeryProd[i].name

    products.push(product)
  }

  return products

}
/*
Пакетное обновление товаров(возможно создание новых, удаление старых). В данном примере товару обновляется его название
*/
async function updateProducts(products){

  var data = {
    update:[]
  }
  
  for (let i = 0; i < products.length; i++){

    var updateInfo = {
      id: products[i].id,
      name: products[i].name + ' Старая'
    }

    data.update.push(updateInfo)
  }

  await WooCommerce.post("products/batch", data)

}


main()  