const Controller = require(`${config.path.controller}/Controller`);
const SelleruserTransform = require(`${config.path.transform}/v1/SelleruserTransform`);

module.exports = new class SelleruserController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.Selleruser.paginate({} , { page , limit : 10,sort:{createdAt:'desc'}}).then(result => {
    //         if(result) {
    //             return res.json({
    //                 data : new SelleruserTransform().withPaginate().transformCollection(result),
    //                 success : true
    //             });
    //         }
    //         res.json({
    //             message : ' خریداری وجود ندارد',
    //             success : false
    //         })
    //     })
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
                data: 'خریداری یافت نشد',
                success: false
            })
        })
    }

    // store(req, res) {
    //     req.checkBody('firstname', '  نام فروشنده نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('lastname', 'نام خانوادگی فروشنده نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('nationalcode', 'کدملی فروشنده نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('mobile', 'شماره موبایل فروشنده مقاله نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('address', 'آدرس فروشنده نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('phone', 'شماره تلفن فروشنده نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('nationalcardurl', '  تصویر کارت ملی نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('profileurl', 'تصویر پروفایل نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('certificateurl', ' تصویر شناسنامه نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('password', '  پسورد نمی تواند خالی بماند').notEmpty();


    //     this.escapeAndTrim(req, 'firstname lastname nationalcode mobile address phone  certificateurl nationalcardurl profileurl password');
    //     if (this.showValidationErrors(req, res))
    //         return;
    //     let newSellerUser = new this.model.SellerUser({
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname,
    //         nationalcode: req.body.nationalcode,
    //         mobile: req.body.mobile,
    //         address: req.body.address,
    //         phone: req.body.phone,
    //         nationalcardurl: req.body.nationalcardurl,
    //         profileurl: req.body.profileurl,
    //         certificateurl: req.body.certificateurl,
    //         password: req.body.password
    //     })
    //     newSellerUser.save(err => {
    //         if (err) throw err;
    //         res.json('فروشنده با موفقیت ثبت شد');
    //     })
    // }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SellerUser.findByIdAndUpdate(req.params.id, {

            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nationalcode: req.body.nationalcode,
            mobile: req.body.mobile,
            address: req.body.address,
            phone: req.body.phone,
            nationalcardurl: req.body.nationalcardurl,
            profileurl: req.body.profileurl,
            certificateurl: req.body.certificateurl,
            password: req.body.password
           
        }, (err, selleruser) => {
            if (err) throw err;
            if (selleruser) {
                return res.json({
                    data: ' فروشنده با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.SellerUser.findByIdAndRemove(req.params.id, (err, selleruser) => {
            if (err) throw err;
            if (selleruser) {
                return res.json({
                    data: 'فروشنده با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین فروشنده ای وجود ندارد',
                success: false
            });
        });
    }
  
}