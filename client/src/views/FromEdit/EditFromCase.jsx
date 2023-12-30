import React, { useState } from 'react'
import ReporterInput from '../formcase/ReporterInput'
import ProblemInput from '../formcase/ProblemInput'
import DetailInput from '../formcase/DetailInput'
import PictureInput from '../picture/PictureInput'
import GameInput from '../formcase/GameInput'
import WalletInput from '../formcase/WalletInput'


import ReactQuill from 'react-quill';
import { Input, Row, Col } from "antd";
import Button from "react-bootstrap/Button";
import { Box } from "@mui/material";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
const { TextArea } = Input;
import TextField from '@mui/material/TextField';
import { Checkbox } from 'antd';


const EditFromCase = ({ handleChangeDetail, handleOk2, textEmpty, onChangeCheckBox, data, notDetail }) => {


  return (
    <div className="mt-2">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Form onSubmit={handleOk2} encType="multipart/form-data">
          <InputGroup>
            <InputGroup.Text>รายละเอียด</InputGroup.Text>
          </InputGroup>

          {/* <TextArea
            rows={5}
            type="text"
            name="detail"
            onChange={handleChangeDetail}
            disabled={notDetail}
          /> */}

          <ReactQuill
            theme="snow"
            name="detail"
            // onChange={(content) => handleChangeDetail({ target: { name: 'detail', value: content } })}
            onChange={(content) => handleChangeDetail('detail', content)}
            // disabled={notDetail}
            readOnly={notDetail}
          />

          <Checkbox onChange={onChangeCheckBox} style={{ color: 'red', fontWeight: 'bold' }}>
            ไม่ต้องการแก้ไขรายละเอียด
          </Checkbox>
          <br />
          {!notDetail ? textEmpty && <span style={{ color: 'red' }}>กรุณากรอกรายละเอียด</span> : ''}
          <br />
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={(file) => handleChangeDetail('file', file)}
            />
        </Form>
      </Box>
    </div>
  )
}

export default EditFromCase

