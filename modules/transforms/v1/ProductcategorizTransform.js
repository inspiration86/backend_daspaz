const Transform = require('./../Transform');

module.exports = class ProductcategorizTransform extends Transform {

    transform(item) {

        return {

            'categori_name': item.categori_name,
            'sub_categoriz': item.sub_categoriz

        
        }
    }

}