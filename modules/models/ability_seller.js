const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const AbilitySellerSchema = new Schema({
    id_productcategoriz: { type: String, required: true },
    id_seller: { type: String, required: true }

})

AbilitySellerSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('AbilitySeller', AbilitySellerSchema);