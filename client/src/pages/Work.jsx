import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import DataLoader from "../contexts/DataLoader";
import { useStore } from "../service/zustand/storeCase";

//Mui Material
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';



const Work = () => {

  //state

  const [selectUser, setSelectUser] = useState()
  const { listUser, userList } = useStore()

  useEffect(() => {
    listUser()
  }, [])
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

   
  const showUserEnable = userList.filter((item) => {return item.enabled === true})

  // console.log('==============showUserEnable======================');
  // console.log(showUserEnable);
  // console.log('====================================');
  return (
    <div style={{ paddingTop: "75px" }}>
      <Helmet>
        <title> Dashboard | TableWork </title>
      </Helmet>



      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ชื่อ (100g serving)</TableCell>
              <TableCell align="right">ระดับ</TableCell>
              <TableCell align="right">สมัครเมือ่(g)</TableCell>
              <TableCell align="right">เปิด/ปิด</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {showUserEnable.map((item) => (
              <TableRow
                key={item.username}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.username}
                </TableCell>
                <TableCell align="right">{item.role}</TableCell>
                <TableCell align="right">{item.createdAt}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Work;
