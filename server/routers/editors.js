const express = require("express");
const { createEditor, getEditorAll, getEditorOne,deleteEditor,changeEditor } = require("../controllers/editors");
const router = express.Router();



router.post("/create-editor", createEditor);

router.get("/get-editor", getEditorAll);

router.get("/create-editor/:id", getEditorOne);

router.delete("/delete-editor/:id", deleteEditor);

router.put("/change-editor/:id", changeEditor);






module.exports = router;