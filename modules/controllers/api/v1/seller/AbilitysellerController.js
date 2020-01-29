const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class AbilitySellerController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.AbilitySeller.paginate({} , { page , limit : 10, sort:{ createdAt:'desc' } , populate : ['user'] })
    //         .then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new AbilitySellerTransform().withPaginate().transformCollection(result),
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
        this.model.AbilitySeller.find({}).sort({ id_seller: -1 }).exec((err, abilityseller) => {
            if (err) throw err;
            if (abilityseller) {
                return res.json({
                    data: abilityseller,
                    success: true
                });
            }
            res.json({
                data: 'چنین توانمندی وجود ندارد',
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
                data: 'یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        req.checkBody('id_productcategoriz', ' آیدی دسته محصولات نمیتواند خالی بماند').notEmpty();
        req.checkBody('id_seller', 'آیدی فروشنده نمیتواند خالی بماند').notEmpty();

        this.escapeAndTrim(req, 'id_productcategoriz id_seller');
        if (this.showValidationErrors(req, res))
            return;
        let newAbilitySeller = new this.model.AbilitySeller({
            id_productcategoriz: req.body.id_productcategoriz,
            id_seller: req.body.id_seller
        })
        newAbilitySeller.save(err => {
            if (err) throw err;
            res.json('توانمندی جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.AbilitySeller.findByIdAndUpdate(req.params.id,
            {
                id_productcategoriz: req.body.id_productcategoriz,
                id_seller: req.body.id_seller
            },
            (err, abilityseller) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if (this.showValidationErrors(req, res))
            return;

        this.model.AbilitySeller.findByIdAndRemove(req.params.id, (err, abilityseller) => {
            if (err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}