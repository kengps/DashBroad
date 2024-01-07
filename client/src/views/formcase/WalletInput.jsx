import React, { useEffect, useState } from 'react'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import { Input, Typography, Space } from "antd";
import Select from "@mui/material/Select";
import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";

const WalletInput = ({ navDropdownItemStyle, inputValue, wallet, typeProb, data, textEmpty }) => {

  const [NewDataPlatform, setNewDataPlatform] = useState([]);



  useEffect(() => {

    if (typeProb && typeProb[2]) {
      const platformsDetail = data.filter((item) => typeProb[2].includes(item.data.main.typeName));

      const newPlatformsDt = new Set(platformsDetail.map((item) => { return item.data.main.sub.detail }))
      const dataPlatform = [...newPlatformsDt]
      setNewDataPlatform(dataPlatform)
    }


  }, [typeProb, data])
  //Platforms

  return (

    <div>

      {/* <Space direction="horizontal" size={16}> */}
      <Form.Label style={{ fontWeight: "bold", color: 'black' }}> แพลตฟอร์ม</Form.Label>


      {wallet.length === 0 ? textEmpty && (<span style={{ color: 'red', alignSelf: 'center' }}> * โปรดระบุ</span>) : ''}


      <InputGroup style={navDropdownItemStyle}>
        {/* <InputGroup.Text
            className=""
            style={{
              fontSize: "18px",
              fontFamily: "Times New Roman",
              height: "2.5rem",
            }}
          >
            แพลตฟอร์ม
          </InputGroup.Text> */}
        <FormControl size="small" sx={{ minWidth: '100%' }}>
          <InputLabel htmlFor="grouped-select" style={{ fontStyle: 'italic', }}>แพลตฟอร์ม</InputLabel>


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

      {/* </Space> */}
    </div>
  )
}

export default WalletInput