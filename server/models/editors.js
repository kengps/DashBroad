const mongoose = require("mongoose");

const userEditors = mongoose.Schema(
    {
        username: {
            type: String,
            // required: true, // ห้ามใส่ค่าว่าง ต้องกรอกข้อมูลเสมอ
        },
        select: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
); //ทำการจัดเก็บข้อมูลช่วงเวลาในการสร้างหรือแก้ไข

module.exports = EditorsUser = mongoose.model("Editor", userEditors);