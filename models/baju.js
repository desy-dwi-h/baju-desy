const mongoose = require('mongoose');
const { Schema } = mongoose;

const bajuSchema = new Schema({
    id: String,
    namaBaju: String,
    hargaBaju: String,
    password: String,
    img: {
        data: Buffer, contentType: String
    },
}, { timestamps: true })

const Baju = mongoose.model('Baju', bajuSchema);
module.exports = Baju