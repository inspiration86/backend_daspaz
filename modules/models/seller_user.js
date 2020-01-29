const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamps = require('mongoose-timestamp');
const mongoosePaginate = require('mongoose-paginate');
const bcrypt = require('bcrypt');

const SelleruserSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    nationalcode: { type: Number, required: true},
    mobile: { type: Number, required: true },
    address: { type:String , required: true },
    phone: { type: Number, required: true },
    nationalcardurl: { type: String, required: false },
    profileurl: { type: String, required: false },
    certificateurl: { type: String, required: false },
    password: { type: String, required: true }
});

SelleruserSchema.plugin(timestamps);
SelleruserSchema.plugin(mongoosePaginate);

SelleruserSchema.pre('save', function (next) {

    bcrypt.hash(this.password, 10, (err, hash) => {
        this.password = hash;
        next();
    });
})

module.exports = mongoose.model('Selleruser', SelleruserSchema);
