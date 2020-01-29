const multer = require('multer')
const mkdirp = require('mkdirp');
//مسیر فایل را نشان میدهد.
const ImageStorage = multer.diskStorage({//استروج برای اینکه نام عکس ها تکراری نباشند.
    destination: (req, file, cb) => {
        let year = new Date().getFullYear();
        let month = new Date().getMonth() + 1;//عدد ماه را نشان دهد با یک جمعش میکنیم
        let day = new Date().getDay();
        let dir = `./public/uploads/images/${year}/${month}/${day}`;

        mkdirp(dir, err => cb(err, dir))//اگر دایرکتوری وجود نداشت اون رو ایجاد میکند و پاسش میدهد به این کالبک.
    },//نام را تغییر نمیدهد و اورجینال را میگذارد.
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const imageFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadImage = multer({
    storage: ImageStorage,
    limits: {
        fileSize: 1024 * 1024 * 100//سایز فایل تا صد مگ میتوانند باشد.
    },
    fileFilter: imageFilter
})


module.exports = {
    uploadImage
}