const EditorsUser = require("../models/editors");


exports.createEditor = async (req, res) => {

    try {

        const { username } = req.body

        let user = await EditorsUser.findOne({ username })
        if (user) {
            return res.status(400).send("User Already exists");
        }


        user = new EditorsUser({
            username
        });

        const resultData = await user.save();
        res.status(200).send({ message: "User Editor success", resultData });

    } catch (error) {

        res.status(500).send('server is error!!!!')
    }

}

exports.getEditorAll = async (req, res) => {

    try {

        const { username } = req.body

        const resultData = await EditorsUser.find().exec()

        res.status(200).send({ message: "Find userEditor success", resultData });

    } catch (error) {
        console.log("🚀 ~ file: editors.js:20 ~ exports.createEditor= ~ error:", error)
        res.status(500).send('server is error!!!!')
    }

}


exports.getEditorOne = async (req, res) => {

    try {
        console.log(req.params.id);
        const { username, id } = req.params

        const resultData = await EditorsUser.findOne({ _id: id }).exec()

        res.status(200).send({ message: "FindOne userEditor success", resultData });

    } catch (error) {
        console.log("🚀 ~ file: editors.js:20 ~ exports.createEditor= ~ error:", error)
        res.status(500).send('server is error!!!!')
    }

}
exports.deleteEditor = async (req, res) => {

    try {
        console.log(req.params.id);
        const { username, id } = req.params

        await EditorsUser.findOneAndRemove({ _id: id }).exec()

        res.status(200).send({ message: "Delete userEditor success" });

    } catch (error) {
        console.log("🚀 ~ file: editors.js:20 ~ exports.createEditor= ~ error:", error)
        res.status(500).send('server is error!!!!')
    }

}

exports.changeEditor = async (req, res) => {
    try {
        console.log(req.body);
        const user = await EditorsUser.findOneAndUpdate(
            { _id: req.body.id },// ตัวที่ค้นหา
            { select: req.body.select } // ตัวที่ต้องการให้ update
        ).exec();
        res.json(user);
    } catch (error) {
        console.log("เกิดข้อผิดพลาด", error);
        //res.status(400).json({ error: "Server isError" });
    }
};
