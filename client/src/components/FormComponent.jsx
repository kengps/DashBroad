import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
// import { sendCase } from "../api/case";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";
import AgentName from "./NavbarFormcase/AgentName";
import CampGameAndEditor from "./NavbarFormcase/CampGameAndEditor";
import Details from "./NavbarFormcase/Details";
import ProblemType from "./NavbarFormcase/ProblemType";
import { Input, Select, Typography } from "antd";
const { TextArea } = Input;
import { useNavigate } from "react-router-dom";
import Select1 from "@mui/material/Select";
import moment from "moment/min/moment-with-locales";
import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  FormHelperText,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  notiAll,
  notiAllCaseCount,
  notiWaitCaseCount,
} from "../common/utils/Notification";
import { listDetailCase } from "../api/detailCase";
import { useStore } from "../service/zustand/storeCase";
import ReporterInput from "../views/formcase/ReporterInput";
import ProblemInput from "../views/formcase/ProblemInput";
import DetailInput from "../views/formcase/DetailInput";
import WalletInput from "../views/formcase/WalletInput";
import GameInput from "../views/formcase/GameInput";

const navDropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1px",
};

const FormComponent = () => {
  //API DetailCase
  const [dataProblemType, setDataProblemType] = useState([]);


  useEffect(() => {
    fetchData();

  }, []);

  //==============================================================================

  const fetchData = useStore((state) => state.fetchData)
  //Request post

  const { response } = useStore();

  const createCase = useStore((state) => state.createCase)

  //Requestget
  const data = useStore((state) => state.cases)

  const newDataType = data.map((item) => { return item.data.type.types })
  const typeProb = ([...new Set(newDataType)]).filter(Boolean);

  //Type 
  const problemType = data.filter((item) => typeProb[0].includes(item.data.type.types));
  const problemTypeName = new Set(problemType.map((item) => { return item.data.type.name }))
  const newProbType = [...problemTypeName]



  //Platforms
  const platformsDetail = data.filter((item) => typeProb[2].includes(item.data.type.types));
  const newPlatformsDt = new Set(platformsDetail.map((item) => { return item.data.detail.name }))
  const NewDataPlatform = [...newPlatformsDt]
  //============================================================================


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
  } = values;

  const timestamps = moment().format("LLL"); // June 26, 2023 4:36 PM

  const caseData = {
    reporter,
    problemDetail,
    problem,
    detail,
    campgame,
    wallet,
    recorder,
    timestamps,
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
      //await axios.post("https://sheet.best/api/sheets/490e1f2e-21aa-4b61-9d12-a52da3780268", caseData);
      await createCase(values)

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


      SweetAlert.fire("แจ้งเตือน", response.message, "success");
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
  const handleChangeDetail = (event) => {
    setSelectedDetail(event.target.value);
  };
  //* state ของการเลือกค่ายเกม
  const [campGames, setCampGames] = useState("");

  const handleChangeCampGame = (event) => {
    setCampGames(event.target.value);
  };
  //* ประเภทของปัญหา

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

          <div></div>
          <hr />
          <Button
            type="submit"
            className="btn btn-primary"
            value="Submit"
            style={{ marginLeft: 320 }}
          >
            บันทึก
          </Button>
        </Form>
      </Box>

    </div>
  );
};

export default FormComponent;
