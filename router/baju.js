const express = require('express'); //Mengimpor modul express lalu menyimpannya di const express
const router = express.Router(); // Instansi objek express untuk menjalankan route secara modular
const bajuController = require('../controllers/baju');
const Baju = require('../models/baju');
const fs = require('fs');
var multer = require('multer');
var path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } })

router.route('/baju') // syntax .app diganti dengan syntax router
    .get(bajuController.index)
// .post(bajuController.create)
router.route('/baju').post(upload.single('image'), (req, res, next) => {
    const baju = new Baju({
        id: req.body.id,
        namaBaju: req.body.namaBaju,
        hargaBaju: req.body.hargaBaju,
        password: req.body.password,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    });
    baju.save(function (error) {
        if (error) return handleError(error);
        res.redirect('/baju')
    });


});
// router.route('/baju/update').post(bajuController.baharui)
router.route('/baju/update').post(upload.single('image'), (req, res, next) => {
    const _id = req.body._id
    const id = req.body.id
    const namaBaju = req.body.namaBaju
    const hargaBaju = req.body.hargaBaju
    const password = req.body.password
    const filter = { _id: _id };
    const update = {
        id: id,
        namaBaju: namaBaju,
        hargaBaju: hargaBaju,
        password: password,
        img: {
            data: fs.readFileSync(path.join(__dirname, '../' + '/uploads/' + req.file.filename)),
            contentType: 'image/jpg'
        }
    };
    Baju.updateOne(filter, update, function (err) {
        res.redirect('/baju')
    });
});
router.get('/baju/create', bajuController.tambah)
router.get('/baju/:id', bajuController.show)
router.get('/baju/hapus/:id', bajuController.hapus)
router.route('/baju/update/:_id/:id/:namaBarang/:hargaBaju/:password').get(bajuController.renderUpdate)

module.exports = router; //Modul ini akan diekspor dengan route khusus untuk (URL:/baju),
                        //dan sudah bisa diexport