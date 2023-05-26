import { Typography, Space, Tag, Button } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { listUser } from "../api/user";
import moment from "moment/min/moment-with-locales";
import { Helmet } from "react-helmet-async";

import Table from "react-bootstrap/Table";

import { useDispatch, useSelector } from "react-redux";

const ListUser = () => {
  const [value, setValue] = useState([]);

  const { user } = useSelector((state) => state);
  const { role } = user;

  useEffect(() => {
    listUser()
      .then((res) => {
        console.log(res.data);
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log("userRole", role);
  const selectStatus = ["Active", "Disable"];

  return (
    <div>
      <Helmet>
        <title> Dashboard | User </title>
      </Helmet>
      <Typography.Title level={2}>สมาชิกทั้งหมด</Typography.Title>

      {role === "dev" && (
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
                  {" "}
                  {moment(item.updatedAt)
                    .locale("th")
                    .startOf("hour")
                    .fromNow()}
                </td>
                <td>
                  {" "}
                  <Space>
                    {" "}
                    <Button type="primary" danger>
                      ลบ
                    </Button>
                    <Button type="primary" >
                      แก้ไข
                    </Button>
                    <Button type="primary" danger>
                      ลบ
                    </Button>
                  </Space>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

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
    </div>
  );
};

export default ListUser;
