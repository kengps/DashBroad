const mongoose = require("mongoose");

const userRegister = mongoose.Schema(
  {
    username: {
      type: String,
      // required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    displayName: String,
    picture: String,
    ipAddress: String,
    email: String,
  },
  { timestamps: true }
); //ทำการจัดเก็บข้อมูลช่วงเวลาในการสร้างหรือแก้ไข

module.exports = User = mongoose.model("Users", userRegister);