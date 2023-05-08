const jwt = require("jsonwebtoken");

exports.authen = async (req, res, next) => {
  try {

    //กำหนด token ที่่มากับ headers 
    let token = req.headers['authtoken']
        // ตรวจสอบว่ามี token หรือไม่
    if(!token) return res.status(400).send('Not confirm is Token')

    // ถ้ามี token ให้ทำการแปลง verify
    const decoded = jwt.verify(token , 'jwtSecret')

    // console.log(decoded);
    req.user = decoded.user;
    
    next();
  } catch (error) {
    res.status(500).json({ error: "User is not Found!!" });
  }
};
