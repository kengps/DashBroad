const EditorsUser = require("../models/editors");
const newDatDetail = require("../models/newDatDetail");


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
        res.status(500).send('server is error!!!!')
    }

}


exports.getEditorOne = async (req, res) => {

    try {
        const { username, id } = req.params

        const resultData = await EditorsUser.findOne({ _id: id }).exec()

        res.status(200).send({ message: "FindOne userEditor success", resultData });

    } catch (error) {
        res.status(500).send('server is error!!!!')
    }

}
exports.deleteEditor = async (req, res) => {

    try {
        const { username, id } = req.params

        await EditorsUser.findOneAndRemove({ _id: id }).exec()

        res.status(200).send({ message: "Delete userEditor success" });

    } catch (error) {
        res.status(500).send('server is error!!!!')
    }

}

exports.changeEditor = async (req, res) => {
    try {
        const user = await EditorsUser.findOneAndUpdate(
            { _id: req.body.id },// ตัวที่ค้นหา
            { select: req.body.select } // ตัวที่ต้องการให้ update
        ).exec();
        res.json(user);
    } catch (error) {
        //res.status(400).json({ error: "Server isError" });
    }
};


exports.createNewDatDetail = async (req, res) => {
    const { name, active, detail } = req.body;

    const detailName = req.body.detail[0].name
    console.log("🚀  file: editors.js:94  detailName:", detailName)

    const detailName2 = req.body.detail.map((item) => { return item.name })



    try {
        const newDataDetail = await newDatDetail.findOne({ "name": name, "detail.name": detailName }).exec();

        if (newDataDetail) return res.status(401).send({ message: "name Already exists" });

        const newData = new newDatDetail({
            name: name,

        });

        const existingData = await newDatDetail.findOne({ name: name }).exec();

        if (existingData) {
            existingData.detail.push({
                name: req.body.detail[0].name,
                active: true,
                upper: existingData._id
            })
            const result = await existingData.save()
            res.status(200).json({ message: 'Save Data successfully', result })
        } else {

            const newData2 = new newDatDetail({
                _id: newData._id,
                name: newData.name,
                active: true,
                detail: req.body.detail.map((detailItem) => ({
                    name: detailItem.name,
                    active: true,
                    upper: newData._id
                }))
            })
            const result2 = await newData2.save()
            res.status(200).json({ message: 'Save Data successfully', result2 })
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดในการสร้างข้อมูล', error });
    }
};



exports.getNewDatDetail = async (req, res) => {

    try {


        const result = await newDatDetail.find({}).exec()

        res.status(200).send({ message: "Find DataDetail successfully !!!!", result });

    } catch (error) {
        res.status(500).send('server is error!!!!')
    }


}