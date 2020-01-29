const Controller = require(`${config.path.controller}/Controller`);
const CustomeruserTransform = require(`${config.path.transform}/v1/CustomeruserTransform`);

module.exports = new class CustomeruserController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.Customeruser.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'firstname lastname nationalcode mobile address phone email nationalcard birthcertificate'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new CustomeruserTransform().withPaginate().transformCollection(result),
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
        this.model.CustomerUser.find({}).sort({ name: -1 }).exec((err, customeruser) => {
            if (err) throw err;
            if (customeruser) {
                return res.json({
                    data: customeruser,
                    success: true
                });
            }
            res.json({
                data: 'هیچ مشتری وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CustomerUser.findById(req.params.id, (err, customeruser) => {
            if (customeruser) {
                
                return res.json({
                    data: customeruser,
                    success: true
                })
           
        }
            res.json({
                data: 'خریداری یافت نشد',
                success: false
            })
        })
    }

 
  }
