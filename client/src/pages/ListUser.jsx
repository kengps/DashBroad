import { Typography, Space, Tag, Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { listUser } from "../api/user";
import moment from "moment/min/moment-with-locales";
import { Helmet } from "react-helmet-async";

import Table from "react-bootstrap/Table";

import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import sweetAlert from 'sweetalert2'
import { deleteCase,deleteUser } from "../api/case";


const ListUser = () => {
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state);
  const { role } = user;

  useEffect(() => {
    loadData();
  }, []);


  const loadData = () => {
    listUser()
    .then((res) => {
      console.log(res.data);
      setValue(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
console.log('value',value);

  console.log("userRole", role);
  const selectStatus = ["Active", "Disable"];

  //* Modal สำหรับแก้ไขข้อมูล user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    console.log('5555');
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };




  const confirmDelete = (id) => {
    deleteUser(id)
      .then((res) => {
        sweetAlert.fire("แจ้งเตือน", res.data.message, "success");
        console.log("การลบ", res);
        loadData();
        // loadUser(user.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleClick = async (id) => {
      //todo หากกดปุ่มลบ จะให้ปุ่มยืนยันการลบขึ้นมา
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบบทความหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      console.log("ยืนยันการลบ", result);
      //todo ถ้ากดปุ่ม OK หรือ ตกลง จะส่ง request ไปที่  api เพื่อลบข้อมูล
      if (result.isConfirmed) {
        //todo หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete
        confirmDelete(id);
      }
    } catch (error) {
      console.log(err);
    }
  };





  return (
    <div className="mt-5">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Helmet>
          <title> Dashboard | User </title>
        </Helmet>
        <Typography.Title level={2}>สมาชิกทั้งหมด</Typography.Title>

        {/* //todo จะทำการตรวจสอบว่าหากเป็น Dev จะสามารถแก้ไขการจัดการได้ */}
        {role === "dev" && (
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th scope="col">ลำดับ</th>
                <th scope="col">ชื่อ</th>
                <th scope="col">ระดับ</th>
                <th scope="col">สถานะ</th>
                <th scope="col" className="text-center">
                  วันที่สร้าง
                </th>
                <th scope="col">เข้าใช้งานล่าสุด</th>
                <th scope="col">การจัดการ</th>
              </tr>
            </thead>
            <tbody>
              {value.map((item, index) => (
                <tr key={index} className="text-center">
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>
                    {item.role === "admin" ? (
                      <Tag color="red">{item.role}</Tag>
                    ) : item.role === "user" ? (
                      <Tag color="green">{item.role}</Tag>
                    ) : (
                      <Tag color="blue">{item.role}</Tag>
                    )}
                  </td>
                  <td>
                    {item.enabled === true ? (
                      <Tag color="green">Active</Tag>
                    ) : (
                      <Tag color="red">Disable</Tag>
                    )}
                  </td>
                  <td>{moment(item.createdAt).locale("th").format("lll")}</td>
                  <td>
                    {moment(item.updatedAt)
                      .locale("th")
                      .startOf("hour")
                      .fromNow()}
                  </td>
                  <td>
                    <Space>
                      <Button type="primary"
                        onClick={showModal}
                      
                      
                      >แก้ไข</Button>
                     <Button
                      type="primary"
                      danger
                      className="me-1 mt-1"
                      onClick={() => handleClick(item._id)}
                    >
                      ลบ
                    </Button>
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {/* //todo จะทำการตรวจสอบว่าหากไม่ได้เป็น Dev จะไม่สามารถแก้ไขการจัดการได้ */}
        {!role === "dev" && (
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th scope="col">ลำดับ</th>
                <th scope="col">ชื่อ</th>
                <th scope="col">ระดับ</th>
                <th scope="col">สถานะ</th>
                <th scope="col" className="text-center">
                  วันที่สร้าง
                </th>
                <th scope="col">เข้าใช้งานล่าสุด</th>
              </tr>
            </thead>
            <tbody>
              {value.map((item, index) => (
                <tr key={index} className="text-center">
                  <th scope="row">{index + 1}</th>
                  <td>{item.username}</td>
                  <td>
                    {" "}
                    {item.role === "admin" ? (
                      <Tag color="red">{item.role}</Tag>
                    ) : item.role === "user" ? (
                      <Tag color="green">{item.role}</Tag>
                    ) : (
                      <Tag color="blue">{item.role}</Tag>
                    )}
                  </td>
                  <td>{item.enabled}</td>
                  <td>{moment(item.createdAt).locale("th").format("lll")}</td>
                  <td>
                    {" "}
                    {moment(item.updatedAt)
                      .locale("th")
                      .startOf("hour")
                      .fromNow()}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Box>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default ListUser;
