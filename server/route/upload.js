module.exports = (app) => {
    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/');
        },
        filename: (req, file, cb) => {
            var timeStamp = Date.now();
            filename = file.fieldname + '-' + timeStamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1];
            cb(null, filename);
        }
    });
    var upload = multer({
        storage: storage
    }).single('file');

    app.post('/upload', (req, res, next) => {
        upload(req, res, (err) => {
            if (err) {
                res.status(500).send('Something broke!');
                return;
            }
            res.json({
                success: true,
                filename: filename
            });
        });
    });
}