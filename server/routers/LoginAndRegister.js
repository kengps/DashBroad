const express  = require('express');
const { removeUser,register2 } = require('../controllers/register');
const router = express.Router();


router.post('/register' , register2 )

router.delete('/delete-user/:id' , removeUser )


module.exports = router;