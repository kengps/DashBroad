const mongoose = require("mongoose");

const schemaCase = mongoose.Schema(
  {
    caseId: {
      type: String,
    },
    reporter: {
      type: String,
      required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
    problem: {
      type: {},
      required: true,
    },
    problemDetail: {
      type: {},
      required: true,
    },

    detail: {
      type: {},
      required: true,
    },
    campgame: {
      type: String,
    },
    wallet: {
      type: String,
      required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
    editors: {
      type: String,
      default: "@pr0jectsp",
      required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
    recorder: {
      type: String,
      required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
    status: {
      type: String,
      default: "รอการแก้ไข",
      required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
  },
  { timestamps: true }
); //ทำการจัดเก็บข้อมูลช่วงเวลาในการสร้างหรือแก้ไข

module.exports = mongoose.model("cases", schemaCase);

// reporter: {
//   type: String,
//   required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
// },

// typeproblem: {
//   type: String,
//   required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
// },

// casedetail: {
//   type: {},
//   required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
// },

// campgame: {
//   type: String,
//   required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
// },

// team: {
//   type: String,
//   required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
// },

// editor: {
//   type: String,
//   required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
// },

// status: {
//   type: String,
//   default: "active",
// },
