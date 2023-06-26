import React, { useEffect, useState, useRef } from "react";
import MyForm from "../components/NavbarFormcase/ProblemType";
import { changeStatus, listCases, deleteCase, changeDetail } from "../api/case";
import { Button, Card, Tag, message, Select, Modal, Input, Drawer } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import { toast } from "react-toastify";

import sweetAlert from "sweetalert2";
import { Form, InputGroup } from "react-bootstrap";
import Pagination from "react-paginate";
import { RxCross2 } from "react-icons/rx";
import moment from "moment/min/moment-with-locales";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import swal from "sweetalert2";
const { TextArea } = Input;
import Button1 from "react-bootstrap/Button";

import ReactQuill from "react-quill";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";
import { notiAll } from "../common/utils/Notification";
const ListCaseUnResolve = () => {
  //*state สำหรับการแก้ไข
  const [values, setValues] = useState({
    id: "",
    detail: "",
  });
  const [data, setData] = useState([]);
  //* state สำหรับการค้นหาข้อมูล
  const [search, setSearch] = useState("");
  //* state สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState([]);
  const ITEM_PER_PAGE = 20;

  useEffect(() => {
    loadData();
  }, [currentPage]);

  //function axios ดึงข้อมูล
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

  //function  handleCopy สำหรับการ copy โดยหลังผ่านไป 3 วิ จะให้ทำการปิด sweetAlert
  const handleCopy = (e) => {
    e.preventDefault();
    const textToCopy = textRef.current.innerText;
    navigator.clipboard.writeText(textToCopy);
    //toast.success("Copied to clipboard");
    sweetAlert.fire({
      title: "แจ้งเตือน",
      text: "Copied to clipboard",
      icon: "success",
      didClose: () => {
        setIsModalOpen(false);
      },
    });
    setTimeout(() => {
      sweetAlert.close();
    }, 1000);
  };

  //func สำหรับการแก้ไข สถานะ โดยมีการกำหนดตัวแปร  statusCase เพื่อทำการนำไปลูป
  const statusCase = ["รอการแก้ไข", "แก้ไขสำเร็จ"];
  const handleOnchange = (e, id) => {
    let values = {
      id: id,
      status: e,
    };
    changeStatus(values)
      .then((res) => {
        notiAll();
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

  //* modal
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

  // modal สำหรับการแก้ไขรายละเอียด case
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const showModal2 = (id) => {
    setIsModalOpen2(true);

    setValues({ ...values, id: id });
  };

  const handleOk2 = () => {
    setIsModalOpen2(false);

    const id = values.id;

    changeDetail(id, { values })
      .then((res) => {
        swal.fire("แจ้งเตือน", "ทำการแก้ไขรายละเอียดสำเร็จ", "success");
        loadData();
        setValues({ detail: "" });
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel2 = () => {
    setIsModalOpen2(false);
  };
  // console.log(search);
  const handleSearch = (e) => {
    e.preventDefault();
    // handle search logic here
  };

  //func Pagination
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  //func สำหรับปุ่มลบการค้นหา
  const onClickButton = (e) => {
    e.preventDefault();
    setSearch("");
  };

  //func ปุ่มลบเคสโดยจะเริ่มทำจาก handleClick ก่อน หากมีการกด OK ก็จะแรกใช้ confirmDelete
  const confirmDelete = (id) => {
    deleteCase(id)
      .then((res) => {
        sweetAlert.fire("แจ้งเตือน", res.data.message, "success");
        // console.log("การลบ", res);
        loadData();
        // loadUser(user.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function สำหรับการ ยืนยันการลบข้อมูล จะรับแค่ id มาอย่างเดียว
  const handleClick = async (id) => {
    //todo หากกดปุ่มลบ จะให้ปุ่มยืนยันการลบขึ้นมา
    try {
      const result = await sweetAlert.fire({
        title: "คุณต้องการลบบทความหรือไม่",
        icon: "warning",
        showCancelButton: true,
      });
      console.log("ยืนยันการลบ", result);
      //todo ถ้ากดปุ่ม OK หรือ ตกลง จะส่ง request ไปที่  api เพื่อลบข้อมูล
      if (result.isConfirmed) {
        //todo หากมีการกด confirm ให้ทำการเรียกใช้ function confirmDelete
        confirmDelete(id);
      }
    } catch (error) {
      console.log(err);
    }
  };

  // func สำหรับการแก้ไชรายละเอียด
  const handleChangeDetail = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  //modal สรุปเคส
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const showModal3 = () => {
    setIsModalOpen3(true);
  };
  const handleOk3 = () => {
    setIsModalOpen3(false);
  };
  const handleCancel3 = () => {
    setIsModalOpen3(false);
  };

  // ตัวแปรสำหรับหาจำนวนของเคสที่รอการแก้ไข
  const pendingCases = data.filter((item) => item.status === "รอการแก้ไข");
  const pendingCasesCount = pendingCases.length;

  // func สำหรับ copy สรุปเคส
  const handleCopy2 = (e) => {
    e.preventDefault();
    const textToCopy = textRef.current.innerText;

    // วิธีที่ 1: ใช้ API navigator.clipboard.writeText()
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        //toast.success("Copied to clipboard");
        sweetAlert.fire({
          title: "แจ้งเตือน",
          text: "Copied to clipboard",
          icon: "success",
          didClose: () => {
            setIsModalOpen(false);
          },
        });
        setTimeout(() => {
          sweetAlert.close();
        }, 1000);
      })
      .catch((error) => {
        console.log("Error copying to clipboard:", error);
        //toast.error("Failed to copy to clipboard");
        sweetAlert.fire({
          title: "แจ้งเตือน",
          text: "Failed to copy to clipboard",
          icon: "error",
        });
      });
  };

  // Drawer สำหรับ copy สรุปเคสประจำวัน
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  let currentTime = moment().utcOffset("+07:00").format("LT");
  let eveningTime = moment("8:30 PM", "h:mm A");

  console.log(currentTime);
  return (
    <div className="mt-5">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Helmet>
          <title> Dashboard | CaseUnResolve </title>
        </Helmet>
        <Box>
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
            <Button1
              variant="success"
              onClick={showDrawer}
              style={{ marginLeft: "20px" }}
            >
              สรุปเคสประจำวัน
            </Button1>
          </InputGroup>
        </Box>

        <table className="table table-striped ">
          <thead>
            <tr className="table-secondary" style={{ fontSize: "16px" }}>
              <th scope="col">CodeCase</th>
              <th scope="col">ผู้แจ้งปัญหา</th>
              <th scope="col">ประเภท</th>
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
              .filter(
                (item) =>
                  //  filter แรกสำหรับการค้นหา id และ รายละเอียด
                  item.caseId.toLowerCase().includes(search.toLowerCase()) ||
                  item.detail.toLowerCase().includes(search.toLowerCase())
              )
              .filter(
                // filter สำหรับแสดงเคสที่ รอการแก้ไข
                (item) =>
                  item.status === "รอการแก้ไข" && item.caseId.startsWith("BGMC")
              )
              // reverse ข้อมูลจากใหม่ไปเก่า
              .reverse((a, b) => b.id - a.id)
              .slice(
                // slice สำหรับ pagination
                currentPage * ITEM_PER_PAGE,
                (currentPage + 1) * ITEM_PER_PAGE
              )
              .reverse((a, b) => b.id - a.id)
              .map((data, index) => (
                <tr key={index}>
                  <th scope="row">{data.caseId}</th>
                  <td>{data.reporter}</td>
                  <td>{data.problem.slice(0, 17)}</td>
                  <td style={{ wordWrap: "break-word", maxWidth: "30ch" }}>
                    {data.detail}
                  </td>
                  <td>{data.campgame}</td>
                  <td>{data.recorder}</td>
                  <td>{data.editors}</td>
                  <td>
                    {moment(data.createdAt).locale("th").format("l LT")} น.
                  </td>
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
                      title="Copy Case"
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
                              <strong>{"[ผู้แจ้งปัญหา]:"} </strong>
                              {selectedCase.reporter}
                            </p>
                            <p className="d-block m-0">
                              <strong>ประเภทปัญหา: </strong>
                              {selectedCase.problemDetail}
                            </p>
                            <p
                              className="d-block m-0"
                              style={{
                                wordWrap: "break-word",
                                maxWidth: "30ch",
                              }}
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
                      <InputGroup>
                        <InputGroup.Text>รายละเอียด</InputGroup.Text>
                      </InputGroup>

                      <TextArea
                        rows={5}
                        type="text"
                        name="detail"
                        onChange={handleChangeDetail}
                      />
                    </Modal>
                  </td>
                </tr>
              ))}

            {/* <Modal
              title="Basic Modal"
              open={isModalOpen3}
              onOk={handleOk3}
              onCancel={handleCancel3}
            >
              <Card ref={textRef}>
                <p>******************************************</p>
                <p>
                  สรุปเคสประจำวันระหว่างกะ
                  <p>
                    {pendingCasesCount === "0"
                      ? "ไม่มีรายการค้าง"
                      : ` เคสค้างจำนวน ${pendingCasesCount} รายการ`}
                    <p>
                      {pendingCases.map((item, index) => (
                        <span key={index}>{item.caseId}, </span>
                      ))}
                    </p>
                  </p>
                </p>
                <p>******************************************</p>
                <Button onClick={handleCopy2} className="btn-primary float-end">
                  <CopyOutlined />
                </Button>
              </Card>
            </Modal> */}

            <Drawer
              title="Basic Drawer"
              placement="right"
              onClose={onClose}
              open={open}
            >
              <Card ref={textRef}>
                {/* <p>══════════ สรุปเคสประจำวันระหว่างกะ ════════════</p> */}

                <p>
                  {" "}
                  {moment(currentTime, "h:mm A").isAfter(eveningTime) ? (
                    <p> ══════════ สรุปเคสประจำวันกะดึก ════════════</p>
                  ) : (
                    <p>══════════ สรุปเคสประจำวันกะเช้า ════════════</p>
                  )}
                </p>
                <p>
                  <p>
                    {pendingCasesCount === 0
                      ? "ไม่มีรายการค้าง"
                      : ` เคสค้างจำนวน ${pendingCasesCount} รายการ`}
                    <p>
                      {pendingCases.map((item, index) => (
                        <span key={index}>{item.caseId}, </span>
                      ))}
                    </p>
                  </p>
                </p>
                <p>═══════════════ (▰˘◡˘▰)════════════════</p>
                <Button onClick={handleCopy2} className="btn-primary float-end">
                  <CopyOutlined />
                </Button>
              </Card>
            </Drawer>
          </tbody>
        </table>

        <Pagination
          previousLabel={currentPage > 0 ? "< ก่อนหน้า" : "หน้าแรก"}
          nextLabel={
            currentPage === Math.ceil(data.length / ITEM_PER_PAGE) - 1
              ? "สุดท้าย"
              : "ถัดไป >"
          }
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
      </Box>
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
