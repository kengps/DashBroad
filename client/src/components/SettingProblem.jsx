import React, { useEffect } from "react";
import { Button, Card, Modal, Select as AntSelect } from "antd";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Select from "@mui/material/Select";
import InputGroup from "react-bootstrap/InputGroup";
import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { createDetail, listDetailCase } from "../api/detailCase";
import SweetAlert from "sweetalert2";

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useStore, useStoreSetting } from "../service/zustand/storeCase";


const SettingProblem = ({ onCloseModal }) => {

  //Data Zustand
  const { fetchData, fetchTypesName } = useStore();
  const { resDetail, createDetails } = useStoreSetting();

  const data = useStore((state) => state.typesName)



  //การ Reduce เอาค่าที่ไม่ซ้ำกัน
  const uniqueTypesSet = new Set();
  const uniqueTypess = data.reduce((accumulator, data) => {
    const type = data.data.main.typeName;
    if (type && !uniqueTypesSet.has(type)) {
      uniqueTypesSet.add(type);
      accumulator.push(type);
    }
    return accumulator;
  }, []);


  const newDataType = data.map((item) => { return item.data.main.typeName })
  const typeProb = ([...new Set(newDataType)]).filter(Boolean);

  //Type 
  const problemType = data.filter((item) => typeProb[0].includes(item.data.main.typeName));
  const problemTypeName = new Set(problemType.map((item) => { return item.data.main.sub.name }))
  const newProbType = [...problemTypeName]


  const platforms = data.filter((item) => typeProb[2].includes(item.data.main.typeName));
  const platformsName = new Set(platforms.map((item) => { return item.data.main.sub.name }))
  const newPlatforms = [...platformsName]
  // console.log('problemType', newPlatforms);



  const [dataProblem, setDataProblem] = useState([]);

  const [values, setValues] = useState({
    data: {
      main: {
        typeName: "",
        sub: {
          name: '',
          detail: '',
        }
      }
    }

  });



  const [values2, setValues2] = useState({
    data: {
      type: {
        types: "",
        name: ""
      },
      detail: {
        name: ""
      }
    }

  });


  const { types, name, detail } = values;

  const inputValue = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    // console.log(event.target.value);
    //  console.log(event);
  };

  useEffect(() => {
    fetchData1();
    fetchData();
    fetchTypesName();
  }, []);

  const fetchData1 = async () => {
    listDetailCase()
      .then((res) => setDataProblem(res.data))
      .catch((err) => console.log(err));
  };

  const submitForm = async (e) => {
    try {
      // console.log("➡️  file: SettingProblem.jsx:75  values:", values)
      const dataToSend2 = {
        data: {
          type: {
            types: values.types,
            name: values.name
          },
          detail: {
            name: values.detail
          }
        }
      };

      const dataToSend = {
        data: {
          main: {
            typeName: values.typeName,
            sub: {
              name: values.name,
              detail: values.detail,
            }
          }
        }
      };
      // console.log("➡️  file: SettingProblem.jsx:137  dataToSend:", dataToSend)

    
      e.preventDefault();
      await createDetails(dataToSend)
      SweetAlert.fire("แจ้งเตือน", "เพิ่มข้อมูลสำเร็จ", "success");

      setValues(Object.fromEntries(Object.keys(values).map(key => [key, ""])));
      setSelectedOption(""); // เปลี่ยนค่า selectedOption เป็นค่าว่างเปล่า

      onCloseModal();

    } catch (error) {
      alert(error);
    }

  };


  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const indicesArray = uniqueTypess.map((_, index) => index);

  // แสดงผลอาร์เรย์ที่มีจำนวน index ในรูปแบบ [0, 1, 2, ...]
  // console.log('Indices array:', indicesArray);

  return (
    <div className="from-control">
      <Card>

        <Autocomplete
          id="free-solo-demo"
          freeSolo
          options={uniqueTypess}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="typeName" />}
          onChange={(event, newValue) => {
            setSelectedOption(newValue);
            setValues({
              ...values,
              typeName: newValue,
              name: "", // Reset ชื่อเมื่อเปลี่ยนเลือก Type
              detail: "" // Reset รายละเอียดเมื่อเปลี่ยนเลือก Type
            });

          }}
          onInputChange={(event, newInputValue) => {
            setValues({
              ...values,
              typeName: newInputValue,
              name: "", // Reset ชื่อเมื่อเปลี่ยนเลือก Type
              detail: "" // Reset รายล
            })
            inputValue(event, newInputValue); // เรียกใช้ฟังก์ชัน inputValue และส่ง event มา

          }}
          name="types"
        />

        {selectedOption === uniqueTypess[0] && (
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <Autocomplete

              id="combo-box-demo"
              options={newProbType}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="name" />}
              onChange={(event, newValue) => {
                setValues({ ...values, name: newValue }); // บันทึกค่าที่เลือกไป
                inputValue(event, newValue); // เรียกใช้ฟังก์ชัน inputValue และส่ง event และ newValue มา
              }}
              name="name"
            />
            <TextField
              name="detail"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="outlined-basic"
              label="รายละเอียด"
              variant="outlined"
              onChange={inputValue("detail")}
            />

          </Box>

        )}

        {selectedOption === uniqueTypess[1] && (
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              name="name"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="outlined-basic"
              label="ชื่อ"
              variant="outlined"
              onChange={inputValue("name")}
            />
          </Box>

        )}

        {selectedOption === uniqueTypess[2] && (
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <Autocomplete

              id="combo-box-demo"
              options={newPlatforms}
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="name" />}
              onChange={(event, newValue) => {
                setValues({ ...values, name: newValue }); // บันทึกค่าที่เลือกไป
                inputValue(event, newValue); // เรียกใช้ฟังก์ชัน inputValue และส่ง event และ newValue มา
              }}
              name="name"
            />
            <TextField
              name="detail"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="outlined-basic"
              label="รายละเอียด"
              variant="outlined"
              onChange={inputValue("detail")}
            />

          </Box>

        )}
        {selectedOption !== uniqueTypess[0] && selectedOption !== uniqueTypess[1] && selectedOption !== uniqueTypess[2] && (
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              name="name"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="outlined-basic"
              label="ชื่อ"
              variant="outlined"
              onChange={inputValue("name")}
            />
            <TextField
              name="detail"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              id="outlined-basic"
              label="รายละเอียด"
              variant="outlined"
              onChange={inputValue("detail")}
            />

          </Box>

        )}



        <Button
          className="btn-primary float-end mt-2"
          type="submit"
          value="submit"
          onClick={submitForm}
        >
          ตกลง
        </Button>
      </Card>
    </div>
  );
};

export default SettingProblem;
