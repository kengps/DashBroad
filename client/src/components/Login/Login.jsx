import React, { useState } from "react";
import { Stack, TextField, FormControl } from "@mui/material";
import { Navigate, json, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Form } from "react-bootstrap";
import { login } from "../../api/auth";
import SweetAl from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { EncryptStorage } from 'encrypt-storage';
import UsernameInput from "../../views/login/UsernameInput";
import RememberMeCheckbox from "../../views/login/RememberMeCheckbox";
import PasswordInput from "../../views/login/PasswordInput";


const Login = () => {
  //redux
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  const [rememberMe, setRememberMe] = useState(false);
  const encryptStorage = new EncryptStorage('SECRET-KEY')

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);

  };

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("expirationDate");

      if (token && expirationDate) {
        const currentTime = new Date().getTime();


        console.log('เวลาปัจจุบัน', currentTime);
        if (currentTime > expirationDate) {
          // JWT หมดอายุแล้ว ลบ localStorage
          localStorage.removeItem("token");
          localStorage.removeItem("expirationDate");
          // SweetAl.fire("แจ้งเตือน", "session หมดอายุแล้วกรุณา Login ใหม่อีกครั้ง", "info");
        } else {
          SweetAl.fire("แจ้งเตือน", "ท่านได้ทำการเข้าระบบอยู่แล้ว", "info");
          setTimeout(() => {
            redirect("/dashboard");
          }, 2000);
        }
      }
    };

    checkAuthStatus();
  }, [redirect]);
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {

    {
      setValue({
        ...value,
        [e.target.name]: e.target.value,
      });
    }
  };

  //todo: การตรวจสอบ Role
  const levelRole = (role) => {
    if (role === "admin" || role === "dev" || role === "user") {
      redirect("/dashboard");
    } else {
      redirect("/login");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //console.log({title , content , author});
    try {
      login(value)
        .then((res) => {

          if (rememberMe) {
            encryptStorage.setItem("loginCredentials ", value.password);
          } else {
            encryptStorage.removeItem("loginCredentials ");
          }
          // console.log("มี user ไหม", res.data.payLoad.user.password);
          const user = res.data.payLoad.user.username;
          SweetAl.fire(
            "แจ้งเตือน",
            `ยินดีต้อนรับ ${user} เข้าทำงาน`,
            "success"
          );
          setTimeout(() => {
            SweetAl.close();
          }, 2000)
          const idUser = res.data.payLoad.user.id;
          //todo payload มาจาก userReducer จากการ return action.payload
          dispatch({
            type: "LOGIN",
            payload: {
              token: res.data.token,
              username: res.data.payLoad.user.username,
              role: res.data.payLoad.user.role,
              id: res.data.payLoad.user.id,
            },
          });
          //TODO: ทำการบันทึกลง Storage ที่ฝั่ง client
          // ตั้งค่า timeout เพื่อลบ localStorage เมื่อ JWT หมดอายุ
          const expirationTime = 12 * 60 * 60 * 1000; // 12 ชั่วโมง (เป็นตัวอย่าง)
          //const expirationTime = 60 * 1000; // 12 ชั่วโมง (เป็นตัวอย่าง)
          const expirationDate = new Date().getTime() + expirationTime;
          const one = Number(1)
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem('isOnline', one);

          levelRole(res.data.payLoad.user.role);
        })
        .catch((error) => {
          let errorMessage = "";
          if (error.message === "Request failed with status code 400") {
            errorMessage = "Username ไม่ถูกต้อง";
          } else if (error.message === "Request failed with status code 401") {
            errorMessage = "Password ไม่ถูกต้อง";
          } else {
            errorMessage = error.message;
          }
          SweetAl.fire("แจ้งเตือน", errorMessage, "error");
        });

      //* ถ้าlogin สำเร็จ

      // authenticate(response, () => history("/create"));
    } catch (error) {
      console.log(error);
      SweetAl.fire("แจ้งเตือน", error, "error");
    }
  };


 
  return (
    <div className="container mt-3">
      <Form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <UsernameInput handleChange={handleChange} />
          <PasswordInput handleChange={handleChange} />
          <RememberMeCheckbox
            rememberMe={rememberMe}
            handleRememberMeChange={handleRememberMeChange}
          />
        </Stack>
        <hr />
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </Form>
    </div>
  );
};

export default Login;



// const data = store.dataLogin

// console.log('===================fs=================');
// console.log(data);
// console.log('====================================');
// loginAuth(value);

// if (rememberMe) {
//   encryptStorage.setItem("loginCredentials", value.password);
// } else {
//   encryptStorage.removeItem("loginCredentials");
// }

// const user = data.payLoad.user.username;
// SweetAl.fire(
//   "แจ้งเตือน",
//   `ยินดีต้อนรับ ${user} เข้าทำงาน`,
//   "success"
// );
// setTimeout(() => {
//   SweetAl.close();
// }, 2000);

// //const idUser = data.payLoad.user.id;
// dispatch({
//   type: "LOGIN",
//   payload: {
//     token: data.token,
//     username: data.payLoad.user.username,
//     role: data.payLoad.user.role,
//     id: data.payLoad.user.id,
//   },
// });

// const expirationTime = 12 * 60 * 60 * 1000; // 12 ชั่วโมง (เป็นตัวอย่าง)
// const expirationDate = new Date().getTime() + expirationTime;
// const one = Number(1);
// localStorage.setItem("token", data.token);
// localStorage.setItem("expirationDate", expirationDate);
// localStorage.setItem("isOnline", one);

// levelRole(data.payLoad.user.role);