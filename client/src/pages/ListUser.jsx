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
  CheckCircleOutlined,
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
import Register from "../components/Register/Register";

const ListUser = () => {
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);

  const { user } = useSelector((state) => state);
  const { role } = user;

  useEffect(() => {
    loadData(user.token);
  }, []);

  const loadData = (authtoken) => {
    listUser(authtoken)
      .then((res) => {
        console.log(res.data);
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("value", value);

  //* Modal สำหรับแก้ไขข้อมูล user
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    loadData();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    loadData();
  };

  //TOdo Func สำหรับลบข้อมล โดยเรียก api จาก  deleteUser
  //! สามารถเขียนรวมได้ใน if (result.isConfirmed) ใน func handleClick ได้นะ
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

  //* หากมีการคลิกที่ปุ่มลบ
  const handleClick = async (id) => {
    //todo หากกดปุ่มลบ จะให้ปุ่มยืนยันการลบขึ้นมา
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบผู้ใช้งานหรือไม่",
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

  //* state สำหรับเปิด-ปิด toggle
  const [disabled, setDisabled] = useState(true);
  const toggle = () => {
    setDisabled(!disabled);
  };

  const labelBtn = disabled ? "เปิด" : "ปิด";

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
    console.log("ได้อะไรมาไหมนะ", value);
    changStatus(user.token, value)
      .then((res) => {
        console.log("ได้อะไรคืนมา", res);
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //แก้ไขระดับ

  const roleData = ["dev", "admin", "user"];
  const roleDataAdmin = ["admin", "user"];

  // function สำหรับการแก้ไข role เมื่อมีการเปลี่ยนแปลงข้อมูลตรง select สามารถ copy จากhandleOnchange ได้เลยแต่ต้องเปลี่ยนชื่อ function  เอง
  const handleOnchangeRole = (e, id) => {
    const value = {
      id: id,
      role: e,
    };

    //changRole คือ function การยิง API
    changRole(user.token, value)
      .then((res) => {
        loadData(user.token);
      })
      .catch((err) => {
        console.log(err.res);
      });
  };

  return (
    <div className="mt-5">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Helmet>
          <title> Dashboard | User </title>
        </Helmet>
        <div>
          <Typography.Title level={2}>
            สมาชิกทั้งหมด
            {role === "dev" && (
              <Tooltip title="เพิ่มสมาชิก" placement="right" arrow>
                <Button1
                  onClick={showModal}
                  variant="warning"
                  style={{
                    alignItems: "center",
                    gap: "10px",
                    marginLeft: "5px",
                  }}
                >
                  <UserAddOutlined
                    style={{ display: "flex", justifyContent: "center" }}
                  />
                </Button1>
              </Tooltip>
            )}
          </Typography.Title>
        </div>

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
                    <Select
                      value={item.role}
                      onChange={(e) => handleOnchangeRole(e, item._id)}
                    >
                      {/* Select.Option  เราจะทำการ map roleData ที่เรากำหนดโดยมี admin และ user 
                       หลังจาก map แล้ว ให้ทำการวน Select.Option  ไปโดยจะมีการกำหนดสีให้กับค่า value ของ admin และ user 
                     โดยใช้ Tag เป็นตัวกำหนดสี */}

                      {roleData.map((item, index) => (
                        <Select.Option value={item} key={index}>
                          {item === "admin" ? (
                            <Tag color="blue">{item}</Tag>
                          ) : item === "user" ? (
                            <Tag color="magenta">{item}</Tag>
                          ) : (
                            <Tag color="gold">{item}</Tag>
                          )}
                        </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    {item.enabled === true ? (
                      <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "red" }} />
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
                      {/* <Button type="primary" onClick={showModal}>
                        แก้ไข
                      </Button> */}

                      <Switch
                        onChange={(e) => handleOnchange(e, item._id)}
                        checked={item.enabled}
                        disabled={disabled}
                        checkedChildren="✓"
                        unCheckedChildren="✗"
                        defaultChecked
                      />
                      <Button type="primary" onClick={toggle}>
                        {labelBtn}
                      </Button>
                      <Button
                        type="primary"
                        danger
                        className="me-1 mt-1"
                        onClick={() => handleClick(item._id)}
                      >
                        ลบ
                      </Button>
                      <Button type="primary">แก้ไข</Button>
                    </Space>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
        {/* //todo จะทำการตรวจสอบว่าหากไม่ได้เป็น Dev จะไม่สามารถแก้ไขการจัดการได้ */}
        {role === "admin" && (
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
                  <td>
                    {item.enabled === true ? (
                      <CheckCircleOutlined style={{ color: "green" }} />
                    ) : (
                      <CloseCircleOutlined style={{ color: "red" }} />
                    )}
                  </td>
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
        title="เพิ่มสมาชิก"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card>
          <Register />
        </Card>
      </Modal>
    </div>
  );
};

export default ListUser;
