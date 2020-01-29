const Controller = require(`${config.path.controller}/Controller`);
const CustomeruserTransform = require(`${config.path.transform}/v1/CustomeruserTransform`);

module.exports = new class CustomeruserController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.CustomerUser.paginate({} , { page , limit : 10,sort:{createdAt:'desc'}}).then(result => {
    //         if(result) {
    //             return res.json({
    //                 data : new CustomeruserTransform().withPaginate().transformCollection(result),
    //                 success : true
    //             });
    //         }
    //         res.json({
    //             message : ' مشتری وجود ندارد',
    //             success : false
    //         })
    //     })
    //         .catch(err => console.log(err));
    // }

    index(req, res) {
        this.model.CustomerUser.find({}).sort({ name: -1 }).exec((err, costomeruser) => {
            if (err) throw err;
            if (costomeruser) {
                return res.json({
                    data: costomeruser,
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
        this.model.CustomerUser.findById(req.params.id, (err, costomeruser) => {
            if (costomeruser) {
                return res.json({
                    data: costomeruser,
                    success: true
                })
            }
            res.json({
                data: 'مشتری یافت نشد',
                success: false
            })
        })
    }

    // store(req, res) {
    //     req.checkBody('name', '  نام مشتری نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('email', 'ایمیل نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('password', 'پسورد نمی تواند خالی بماند').notEmpty();
    //     req.checkBody('mobile', 'شماره موبایل مشتری نمی تواند خالی بماند').notEmpty();
        
        


    //     this.escapeAndTrim(req, 'name email password mobile');
    //     if (this.showValidationErrors(req, res))
    //         return;
    //     let newCustomerUser = new this.model.CustomerUser({
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password,
    //         mobile: req.body.mobile
           
    //     })
    //     newCustomerUser.save(err => {
    //         if (err) throw err;
    //         res.json('مشتری با موفقیت ثبت شد');
    //     })
    // }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CustomerUser.findByIdAndUpdate(req.params.id, {

            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            mobile: req.body.mobile
           

        }, (err, customeruser) => {
            if (err) throw err;
            if (customeruser) {
                return res.json({
                    data: ' مشتری با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین مشتری وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.CustomerUser.findByIdAndRemove(req.params.id, (err, customeruser) => {
            if (err) throw err;
            if (customeruser) {
                return res.json({
                    data: 'مشتری با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین مشتری وجود ندارد',
                success: false
            });
        });
    }
  
}