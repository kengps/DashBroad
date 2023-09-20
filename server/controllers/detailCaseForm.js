// const DataModel = require("../models/detailCase");
const DataDetail = require("../models/dataDetail");
const DataModel = require("../models/detailCase");
const detailCase = require("../models/detailCase");
const DataModelType = require("../models/typeDetail");




exports.createDetailCase = async (req, res) => {
  try {
    const newData = new detailCase(req.body); // สร้างเอกสารใหม่จาก req.body
    const { type, name } = req.body;
    const nameType = await detailCase.findOne({ type, name });

    if (nameType) {
      return res.status(400).send({ message: "Name Already exists" });
    }
    const savedData = await newData.save(); // บันทึกข้อมูลลงในฐานข้อมูล
    res.send({ message: "ทำการบันทึกข้อมูลสำเร็จ!!!", savedData });
  } catch (error) {
    res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
  }
};

exports.allDetailCase = async (req, res) => {
  try {
    const cases = await detailCase.find({}).exec();
    res.json(cases);
  } catch (error) {
  }
};

exports.allDetailCase2 = async (req, res) => {
  try {
    const cases = await DataDetail.find({}).exec();
    res.json(cases);
  } catch (error) {
  }
};


// exports.createDetailCase2 = async (req, res) => {

//   try {
//     const { name, last } = req.body
//     const problemTypeData = {
//       name,
//       last,

//     };

//     const newData = new DataModel({
//       person: problemTypeData,
//     });
//     const nameType = await DataModel.findOne({ 'person.name': name, 'person.last': last });

//     if (nameType) {
//       return res.status(400).send({ message: "Name Already exists" });
//     }
//     const savedData = await newData.save(); // บันทึกข้อมูลลงในฐานข้อมูล
//     res.send({ message: "ทำการบันทึกข้อมูลสำเร็จ!!!", savedData });
//   } catch (error) {
//     res.status(500).json({ message: "เกิดข้อผิดพลาดในการบันทึกข้อมูล" });
//   }

// };

// exports.createDetailCase2 = async (req, res) => {
//   try {
//     const { name, secret } = req.body;

//     let newData;

//     if (secret === 'iphone') {
//       newData = new DataModel({
//         iphone: {
//           name,
//         },
//       });
//     } else if (secret === 'samsung') {
//       newData = new DataModel({
//         samsung: {
//           name,
//         },
//       });
//     } else if (secret === 'vivo') {
//       newData = new DataModel({
//         vivo: {
//           name,
//         },
//       });
//     } else {
//       return res.status(400).send({ message: 'Invalid secret' });
//     }

//     const savedData = await newData.save();
//     res.send({ message: 'ทำการบันทึกข้อมูลสำเร็จ!!!', savedData });
//   } catch (error) {
//     res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
//   }
// };

// exports.createDetailCase2 = async (req, res) => {
//   try {
//     const { name, secret } = req.body;

//     const dataFields = Object.keys(DataModel.schema.paths);

//     if (!dataFields.includes(secret)) {
//       return res.status(400).send({ message: 'Invalid secret' });
//     }

//     const existingData = await DataModel.findOne({ [`${secret}.name`]: name });

//     if (existingData) {
//       return res.status(400).send({ message: 'Name already exists' });
//     }

//     const newData = new DataModel({
//       [secret]: {
//         name,
//       },
//     });

//     const savedData = await newData.save();

//     res.send({ message: 'ทำการบันทึกข้อมูลสำเร็จ!!!', savedData });
//   } catch (error) {
//     res.status(500).json({ message: 'เกิดข้อผิดพลาดในการบันทึกข้อมูล' });
//   }
// };




exports.createDetailCase2 = async (req, res) => {
 

  try {

    const types = req.body.data.type.types
    const nameType = req.body.data.type.name;
    const nameDetail = req.body.data.detail.name;
    
    //ให้ตัวนำหน้าเป็นพิมพ์ใหญเท่านั้น
    // const typesFormat = types.charAt(0).toUpperCase() + types.slice(1).toLowerCase();
    // const nameTypeFormat = nameType.charAt(0).toUpperCase() + nameType.slice(1).toLowerCase();
    // const nameDetailFormat = nameDetail.charAt(0).toUpperCase() + nameDetail.slice(1).toLowerCase();

   // ตรวจสอบความซ้ำกันของชื่อในฐานข้อมูล

    const existingData = await DataDetail.findOne({
      'data.type.types': types,
      'data.type.name': nameType,
      'data.detail.name': nameDetail,
    });

    if (existingData) {
      return res.status(400).json({ error: 'Name already exists' });
    }

  
    
    const newData = new DataDetail({
      "data": {
        "type": {
          "types": types,
          "name": nameType
        },
        "detail": {
          "name": nameDetail
        }
      }
    });


    newData.save()
      .then(() => {
        res.status(201).json({ message: 'Data created successfully' ,newData});
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



exports.typeData = async (req, res) => {
  
  try {
    
  let typeName = req.body.data.main.typeName
  
  let name  = req.body.data.main.sub.name
  let detail = req.body.data.main.sub.detail
  
  const existingData = await DataModelType.findOne({
   data: {
     main: {
       typeName,
       sub: {
          name,
          detail
        }
        }
      
    }
  });
  


  if (existingData) return res.status(400).json({ error: 'Name already exists' });
  




  const newData = new DataModelType({
    data: {
      main: {
        typeName,
        sub: {
          name,
          detail
        }
      }
      
    }
  });

 
  const data = await newData.save();

    res.status(201).json({ message: 'บันทึกข้อมูลสำเร็จ' ,data});
   
    
  } catch (error) {
  }
};


exports.getTypeData = async (req, res) => {
  try {
    const cases = await DataModelType.find({}).exec();
    res.json(cases);
  } catch (error) {
  }
};

exports.deleteTypeData = async (req, res) => {
  const id = req.params.id;
  try {
    const typeName = await DataModelType.findOneAndRemove({ _id: id }).exec();
    res.json({ message: "ทำการลบข้อมูลสำเร็จ",typeName });
  } catch (error) { }
};



// exports.createDetailCase2 = async (req, res) => {
//   try {
//     const nameType = req.body.data.result.type.name;
//     const nameDetail = req.body.data.result.detail.name;

//     // ตรวจสอบความซ้ำกันของชื่อในฐานข้อมูล
//     const existingData = await DataModel.findOne({
//       'data.result.type.name': nameType,
//       'data.result.detail.name': nameDetail,
//     });

//     if (existingData) {
//       // หากมีชื่อซ้ำกันในฐานข้อมูล ใช้ id จากข้อมูลที่มีชื่อซ้ำกันนั้น
//       const id = existingData.data.result.type.id;
      
//       const newData = new DataModel({
//         data: {
//           result: {
//             type: {
//               id: id,
//               name: nameType,
//             },
//             detail: {
//               name: nameDetail,
//             },
//           },
//         },
//       });

//       newData.save()
//         .then(() => {
//           res.status(201).json({ message: 'Data created successfully' });
//         })
//         .catch((error) => {
//           res.status(500).json({ error: error.message });
//         });
//     } else {
//       // หากไม่มีชื่อซ้ำกันในฐานข้อมูล
//       let id = '01'; // กำหนดค่าเริ่มต้นของ id
      
//       // ค้นหาข้อมูลที่มี id สูงสุด
//       const lastData = await DataModel.findOne().sort({ 'data.result.type.id': -1 });

//       if (lastData) {
//         const lastId = lastData.data.result.type.id;
//         const regex = /^\d{2}$/;
//         const match = lastId.match(regex);

//         if (match) {
//           // เพิ่มเลขต่อจาก id สูงสุด
//           const number = parseInt(match[0]) + 1;
//           id = number.toString().padStart(2, '0');
//         }
//       }

//       const newData = new DataModel({
//         data: {
//           result: {
//             type: {
//               id: id,
//               name: nameType,
//             },
//             detail: {
//               name: nameDetail,
//             },
//           },
//         },
//       });

//       newData.save()
//         .then(() => {
//           res.status(201).json({ message: 'Data created successfully' });
//         })
//         .catch((error) => {
//           res.status(500).json({ error: error.message });
//         });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
