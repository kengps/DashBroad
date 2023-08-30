import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
// import { sendCase } from "../api/case";
import { Box } from "@mui/material";
import { Input, Row, Col } from "antd";
import moment from "moment/min/moment-with-locales";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SweetAlert from "sweetalert2";
const { TextArea } = Input;

import { useStore, useStoreSetting } from "../service/zustand/storeCase";
import DetailInput from "../views/formcase/DetailInput";
import GameInput from "../views/formcase/GameInput";
import ProblemInput from "../views/formcase/ProblemInput";
import ReporterInput from "../views/formcase/ReporterInput";
import WalletInput from "../views/formcase/WalletInput";

const navDropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1px",
};

const FormComponent = () => {

  const { getEditors } = useStoreSetting()

  const dataEditor = useStoreSetting((state) => state.resEditor.resultData);

  const nameEditor = dataEditor ? dataEditor.filter((item) => item.select === true) : []
  const editorSelect = nameEditor.map((item) => { return item.username })

  const editorSelect2 = editorSelect.length > 0 ? nameEditor[0].username : '';

  useEffect(() => {
    fetchData();
    getEditors();

  }, []);

  //==============================================================================

  const fetchData = useStore((state) => state.fetchData)
  //Request post


  const createCase = useStore((state) => state.createCase)

  //Requestget
  const data = useStore((state) => state.cases)

  const newDataType = data.map((item) => { return item.data.type.types })
  const typeProb = ([...new Set(newDataType)]).filter(Boolean);

  //Type 
  const problemType = data.filter((item) => typeProb[0].includes(item.data.type.types));
  const problemTypeName = new Set(problemType.map((item) => { return item.data.type.name }))
  const newProbType = [...problemTypeName]


  const { user } = useSelector((state) => ({ ...state }));
  const getUser = user.username;
  const navigate = useNavigate();
  const [values, setValues] = useState({
    reporter: "",
    problem: "",
    problemDetail: "",
    detail: "",
    campgame: "",
    wallet: "",
    editors: editorSelect2,
    recorder: getUser,
  });

  const {
    reporter,
    problemDetail,
    problem,
    detail,
    campgame,
    wallet,
    recorder,
    // editors
  } = values;

  const timestamps = moment().format("LLL"); // June 26, 2023 4:36 PM
  const caseDataForExcel = {
    reporter,
    problemDetail,
    problem,
    detail,
    campgame,
    wallet,
    recorder,
    timestamps,
    // editors
  };
  const inputValue = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
    setCampGames(e.target.value);
    setSelectedDetail(e.target.value);


  };

  const submitForm = async (e) => {

    e.preventDefault();

    try {
      // ไม่ฟรีแล้ว
      //await axios.post("https://sheet.best/api/sheets/490e1f2e-21aa-4b61-9d12-a52da3780268", caseDataForExcel);
      const res = await createCase(values)

      // setValues({
      //   reporter: "",
      //   problem: "",
      //   problemDetail: "",
      //   detail: "",
      //   campgame: "",
      //   wallet: "",
      // });
      //กำหนดให้เป็นค่าว่างหลังจากกดตกลง
      setValues(Object.fromEntries(Object.keys(values).map(key => [key, ""])));


      SweetAlert.fire("แจ้งเตือน", res.message, "success");
      setTimeout(() => {
        navigate("/dashboard/listunresolve");
      }, 2000);
    } catch (error) {

      console.log('เกิดอะไรขึ้น', error);
    }
  };

  const [faculty, setFaculty] = useState("");

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value); // Reset major when faculty changes
  };
  //* state ของการเลือก ประเภทของปัญหา
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  //* state ของการเลือก รายละเอียดของปัญหา
  const [selectedDetail, setSelectedDetail] = useState("");
  //* state ของการเลือกค่ายเกม
  const [campGames, setCampGames] = useState("");

  return (
    <div className="mt-2">

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Form onSubmit={submitForm}>

          <ReporterInput inputValue={inputValue} reporter={reporter} />

          <ProblemInput
            selectedOption={selectedOption}
            inputValue={inputValue}
            handleChange={handleChange}
            values={values}
          />

          <DetailInput inputValue={inputValue} detail={detail} />

          <GameInput navDropdownItemStyle={navDropdownItemStyle}
            inputValue={inputValue}
            values={values}
            typeProb={typeProb}
            data={data}
            selectedOption={selectedOption}
            newProbType={newProbType}
          />

          <WalletInput navDropdownItemStyle={navDropdownItemStyle}
            inputValue={inputValue}
            wallet={wallet}
            typeProb={typeProb}
            data={data}
          />
          {/* <Input

            defaultValue={editorSelect}
            value={editorSelect}
            //onChange={inputValue("editors")}
            name="editors"
            
          /> */}
          <hr />
          <Row justify={"end"}>
            <Col>
              <Button
                type="submit"
                className="btn btn-primary"
                value="Submit"
                style={{ marginLeft: 320 }}
              >
                บันทึก
              </Button>

            </Col>
          </Row>

        </Form>
      </Box>

    </div>
  );
};

export default FormComponent;
