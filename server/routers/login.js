const express = require("express");
const router = express.Router();
const {  logged ,currentUser} = require("../controllers/authController");
const  {authen} = require('../middleware/auth')

router.post("/login", logged);



router.post('/current-user',authen,currentUser)

// router.post("/login1",authen, (req, res)  => {
//         res.send('5555')
// });







module.exports = router;