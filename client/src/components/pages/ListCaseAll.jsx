import React, { useEffect, useState, useRef } from "react";
import MyForm from "../NavbarFormcase/ProblemType";
import { listCases } from "../../api/case";
import { Button, Card, Tag, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

const ListCaseAll = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCases()
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cardRef = useRef(null);
  const textRef = useRef(null);

  const handleCopy = (e) => {
    e.preventDefault();
    const textToCopy = textRef.current.innerText;
    navigator.clipboard.writeText(textToCopy);
    message.success("Copied to clipboard");
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr className="table-secondary">
            <th scope="col">CodeCase</th>
            <th scope="col">ผู้แจ้งปัญหา</th>
            <th scope="col">ประเภทปัญหา</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">ค่ายเกม</th>
            <th scope="col">ผู้ลงเคส</th>
            <th scope="col">ผู้แก้ไข</th>
            <th scope="col">สถานะ</th>
            <th scope="col">CopyCase</th>
          </tr>
        </thead>
        <tbody>
          {data
            .reverse((a, b) => b._id - a._id)
            .map((data, index) => (
              <tr key={index}>
                <th scope="row">{data.caseId}</th>
                <td>{data.reporter}</td>
                <td>{data.typeproblem}</td>
                <td>{data.detail}</td>
                <td>{data.campgame}</td>
                <td>{data.team}</td>
                <td>{data.editors}</td>
                <td>{data.status}</td>
                <td>
                  <Card
                    ref={cardRef}
                    style={{ background: "#f0f0f0", border: "1px solid gray" }}
                  >
                    <div ref={textRef}>
                      <p>เคส: {data.caseId}</p>
                      <p>ผู้แจ้งปัญหา: {data.reporter}</p>
                      <p>ประเภทปัญหา: {data.typeproblem}</p>
                      <p>รายละเอียด:{data.detail}</p>
                      <p>ค่ายเกม: {data.campgame}</p>
                      <p>ผู้ลงเคส: {data.team}2</p>
                      <p>ผู้แก้ไข: {data.editors}</p>
                      <p>ผู้แก้ไข: {data.editors}</p>
                    </div>

                    <Button
                      onClick={handleCopy}
                      className="btn-primary float-end"
                    >
                      <CopyOutlined />
                    </Button>
                  </Card>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCaseAll;
