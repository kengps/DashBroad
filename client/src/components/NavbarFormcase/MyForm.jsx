import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form'
import { Form, InputGroup } from "react-bootstrap";
import { sendCase } from "../api/case";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

const FormComponent = () => {
  const [values, setValues] = useState({
    reporter: "",
    typeproblem: "",
    detail: "",
    campgame: "",

    editors: "",
  });

  const { reporter, typeproblem, detail, campgame, editors } = values;

  const inputValue = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });

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
        alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API}/createcase`,
        {
          reporter,
          typeproblem,
          detail,
          campgame,
        }
      );
      alert("Success");
      console.log("นะจ้ะ", response.data);
    } catch (error) {
      alert(error);
    }
  };

  // const handleChange = (event) => {
  //   console.log("selected", event);
  //   //  console.log('selected', name);
  // };
  const [faculty, setFaculty] = useState("");

  const handleFacultyChange = (e) => {
    setFaculty(e.target.value); // Reset major when faculty changes
  };

  return (
    <div>
      <Form onSubmit={submitForm}>
        <div>
          <InputGroup>
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
            <Form.Select
              aria-label="reporter"
              onChange={inputValue("reporter")}
              value={reporter}
            >
              <option value="emtpy">
                ชื่อลูกค้าที่ติดต่อมาหรือ User หรือ Pr
              </option>
              <option value="bioclub">BioClub</option>
              <option value="prettygaming">PrettyGaming168</option>
              <option value="biobet789">BioBet789</option>
              <option value="bioslot168">BioSlot168</option>
              <option value="biogamingasia">BioGaming.Asia</option>
              <option value="lsmpretty">lsm-Pretty</option>
              <option value="apibiofun">API spg168 & biofun</option>
              <option value="othor">อื่นๆ</option>
            </Form.Select>
          </InputGroup>
          {reporter === "othor" && (
            <InputGroup>
              <InputGroup.Text>ระบุ</InputGroup.Text>

              <Form.Control
                className="form-control"
                name="reporter"
                onChange={inputValue("reporter")}
                value=""
              />
            </InputGroup>
          )}
        </div>

        {/* ฟอร์มประเภทของปัญหา */}

        <div>
          <InputGroup className="mt-2 pt-2">
            <div>
              <Form.Check
                type="radio"
                value="biogaming"
                checked={faculty === "biogaming"}
                onChange={handleFacultyChange}
                label="หลังบ้าน bio "
                name="It"
                className="m-md-1"
              />
            </div>
            <div>
              <Form.Check
                type="radio"
                name="faculty"
                value="checkmoney"
                checked={faculty === "checkmoney"}
                onChange={handleFacultyChange}
                label="ตรวจสอบรายการเงินด่วน"
                aria-label="checkmoney"
                className="m-md-1"
              />
            </div>

            <div>
              <Form.Check
                type="radio"
                name="faculty"
                value="general"
                checked={faculty === "general"}
                onChange={handleFacultyChange}
                label="เรื่องทั่วไป"
                aria-label="general"
                className="m-md-1"
              />
            </div>
            <div>
              <Form.Check
                type="radio"
                name="faculty"
                value="teambackhome"
                checked={faculty === "teambackhome"}
                onChange={handleFacultyChange}
                label="฿-biogaming-ทีมงานหลังบ้าน"
                aria-label="teambackhome"
                className="m-md-1"
              />
            </div>
            <div>
              <Form.Check
                type="radio"
                name="faculty"
                value="lsmpretty"
                checked={faculty === "lsmpretty"}
                onChange={handleFacultyChange}
                label="กลุ่ม lsm-Pretty AMBPOKER"
                aria-label="lsmpretty"
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
        {faculty === "checkmoney" && (
          <div>
            <Form.Select value={editors} onChange={inputValue("editors")}>
              <option value="">-- Select Wallet --</option>
              <option value="Computer1">Computer1</option>
              <option value="Computer2">Computer2</option>
              <option value="information-technology">
                Information Technology
              </option>
            </Form.Select>
          </div>
        )}
        {faculty === "general" && (
          <div>
            <Form.Select value={editors} onChange={inputValue("editors")}>
              <option value="">-- Select Wallet --</option>
              <option value="Computer3">Computer3</option>
              <option value="Computer4">Computer4</option>
              <option value="information-technology">
                Information Technology
              </option>
            </Form.Select>
          </div>
        )}
        {faculty === "teambackhome" && (
          <div>
            <Form.Select value={editors} onChange={inputValue("editors")}>
              <option value="">-- Select Wallet --</option>
              <option value="Computer5">Computer5</option>
              <option value="Computer6">Computer6</option>
              <option value="information-technology">
                Information Technology
              </option>
            </Form.Select>
          </div>
        )}
        {faculty === "lsmpretty" && (
          <div>
            <Form.Select value={editors} onChange={inputValue("editors")}>
              <option value="">-- Select Wallet --</option>
              <option value="Computer7">Computer7</option>
              <option value="Computer7">Computer8</option>
              <option value="information-technology">
                Information Technology
              </option>
            </Form.Select>
          </div>
        )}

        {/* <div className="mt-3">
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
        </div> */}
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
            <Form.Control
              className="form-control input-lg"
              name="typeproblem"
              onChange={inputValue("typeproblem")}
              value={typeproblem}
            />
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
            <Form.Control
              className="form-control input-lg"
              name="detail"
              onChange={inputValue("detail")}
              value={detail}
            />
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
            <Form.Control
              className="form-control input-lg"
              name="campgame"
              onChange={inputValue("campgame")}
              value={campgame}
            />
          </InputGroup>
        </div>
        {/* <div className="mt-3">
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
        </div> */}
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
      {/* //test 5555555555555555555555555555555555 */}
    </div>
  );
};

export default FormComponent;
