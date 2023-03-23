const express = require('express');
const { requestUser , allCase ,updateCase ,removeCase ,findCase} = require('../controllers/userController');
const router = express.Router();


router.post('/home', requestUser)

router.get('/listcase', allCase)

router.get('/findcase/:id', findCase)


router.put('/update/:id', updateCase)

router.delete('/delete/:id', removeCase)



module.exports = router;