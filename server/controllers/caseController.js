const Cases = require("../models/caseModel");
const Users = require("../models/register");

let count = 0;
exports.requestUser = async (req, res) => {
  const { reporter, typeproblem, detail, campgame, wallet, recorder } =
    req.body;
  try {
    count++;
    // const codeCaseId = "BGMC";
    // const countString = caseIdCounter.toString().padStart(5, "0");

    // // หา caseId ที่ใหม่ที่สุดในฐานข้อมูล
    // const latestCase = await Cases.findOne({}, { caseId: 1 }).sort({
    //   createdAt: -1,
    // });

    // // สร้าง caseId ใหม่โดยเพิ่มค่าลำดับต่อไปจาก caseId ที่ใหม่ที่สุด
    // const caseIdCounter = latestCase
    //   ? parseInt(latestCase.caseId.substring(5)) + 1
    //   : 1;

    // const caseId = `${codeCaseId}${countString}`;
    // หา caseId ที่ใหม่ที่สุดในฐานข้อมูล
    const latestCase = await Cases.findOne({}, { caseId: 1 }).sort({
      createdAt: -1,
    });

    // สร้าง caseId ใหม่โดยเพิ่มค่าลำดับต่อไปจาก caseId ที่ใหม่ที่สุด
    const caseIdCounter = latestCase
      ? parseInt(latestCase.caseId.substring(5)) + 1
      : 1;
    const caseId = `BGMC${caseIdCounter.toString().padStart(5, "0")}`;

    // const cases = await Cases.create({ reporter, typeproblem, casedetail ,campgame ,team,editors });
    // res.json(cases);
    let cases = await Cases.findOne({});
    cases = new Cases({
      caseId,
      reporter,
      typeproblem,
      detail,
      campgame,
      wallet,
      recorder,
    });
    await cases.save();
    res.send({ message: "ทำการบันทึกข้อมูลสำเร็จ!!!", cases });
    console.log(cases);
  } catch (error) {
    console.log(error);
  }
};

exports.findCase = async (req, res) => {
  const id = req.params.id;
  // console.log(req.params.id);
  try {
    const cases = await Cases.find({ _id: id }).exec();
    res.json(cases);
  } catch (error) {
    console.log(error);
  }
};

exports.allCase = async (req, res) => {
  try {
    const cases = await Cases.find({}).exec();
    res.json(cases);
  } catch (error) {
    console.log(error);
  }
};

exports.updateCase = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
  }
};
exports.removeCase = async (req, res) => {
  const id = req.params.id;
  try {
    const cases = await Cases.findOneAndRemove({ _id: id }).exec();
    res.json({ message: "ทำการลบข้อมูลสำเร็จ" });
  } catch (error) {}
};

exports.changeStatus = async (req, res) => {
  // console.log(req.body);
  // console.log(req.params);

  try {
    const cases = await Cases.findOneAndUpdate(
      { _id: req.body.id },
      { status: req.body.status }
    );
    res.send(cases);
  } catch (error) {
    res.status(400).send("SerVer is Error");
  }
};

// exports.changeStatus1 = async (req, res) => {
//   // console.log(req.body);
//   // console.log(req.params);

//   try {
//     const user = await Users.findOneAndUpdate
//   } catch (error) {
//     res.status(400).send("SerVer is Error");
//   }
// };

exports.updateDetail1 = async (req, res) => {
  try {
    console.log(req.body);

    const { id } = req.body.values;
    const { detail } = req.body;

    const detailNew = await Cases.findOneAndUpdate(
      { _id: id }, // ตัวที่ค้นหา
      { detail }, // ตัวที่ต้องการให้ update
      { new: true }
    ).exec();
    res.json(detailNew);
  } catch (error) {
    // console.log("เกิดข้อผิดพลาด", error);
    res.status(400).json({ error: "Server isError" });
  }
};

