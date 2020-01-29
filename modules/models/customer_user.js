const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const CustomeruserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: false },
    password: { type: String, required: true },
    mobile: { type: Number, required: true }
});
CustomeruserSchema.plugin(timestamps);
CustomeruserSchema.plugin(mongoosePaginate);

CustomeruserSchema.pre('save', function (next) {

    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})

module.exports = mongoose.model('Customeruser', CustomeruserSchema);