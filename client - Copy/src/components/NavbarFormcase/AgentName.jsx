import React, { useState } from "react";

//import Form from 'react-bootstrap/Form'
import { Form, InputGroup } from "react-bootstrap";
// import { sendCase } from "../api/case";

const AgentName = () => {
  // const [faculty, setFaculty] = useState("");

  const [values, setValues] = useState({
    reporter: "",
   
  });

  const { reporter } = values;

  const inputValue = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });

    console.log(e.target.value);
    //console.log(name);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    console.log("อิอิ", values);
    console.log("url", `${import.meta.env.VITE_REACT_APP_API}/createcase`);
  };

  // const handleFacultyChange = (e) => {
  //   setFaculty(e.target.value); // Reset major when faculty changes
  // };

  return (
    <div>
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
            value={wallet}
          >
            <option>ชื่อลูกค้าที่ติดต่อมาหรือ User หรือ Pr</option>
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
        {wallet === "othor" && (
          <InputGroup>
            <InputGroup.Text>ระบุ</InputGroup.Text>

            <Form.Control name="othor" onChange={inputValue("othor")} />
          </InputGroup>
        )}
      </div>

      {/* <div>
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
        </Button> */}

      {/* //test 5555555555555555555555555555555555 */}
    </div>
  );
};

export default AgentName;
