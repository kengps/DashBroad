import React, { useEffect, useState, useRef } from "react";
import MyForm from "../components/NavbarFormcase/ProblemType";
import { changeStatus, listCases, deleteCase } from "../api/case";
import { Button, Card, Tag, message, Select, Modal, Input } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";

import sweetAlert from "sweetalert2";
import { Form, InputGroup } from "react-bootstrap";
import Pagination from "react-paginate";
import { RxCross2 } from "react-icons/rx";
import moment from "moment/min/moment-with-locales";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;

import ReactQuill from "react-quill";

const ListCaseUnResolve = () => {
  //state สำหรับการแก้ไข
  const [detailContent, setDetailContent] = useState("");
  const [data, setData] = useState([]);
  // state สำหรับการค้นหาข้อมูล
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState([]);
  const ITEM_PER_PAGE = 10;

  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = () => {
    listCases(currentPage, ITEM_PER_PAGE)
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
        loadData();
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
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal2 = (id) => {
    setIsModalOpen2(true);
    console.log(id);
  };
  const handleOk2 = () => {
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  // console.log(search);
  const handleSearch = (e) => {
    e.preventDefault();
    // handle search logic here
  };
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const onClickButton = (e) => {
    e.preventDefault();
    setSearch("");
    console.log("ลบข้อมูลเรียบร้อยแล้ว");
  };

  // ปุ่มคลิก

  const confirmDelete = (id) => {
    deleteCase(id)
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

  // function สำหรับการ ยืนยันการลบข้อมูล จะรับแค่ id มาอย่างเดียว
  const handleClick = async (id) => {
    // หากกดปุ่ม จะให้ปุ่มยืนยันการลบขึ้นมา
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบบทความหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      console.log("ยืนยันการลบ", result);
      //ถ้ากดปุ่ม OK หรือ ตกลง
      if (result.isConfirmed) {
        //ส่ง request ไปที่  api เพื่อลบข้อมูล

        confirmDelete(id); //หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete
      }
    } catch (error) {
      console.log(err);
    }
  };

  const handleChangeDetail = (event) => {
    setDetailContent(event.target.value);
    console.log("การแก้ไขdetail", event.target.value);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="ค้นหาCodeCase"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <Button
          variant="danger"
          value="Submit"
          onClick={onClickButton}
          className="btn-1"
        >
          <RxCross2 />
        </Button>
      </InputGroup>

      <table className="table table-striped ">
        <thead>
          <tr className="table-secondary" style={{ fontSize: "16px" }}>
            <th scope="col">CodeCase</th>
            <th scope="col">ผู้แจ้งปัญหา</th>
            <th scope="col">ประเภทปัญหา</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">ค่ายเกม</th>
            <th scope="col" className="text-center">
              ผู้ลงเคส
            </th>
            <th scope="col" className="text-center">
              ผู้แก้ไข
            </th>
            <th scope="col" className="text-center">
              เวลาสร้างเคส
            </th>
            <th scope="col" className="text-center">
              สถานะ
            </th>
            <th scope="col" className="text-center">
              การจัดการ
            </th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) =>
              item.caseId.toLowerCase().includes(search.toLowerCase())
            )
            .filter(
              (item) =>
                item.status === "รอการแก้ไข" && item.caseId.startsWith("BGMC")
            )
            .reverse((a, b) => b.id - a.id)
            .slice(
              currentPage * ITEM_PER_PAGE,
              (currentPage + 1) * ITEM_PER_PAGE
            )
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
                <td>{data.recorder}</td>
                <td>{data.editors}</td>
                <td>{moment(data.createdAt).locale("th").format("lll")} น.</td>
                <td>
                  <Select
                    style={{ width: "100%" }}
                    value={data.status}
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
                  <Button
                    className="mt-1 me-1"
                    type="primary"
                    onClick={() => {
                      setSelectedCase(data);
                      showModal();
                    }}
                  >
                    คัดลอก
                  </Button>
                  <Button
                    className="me-1 btn-change"
                    onClick={() => showModal2(data._id)}
                  >
                    แก้ไข
                  </Button>
                  <Button
                    type="primary"
                    danger
                    className="me-1 mt-1"
                    onClick={() => handleClick(data._id)}
                  >
                    ลบ
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
                            {selectedCase.recorder}
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

                  <Modal
                    title="Basic Modal2"
                    open={isModalOpen2}
                    onOk={handleOk2}
                    onCancel={handleCancel2}
                  >
                    <p>{}</p>
                    <InputGroup>
                      <InputGroup.Text>รายละเอียด</InputGroup.Text>
                    </InputGroup>

                    <TextArea
                      rows={5}
                      type="text"
                      name="detail"
                      onChange={handleChangeDetail}
                      value={detailContent}
                    />
                  </Modal>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination
        previousLabel="< ก่อนหน้า"
        nextLabel="ถัดไป >"
        breakLabel="..."
        pageCount={Math.ceil(data.length / ITEM_PER_PAGE)}
        marginPagesDisplayed={3}
        pageRangeDisplayed={5}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
        onPageChange={handlePageClick}
      />
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

//* startsWith() เป็น method ของ string ใน JavaScript ที่ใช้สำหรับตรวจสอบว่า string ที่เรียกใช้ method นี้เริ่มต้นด้วยค่าที่กำหนดหรือไม่
//*  โดยจะ return ค่าเป็น boolean โดย true หาก string เริ่มต้นด้วยค่าที่กำหนด และ false หากไม่เริ่มต้นด้วยค่าที่กำหนด ตัวอย่างการใช้งาน:
