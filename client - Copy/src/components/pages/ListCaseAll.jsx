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
  const textRef = useRef([]);

  const handleCopy = (e) => {
    e.preventDefault();
    const textToCopy = textRef.current.innerText;
     navigator.clipboard.writeText(textToCopy);
    message.success("Copied to clipboard");

    console.log('eee',textRef.current.innerText);
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
            .reverse((a, b) => b.id - a.id)
            .map((data, index) => (
              <tr key={index}>
                <th scope="row">{data.caseId}</th>
                <td>{data.reporter}</td>
                <td>{data.typeproblem}</td>
                <td style={{ wordWrap: "break-word", maxWidth: "30ch" }}>
                  {data.detail}
                </td>
                <td>{data.campgame}</td>
                <td>{data.team}</td>
                <td>{data.editors}</td>
                <td>{data.status}</td>
                <td>
                  <Card
                    ref={textRef}
                    style={{ background: "#f0f0f0", border: "1px solid gray" }}
                  >
                    <div>
                      <p className="d-block m-0">
                        <strong>เคส:</strong> {data.caseId}
                      </p>
                      <p className="d-block m-0">
                        <strong>ผู้แจ้งปัญหา: </strong>
                        {data.reporter}
                      </p>
                      <p className="d-block m-0">
                        <strong>ประเภทปัญหา: </strong>
                        {data.typeproblem}
                      </p>
                      <p
                        className="d-block m-0"
                        style={{ wordWrap: "break-word", maxWidth: "30ch" }}
                      >
                        <strong>รายละเอียด: </strong>
                        {data.detail}
                      </p>
                      <p className="d-block m-0 font-weight-bold">
                        <strong>ค่ายเกม:</strong> {data.campgame}
                      </p>
                      <p className="d-block m-0">
                        <strong> ผู้ลงเคส: </strong>
                        {data.team}
                      </p>
                      <p className="d-block m-0">
                        <strong> ผู้แก้ไข: </strong>
                        {data.editors}
                      </p>
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
