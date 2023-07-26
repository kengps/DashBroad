const express = require('express');
const { requestUser , allCase ,updateCase ,removeCase ,findCase ,changeStatus, updateDetail ,updateCaseDetail} = require('../controllers/caseController');
const { createDetailCase, allDetailCase ,createDetailCase2,allDetailCase2} = require('../controllers/detailCaseForm');
const router = express.Router();

//สร้าง case 
router.post('/createcase', requestUser)


//เรียกดูเคสทั้งหมด
router.get('/listcase', allCase)

// เรียกดูเคส 1 เคส
router.get('/findcase/:id', findCase)


// update case
router.put('/change-status/:id', updateCase)

router.put('/change-detail/:id', updateDetail)

router.post('/change-status', changeStatus)

// delete case
router.delete('/delete/:id', removeCase)

// router.put('/changdetail/:id' , updateDetail)
router.put('/update-detail/:id', updateCaseDetail)



router.post('/create-detailcase', createDetailCase2)


router.post('/detail-case', createDetailCase2)



router.get('/listdetail', allDetailCase)

router.get('/listdetail2', allDetailCase2)


module.exports = router;