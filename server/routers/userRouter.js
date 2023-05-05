const express = require('express');

const router = express.Router();
const {listUser ,readUser ,deleteUser,updatePassword,resetPassword}= require('../controllers/userController')

router.get('/list-user' , listUser)
router.get('/list-user/:id' , readUser)



router.delete('/list-user/:id' , deleteUser)

router.put('/user/:id' , updatePassword)

router.put('/users/:id' , resetPassword)



module.exports = router;