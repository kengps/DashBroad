const User = require("../models/register");
const jwt = require("jsonwebtoken");
const { expressjwt: exJwt } = require("express-jwt");

const bcrypt = require("bcryptjs");

exports.logged = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    // const user =  await Users.find
    const user = await User.findOneAndUpdate({ username }, { new: true });

    if (user && user.enabled) {
      //check password ระหว่าง password ปกติ และ password ที่มีการใส่รหัส
      const isMatch = await bcrypt.compare(password, user.password);

      console.log("pass", isMatch);
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
      const token = jwt.sign(payLoad, "jwtSecret", { expiresIn: "12h" });

      return res.json({ token, payLoad });
      // res.send('hello')
    } else {
      res.status(400).json({ error: "User is not Found!!" });
    }
  } catch (error) {
    res.status(400).send("SerVer is Error");
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
