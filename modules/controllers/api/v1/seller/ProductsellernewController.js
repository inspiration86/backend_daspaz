const Controller = require(`${config.path.controller}/Controller`);
const ProductsellernewTransform = require(`${config.path.transform}/v1/ProductsellernewTransform`);

module.exports = new class ProductsellernewController extends Controller {
    // index(req , res) {
    //     const page = req.query.page || 1;
    //     this.model.ProductSellerNew.paginate({} , { page , limit : 10,sort:{createdAt:'desc'}}).then(result => {
    //         if(result) {
    //             return res.json({
    //                 data : new ProductsellernewTransform().withPaginate().transformCollection(result),
    //                 success : true
    //             });
    //         }
    //         res.json({
    //             message : ' محصول جدید وجود ندارد',
    //             success : false
    //         })
    //     })
    //         .catch(err => console.log(err));
    // }

    index(req, res) {
        this.model.ProductSellerNew.find({}).sort({ productname: -1 }).exec((err, productsellernew) => {
            if (err) throw err;
            if (productsellernew) {
                return res.json({
                    data: productsellernew,
                    success: true
                });
            }
            res.json({
                data: 'هیچ محصول جدید وجود ندارد',
                success: false
            })
        });
    }

    single(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSellerNew.findById(req.params.id, (err, productsellernew) => {
            if (productsellernew) {
                return res.json({
                    data: productsellernew,
                    success: true
                })
            }
            res.json({
                data: 'محصول جدید یافت نشد',
                success: false
            })
        })
    }

    store(req, res) {
        req.checkBody('id_productcategoriz', '  آیدی دسته محصولات نمی تواند خالی بماند').notEmpty();
        req.checkBody('productname', 'نام محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('price', 'قیمت نمی تواند خالی بماند').notEmpty();
        req.checkBody('deatilproduct', 'جزئیات محصول نمی تواند خالی بماند').notEmpty();
        req.checkBody('countproduct','تعداد محصولات نمی تواند خالی بماند').notEmpty();
        req.checkBody('description', 'توضیحات محصولات نمی تواند خالی بماند').notEmpty();
        req.checkBody('productimageurl', ' مسیر عکس محصول نمی تواند خالی بماند').notEmpty();
    


        this.escapeAndTrim(req, 'id_productcategoriz productname price deatilproduct countproduct description imageproducturl ');
        if (this.showValidationErrors(req, res))
            return;
        let newProductSellerNew = new this.model.ProductSellerNew({
            id_productcategoriz: req.body.id_productcategoriz,
            productname: req.body.productname,
            price: req.body.price,
            deatilproduct: req.body.deatilproduct,
            countproduct: req.body.countproduct,
            description: req.body.description,
            productimageurl: req.body.imageproducturl

        })
        newProductSellerNew.save(err => {
            if (err) throw err;
            res.json('محصول جدید با موفقیت ثبت شد');
        })
    }

    update(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSellerNew.findByIdAndUpdate(req.params.id, {

            id_productcategoriz: req.body.id_productcategoriz,
            productname: req.body.productname,
            price: req.body.price,
            deatilproduct: req.body.deatilproduct,
            countproduct: req.body.countproduct,
            description: req.body.description,
            productimageurl: req.body.imageproducturl

        }, (err, productsellernew) => {
            if (err) throw err;
            if (productsellernew) {
                return res.json({
                    data: ' محصول جدید با موفقیت آپدیت شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }

    destroy(req, res) {
        req.checkParams('id', 'ای دی وارد شده صحیح نیست').isMongoId();
        if (this.showValidationErrors(req, res))
            return;
        this.model.ProductSellerNew.findByIdAndRemove(req.params.id, (err, productsellernew) => {
            if (err) throw err;
            if (productsellernew) {
                return res.json({
                    data: 'محصول جدید با موفقیت حذف شد',
                    success: true
                });
            }
            res.status(404).json({
                data: 'چنین محصولی وجود ندارد',
                success: false
            });
        });
    }

}