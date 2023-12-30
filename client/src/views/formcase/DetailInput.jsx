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
      <Space direction="horizontal" size={16}>

        <InputGroup className="mt-3">
          <InputGroup.Text
            style={{
              fontSize: "18px",
              fontFamily: "Times New Roman",
            }}
          >
            รายละเอียด
          </InputGroup.Text>
          {/* <TextArea
            rows={5}
            name="detail"
            onChange={inputValue("detail")}
            value={detail}
          /> */}
        </InputGroup>
        {detail.length === 0 ? textEmpty && (<span style={{ color: 'red', alignSelf: 'center' }}>* โปรดระบุ</span>) : ''}
      </Space>
      <ReactQuill
        theme="snow"
        name="detail"
        onChange={(content, delta, source, editor) =>
          inputValue('detail')({
            target: { name: 'detail', value: content },
          })
        }
        value={detail}
      />

    </div>
  )
}

export default DetailInput