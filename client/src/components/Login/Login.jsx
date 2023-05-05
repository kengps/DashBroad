import React, { useState } from "react";
import { Stack, TextField, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { Form } from "react-bootstrap";
import { login } from "../../api/auth";
import SweetAl from "sweetalert2";
import { useDispatch } from "react-redux";

const Login = () => {
  //redux
  const dispatch = useDispatch();
  const redirect = useNavigate();

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

  // การตรวจสอบ
  const levelRole = (role) => {
    if (role === "user") {
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
          // payload มาจาก userReducer จากการ return action.payload
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

      // ถ้าlogin สำเร็จ

      // authenticate(response, () => history("/create"));
    } catch (error) {
      console.log(error);
      SweetAl.fire("แจ้งเตือน", error, "error");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mt-3">
      <Form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField name="username" label="Username" onChange={handleChange} />

          <TextField
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
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
