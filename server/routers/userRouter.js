const express = require('express');

const moment = require('moment')
const router = express.Router();
const {changeUser,listUser ,readUser ,deleteUser,updatePassword,resetPassword ,changStatus,changeRole}= require('../controllers/userController')






router.get("/current-time", (req, res) => {
  const currentTime = moment().format("HH:mm");
  res.json({ currentTime });
});





router.get('/list-user' , listUser)
router.get('/list-user/:id' , readUser)



router.delete('/list-user/:id' , deleteUser)

router.put('/user/:id' , updatePassword)

router.put('/users/:id' , resetPassword)

// router.post("/change-status", authMiddleware ,checkAdmin, changStatus);

 router.post("/change-user", changeUser);
 router.post("/change-role-user", changeRole);

module.exports = router;