import React from 'react'
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
  
const WalletInput = ({navDropdownItemStyle,inputValue,wallet ,typeProb, data}) => {

    //Platforms
  const platformsDetail = data.filter((item) => typeProb[2].includes(item.data.type.types));
  const newPlatformsDt = new Set(platformsDetail.map((item) => { return item.data.detail.name }))
  const NewDataPlatform = [...newPlatformsDt]
  return (
      
    <div className="mt-3">
    <InputGroup className="mt-3" style={navDropdownItemStyle}>
      <InputGroup.Text
        className=""
        style={{
          fontSize: "18px",
          fontFamily: "Times New Roman",
          height: "2.5rem",
        }}
      >
        แพลตฟอร์ม
      </InputGroup.Text>
      <FormControl size="small" sx={{ m: 1, minWidth: "75%" }}>
        <InputLabel htmlFor="grouped-select">แพลตฟอร์ม</InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          label="Grouping"
          onChange={inputValue("wallet")}
          value={wallet}
        >
          <MenuItem value="">
            <em>--กรุณาเลือกแพลตฟอร์ม--</em>
          </MenuItem>
          {NewDataPlatform.map((items, index) => (
            <MenuItem key={index} value={items}>
              {items}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </InputGroup>
  </div>
  )
}

export default WalletInput