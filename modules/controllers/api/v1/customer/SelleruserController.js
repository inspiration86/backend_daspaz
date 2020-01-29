const Controller = require(`${config.path.controller}/Controller`);
const SelleruserTransform = require(`${config.path.transform}/v1/SelleruserTransform`);

module.exports = new class SelleruserController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.SellerUser.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'firstname lastname nationalcode mobile address phone email nationalcard birthcertificate'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new SelleruserTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'خریداری وجود ندارد',
    //                 success : false
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }
  
    index(req, res) {
        this.model.SellerUser.find({}).sort({ firstname: -1 }).exec((err, selleruser) => {
            if (err) throw err;
            if (selleruser) {
                return res.json({
                    data: selleruser,
                    success: true
                });
            }
            res.json({
                data: 'هیچ فروشنده ای وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SellerUser.findById(req.params.id, (err, selleruser) => {
            if (selleruser) {
                
                return res.json({
                    data: selleruser,
                    success: true
                })
        
        }
            res.json({
                data: 'فروشنده ای یافت نشد',
                success: false
            })
        })
    }

 
  }
