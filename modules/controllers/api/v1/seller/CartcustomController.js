const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class CartcustomController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1
    //     this.model.CartCustom.paginate({} , { page , limit : 10, sort:{ createdAt:'desc' } , populate : ['user'] })
    //         .then(result => {
    //             if(result) {
    //                 return res.json({
    //                     data : new CartcustomTransform().withPaginate().transformCollection(result),
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
        this.model.CartCustom.find({}).sort({ id_selleruser: -1 }).exec((err, cartcustom) => {
            if (err) throw err;
            if (cartcustom) {
                return res.json({
                    data: cartcustom,
                    success: true
                });
            }
            res.json({
                data: 'هیچ درخواست سفارشی وجود ندارد',
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
                data: 'یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        req.checkBody('id_selleruser', ' آیدی فروشنده نمیتواند خالی بماند').notEmpty();
        req.checkBody('id_productcategori', ' آیدی دسته محصولات نمیتواند خالی بماند').notEmpty();
        req.checkBody('id_customeruser', ' آیدی مشتری نمیتواند خالی بماند').notEmpty();
        req.checkBody('countproduct', ' تعداد محصولات نمیتواند خالی بماند').notEmpty();
        req.checkBody('date', ' تاریخ نمیتواند خالی بماند').notEmpty();
        req.checkBody('time', ' زمان نمیتواند خالی بماند').notEmpty();
        req.checkBody('description', ' توضیحات نمیتواند خالی بماند').notEmpty();
        req.checkBody('state', ' وضعیت نمیتواند خالی بماند').notEmpty();
        req.checkBody('price', ' قیمت نمیتواند خالی بماند').notEmpty();


        this.escapeAndTrim(req, 'id_selleruser id_productcategori id_customeruser countproduct date time description state price');
        if (this.showValidationErrors(req, res))
            return;
        let newCartCustom = new this.model.CartCustom({
            id_selleruser: req.body.id_selleruser,
            id_customeruser: req.body.id_customeruser,
            id_productcategori: req.body.id_productcategori,
            countproduct: req.body.countproduct,
            date: req.body.date,
            time: req.body.time,
            description: req.body.description,
            state: req.body.state,
            price: req.body.price
        })
        newCartCustom.save(err => {
            if (err) throw err;
            res.json('درخواست سفارش جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CartCustom.findByIdAndUpdate(req.params.id,
            {
                id_selleruser: req.body.id_selleruser,
                id_customeruser: req.body.id_customeruser,
                id_productcategori: req.body.id_productcategori,
                countproduct: req.body.countproduct,
                date: req.body.date,
                time: req.body.time,
                description: req.body.description,
                state: req.body.state,
                price: req.body.price
            },
            (err, cartcustom) => {
                res.json('ویرایش با موفقیت انجام شد');
            });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();

        if (this.showValidationErrors(req, res))
            return;

        this.model.CartCustom.findByIdAndRemove(req.params.id, (err, cartcustom) => {
            if (err) throw err;
            res.json('اطلاعات با موفقیت حذف شد');
        })
    }
}