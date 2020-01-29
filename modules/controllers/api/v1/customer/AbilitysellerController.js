const Controller = require(`${config.path.controller}/Controller`);
const AbilitySellerTransform = require(`${config.path.transform}/v1/AbilitySellerTransform`);

module.exports = new class AbilitySellerController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.AbilitySeller.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'firstname lastname nationalcode mobile address phone email nationalcard birthcertificate'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new AbilitySellerTransform().withPaginate().transformCollection(result),
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
        this.model.AbilitySeller.find({}).sort({ id_seller: -1 }).exec((err, abilityseller) => {
            if (err) throw err;
            if (abilityseller) {
                return res.json({
                    data: abilityseller,
                    success: true
                });
            }
            res.json({
                data: 'هیچ توانمندی  وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AbilitySeller.findById(req.params.id, (err, abilityseller) => {
            if (abilityseller) {
                
                return res.json({
                    data: abilityseller,
                    success: true
                })
           
        }
            res.json({
                data: 'توانمندی یافت نشد',
                success: false
            })
        })
    }

 
  }
