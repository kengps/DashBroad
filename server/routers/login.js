const express = require("express");
const router = express.Router();
const {  logged } = require("../controllers/authController");
const  {authen} = require('../middleware/auth')

router.post("/login", logged);



router.post("/login1",authen, (req, res)  => {
        res.send('5555')
});





module.exports = router;