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
      required: true, 
    },
    editors: {
      type: String,
      default: "@pr0jectsp",
    },
    recorder: {
      type: String,
      required: true, 
    },
    status: {
      type: String,
      default: "รอการแก้ไข",
      required: true, 
    },
    closeCaseBy: {
      type: String,
      default: "",
    },

  },
  { timestamps: true }
); //ทำการจัดเก็บข้อมูลช่วงเวลาในการสร้างหรือแก้ไข

module.exports = mongoose.model("cases", schemaCase);
