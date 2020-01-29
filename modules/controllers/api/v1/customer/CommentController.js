const Controller = require(`${config.path.controller}/Controller`);
const CommentTransform = require(`${config.path.transform}/v1/CommentTransform`);

module.exports = new class CommentController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.Comment.paginate({active:true} , { page , limit : 10,sort:{createdAt:'desc'},select:'firstname lastname nationalcode mobile address phone email nationalcard birthcertificate'}).then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new CommentTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'پاسخی وجود ندارد',
    //                 success : false
    //             })
    //         })
    //         .catch(err => console.log(err));
    // }
  
    index(req, res) {
        this.model.Comment.find({}).sort({ name: -1 }).exec((err, comment) => {
            if (err) throw err;
            if (comment) {
                return res.json({
                    data: comment,
                    success: true
                });
            }
            res.json({
                data: 'هیچ کامنتی وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.Comment.findById(req.params.id, (err, comment) => {
            if (comment) {
                
                return res.json({
                    data: comment,
                    success: true
                })
           
        }
            res.json({
                data: 'کامنت یافت نشد',
                success: false
            })
        })
    }

 
  }
