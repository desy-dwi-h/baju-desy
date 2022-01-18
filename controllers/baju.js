const { request } = require('express')
const Baju = require('../models/baju')

// let baju = [
//     { idBarang: '1', namaBarang: 'Nvidia GTX 1080', jenisBarang: 'VGA' },
//     { idBarang: '2', namaBarang: 'AMD Athlon 3000G', jenisBarang: 'CPU' }
// ]



module.exports = { //Export modul untuk diimpor dalam file router
    index: function (req, res) {
        let keyword = {}
        if (req.query.keyword) {
            keyword = { namaBaju: { $regex: req.query.keyword } }
        }
        Baju.find(keyword, "namaBaju _id hargaBaju id img password", function (error, baju) {
            res.render('pages/baju/index', { baju })
        })

    },
    show: function (req, res) {
        const id = req.params.id
        Baju.findById(id, function (error, data) {
            res.render('pages/baju/show', { baju: data })
        })
    },
    create: function (req, res) { //Menambahkan data

        const baju = new Baju({
            id: req.body.id,
            namaBaju: req.body.namaBaju,
            hargaBaju: req.body.hargaBaju,
            password: req.body.password,
        });
        baju.save(function (error) {
            if (error) return handleError(error);
            res.redirect('/baju')
        });

    },
    tambah: function (req, res) {
        res.render('pages/baju/create')
    },
    baharui: function (req, res) {
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
            password: password
        };
        Baju.updateOne(filter, update, function (err) {
            res.redirect('/baju')
        });


    },
    renderUpdate: function (req, res) {
        const id = req.params._id
        Baju.findById(id, function (error, data) {
            if (error) console.log(error)
            res.render('pages/baju/update', { baju: data })
        })
    },
    hapus: function (req, res) {
        const id = req.params.id
        Baju.deleteOne({ _id: id }, function (err) {
            if (err) return console.log(err);
            res.redirect('/baju')
        });
    },
}