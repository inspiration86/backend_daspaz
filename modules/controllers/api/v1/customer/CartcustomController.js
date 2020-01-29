const Controller = require(`${config.path.controller}/Controller`);
const CartcustomTransform = require(`${config.path.transform}/v1/CartcustomTransform`);

module.exports = new class CartcustomController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.CartCustom.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'firstname lastname nationalcode mobile address phone email nationalcard birthcertificate'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new CartcustomTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'درخواستی وجود ندارد',
    //                 success : false
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }

    index(req, res) {
        this.model.CartCustom.find({}).sort({ id_selleruser: -1 }).exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ درخواستی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CartCustom.findById(req.params.id, (err, cartcustom) => {
            if (cartcustom) {

                return res.json({
                    data: cartcustom,
                    success: true
                })

            }
            res.json({
                data: 'درخواست یافت نشد',
                success: false
            })
        })
    }


}
