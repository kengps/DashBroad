import React, { useState } from "react";
import { Stack, TextField, FormControl } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
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

const Login = () => {
  //redux
  const dispatch = useDispatch();
  const redirect = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    
    //TODO: ตรวจสอบว่ามีการเข้าสู่ระบบแล้วหรือไม่ โดยตรวจสอบ token ใน localStorage

    if (localStorage.getItem("token")) {
      SweetAl.fire("แจ้งเตือน", "ท่านได้ทำการเข้าระบบอยู่แล้ว", "info");
      setTimeout(() => {
        redirect("/dashboard");
      }, 2000);
    }
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
          console.log("มี user ไหม", res.data.payLoad.user.password);
          const user = res.data.payLoad.user.username;
          SweetAl.fire(
            "แจ้งเตือน",
            `ยินดีต้อนรับ ${user} เข้าทำงาน`,
            "success"
          );

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
          localStorage.setItem("token", res.data.token);
          levelRole(res.data.payLoad.user.role);
        })
        .catch((error) => {
          console.log(error);
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

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div className="container mt-3">
      <Form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="username" label="Username" onChange={handleChange} />
      
          {/* <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          /> */}
          <FormControl sx={{ m: 1}} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>
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
