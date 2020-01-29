const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');

const ProductCategorizSchema = new Schema({
    categori_name: { type: String, required: true },
    sub_categoriz: { type: String, required: true }

})

ProductCategorizSchema.plugin(timestamps);
ProductCategorizSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ProductCategoriz', ProductCategorizSchema);