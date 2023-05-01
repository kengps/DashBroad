const express  = require('express');
const { register,register2 } = require('../controllers/register');
const router = express.Router();


router.post('/register' , register2 )


module.exports = router;