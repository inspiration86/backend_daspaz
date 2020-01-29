const Transform = require('./../Transform');

module.exports = class ProductsellernewTransform extends Transform {

    transform(item) {

        return {
            'id_productcategoriz': item.id_productcategoriz,
            'productname': item.productname,
            'deatilproduct': item.deatilproduct,
            'price': item.price,
            'countproduct': item.countproduct,
            'description': item.description,
            'productimageurl': item.productimageurl

        }
    }

}