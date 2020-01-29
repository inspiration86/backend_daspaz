const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const CartCustomSchema = new Schema({

    id_selleruser: { type: String, required: true },
    id_customeruser: { type: String, required: true },
    id_productcategori: { type: String, required: true },
    countproduct: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    description: { type: String, required: true },
    state: { type: String, required: true },
    price: { type: Number, required: true }

})
CartCustomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('CartCustom', CartCustomSchema);