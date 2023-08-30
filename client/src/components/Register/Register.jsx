import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import SweetAlert from "sweetalert2";

import { BiHide, BiShow } from "react-icons/bi";
//import { Spin } from "antd";
import { toast } from "react-toastify";

import axios from "axios";
import { Typography } from "antd";
import UsernameInput from "../../views/register/UsernameInput";
import PasswordInput from "../../views/register/PasswordInput";
import { useStoreRegister } from "../../service/zustand/storeCase";

const Register = () => {
  //useStore
  const { resRegister, register } = useStoreRegister();

  const [state, setState] = useState({
    username: "",
    password: "",
    confirmpass: "",
  });

  //ตรวจสอบว่ารหัสผ่าน กับ คอนเฟิร์มตรงกันไหม
  const [confirmPasswordNotMatch, setConfirmPasswordNotMatch] = useState("");
  // ตรวจสอบว่ารหัสผ่านมีตัวเลข หรือ  มีการใส่ภาษาไทยไหม
  const [passwordError, setPasswordError] = useState("");
  // state ของการกดปุ่มให้ โชว์หรือปิด password
  const [showPassword, setShowPassword] = useState("");

  //การ destructuring ของ state
  const { username, password, confirmpass } = state;
  //console.log(register);

  //  const handleRegister = (e) => {

  //  setRegister({ ...register, [e.target.name]: e.target.value });

  //  }

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
    //console.log(name, "=", event.target.value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/;

    if (!regex.test(password)) {
      setPasswordError(
        "รหัสผ่านต้องเป็นภาษาอังกฤษเท่านั้นและต้องมีตัวเลขอย่างน้อย 1 ตัว"
      );
      return;
    }
    if (password !== confirmpass) {
      setConfirmPasswordNotMatch("รหัสผ่านไม่ตรงกัน");
    } else {
      try {
        await register(state)
        SweetAlert.fire("แจ้งเตือน", "สมัครสมาชิกสำเร็จ", "success");
        setState({ ...state, username: "", password: "", confirmpass: "" });
        setConfirmPasswordNotMatch("");


      } catch (err) {
        SweetAlert.fire("แจ้งเตือน", "มี username ในระบบแล้ว", 'warning');
      }
    }
  };
  // console.log(import.meta.env.VITE_REACT_API_APP);

  //function สำหรับการกดปุ่ม แสดงรหัสหรือซ่อนรหัส
  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="container">
      <div className="from-control">
        <Form onSubmit={submitForm}>
          <div>

            <UsernameInput inputValue={inputValue} username={username} />
            <PasswordInput confirmpass={confirmpass} showPassword={showPassword} password={password} inputValue={inputValue} toggleShowPassword={toggleShowPassword} />

            {passwordError && (
              <div
                className="error mt-1"
                style={{ color: "red ", fontFamily: "serif" }}
              >
                {passwordError}
              </div>
            )}
          </div>

          {confirmPasswordNotMatch && (
            <div
              className="error mt-1"
              style={{ color: "red ", fontFamily: "serif" }}
            >
              {confirmPasswordNotMatch}
            </div>
          )}
          <Button
            className="container mt-3 mx-auto"
            type="submit"
            disabled={state.password.length < 6 || state.confirmpass.length < 6}
          >
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
