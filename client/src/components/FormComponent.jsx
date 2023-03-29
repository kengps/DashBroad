import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form'
import { Form, InputGroup } from "react-bootstrap";
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

import { Input } from "antd";
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
        SweetAlert.fire('แจ้งเตือน' , res.data.message, 'success')
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
            <TextArea
              className="form-control input-lg"
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
            <Form.Control
              className="form-control input-lg"
              name="campgame"
              onChange={inputValue("campgame")}
              value={campgame}
            />
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
