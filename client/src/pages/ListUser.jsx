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
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Role</th>
            <th scope="col">Status</th>
            <th scope="col">CreatedAt</th>
            <th scope="col">ActiveAt</th>
          </tr>
        </thead>
        <tbody>
          {value.map((item, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{item.username}</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td> {moment(item.updatedAt).locale("th").format("lll")} น.</td>
              <td>@mdo</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
