import React, { useContext, useEffect, useState } from "react";
import DataLoader from "../contexts/DataLoader";
import { ListCaseContext } from "../contexts/api";
import Table from "react-bootstrap/Table";

const WebScraping = () => {
  const getChartData = (value) => {
    const onSubmit = () => {
      alert("Click is success");
      console.log("Click", value);
    };
    const datas = value;
    const statusFix = value.filter(
      (item) => item.status === "รอการแก้ไข"
    ).length;

    console.log("statusFix", datas);
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <button onClick={onSubmit}>55555</button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Username</th>
              <th>Username</th>
              <th>Username2</th>
            </tr>
          </thead>
          <tbody>
            {datas.map((item, index) => (
              <tr>
                <th>{item.caseId}</th>
                <th>{item.status}</th>
                <th>{item.editors}</th>
                <th>{item.problem}</th>
                <th>{item.detail}</th>
                <th>{item.recorder}</th>
                <th>{item.wallet}</th>
              
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <div>
      <DataLoader children={getChartData} />
    </div>
  );
};

export default WebScraping;
