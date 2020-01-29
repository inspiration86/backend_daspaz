const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const CommentSchema = new Schema({
    name: { type: String, required: true },
    comment: { type: String, required: true },
    product_Id: { type: String, required: true },
    active: { type: Boolean, default: 'false' }
})
CommentSchema.plugin(timestamps);
CommentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comment', CommentSchema);