const express = require('express');

const router = express.Router();
const {listUser ,readUser ,deleteUser}= require('../controllers/userController')

router.get('/list-user' , listUser)
router.get('/list-user/:id' , readUser)



router.delete('/list-user/:id' , deleteUser)





module.exports = router;