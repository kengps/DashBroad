import {
  Typography,
  Space,
  Tag,
  Button,
  Modal,
  Switch,
  Card,
  Select,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  UserAddOutlined,
  CloseCircleOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { changStatus, changRole, deleteUser } from "../api/user";
import moment from "moment/min/moment-with-locales";
import { Helmet } from "react-helmet-async";

import Table from "react-bootstrap/Table";
import Button1 from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import sweetAlert from "sweetalert2";

import { toast } from "react-toastify";
import SettingProblem from "../components/SettingProblem";
import Offcanvas from "react-bootstrap/Offcanvas";

import { AccordionUI } from "../components/Menu/Index";
import TableUser from "../views/users/TableUser";
import Register from "../components/Register/Register";
import { useStore } from "../service/zustand/storeCase";



const ListUser = () => {

  //const listUse1 = useStore((state) => state.listUser);
  // const userList = useStore((state) => state.userList);
  const { listUser, userList, deleteUsers, responseDelete, changStatusUser, changRoleUser } = useStore();


  const { user } = useSelector((state) => state);

  const resChangStatus = useStore((state) => state.resChangStatus);



  useEffect(() => {
    loadData(user.token);

  }, []);


  const loadData = (authtoken) => {
    listUser(authtoken)

  };


  //TOdo Func สำหรับลบข้อมล โดยเรียก api จาก  deleteUser
  //! สามารถเขียนรวมได้ใน if (result.isConfirmed) ใน func handleClick ได้นะ
  const confirmDelete = async (id) => {
    const res = await deleteUsers(id)
    console.log(`ได้อะไรจากการ return${res}`);
    sweetAlert.fire("แจ้งเตือน", res, "success");
    loadData();
    // loadUser(user.token);
  };

  //* หากมีการคลิกที่ปุ่มลบ
  const handleClick = async (id) => {
    //todo หากกดปุ่มลบ จะให้ปุ่มยืนยันการลบขึ้นมา
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบผู้ใช้งานหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });

      //todo ถ้ากดปุ่ม OK หรือ ตกลง จะส่ง request ไปที่  api เพื่อลบข้อมูล
      if (result.isConfirmed) {
        //todo หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete

        await confirmDelete(id);
      }
    } catch (error) {
      console.log(err);
    }
  };

  //* style
  const navDropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  //* function สำหรับการเปิด-ปิด user
  const handleOnchange = async (e, id) => {
    console.log(`checked = ${e.target.checked}`);
    //หากใช้ checkbox ให้ใช่ e.target.checked
    //หากใช้ switch ให้ใช่ e


    const checked = e.target.checked
    const value = {
      id: id,
      enabled: checked,
    };
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบปิดการใช้งานหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      console.log("ยืนยันการลบ", result);
      //todo ถ้ากดปุ่ม OK หรือ ตกลง จะส่ง request ไปที่  api เพื่อลบข้อมูล
      if (result.isConfirmed) {
        //todo หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete

        await changStatusUser(user.token, value)
      }

      // สามารถเข้าถึงค่าที่คืนมาจาก changStatusUser ได้เลยโดยใช้ตัวแปร resChangStatus

      const notify =
        resChangStatus.enabled === true
          ? "ทำการเปิดการใช้งานสำเร็จ"
          : "ทำการปิดการใช้งานสำเร็จ";


      toast.success(notify);


      loadData(user.token);
    } catch (error) {
      console.log(error);
    }


  };

  //แก้ไขระดับ


  // function สำหรับการแก้ไข role เมื่อมีการเปลี่ยนแปลงข้อมูลตรง select สามารถ copy จากhandleOnchange ได้เลยแต่ต้องเปลี่ยนชื่อ function  เอง
  const handleOnchangeRole = async (e, id) => {
    try {
      const value = {
        id: id,
        role: e,
      };

      //changRole คือ function การยิง API
      await changRoleUser(user.token, value)

      toast.success("ทำการแก้ไขระดับสำเร็จ");

      loadData(user.token);

    } catch (error) {
      console.log(error);
    }

  };


  return (
    <>

      <TableUser value={userList} handleOnchange={handleOnchange} handleClick={handleClick} handleOnchangeRole={handleOnchangeRole} />

    </>

  );
};

export default ListUser;
