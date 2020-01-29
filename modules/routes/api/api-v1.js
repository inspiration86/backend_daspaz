const express = require('express');
const router = express.Router();
const customerRouter = express.Router();
const sellerRouter = express.Router();


// middlewares 
const apiAuthcustomer = require('./middleware/apiAuthcustomer');
const apiAuthseller = require('./middleware/apiAuthseller');
const apiAdmin = require('./middleware/apiAdmin');
const { uploadImage } = require('./middleware/UploadMiddleware');


//customer Controllers 
const { api: ControllerApi } = config.path.controllers;
const HomeController = require(`${ControllerApi}/v1/HomeController`);
const CustomerAuthCustomerController = require(`${ControllerApi}/v1/customer/AuthCustomerController`);
//const CustomerAuthSellerController = require(`${ControllerApi}/v1/customer/AuthSellerController`);
const CustomerCustomeruserController = require(`${ControllerApi}/v1/customer/CustomeruserController`);
const CustomerCommentController = require(`${ControllerApi}/v1/customer/CommentController`);
const CustomerAnswerController = require(`${ControllerApi}/v1/customer/AnswerController`);
const CustomerSelleruserController = require(`${ControllerApi}/v1/customer/SelleruserController`);
const CustomerUploadController = require(`${ControllerApi}/v1/customer/UploadController`);
const CustomerAbilitysellerController = require(`${ControllerApi}/v1/customer/AbilitysellerController`);
const CustomerCartcustomController = require(`${ControllerApi}/v1/customer/CartcustomController`);
const CustomerProductcategorizController = require(`${ControllerApi}/v1/customer/ProductcategorizController`);
const CustomerProductsellernewController = require(`${ControllerApi}/v1/customer/ProductsellernewController`);

// seller Controller
const SellerCustomeruserController = require(`${ControllerApi}/v1/seller/CustomeruserController`);
const SellerCommentController = require(`${ControllerApi}/v1/seller/CommentController`);
const SellerAnswerController = require(`${ControllerApi}/v1/seller/AnswerController`);
const SellerSelleruserController = require(`${ControllerApi}/v1/seller/SelleruserController`);
const SellerUploadController = require(`${ControllerApi}/v1/seller/UploadController`);
const SellerAbilitysellerController = require(`${ControllerApi}/v1/seller/AbilitysellerController`);
const SellerCartcustomController = require(`${ControllerApi}/v1/seller/CartcustomController`);
const SellerProductcategorizController = require(`${ControllerApi}/v1/seller/ProductcategorizController`);
const SellerProductsellernewController = require(`${ControllerApi}/v1/seller/ProductsellernewController`);
const SellerAuthSellerController = require(`${ControllerApi}/v1/seller/AuthSellerController`);

 
//router.get('/' , HomeController.index);
router.get('/version', HomeController.version);
sellerRouter.post('/login', SellerAuthSellerController.login.bind(SellerAuthSellerController));
sellerRouter.post('/register', SellerAuthSellerController.register.bind(SellerAuthSellerController));
customerRouter.post('/login', CustomerAuthCustomerController.login.bind(CustomerAuthCustomerController));
customerRouter.post('/register', CustomerAuthCustomerController.register.bind(CustomerAuthCustomerController));
customerRouter.get('/customeruser',apiAuthcustomer, CustomerCustomeruserController.index.bind(CustomerCustomeruserController));
customerRouter.get('/customeruser/:id', CustomerCustomeruserController.single.bind(CustomerCustomeruserController));
customerRouter.get('/comment', CustomerCommentController.index.bind(CustomerCommentController));
customerRouter.get('/comment/:id', CustomerCommentController.single.bind(CustomerCommentController));
customerRouter.get('/answer', CustomerAnswerController.index.bind(CustomerAnswerController));
customerRouter.get('/answer/:id', CustomerAnswerController.single.bind(CustomerAnswerController));
customerRouter.get('/selleruser', CustomerSelleruserController.index.bind(CustomerSelleruserController));
customerRouter.get('/selleruser/:id', CustomerSelleruserController.single.bind(CustomerSelleruserController));
customerRouter.get('/abilityseller', CustomerAbilitysellerController.index.bind(CustomerAbilitysellerController));
customerRouter.get('/abilityseller/:id', CustomerAbilitysellerController.single.bind(CustomerAbilitysellerController));
customerRouter.get('/cartcustom', CustomerCartcustomController.index.bind(CustomerCartcustomController));
customerRouter.get('/cartcustom/:id', CustomerCartcustomController.single.bind(CustomerCartcustomController));
customerRouter.get('/productcategoriz',apiAuthcustomer,CustomerProductcategorizController.index.bind(CustomerProductcategorizController));
customerRouter.get('/productcategoriz/:id', CustomerProductcategorizController.single.bind(CustomerProductcategorizController));
customerRouter.get('/productsellernew', CustomerProductsellernewController.index.bind(CustomerProductsellernewController));
customerRouter.get('/productsellernew/:id', CustomerProductsellernewController.single.bind(CustomerProductsellernewController));


//customeruser
sellerRouter.get('/customeruser', SellerCustomeruserController.index.bind(SellerCustomeruserController));
sellerRouter.get('/customeruser/:id', SellerCustomeruserController.single.bind(SellerCustomeruserController));
//sellerRouter.post('/customeruser', SellerCustomeruserController.store.bind(SellerCustomeruserController));
sellerRouter.put('/customeruser/:id', SellerCustomeruserController.update.bind(SellerCustomeruserController));
sellerRouter.delete('/customeruser/:id', SellerCustomeruserController.destroy.bind(SellerCustomeruserController));


//comment
sellerRouter.get('/comment', SellerCommentController.index.bind(SellerCommentController));
sellerRouter.get('/comment/:id', SellerCommentController.single.bind(SellerCommentController));
sellerRouter.put('/comment/:id', SellerCommentController.update.bind(SellerCommentController));
sellerRouter.delete('/comment/:id', SellerCommentController.destroy.bind(SellerCommentController));


//answer
sellerRouter.get('/answer', SellerAnswerController.index.bind(SellerAnswerController));
sellerRouter.get('/answer/:id', SellerAnswerController.single.bind(SellerAnswerController));
sellerRouter.post('/answer', SellerAnswerController.store.bind(SellerAnswerController));
sellerRouter.put('/answer/:id', SellerAnswerController.update.bind(SellerAnswerController));
sellerRouter.delete('/answer/:id', SellerAnswerController.destroy.bind(SellerAnswerController));


//selleruser
sellerRouter.get('/selleruser', apiAuthseller,SellerSelleruserController.index.bind(SellerSelleruserController));
sellerRouter.get('/selleruser/:id', SellerSelleruserController.single.bind(SellerSelleruserController));
//sellerRouter.post('/selleruser', SellerSelleruserController.store.bind(SellerSelleruserController));
sellerRouter.put('/selleruser/:id', SellerSelleruserController.update.bind(SellerSelleruserController));
sellerRouter.delete('/selleruser/:id', SellerSelleruserController.destroy.bind(SellerSelleruserController));


//abilityseller
sellerRouter.get('/abilityseller', SellerAbilitysellerController.index.bind(SellerAbilitysellerController));
sellerRouter.get('/abilityseller/:id', SellerAbilitysellerController.single.bind(SellerAbilitysellerController));
sellerRouter.post('/abilityseller', SellerAbilitysellerController.store.bind(SellerAbilitysellerController));
sellerRouter.put('/abilityseller/:id', SellerAbilitysellerController.update.bind(SellerAbilitysellerController));
sellerRouter.delete('/abilityseller/:id', SellerAbilitysellerController.destroy.bind(SellerAbilitysellerController));


//productsellernew
sellerRouter.get('/productsellernew', SellerProductsellernewController.index.bind(SellerProductsellernewController));
sellerRouter.get('/productsellernew/:id', SellerProductsellernewController.single.bind(SellerProductsellernewController));
sellerRouter.post('/productsellernew', SellerProductsellernewController.store.bind(SellerProductsellernewController));
sellerRouter.put('/productsellernew/:id', SellerProductsellernewController.update.bind(SellerProductsellernewController));
sellerRouter.delete('/productsellernew/:id', SellerProductsellernewController.destroy.bind(SellerProductsellernewController));


//productcategoriz
sellerRouter.get('/productcategoriz', SellerProductcategorizController.index.bind(SellerProductcategorizController));
sellerRouter.get('/productcategoriz/:id', SellerProductcategorizController.single.bind(SellerProductcategorizController));
sellerRouter.post('/productcategoriz', SellerProductcategorizController.store.bind(SellerProductcategorizController));
sellerRouter.put('/productcategoriz/:id', SellerProductcategorizController.update.bind(SellerProductcategorizController));
sellerRouter.delete('/productcategoriz/:id', SellerProductcategorizController.destroy.bind(SellerProductcategorizController));


//cartcustom
sellerRouter.get('/cartcustom', SellerCartcustomController.index.bind(SellerCartcustomController));
sellerRouter.get('/cartcustom/:id', SellerCartcustomController.single.bind(SellerCartcustomController));
//sellerRouter.post('/cartcustom', SellerCartcustomController.store.bind(SellerCartcustomController));
sellerRouter.put('/cartcustom/:id', SellerCartcustomController.update.bind(SellerCartcustomController));
sellerRouter.delete('/cartcustom/:id', SellerCartcustomController.destroy.bind(SellerCartcustomController));



//uplodimagecustomer
customerRouter.post('/image', uploadImage.single('image'), CustomerUploadController.uploadImage.bind(CustomerUploadController));

//uplodimageseller
sellerRouter.post('/image', uploadImage.single('image'), SellerUploadController.uploadImage.bind(SellerUploadController));


router.use('/seller', [sellerRouter , apiAuthseller])
router.use('/customer', [customerRouter, apiAuthcustomer])


module.exports = router;
