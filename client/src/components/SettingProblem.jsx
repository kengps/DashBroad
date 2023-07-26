import React, { useEffect } from "react";
import { Button, Card, Modal, Select as AntSelect } from "antd";
import { useState } from "react";
import ButtonBt from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "@mui/material/Select";
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from "react-bootstrap/InputGroup";
import { SettingOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import Table from "react-bootstrap/Table";
import { createDetail, listDetailCase } from "../api/detailCase";
import axios from "axios";
import SweetAlert from "sweetalert2";

const SettingProblem = () => {
  const [dataProblem, setDataProblem] = useState([]);

  const [values, setValues] = useState({
    type: "",
    name: "",
  });

  const { type, name } = values;
  const inputValue = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
    console.log(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    listDetailCase()
      .then((res) => setDataProblem(res.data))
      .catch((err) => console.log(err));
  };

  //กำหนด uniqueTypes โดยใช้ set เพื่อหาข้อมูล หากมีข้อมูลซ้ำก็จะแสดงเพียงข้อมูลเดียว
  // ใช้ Set เพื่อสร้างเซตของ type ที่ไม่ซ้ำกัน โดยใช้ [...new Set(array)] ซึ่งจะแปลง array เป็น Set เพื่อลบองค์ประกอบที่ซ้ำกัน และใช้ spread operator (...) เพื่อแปลงเซตกลับเป็นอาร์เรย์
  // ดังนั้น, ในบรรทัด const uniqueTypes = [...new Set(dataProblem.map((items) => items.type))]:
  // dataProblem.map((items) => items.type) สร้างอาร์เรย์ที่ประกอบด้วย type ทั้งหมดใน dataProblem
  // new Set(dataProblem.map((items) => items.type)) สร้างเซตที่ประกอบด้วย type ที่ไม่ซ้ำกันจากอาร์เรย์ข้างต้น
  // [...new Set(dataProblem.map((items) => items.type))] แปลงเซตกลับเป็นอาร์เรย์ เพื่อให้ uniqueTypes เก็บค่า type ที่ไม่ซ้ำกันใน dataProblem

  const uniqueTypes = [...new Set(dataProblem.map((items) => items.type))];

  const typeName = uniqueTypes.map((type) => {
    return type;
  });

  const submitForm = async (e) => {
    e.preventDefault();
    createDetail(values).then((res) => {
      console.log(res);
      SweetAlert.fire("แจ้งเตือน", "เพิ่มข้อมูลสำเร็จ", "success");
      setValues({ ...values, type: "", name: "" });
    }).catch((err)=> {
       alert(err.response.data.message);
    })
     
    
  };

  return (
    <div className="from-control">
      <Card>
        <FormControl size="small" sx={{ minWidth: "100%" }}>
          <InputLabel htmlFor="grouped-select">Type</InputLabel>
          <Select
            defaultValue=""
            id="grouped-select"
            label="Grouping"
            onChange={inputValue("type")}
            name="type"
          >
            <MenuItem value="">
              <em>--กรุณาเลือก Type--</em>
            </MenuItem>
            {typeName.map((item, index) => (
              <MenuItem value={item} key={index}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <InputGroup className="mt-3">
          <InputGroup.Text id="inputGroup-sizing-default">
            รายละเอียด
          </InputGroup.Text>
          <Form.Control
            name="name"
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            onChange={inputValue("name")}
          />
        </InputGroup>
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
