const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const ProductSellerNewSchema = new Schema({

    id_productcategoriz: { type: String, required: true },
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    deatilproduct: { type: String, required: true },
    countproduct: { type: Number, required: true },
    description: { type: String, required: true },
    productimageurl: { type: String, required: false }

})

ProductSellerNewSchema.plugin(timestamps);
ProductSellerNewSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ProductSellerNew', ProductSellerNewSchema);