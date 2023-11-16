import React from 'react'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import { Input, Select, Typography } from "antd";
const { TextArea } = Input;
const DetailInput = ({inputValue,detail}) => {

  
  return (
    <div className="mt-3">
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
          </div>
  )
}

export default DetailInput