const express = require('express');
const { requestUser , allCase ,updateCase ,removeCase ,findCase ,changeStatus} = require('../controllers/userController');
const router = express.Router();

//สร้าง case 
router.post('/createcase', requestUser)


//เรียกดูเคสทั้งหมด
router.get('/listcase', allCase)

// เรียกดูเคส 1 เคส
router.get('/findcase/:id', findCase)


// update case
router.put('/change-status/:id', updateCase)

router.post('/change-status', changeStatus)

// delete case
router.delete('/delete/:id', removeCase)



module.exports = router;