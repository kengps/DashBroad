const mongoose = require('mongoose')




//กำหนด Schema สำหรับ detail
const detailSchema = mongoose.Schema({
    name: {
        type: String,
       
    },
});

const typeSchema = mongoose.Schema({
    types: {
        type: String,
    },
    name: {
        type: String,
      
    },
});

const resultSchema = mongoose.Schema({
    type: typeSchema,
    detail: detailSchema,
});

const dataSchema = mongoose.Schema({
    data: resultSchema,
}, { timestamps: true });



//สร้างโมเดล DataModel
const DataDetail = mongoose.model('DataDetail', dataSchema);

module.exports = DataDetail;

