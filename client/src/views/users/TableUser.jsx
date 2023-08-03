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
import moment from "moment/min/moment-with-locales";
import { Helmet } from "react-helmet-async";

import Table from "react-bootstrap/Table";
import Button1 from "react-bootstrap/Button";
import { Box } from "@mui/material";


import { useDispatch, useSelector } from "react-redux";
import Register from "../../components/Register/Register";

import SettingProblem from "../../components/SettingProblem";


import { AccordionUI } from "../../components/Menu/Index";

const TableUser = ({ value, handleOnchange, handleClick, handleOnchangeRole }) => {

    const { user } = useSelector((state) => state);
    const { role } = user;


    //* Modal สำหรับแก้ไขข้อมูล user
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen1, setIsModalOpen1] = useState(false);
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

    const showModal1 = () => {
        setIsModalOpen1(true);
    };
    const handleOk1 = () => {
        setIsModalOpen1(false);
    };
    const handleCancel1 = () => {
        setIsModalOpen1(false);
    };

    //แก้ไขระดับ

    const roleData = ["dev", "admin", "user"];

    //* state สำหรับเปิด-ปิด toggle
    const [disabled, setDisabled] = useState(true);
    const toggle = () => {
        setDisabled(!disabled);
    };

    const labelBtn = disabled ? "เปิด" : "ปิด";


    return (
        <div style={{ marginTop: "75px" }}>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Helmet>
                    <title> Dashboard | User </title>
                </Helmet>
                <div>
                    <Typography.Title level={2}>
                        สมาชิกทั้งหมด
                        {role !== "user" && (
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
                        ตั้งค้า
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

                                            <Button1
                                                onClick={showModal1}
                                                variant="warning"
                                                style={{
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    marginLeft: "5px",
                                                }}
                                            >
                                                <SettingOutlined
                                                    style={{ display: "flex", justifyContent: "center" }}
                                                />
                                            </Button1>
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
            <Modal
                title={
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ marginRight: "8px" }}>เพิ่มประเภท</span>
                        <AccordionUI />
                    </div>
                }
                open={isModalOpen1}
                onOk={handleOk1}
                onCancel={handleCancel1}
            >
                <SettingProblem />
            </Modal>
        </div>
    )
}

export default TableUser