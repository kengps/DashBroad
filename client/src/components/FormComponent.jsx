import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form'
import { Form, InputGroup, FormGroup, FormLabel } from "react-bootstrap";
import { sendCase } from "../api/case";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

import { toast } from "react-toastify";
import SweetAlert from "sweetalert2";

import AgentName from "./NavbarFormcase/AgentName";
import CampGameAndEditor from "./NavbarFormcase/CampGameAndEditor";
import Details from "./NavbarFormcase/Details";
import ProblemType from "./NavbarFormcase/ProblemType";

import { Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
const { TextArea } = Input;

// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import ListSubheader from '@mui/material/ListSubheader';
// import FormControl from '@mui/material/FormControl';
import Select1 from "@mui/material/Select";

import {
  InputLabel,
  MenuItem,
  ListSubheader,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

const navDropdownItemStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1px",
};

const FormComponent = () => {
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

  const { reporter, problemDetail, problem, detail, campgame, wallet } = values;

  const inputValue = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
    setCampGames(e.target.value);
    setSelectedDetail(e.target.value);
    console.log(e.target.value);
    //console.log(name);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    console.log("อิอิ", values);
    console.log("url", `${import.meta.env.VITE_REACT_APP_API}/createcase`);

    sendCase(values)
      .then((res) => {
        console.log("ได้อะไร", res);
        // toast.success(res.data.message);
        setValues({
          reporter: "",
          problem: "",
          problemDetail: "",
          detail: "",
          campgame: "",
          wallet: "",
        });
        SweetAlert.fire("แจ้งเตือน", res.data.message, "success");

        setTimeout(() => {
          navigate("/dashboard/listunresolve");
        }, 2000);
      })

      .catch((err) => {
        console.log(err);
      });
    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_REACT_APP_API}/createcase`,
    //     {
    //       reporter,
    //       typeproblem,
    //       detail,
    //       campgame,
    //     }
    //   );
    //   alert('Success');
    //   console.log('นะจ้ะ',response.data);
    // } catch (error) {
    //     alert(error)
    // }
  };

  // const handleChange = (event) => {
  //   console.log("selected", event);
  //   //  console.log('selected', name);
  // };
  const [faculty, setFaculty] = useState("");

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value); // Reset major when faculty changes
  };
  // state ของการเลือก ประเภทของปัญหา
  const [selectedOption, setSelectedOption] = useState("");
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };
  // state ของการเลือก รายละเอียดของปัญหา
  const [selectedDetail, setSelectedDetail] = useState("");
  const handleChangeDetail = (event) => {
    setSelectedDetail(event.target.value);
    console.log(event.target.value);
  };
  // state ของการเลือกค่ายเกม
  const [campGames, setCampGames] = useState("");

  const handleChangeCampGame = (event) => {
    setCampGames(event.target.value);
    console.log(event.target.value);
  };
  //ประเภทของปัญหา
  const typeProblem = [
    { id: "1", name: "หลังบ้าน bio" },
    { id: "2", name: "กลุ่ม lsm-Pretty Gaming" },
    { id: "3", name: "ขอ API" },
    { id: "4", name: "เรื่องทั่วไป" },
  ];

  const detailProblem = [
    { id: "1", name: "ตรวจสอบ Report" },
    { id: "2", name: "รายการเล่นค้าง" },
    { id: "3", name: "Credit ไม่ถูกต้อง" },
    { id: "4", name: "Report ไม่ถูกต้อง" },
    { id: "5", name: "Report ไม่อัปเดต" },
    { id: "6", name: "ยกเลิกตั๋วแต่ไม่คืนเครดิต" },
    { id: "7", name: "Outstanding ไม่พบข้อมูล" },
    { id: "8", name: "อื่นๆ" },
  ];

  const detailProblemTwo = [
    { id: "1", name: "ตรวจสอบรายการเล่น" },
    { id: "2", name: "ขอ Production Key" },
    { id: "3", name: "สอบถาม" },
  ];

  const selectCampGames = [
    { id: "1", name: "Sport" },
    { id: "2", name: "SA Gaming" },
    { id: "3", name: "Sexy Baccarat" },
    { id: "4", name: "Dream Gaming" },
    { id: "5", name: "Pretty Gaming" },
    { id: "6", name: "PG Slot" },
    { id: "7", name: "SpiniX" },
    { id: "8", name: "Evoplay" },
    { id: "9", name: "Slot XO" },
    { id: "10", name: "Live22" },
    { id: "11", name: "Joker" },
    { id: "12", name: "DragoonSoft" },
    { id: "13", name: "Biogame & AMB" },
    { id: "14", name: "BioFishing" },
    { id: "15", name: "VwinLotto" },
  ];

  const selectPlatform = [
    { id: "1", name: "Biogaming" },
    { id: "2", name: "BioClub" },
    { id: "3", name: "PrettyGaming168" },
    { id: "4", name: "BioBet789" },
  ];
  const handleChange1 = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>
      <Form onSubmit={submitForm}>
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
              {typeProblem.map((items, index) => (
                <option key={index}>{items.name}</option>
              ))}
            </Form.Select>

            {selectedOption === "หลังบ้าน bio" && (
              <Form.Select
                aria-label="test"
                value={values.problemDetail}
                //onChange={handleChangeDetail}
                onChange={inputValue("problemDetail")}
              >
                <option key={9999} value="">
                  --กรุณาเลือกรายละเอียดปัญหา--
                </option>
                {detailProblem.map((items, index) => (
                  <option key={index}>{items.name}</option>
                ))}
              </Form.Select>
            )}
            {selectedOption === "กลุ่ม lsm-Pretty Gaming" && (
              <Form.Select
                aria-label="test"
                value={values.problemDetail}
                //onChange={handleChangeDetail}
                onChange={inputValue("problemDetail")}
              >
                <option key={9999} value="">
                  --กรุณาเลือกรายละเอียดปัญหา--
                </option>
                {detailProblemTwo.map((items, index) => (
                  <option value={items.name} key={index}>
                    {items.name}
                  </option>
                ))}
              </Form.Select>
            )}
          </InputGroup>
        </div>

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
            {/* <Form.Control
              className="form-control input-lg"
              name="detail"
              onChange={inputValue("detail")}
              value={detail}
            /> */}
          </InputGroup>
        </div>
        {selectedOption !== "ขอ API" && selectedOption !== "เรื่องทั่วไป" && (
          <div className="mt-3">
            <InputGroup className="mt-3" style={navDropdownItemStyle}>
              <InputGroup.Text
                style={{
                  fontSize: "18px",
                  fontFamily: "Times New Roman",
                  height: "2.5rem",
                }}
              >
                ค่ายเกม
              </InputGroup.Text>

              <FormControl
                //variant="standard"
                size="small"
                sx={{ m: 1, minWidth: 400 }}
              >
                <InputLabel htmlFor="grouped-select">ค่ายเกม</InputLabel>
                <Select1
                  defaultValue=""
                  id="grouped-select"
                  label="Grouping"
                  value={values.campgame}
                  onChange={inputValue("campgame")}
                >
                  <MenuItem value="">
                    <em>--กรุณาเลือกค่ายเกม--</em>
                  </MenuItem>
                  <ListSubheader
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                      fontSize: "15px",
                      textDecoration: "underline",
                    }}
                  >
                    Sport
                  </ListSubheader>
                  {selectCampGames.map((items, index) =>
                    items.name === "Sport" ? (
                      <MenuItem key={index} value={items.name}>
                        {items.name}
                      </MenuItem>
                    ) : null
                  )}
                  <ListSubheader
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                      fontSize: "15px",
                      textDecoration: "underline",
                    }}
                  >
                    Baccarat
                  </ListSubheader>
                  {selectCampGames.map((items, index) =>
                    items.name === "Sexy Baccarat" ||
                    items.name === "SA Gaming" ||
                    items.name === "Pretty Gaming" ||
                    items.name === "Dream Gaming" ? (
                      <MenuItem key={index} value={items.name}>
                        {items.name}
                      </MenuItem>
                    ) : null
                  )}
                  <ListSubheader
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                      fontSize: "15px",
                      textDecoration: "underline",
                    }}
                  >
                    Slot
                  </ListSubheader>
                  {selectCampGames.map((items, index) =>
                    items.name === "PG Slot" ||
                    items.name === "SpiniX" ||
                    items.name === "Evoplay" ||
                    items.name === "Slot XO" ||
                    items.name === "Joker" ||
                    items.name === "Live22" ||
                    items.name === "DragoonSoft" ? (
                      <MenuItem key={index} value={items.name}>
                        {items.name}
                      </MenuItem>
                    ) : null
                  )}
                  <ListSubheader
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                      fontSize: "15px",
                      textDecoration: "underline",
                    }}
                  >
                    Biogame & AMB
                  </ListSubheader>
                  {selectCampGames.map((items, index) =>
                    items.name === "Biogame & AMB" ||
                    items.name === "BioFishing" ? (
                      <MenuItem key={index} value={items.name}>
                        {items.name}
                      </MenuItem>
                    ) : null
                  )}
                  <ListSubheader
                    style={{
                      fontWeight: "bold",
                      color: "gray",
                      fontSize: "15px",
                      textDecoration: "underline",
                    }}
                  >
                    Lotto
                  </ListSubheader>
                  {selectCampGames.map((items, index) =>
                    items.name === "VwinLotto" ? (
                      <MenuItem key={index} value={items.name}>
                        {items.name}
                      </MenuItem>
                    ) : null
                  )}
                </Select1>
              </FormControl>
            </InputGroup>
          </div>
        )}
        <div className="mt-3">
          <InputGroup className="mt-3" style={navDropdownItemStyle}>
            <InputGroup.Text
              className=""
              style={{
                fontSize: "18px",
                fontFamily: "Times New Roman",
                height: "2.5rem",
              }}
            >
              แพลตฟอร์ม
            </InputGroup.Text>
            <FormControl size="small" sx={{ m: 1, minWidth: "75%" }}>
              <InputLabel htmlFor="grouped-select">แพลตฟอร์ม</InputLabel>
              <Select1
                defaultValue=""
                id="grouped-select"
                label="Grouping"
                onChange={inputValue("wallet")}
                value={wallet}
              >
                <MenuItem value="">
                  <em>--กรุณาเลือกแพลตฟอร์ม--</em>
                </MenuItem>
                {/* <option>Open this select menu</option>
              <option value="bioclub">bioclub</option>
              <option value="bioone">bioone</option>
              <option value="biok">biok</option> */}
                <ListSubheader
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                    fontSize: "15px",
                    textDecoration: "underline",
                  }}
                >
                  Biogaming
                </ListSubheader>
                {selectPlatform.map((items, index) =>
                  items.name === "Biogaming" ? (
                    <MenuItem key={index} value={items.name}>
                      {items.name}
                    </MenuItem>
                  ) : null
                )}
                <ListSubheader
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                    fontSize: "15px",
                    textDecoration: "underline",
                  }}
                >
                  Wallet
                </ListSubheader>
                {selectPlatform.map((items, index) =>
                  items.name === "BioClub" ||
                  items.name === "PrettyGaming168" ||
                  //items.name === "Pretty Gaming" ||
                  items.name === "BioBet789" ? (
                    <MenuItem key={index} value={items.name}>
                      {items.name}
                    </MenuItem>
                  ) : null
                )}
              </Select1>
            </FormControl>
          </InputGroup>
        </div>

        <div>
          {/* <div>
            <InputGroup className="mt-2 pt-2">
              <div>
                <Form.Check
                  type="radio"
                  value="biogaming"
                  checked={faculty === "biogaming"}
                  onChange={handleFacultyChange}
                  label="Biogaming "
                  name="It"
                  className="m-md-1"
                />
              </div>
              <div>
                <Form.Check
                  type="radio"
                  name="faculty"
                  value="engineering"
                  checked={faculty === "engineering"}
                  onChange={handleFacultyChange}
                  label="Wallet"
                  aria-label="Engineering"
                  className="m-md-1"
                />
              </div>
            </InputGroup>
          </div> */}
          {/* {faculty === "biogaming" && (
            <div>
              <Form.Select value={editors} onChange={inputValue("editors")}>
                <option value="">-- Select Biogaming --</option>
                <option value="computer-science">Computer Science</option>
                <option value="information-system">Information System</option>
                <option value="information-technology">
                  Information Technology
                </option>
              </Form.Select>
            </div>
          )}
          {faculty === "engineering" && (
            <div>
              <Form.Select value={editors} onChange={inputValue("editors")}>
                <option value="">-- Select Wallet --</option>
                <option value="computer-science">111111111111</option>
                <option value="information-system">222222222222222</option>
                <option value="information-technology">
                  Information Technology
                </option>
              </Form.Select>
            </div>
          )} */}
        </div>
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
      {/* //test 5555555555555555555555555555555555 */}
    </div>
  );
};

export default FormComponent;
