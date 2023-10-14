const express = require("express");
const { createEditor, getEditorAll, getEditorOne,deleteEditor,changeEditor,createNewDatDetail ,getNewDatDetail} = require("../controllers/editors");
const router = express.Router();



router.post("/create-editor", createEditor);

router.get("/get-editor", getEditorAll);

router.get("/create-editor/:id", getEditorOne);

router.delete("/delete-editor/:id", deleteEditor);

router.put("/change-editor/:id", changeEditor);



//NewDataDetail

router.post('/newdata-detail', createNewDatDetail)
router.get('/getnewdata-detail', getNewDatDetail)



//router.get('/getnewdata-detail', getNewDatDetail)


module.exports = router;