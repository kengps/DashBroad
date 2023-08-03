import React, { useEffect, useState, useRef } from "react";
import MyForm from "../components/NavbarFormcase/ProblemType";
import { changeStatus, listCases, deleteCase, changeDetail } from "../api/case";
import { Button, Card, Tag, message, Select, Modal, Input, Drawer } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import sweetAlert from "sweetalert2";
import { Form, InputGroup } from "react-bootstrap";
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
import { useSelector } from "react-redux";
import Pagination from "../views/paginate/Pagination";
import SearchCase from "../views/allCaseAndPendingCase/SearchCase";
import CasePending from "../views/allCaseAndPendingCase/CasePending";

// import Pagination from "react-paginate";



const ListCaseUnResolve = () => {

  const { user } = useSelector((state) => ({ ...state }))


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
      closeCaseBy: user.username
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

        <SearchCase
          search={search}
          setSearch={setSearch}
          onClickButton={onClickButton}
          showDrawer={showDrawer}
        />

        <CasePending
          data={data}
          search={search}
          currentPage={currentPage}
          ITEM_PER_PAGE={ITEM_PER_PAGE}
          statusCase={statusCase}
          handleOnchange={handleOnchange}
          handleCopy={handleCopy}
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          showModal2={showModal2}
          handleOk2={handleOk2}
          handleCancel2={handleCancel2}
          handleChangeDetail={handleChangeDetail}
          handleClick={handleClick}
          selectedCase={selectedCase}
          isModalOpen={isModalOpen}
          isModalOpen2={isModalOpen2}
          textRef={textRef}
          pendingCasesCount={pendingCasesCount}
          pendingCases={pendingCases}
          currentTime={currentTime}
          eveningTime={eveningTime}
          handleCopy2={handleCopy2}
          showDrawer={showDrawer}
          onClose={onClose}
          open={open}
          setSelectedCase={setSelectedCase}
        />

        <Pagination
          currentPage={currentPage}
          pageCount={Math.ceil(data.length / ITEM_PER_PAGE)}
          handlePageClick={handlePageClick}
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
