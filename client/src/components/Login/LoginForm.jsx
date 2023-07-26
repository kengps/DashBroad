import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Login from "./Login";
import useResponsive from "../../hooks/UseResponsive";
import logo1 from '/img/logo1.jpg';



const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow:
    " rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const LoginForm = () => {



  const mdUp = useResponsive("up", "md");
  return (
    <>
      <Helmet>
        <title> Login | Form </title>
      </Helmet>

      <StyledRoot>
        {mdUp && (
          <StyledSection>
            <Typography variant="h4" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi Bro, Welcome Back
            </Typography>
            {/* <img src={logo1} alt="login" /> */}
            <img src={`${import.meta.env.BASE_URL}logo1.jpg`} alt="login" />



          </StyledSection>
        )}
        <Container maxWidth="sm">
          <StyledContent>
            <Typography variant="h3" gutterBottom >
              LOGIN
            </Typography>
            <Divider sx={{ my: 3 }} />
            <Login />
          </StyledContent>
        </Container>
      </StyledRoot>
    </>
  );
};

export default LoginForm;
