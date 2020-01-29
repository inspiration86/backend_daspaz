const Controller = require(`${config.path.controller}/Controller`);
const ProductCategorizTransform = require(`${config.path.transform}/v1/ProductCategorizTransform`);

module.exports = new class ProductCategorizController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.ProductCategoriz.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'firstname lastname nationalcode mobile address phone email nationalcard birthcertificate'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new ProductCategorizTransform().withPaginate().transformCollection(result),
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
        this.model.ProductCategoriz.find({}).sort({ categori_name: -1 }).exec((err, productcategoriz) => {
            if (err) throw err;
            if (productcategoriz) {
                return res.json({
                    data: productcategoriz,
                    success: true
                });
            }
            res.json({
                data: 'هیچ دسته بندی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductCategoriz.findById(req.params.id, (err, productcategoriz) => {
            if (productcategoriz) {
                
                return res.json({
                    data: productcategoriz,
                    success: true
                })
           
        }
            res.json({
                data: 'دسته بندی محصول یافت نشد',
                success: false
            })
        })
    }

 
  }
