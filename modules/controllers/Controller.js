// Model
const CustomerUser = require(`${config.path.model}/customer_user`);
const Comment = require(`${config.path.model}/comment`);
const Answer = require(`${config.path.model}/answer`);
const SellerUser = require(`${config.path.model}/seller_user`);
const AbilitySeller = require(`${config.path.model}/ability_seller`);
const ProductCategoriz = require(`${config.path.model}/Product_categoriz`);
const ProductSellerNew = require(`${config.path.model}/product_seller_new`);
const CartCustom = require(`${config.path.model}/cart_custom`);


module.exports = class Controller {
    constructor() {
        this.model = { CustomerUser, Comment, Answer, SellerUser, AbilitySeller, ProductCategoriz, ProductSellerNew, CartCustom }
    }
    showValidationErrors(req, res, callback) {
        let errors = req.validationErrors();
        if (errors) {
            res.status(422).json({
                message: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        }
        return false
    }


    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }
}