import React from "react";
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import { useStore } from "../../service/zustand/storeCase";


const navDropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1px",
};

const ProblemInput = ({handleChange,inputValue ,selectedOption  ,values}) => {
    const data = useStore((state) => state.cases)
    const newDataType = data.map((item) => { return item.data.type.types })
    const typeProb = ([...new Set(newDataType)]).filter(Boolean);
  
    //Type 
    const problemType = data.filter((item) => typeProb[0].includes(item.data.type.types));
    const problemTypeName = new Set(problemType.map((item) => { return item.data.type.name }))
    const newProbType = [...problemTypeName]
  
  
  
    //Type Detail
    const newType = data.filter((item) => newProbType[0].includes(item.data.type.name))
    const problemTypeDetail = newType.map((item) => { return item.data.detail.name })
    //Type Detail lsm
    const newLsm = data.filter((item) => newProbType[1].includes(item.data.type.name))
    const problemTypeDetailLSM = newLsm.map((item) => { return item.data.detail.name })
    return (
        <div className="mt-3">
            <InputGroup className="mt-3" style={navDropdownItemStyle}>
                <InputGroup.Text
                    className=""
                    style={{
                        fontSize: "18px",
                        fontFamily: "Times New Roman",
                        height: "2.35rem",
                    }}
                >
                    ประเภทปัญหา
                </InputGroup.Text>
                <Form.Select
                    aria-label="test"
                    value={selectedOption}
                    //onChange={handleChange}
                    onChange={(e) => {
                        handleChange(e);
                        inputValue("problem")(e);
                    }}
                >
                    <option key={9999} value="">
                        --กรุณาเลือกประเภทปัญหา--
                    </option>
                    {newProbType.map((item, index) => (
                        <option key={index} value={item.name}>
                            {item}
                        </option>
                    ))}
                </Form.Select>

                {selectedOption === newProbType[0] && (
                    <Form.Select
                        aria-label="test"
                        value={values.problemDetail}
                        //onChange={handleChangeDetail}
                        onChange={inputValue("problemDetail")}
                    >
                        <option key={9999} value="">
                            --กรุณาเลือกรายละเอียดปัญหา--
                        </option>
                        {problemTypeDetail.map((items, index) => (
                            <option key={index}>{items}</option>
                        ))}
                    </Form.Select>
                )}
                {selectedOption === newProbType[1] && (
                    <Form.Select
                        aria-label="test"
                        value={values.problemDetail}
                        //onChange={handleChangeDetail}
                        onChange={inputValue("problemDetail")}
                    >
                        <option key={9999} value="">
                            --กรุณาเลือกรายละเอียดปัญหา--
                        </option>
                        {problemTypeDetailLSM.map((items, index) => (
                            <option value={items.name} key={index}>
                                {items}
                            </option>
                        ))}
                    </Form.Select>
                )}
            </InputGroup>
        </div>

    )
}

export default ProblemInput

