import React from 'react'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import { Input, Select, Typography, Space } from "antd";
const { TextArea } = Input;

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
          <TextArea
            rows={5}
            name="detail"
            onChange={inputValue("detail")}
            value={detail}
          />
        </InputGroup>
        {detail.length === 0 ? textEmpty && (<span style={{ color: 'red', alignSelf: 'center' }}>* โปรดระบุ</span>) : ''}
      </Space>
    </div>
  )
}

export default DetailInput