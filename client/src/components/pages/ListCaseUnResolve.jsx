import React, { useEffect, useState, useRef } from "react";
import MyForm from "../NavbarFormcase/ProblemType";
import { changeStatus, listCases } from "../../api/case";
import { Button, Card, Tag, message, Select, Modal } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";

import sweetAlert from "sweetalert2";

const ListCaseUnResolve = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCases()
      .then((res) => {
        console.log("ทดสอบ", res.data);

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
    toast.success("Copied to clipboard");

    console.log("eee", textRef.current.innerText);
  };

  const statusCase = ["รอการแก้ไข", "แก้ไขสำเร็จ"];
  const handleOnchange = (e, id) => {
    let values = {
      id: id,
      status: e,
    };
    changeStatus(values)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    // message.success("ทำการเปลี่ยนแปลงสถานะสำเร็จ");

    sweetAlert.fire("แจ้งเตือน", "ทำการเปลี่ยนแปลงสถานะสำเร็จ", "success");
    // toast.success("ทำการเปลี่ยนแปลงสถานะสำเร็จ")
  };

  // modal
  const [selectedCase, setSelectedCase] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <table className="table table-striped ">
        <thead>
          <tr className="table-secondary" style={{fontSize:'16px'}}>
            <th scope="col">CodeCase</th>
            <th scope="col">ผู้แจ้งปัญหา</th>
            <th scope="col">ประเภทปัญหา</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">ค่ายเกม</th>
            <th scope="col" className="text-center">ผู้ลงเคส</th>
            <th scope="col" className="text-center">ผู้แก้ไข</th>
            <th scope="col"  className="text-center">สถานะ</th>
            <th scope="col" className="text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((data) => data.status === "รอการแก้ไข")
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
                <td>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue={data.status}
                    onChange={(e) => handleOnchange(e, data._id)}
                  >
                    {statusCase.map((item, index) => (
                      <Select.Option key={index} value={item}>
                        {item === "รอการแก้ไข" ? (
                          <Tag color={"red"}>{item}</Tag>
                        ) : (
                          <Tag color={"green"}>{item}</Tag>
                        )}
                      </Select.Option>
                    ))}
                  </Select>
                </td>
                <td>
                <Button danger className="me-1">แก้ไข</Button>
                  <Button
                  className="mt-1"
                    type="primary"
                    onClick={() => {
                      setSelectedCase(data);
                      showModal();
                    }}
                  >
                    CopyCase
                  </Button>
                  <Modal
                    title="Basic Modal"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                  >
                    {selectedCase && (
                      <Card
                        ref={textRef}
                        style={{
                          background: "#f0f0f0",
                          border: "1px solid gray",
                        }}
                      >
                        <div>
                          <p className="d-block m-0">
                          "<strong> เคส:</strong> {selectedCase.caseId}
                          </p>
                          <p className="d-block m-0">
                            <strong>ผู้แจ้งปัญหา: </strong>
                            {selectedCase.reporter}
                          </p>
                          <p className="d-block m-0">
                            <strong>ประเภทปัญหา: </strong>
                            {selectedCase.typeproblem}
                          </p>
                          <p
                            className="d-block m-0"
                            style={{ wordWrap: "break-word", maxWidth: "30ch" }}
                          >
                            <strong>รายละเอียด: </strong>
                            {selectedCase.detail}
                          </p>
                          <p className="d-block m-0 font-weight-bold">
                            <strong>ค่ายเกม:</strong> {selectedCase.campgame}
                          </p>
                          <p className="d-block m-0">
                            <strong> ผู้ลงเคส: </strong>
                            {selectedCase.team}
                          </p>
                          <p className="d-block m-0">
                            <strong> ผู้แก้ไข: </strong>
                            {selectedCase.editors} "
                          </p>
                        </div>

                        <Button
                          onClick={handleCopy}
                          className="btn-primary float-end"
                        >
                          <CopyOutlined />
                        </Button>
                      </Card>
                    )}
                 
                  </Modal>
                
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCaseUnResolve;

{
  /* <Card
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
</Card> */
}
