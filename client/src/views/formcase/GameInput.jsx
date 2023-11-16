import React, { useEffect, useState } from 'react'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import { Input, Typography } from "antd";
import Select from "@mui/material/Select";
import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";



const GameInput = ({ values, inputValue, data, typeProb, navDropdownItemStyle, selectedOption, newProbType }) => {


  // Use useEffect to ensure this logic runs only once when typeProb changes
  const [campGameDetail, setCampGameDetail] = useState([]);

  useEffect(() => {
    if (typeProb && typeProb[1]) {
      // Game logic here...
      // const campGame2 = data.filter((item) => typeProb[1].includes(item.data.main.typeName));
      const campGame = data && data.filter((item) => typeProb[1] && item.data.main.typeName && typeProb[1].includes(item.data.main.typeName));
      const newCampGameDetail = campGame.map((item) => item.data.main.sub.name);
      setCampGameDetail(newCampGameDetail);

      // Additional logic based on typeProb[1]...
    }
  }, [typeProb, data]);

  //const campGameDetail = campGame.map((item) => { return item.data.main.sub.name })
  return (
    <div>          {/* ตรวจสอบว่า ถ้าค่าในselectedOption ไม่เตรงกับ newProbType array ที่ 1 จะให้แสดง campGameDetail */}

      <div className="mt-3">
        <InputGroup className="mt-3" style={navDropdownItemStyle}>
          <InputGroup.Text
            style={{
              fontSize: "18px",
              fontFamily: "Times New Roman",
              height: "2.5rem",
            }}
          >
            ค่ายเกม
          </InputGroup.Text>

          <FormControl size="small" sx={{ m: 1, minWidth: 400 }}>
            <InputLabel htmlFor="grouped-select">ค่ายเกม</InputLabel>
            <Select
              defaultValue=""
              id="grouped-select"
              label="Grouping"
              value={values.campgame}
              onChange={inputValue("campgame")}
            >
              <MenuItem value="">
                <em>--กรุณาเลือกค่ายเกม--</em>
              </MenuItem>
              {campGameDetail.map((items, index) => (
                <MenuItem key={index} value={items}>
                  {items}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputGroup>
      </div>


    </div>
  )
}

export default GameInput