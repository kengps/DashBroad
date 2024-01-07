import React, { useState } from 'react'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import { Input, Select, Typography, Space } from "antd";
const { TextArea } = Input;


import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

import ReactQuill from 'react-quill';

const DetailInput = ({ inputValue, detail, textEmpty }) => {


  return (
    <div className="mt-3">
      {/* <Space direction="horizontal" size={16}> */}
      <Form.Label style={{ fontWeight: "bold", color: 'black' }}>รายละเอียด</Form.Label>
      {detail.length === 0 ? textEmpty && (<span style={{ color: 'red', alignSelf: 'center' }}> * โปรดระบุ</span>) : ''}
      <InputGroup >
        {/* <InputGroup.Text
          style={{
            fontSize: "18px",
            fontFamily: "Times New Roman",
          }}
        >
          รายละเอียด
        </InputGroup.Text> */}
        {/* <TextArea
            rows={5}
            name="detail"
            onChange={inputValue("detail")}
            value={detail}
          /> */}
      </InputGroup>

      {/* </Space> */}
      <ReactQuill
        className='editor-container'
        theme="snow"
        name="detail"
        onChange={(content, delta, source, editor) =>
          inputValue('detail')({
            target: { name: 'detail', value: content },
          })
        }
        placeholder='รายละเอียด'
        value={detail}

      />

    </div>
  )
}

export default DetailInput