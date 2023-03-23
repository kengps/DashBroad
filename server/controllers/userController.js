const Cases = require("../models/caseModel");

exports.requestUser = async (req, res) => {
  const { reporter, typeproblem, casedetail, campgame, team, editors } =
    req.body;
  try {
    // const cases = await Cases.create({ reporter, typeproblem, casedetail ,campgame ,team,editors });
    // res.json(cases);
    let cases = await Cases.findOne({});
    cases = new Cases({
      reporter,
      typeproblem,
      casedetail,
      campgame,
      team,
      editors,
    });
    await cases.save();
    res.send(cases)
  } catch (error) {
    console.log(error);
  }
};


exports.findCase = async(req, res) => {
  const id = req.params.id
 // console.log(req.params.id);
  try {
    const cases = await Cases.find({_id: id}).exec();
    res.json(cases)

  } catch (error) {
    
  }
}

exports.allCase = async(req, res) => {
      try {
        const cases = await Cases.find({}).exec();
        res.json(cases)
      } catch (error) {
        
      }
}

exports.updateCase = async(req, res) => {
  try {
   
  } catch (error) {
    
  }
}
exports.removeCase = async(req, res) => {
  const id = req.params.id
  try {
    const cases = await Cases.findOneAndRemove({_id:id}).exec();
    res.json({message: 'delete Success!!'})
  } catch (error) {
    
  }
}