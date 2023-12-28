import React, { useRef } from 'react'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";


import { Space } from "antd";

const ReporterInput = ({ inputValue, reporter, reporterRef, textEmpty }) => {




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
                        ผู้แจ้งปัญหา
                    </InputGroup.Text>
                    <Form.Control
                        className="form-control input-lg"
                        name="reporter"
                        onChange={inputValue("reporter")}
                        value={reporter}
                    // ref={reporterRef}
                    />
                </InputGroup>

                {reporter.length === 0 ? textEmpty && (<span style={{ color: 'red', alignSelf: 'center' }}>* โปรดระบุ</span>) : ''}
            </Space>
        </div >

    )
}

export default ReporterInput