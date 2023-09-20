const User = require("../models/register");
const registers = require("../models/register");
const jwt = require("jsonwebtoken");
const { expressjwt: exJwt } = require("express-jwt");

const bcrypt = require("bcryptjs");
const { getIP } = require("./ip");

exports.logged = async (req, res) => {
  try {
    const ip = await getIP(req)
    console.log(ip);
    const { username, password } = req.body;
    console.log(req.body);
    // const user =  await Users.find
    const user = await User.findOneAndUpdate({ username }, { ipAddress: ip }, { new: true });

    if (user && user.enabled) {
      //check password ระหว่าง password ปกติ และ password ที่มีการใส่รหัส
      const isMatch = await bcrypt.compare(password, user.password);

      console.log("pass", user.password);
      //   //const match = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "pass invalid" });
      }

      const payLoad = {
        user: {
          username: user.username,
          role: user.role,
          id: user._id,
        },
      };
      // // Token
      const token = jwt.sign(payLoad, "jwtSecret", { expiresIn: "8h" });

      return res.json({ token, payLoad });
      // res.send('hello')
    } else {

      res.status(400).json({ error: "User is not Found!!" });
    }
  } catch (error) {

    res.status(400).send("SerVer is Error");
  }
};
exports.loggedLine = async (req, res) => {

  try {
    const ip = await getIP(req)
    const { userId, displayName, pictureUrl } = req.body

    let data = {
      username: displayName,
      picture: pictureUrl
    }
    let user = await User.findOneAndUpdate({ username: displayName }, { new: true });
    if (user) {
      console.log('user Updated');
    } else {
      user = new User(data);
      await user.save();
    }


    const payLoad = {
      user,

    };
    console.log(payLoad);
    const token = jwt.sign(payLoad, "jwtSecret", { expiresIn: "8h" });
    return res.json({ token, payLoad });

    // res.send({ message: 'Login success', user });

  } catch (error) {
    console.log('error', error);

  }
};

exports.loggedFacebook = async (req, res) => {

  try {
    const { email, name, userId } = req.body;

    let data = {
      username: name,
      email: email
    };

    console.log('res', data);

    // ค้นหาผู้ใช้ด้วยชื่อ (username)
    let user = await User.findOne({ username: name });

    if (user) {
      // ถ้าพบผู้ใช้ ให้ทำการอัปเดตข้อมูล
      user.email = email;
      await user.save();
      console.log('User Updated');
    } else {
      // ถ้าไม่พบผู้ใช้ ให้สร้างผู้ใช้ใหม่
      user = new User(data);
      await user.save();
    }

    const payLoad = {
      user
    };

    console.log(payLoad);
    const token = jwt.sign(payLoad, "jwtSecret", { expiresIn: "8h" });
    return res.json({ token, payLoad });
  } catch (error) {
    console.log('error', error);
  }
};


exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username })
      .select("-password")
      .exec();

    res.send(user);
  } catch (error) {
    res.status(400).send("SerVer is Error!!");
  }
};

