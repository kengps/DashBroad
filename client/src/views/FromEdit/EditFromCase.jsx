import React, { useState } from 'react'
import ReporterInput from '../formcase/ReporterInput'
import ProblemInput from '../formcase/ProblemInput'
import DetailInput from '../formcase/DetailInput'
import PictureInput from '../picture/PictureInput'
import GameInput from '../formcase/GameInput'
import WalletInput from '../formcase/WalletInput'


import { Input, Row, Col } from "antd";
import Button from "react-bootstrap/Button";
import { Box } from "@mui/material";
import { Form } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
const { TextArea } = Input;
import TextField from '@mui/material/TextField';
import { Checkbox } from 'antd';


const EditFromCase = ({ handleChangeDetail, handleOk2, textEmpty, onChangeCheckBox, data, notDetail }) => {
    const [inputValue, setInputValue] = useState(data.detail);


    return (
        <div className="mt-2">

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Form
                    onSubmit={handleOk2}
                    encType="multipart/form-data">

                    <InputGroup>
                        <InputGroup.Text>รายละเอียด</InputGroup.Text>
                    </InputGroup>
                    <TextArea
                        rows={5}
                        type="text"
                        name="detail"
                        onChange={handleChangeDetail}
                        // value={inputValue}
                        disabled={notDetail}
                    />
                    <Checkbox onChange={onChangeCheckBox} style={{ color: 'red', fontWeight: "bold" }}>ไม่ต้องการแก้ไขรายละเอียด</Checkbox>
                    <br />
                    {!notDetail ? textEmpty && (<span style={{ color: 'red' }}>กรุณากรอกรายละเอียด</span>) : ''}

                    <br />
                    <TextField type='file' name='file' inputProps={{ accept: 'image/*' }} onChange={handleChangeDetail}
                    // onChange={inputValue("file")} 
                    />
                    /
                    {/* <Button
                        type="submit"
                        className="btn btn-primary"
                        value="Submit"
                        style={{ marginLeft: 320 }}
                        // disabled={isButtonDisabled}
                    >
                        บันทึก
                    </Button> */}
                    {/* <ReporterInput 
        // inputValue={inputValue} reporter={reporter} reporterRef={reporterRef} 
        />

        <ProblemInput
        //   selectedOption={selectedOption}
        //   inputValue={inputValue}
        //   handleChange={handleChange}
        //   values={values}
        //   newProbType2={newProbType2}
        />

        <DetailInput
        //  inputValue={inputValue} detail={detail} 
         />


        <PictureInput 
        // inputValue={inputValue} imageURLs={imageURLs}
         /
        >



        <GameInput 
        // navDropdownItemStyle={navDropdownItemStyle}
        //   inputValue={inputValue}
        //   values={values}
        //   typeProb={typeProb}
        //   data={data2}
        //   selectedOption={selectedOption}
        //   newProbType={newProbType}
        />

        <WalletInput 
        // navDropdownItemStyle={navDropdownItemStyle}
        //   inputValue={inputValue}
        //   wallet={wallet}
        //   typeProb={typeProb}
        //   data={data2}
        />

        <Input
        //   type="hidden"
        //   defaultValue={editorSelect}
        //   value={editorSelect}
        //   //onChange={inputValue("editors")}
        //   name="editors"
        //   disabled

        />
        <hr />
        <Row justify={"end"}>
          <Col>
            <Button
              type="submit"
              className="btn btn-primary"
              value="Submit"
              style={{ marginLeft: 320 }}
            //   disabled={isButtonDisabled}
            >
              บันทึก
            </Button>

          </Col>
        </Row> */}

                </Form>
            </Box>

        </div>
    )
}

export default EditFromCase