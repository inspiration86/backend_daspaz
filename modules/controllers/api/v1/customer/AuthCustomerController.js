const Controller = require(`${config.path.controller}/Controller`);
const CustomeruserTransform = require(`${config.path.transform}/v1/CustomeruserTransform`);
const bcrypt = require('bcrypt');

module.exports = new class AuthCustomerController extends Controller {
    register(req, res) {
        req.checkBody('name', 'وارد کردن فیلد نام الزامیست').notEmpty();
        req.checkBody('email', 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password', 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        req.checkBody('mobile', 'وارد کردن فیلد موبایل الزامیست').notEmpty();
        req.checkBody('email', 'فرمت ایمیل وارد شده صحیح نیست').isEmail();

        if (this.showValidationErrors(req, res))
            return;

        this.model.CustomerUser({
            name: req.body.name,
            email: req.body.email,
            mobile: req.body.mobile,
            password: req.body.password
        }).save(err => {
            if (err) {
                if (err.code == 11000) {
                    return res.json({
                        data: 'ایمیل نمی تواند تکراری باشد',
                        success: false
                    })
                } else {
                    throw err;
                }
            }

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

        this.model.CustomerUser.findOne({ mobile: req.body.mobile }, (err, customeruser) => {
            if (err) throw err;

            if (customeruser == null)
                return res.status(422).json({
                    data: 'اطلاعات وارد شده صحیح نیست',
                    success: false
                });

            bcrypt.compare(req.body.password, customeruser.password, (err, status) => {

                if (!status)
                    return res.status(422).json({
                        success: false,
                        data: 'پسورد وارد شده صحیح نمی باشد'
                    })


                return res.json({
                    data: new CustomeruserTransform().transform(customeruser, true),
                    success: true
                });
            })
        })

    }
}