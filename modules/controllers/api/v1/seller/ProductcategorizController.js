const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class ProductcategorizController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.ProductCategoriz.paginate({} , { page , limit : 10, sort:{ createdAt:'desc' } , populate : ['user'] })
    //         .then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new ProductCategorizTransform().withPaginate().transformCollection(result),
    //                     success : true
    //                 });
    //             }
    //
    //             res.json({
    //                 message : 'اطلاعاتی وجود ندارد',
    //                 success : false
    //             })
    //         })
    //
    //         .catch(err => console.log(err));
    //
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
                data: 'هیچ پاسخی وجود ندارد',
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
                data: 'یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        req.checkBody('categori_name', ' نام دسته محصولات نمیتواند خالی بماند').notEmpty();
        req.checkBody('sub_categoriz', 'زیردسته ها نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'id_productcategoriz id_seller');
        if (this.showValidationErrors(req, res))
            return;
        let newProductCategoriz = new this.model.ProductCategoriz({
            categori_name: req.body.categori_name,
            sub_categoriz: req.body.sub_categoriz
        })
        newProductCategoriz.save(err => {
            if (err) throw err;
            res.json('دسته بندی جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductCategoriz.findByIdAndUpdate(req.params.id,
            {
                categori_name: req.body.categori_name,
                sub_categoriz: req.body.sub_categoriz
            },
            (err, productcategoriz) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if (this.showValidationErrors(req, res))
            return;

        this.model.ProductCategoriz.findByIdAndRemove(req.params.id, (err, productcategoriz) => {
            if (err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}