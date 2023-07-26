import React from 'react'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";




const ReporterInput = ({ inputValue, reporter }) => {

    return (
        <div className="mt-3">
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
                />
            </InputGroup>
        </div>

    )
}

export default ReporterInput