import React, { useRef } from 'react'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import TextField from '@mui/material/TextField';

import { Space } from "antd";

const ReporterInput = ({ inputValue, reporter, reporterRef, textEmpty }) => {




    return (
        <div className="mt-3">
            {/* <Space direction="horizontal" size={16}> */}

            {/* <InputGroup.Text
                        style={{
                            fontSize: "18px",
                            fontFamily: "Times New Roman",
                        }}
                    >
                        ผู้แจ้งปัญหา
                    </InputGroup.Text> */}
            <Form.Label style={{ fontWeight: "bold", color: 'black' }}>ผู้แจ้งปัญหา</Form.Label>

            {reporter.length === 0 ? textEmpty && (<span style={{ color: 'red', alignSelf: 'center' }}> * โปรดระบุ</span>) : ''}

            <Form.Control
                placeholder="รายละเอียด"
                className="form-control input-lg"
                name="reporter"
                onChange={inputValue("reporter")}
                value={reporter}
                style={{
                    fontStyle: 'italic',
                }}
            // ref={reporterRef}
            />
            {/* <TextField
                fullWidth
                label="ผู้แจ้งปัญหา"
                id="fullWidth"
                placeholder="ระบุผู้แจ้งปัญหา"
                name="reporter"
                onChange={inputValue("reporter")}
                value={reporter}
            /> */}

            {/* </Space> */}
        </div >

    )
}

export default ReporterInput