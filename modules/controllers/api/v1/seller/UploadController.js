const Controller = require(`${config.path.controller}/Controller`);
module.exports = new class UplodController extends Controller {

    uploadImage(req, res) {
        
        if (req.file) {
            res.json({
                message: 'فایل شما با موفقیت آپلود گردید',
                data: {
                    imagePath: 'http://localhost:8080/' + req.file.path.replace(/\\/g, '/')
                },
                success: true
            })
        } else {
            res.json({
                message: 'فایل شما آپلود نشد',
                success: false
            })
        }
    }
}
