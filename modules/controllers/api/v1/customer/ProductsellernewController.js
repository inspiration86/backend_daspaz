const Controller = require(`${config.path.controller}/Controller`);
const ProductSellerNewTransform = require(`${config.path.transform}/v1/ProductSellerNewTransform`);

module.exports = new class ProductSellerNewController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.ProductSellerNew.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'firstname lastname nationalcode mobile address phone email nationalcard birthcertificate'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new ProductSellerNewTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'مشتری وجود ندارد',
    //                 success : false
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }
  
    index(req, res) {
        this.model.ProductSellerNew.find({}).sort({ productname: -1 }).exec((err, productsellernew) => {
            if (err) throw err;
            if (productsellernew) {
                return res.json({
                    data: productsellernew,
                    success: true
                });
            }
            res.json({
                data: 'هیچ محصول جدید وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSellerNew.findById(req.params.id, (err, productsellernew) => {
            if (productsellernew) {
                
                return res.json({
                    data: productsellernew,
                    success: true
                })
           
        }
            res.json({
                data: 'محصول جدید یافت نشد',
                success: false
            })
        })
    }

 
  }
