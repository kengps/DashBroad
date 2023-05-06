import { Typography } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { listUser } from "../api/user";
import moment from "moment/min/moment-with-locales";

const ListUser = () => {
  const [value, setValue] = useState([]);

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

  return (
    <div>
      <Typography.Title level={2}>สมาชิกทั้งหมด</Typography.Title>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ลำดับ</th>
            <th scope="col">ชื่อ</th>
            <th scope="col">ระดับ</th>
            <th scope="col">สถานะ</th>
            <th scope="col"className="text-center">วันที่สร้าง</th>
            <th scope="col">เข้าใช้งานล่าสุด</th>
          </tr>
        </thead>
        <tbody>
          {value.map((item, index) => (
            <tr key={index} className="text-center">
              <th scope="row">{index + 1}</th>
              <td>{item.username}</td>
              <td>{item.role}</td>
              <td>{item.enabled}</td>
              <td >{moment(item.createdAt).locale("th").format("lll")}</td>
              <td> {moment(item.updatedAt).locale("th").startOf('hour').fromNow()}</td>
              {/* <td> {moment(item.updatedAt).locale("th").format("lll")} น.</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
