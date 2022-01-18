const express = require('express');
const exRouter = require('./router/baju')//import module yang sudah diexport dari katalog.js
const app = express();


app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.static("public"));
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));


//Mengkoneksikan database dengan mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressuts');

//Tambahkan pesan jika koneksi ke database berhasil
const db = mongoose.connection

db.on('error', function () {
    console.log('Koneksi gagal')
})
db.once('open', function () {
    console.log('Koneksi Berhasil')
})

app.use(exRouter); //tambahkan app.use untuk menggunakan module

app.listen(3000, function () {
    console.log('Dibuat oleh Desy Dwi Haryani')
})





//Middleware Waktu
const requestTime = function (req, res, next) {
    date = new Date(); //pesan yang ingin ditampilkan
    console.log(date);
    next();
}

app.use(requestTime); //nama properti middleware
app.set('view engine', 'ejs');//tambahkan settingan untuk jenis template yang digunakan

app.get('/date', function (req, res) {
    const tanggal = `Selamat belajar Express js <br>
    <p><small>Requested at: "${date}"</small></p>`
    res.send(tanggal)
})


//membuat URL /about dengan method GET
app.get('/about', function (req, res) {
    res.render('pages/about')
})

app.get('/', function (req, res) {
    res.render('pages/index')
})





//1
// app.get('/katalog', function(req,res){
//     const katalog= {
//         idBarang : '3',
//         namaBarang : 'Nvidia'
//     }
//     res.send(katalog)
// })
//1

//2
app.get('/redirect', function (req, res) {
    res.redirect('https://www.google.com/')
})
//2

//3
app.get('/error', function (req, res) {
    res.sendStatus(404)
})
//3

app.route('/list')
    .get(function (req, res) {
        res.send('Tampilkan list barang komponen komputer yang dijual')
    })
    .post(function (req, res) {
        res.send('Tambahkan barang ke dalam list komponen komputer yang dijual')
    })
    .put(function (req, res) {
        res.end('Perbaharui data barang komponen komputer yang dijual')
    })
    .delete(function (req, res) {
        res.send('Hapus barang komponen komputer yang dijual')
    })