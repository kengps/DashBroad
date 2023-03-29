import { Typography } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { listUser } from "../../api/user";

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
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
            <th scope="col">Handle</th>
            <th scope="col">Handle</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {value.map((item,index) => (
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{item.username}</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUser;
