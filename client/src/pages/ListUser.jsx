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
import { changStatus, listUser, changRole, deleteUser } from "../api/user";
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


const ListUser = () => {
  const [value, setValue] = useState([]);


  const { user } = useSelector((state) => state);

  useEffect(() => {
    loadData(user.token);

  }, []);

  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  //TOdo Func สำหรับลบข้อมล โดยเรียก api จาก  deleteUser
  //! สามารถเขียนรวมได้ใน if (result.isConfirmed) ใน func handleClick ได้นะ
  const confirmDelete = (id) => {
    deleteUser(id)
      .then((res) => {
        sweetAlert.fire("แจ้งเตือน", res.data.message, "success");

        loadData();
        // loadUser(user.token);
      })
      .catch((error) => {
        console.log(error);
      });
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

        confirmDelete(id);
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
  const handleOnchange = (e, id) => {
    const value = {
      id: id,
      enabled: e,
    };

    changStatus(user.token, value)
      .then((res) => {
        const notify =
          res.data.enabled === true
            ? "ทำการปิดการใช้งานสำเร็จ"
            : "ทำการเปิดการใช้งานสำเร็จ";

        toast.success(notify);

        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //แก้ไขระดับ


  // function สำหรับการแก้ไข role เมื่อมีการเปลี่ยนแปลงข้อมูลตรง select สามารถ copy จากhandleOnchange ได้เลยแต่ต้องเปลี่ยนชื่อ function  เอง
  const handleOnchangeRole = (e, id) => {
    const value = {
      id: id,
      role: e,
    };

    //changRole คือ function การยิง API
    changRole(user.token, value)
      .then((res) => {
        toast.success("ทำการแก้ไขระดับสำเร็จ");

        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };


  return (
    <>

      <TableUser value={value} handleOnchange={handleOnchange} handleClick={handleClick} handleOnchangeRole={handleOnchangeRole} />

    </>

  );
};

export default ListUser;
