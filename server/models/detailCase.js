const mongoose = require("mongoose");

// const detailCase = mongoose.Schema(
//   {
//     type: {
//       type: String,
//       enum: [
//         "problemType",
//         "problemDetail",
//         "gameDetail",
//         "platforms",
//         "problemDetailLSM",
//       ],
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     // role: {
//     //   user: {
//     //       type: '',
//     //       require: true
//     //   }
//     // }
//   },
//   { timestamps: true }
// ); //ทำการจัดเก็บข้อมูลช่วงเวลาในการสร้างหรือแก้ไข

// module.exports = User = mongoose.model("detailCase", detailCase);

// const dataType = mongoose.Schema({
//   // โค้ดสำหรับเอกสาร person
//   name: {
//     type: String,
//     required: true,
//   }
// })

// const carSchema = mongoose.Schema({
//   // โค้ดสำหรับเอกสาร ca type: String,
//   name: {
//     type: String,
//     required: true,
//   },
//   last: {
//     type: String,
//     required: true,
//   },
// });

// const personSchema = mongoose.Schema({
//   // โค้ดสำหรับเอกสาร person
//   name: {
//     type: String,
//     required: true,
//   },
//   last: {
//     type: String,
//     required: true,
//   },
// });


// const dataSchema = mongoose.Schema({
//   car: {
//     type: carSchema,
//   },
//   person: {
//     type: personSchema,
//   },

//   // คุณสามารถเพิ่มคุณสมบัติอื่น ๆ ของเอกสาร Data ตามต้องการ
// });


const phoneSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const dataSchema = mongoose.Schema({
  problemType: {
    type: phoneSchema,
  },
  problemDetail: {
    type: phoneSchema,
  },
  gameDetail: {
    type: phoneSchema,
  },
  platforms: {
    type: phoneSchema,
  },
  problemDetailLSM: {
    type: phoneSchema,
  },
});
module.exports = detailCase = mongoose.model("detailCase", dataSchema);

// กำหนด Schema สำหรับ detail
// const detailSchema = mongoose.Schema({
//   name: {
//     type: String,
//   },
// });

// // กำหนด Schema สำหรับ type
// const typeSchema = mongoose.Schema({
//   // id: {
//   //   type: String,
//   //   required: true,
//   //   unique: true,
//   // },
//   name: {
//     type: String,
//   },
// });

// // กำหนด Schema สำหรับ result
// const resultSchema = mongoose.Schema({
//   type: {
//     type: typeSchema,
//   },
//   detail: {
//     type: detailSchema,
//   },
// });

// // กำหนด Schema สำหรับ data (newData)
// const dataSchema = mongoose.Schema({
//   data: {
//     type: resultSchema,

//   }
// },{timestamps: true});

// สร้างโมเดล DataModel
// const DataModel = mongoose.model('Data', dataSchema);

// module.exports = DataModel;



