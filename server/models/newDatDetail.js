
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const detailData = mongoose.Schema(
//     {
//         name: {
//             type: String,
//         },
//         active: {
//             type: Boolean,
//             default: true,
//         },
//         upper: mongoose.Schema.Types.ObjectId

//     }
// );

// const mainData = mongoose.Schema({


//     name: {
//         type: String,
//     },
//     active: {
//         type: Boolean,
//         default: true,
//     }
//     , detail: [detailData],
// }
// );
/* The code `const detailSchema = mongooseSchema({ ... })` is defining a Mongoose schema for the
`detail` data. */
const detailSchema = mongoose.Schema({
    name: String,
    active: Boolean,
    upper: {
        type: Schema.Types.ObjectId,
        ref: 'newDatDetail' // ระบุ ref ให้ชี้ไปยังโมเดล newDatDetail
    }
});

const mainSchema = mongoose.Schema({
    name: String,
    active: Boolean,
    detail: [detailSchema]
});




module.exports = newDataDetail = mongoose.model("newDataDetail", mainSchema);