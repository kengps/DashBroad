const jwt = require("jsonwebtoken");
const User = require("../models/register");


exports.authen = async (req, res, next) => {
  try {

    //กำหนด token ที่่มากับ headers 
    let token = req.headers['authtoken']
    // ตรวจสอบว่ามี token หรือไม่
    if (!token) return res.status(400).send('Not confirm is Token')

    // ถ้ามี token ให้ทำการแปลง verify
    const decoded = jwt.verify(token, 'jwtSecret')

    // console.log(decoded);
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(500).json({ error: "User is not Found!!" });
  }
};


exports.adminCheck = async (req, res, next) => {
  try {

    //console.log('log',req.user.username);
    const userAdmin = await User.findOne({ username: req.user.username }).select("-password").exec();
    console.log('log', userAdmin);
    if (userAdmin.role !== "admin") return res.status(404).send('Admin access denied!!!!!')

    next();
  } catch (error) {
    console.log(error);
    res.status(404).send('Admin access denied')

  }

}