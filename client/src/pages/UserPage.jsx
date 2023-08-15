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
import useResponsive from "../hooks/UseResponsive";

import image404 from '../../img/404.jpg'
import image4044 from '../../dist/404.jpg'





const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
    justifyContent: "center", // จัดให้อยู่ตรงกลางแนวนอน
    alignItems: "center", // จัดให้อยู่ตรงกลางแนวตั้ง
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

// const StyledMarquee = styled(Typography)(({ theme }) => ({
//   animation: "marquee 20s linear infinite, changeColor 5s linear infinite", // เพิ่ม Animation เปลี่ยนสี
//   whiteSpace: "nowrap",
//   overflow: "hidden",
//   width: "100%",
//   maxWidth: 480,
//   px: 5,
//   mt: 10,
//   mb: 5,
//   fontFamily: "Cursive",
//   fontWeight: "bold",
//   color: "white", // เปลี่ยนสีตัวอักษรเป็นขาว
//   display: "inline-block", // เพิ่มสไตล์ให้เป็นแบบ inline-block
//   padding: "10px 20px", // เพิ่ม padding เพื่อสร้างเส้นขอบ
//   border: "2px solid transparent", // ลบสีเส้นขอบเดิม
//   borderRadius: "8px", // เพิ่มขอบมน
//   // "@keyframes marquee": {
//   //   "0%": { transform: "translateX(100%)" },
//   //   "100%": { transform: "translateX(-100%)" },
//   // },
//   "@keyframes changeColor": {
//     "0%": { color: "rgb(255, 0, 0)" }, // สีตัวอักษร RGB
//     "25%": { color: "rgb(0, 255, 0)" },
//     "50%": { color: "rgb(0, 0, 255)" },
//     "75%": { color: "rgb(255, 255, 0)" },
//     "100%": { color: "rgb(255, 0, 255)" },
//   },
// }));
const StyledMarquee = styled(Typography)(({ theme }) => ({
  animation: "changeColor 5s linear infinite", // เพิ่ม Animation เปลี่ยนสี
  whiteSpace: "nowrap",
  overflow: "hidden",
  width: "100%",
  maxWidth: 480,
  px: 5,
  mt: 10,
  mb: 5,
  fontFamily: "Cursive",
  fontWeight: "bold",
  color: "white", // เปลี่ยนสีตัวอักษรเป็นขาว
  display: "inline-block", // เพิ่มสไตล์ให้เป็นแบบ inline-block
  padding: "10px 20px", // เพิ่ม padding เพื่อสร้างเส้นขอบ
  border: "2px solid transparent", // ลบสีเส้นขอบเดิม
  borderRadius: "8px", // เพิ่มขอบมน
  textShadow: "2px 2px 4px rgb(33, 47, 61)", // เพิ่มเงา RGB
  // "@keyframes changeColor": {
  //   "0%": { color: "rgb(205, 97, 85)" }, // สีตัวอักษร RGB
  //   "25%": { color: "rgb(88, 214, 141)" },
  //   "50%": { color: "rgb(84, 153, 199)" },
  //   "75%": { color: "rgb(244, 208, 63 )" },
  //   "100%": { color: "rgb(155, 89, 182 )" },
  // },
}));


const UserPage = () => {



  const mdUp = useResponsive("up", "md");
  return (
    <>
      <Helmet>
        <title> Login | Form </title>
      </Helmet>
      <StyledRoot>
        {mdUp && (
          <StyledSection>
          
              <StyledMarquee variant="h5">
              กรุณาติดต่อแอดมินเพื่อเปิดการใช้งาน
              </StyledMarquee>
         
            {/* <img src={logo1} alt="login" /> */}
            <img src={`${image4044}`} alt="login" />
          </StyledSection>
        )}
        {/* <Container maxWidth="sm">
          
        </Container> */}
      </StyledRoot>
    </>
  );
};

export default UserPage;
