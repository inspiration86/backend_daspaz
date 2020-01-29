const Controller = require(`${config.path.controller}/Controller`);
const SelleruserTransform = require(`${config.path.transform}/v1/SelleruserTransform`);
const bcrypt = require('bcrypt');

module.exports = new class AuthSellerController extends Controller {
    register(req, res) {
        req.checkBody('firstname', '  نام فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('lastname', 'نام خانوادگی فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('nationalcode', 'کدملی فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('mobile', 'شماره موبایل فروشنده مقاله نمی تواند خالی بماند').notEmpty();
        req.checkBody('address', 'آدرس فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('phone', 'شماره تلفن فروشنده نمی تواند خالی بماند').notEmpty();
        req.checkBody('nationalcardurl', '  تصویر کارت ملی نمی تواند خالی بماند').notEmpty();
        req.checkBody('profileurl', 'تصویر پروفایل نمی تواند خالی بماند').notEmpty();
        req.checkBody('certificateurl', ' تصویر شناسنامه نمی تواند خالی بماند').notEmpty();
        req.checkBody('password', '  پسورد نمی تواند خالی بماند').notEmpty();


        if (this.showValidationErrors(req, res))
            return;

        this.model.SellerUser({
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
        }).save(err => {
            if (err) {
                // if (err.code == 11000) {
                //     return res.json({
                //         data: 'موبایل  نمی تواند تکراری باشد',
                //         success: false
                //     })
                // } 
                // else {
                    throw err;
                }
            // }

            return res.json({
                data: 'کاربر با موفقیت عضو وبسایت شد',
                success: true
            });
        })
    }

    login(req, res) {
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if (this.showValidationErrors(req, res))
            return;

        this.model.SellerUser.findOne({ mobile: req.body.mobile }, (err, selleruser) => {
            if (err) throw err;

            if (selleruser == null)
                return res.status(422).json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });

            bcrypt.compare(req.body.password, selleruser.password, (err, status) => {

                if (!status)
                    return res.status(422).json({
                        success: false,
                        data: 'پسورد وارد شده صحیح نمی باشد'
                    })


                return res.json({
                    data: new SelleruserTransform().transform(selleruser, true),
                    success: true
                });
            })
        })

    }
}