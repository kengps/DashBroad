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

const FormComponent = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    reporter: "",
    typeproblem: "",
    detail: "",
    campgame: "",
    wallet: "",
    editors: "",
  });

  const { reporter, typeproblem, detail, campgame, wallet, editors } = values;

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
          typeproblem: "",
          detail: "",
          campgame: "",
          wallet: "",
          editors: "",
        });
        SweetAlert.fire("แจ้งเตือน", res.data.message, "success");
        
        setTimeout(() => {
          navigate("/listunresolve");
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
    { id: "2", name: "กลุ่ม lsm-Pretty Gaming-PG-Evoplay-AMBPOKER" },
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
                color: "blue",
                fontSize: "25px",
                fontFamily: "Times New Roman",
                backgroundColor: "lightblue",
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
          <InputGroup className="mt-3">
            <InputGroup.Text
              className=""
              style={{
                color: "blue",
                fontSize: "25px",
                fontFamily: "Times New Roman",
                backgroundColor: "lightblue",
              }}
            >
              ประเภทปัญหา
            </InputGroup.Text>
            <Form.Select
              aria-label="test"
              value={selectedOption}
              onChange={handleChange}
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
                value={values.typeproblem}
                //onChange={handleChangeDetail}
                onChange={inputValue("typeproblem")}
              >
                <option key={9999} value="">
                  --กรุณาเลือกรายละเอียดปัญหา--
                </option>
                {detailProblem.map((items, index) => (
                  <option key={index}>{items.name}</option>
                ))}
              </Form.Select>
            )}
            {selectedOption ===
              "กลุ่ม lsm-Pretty Gaming-PG-Evoplay-AMBPOKER" && (
              <Form.Select
                aria-label="test"
                value={values.typeproblem}
                //onChange={handleChangeDetail}
                onChange={inputValue("typeproblem")}
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
                color: "blue",
                fontSize: "25px",
                fontFamily: "Times New Roman",
                backgroundColor: "lightblue",
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

        <div className="mt-3">
          <InputGroup className="mt-3">
            <InputGroup.Text
              style={{
                color: "blue",
                fontSize: "25px",
                fontFamily: "Times New Roman",
                backgroundColor: "lightblue",
              }}
            >
              ค่ายเกม
            </InputGroup.Text>
            <Form.Select
              aria-label="test"
              value={values.campgame}
              //onChange={handleChangeCampGame}
              onChange={inputValue("campgame")}
            >
              <option key={9999} value="">
                --กรุณาเลือกค่ายเกม--
              </option>
              {selectCampGames.map((items, index) => (
                <option key={index} value={items.name}>{items.name}</option>
              ))}
            </Form.Select>
          </InputGroup>
        </div>
        <div className="mt-3">
          <InputGroup className="mt-3">
            <InputGroup.Text>wallet</InputGroup.Text>

            <Form.Select
              aria-label="Wallet"
              onChange={inputValue("wallet")}
              value={wallet}
            >
              <option>Open this select menu</option>
              <option value="bioclub">bioclub</option>
              <option value="bioone">bioone</option>
              <option value="biok">biok</option>
            </Form.Select>
          </InputGroup>
        </div>

        <div>
          <div>
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
          </div>
          {faculty === "biogaming" && (
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
          )}
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
