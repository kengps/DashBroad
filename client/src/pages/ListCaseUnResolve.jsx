import React, { useEffect, useState, useRef } from "react";
import sweetAlert from "sweetalert2";
import moment from "moment/min/moment-with-locales";
import swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";
import { notiAll } from "../common/utils/Notification";
import { useSelector } from "react-redux";
import Pagination from "../views/paginate/Pagination";
import SearchCase from "../views/allCaseAndPendingCase/SearchCase";
import CasePending from "../views/allCaseAndPendingCase/CasePending";
import { useStoreCase, useStoreSetting } from "../service/zustand/storeCase";
import { storeAuth } from "../service/store/storeZustand";

// import Pagination from "react-paginate";



const ListCaseUnResolve = () => {


  const { user } = useSelector((state) => ({ ...state }))
  const dataUser = storeAuth((state) => state.user)

  const { listCasePending, changeStatusCase, changeDetailCase, DeleteCase } = useStoreCase()
  const { resCasePending, resChangeStatus, resChangeDetailCase } = useStoreCase()

  const { getEditors } = useStoreSetting()

  const data = useStoreSetting((state) => state.resEditor.resultData);

  //console.log("🚀 ~ file: ListCaseUnResolve.jsx:29 ~ ListCaseUnResolve ~ data:", data)
  // if (!data) {
  //   // Data is not available yet, you can show a loading indicator or return null
  //   return null;
  // }
  //const editorSelect = data.filter((item) => { return item.select === true })
  // console.log("🚀 ~ file: ListCaseUnResolve.jsx:36 ~ ListCaseUnResolve ~ editorSelect:", editorSelect)

  // const editorName = editorSelect.map((item) => {return item.username})
  // console.log("🚀 ~ file: ListCaseUnResolve.jsx:35 ~ ListCaseUnResolve ~ editorName:", editorName)

  const responseDelete = useStoreCase((state) => state.resDeleteCase)

  const [textEmpty, setTextEmpty] = useState(false)

  //*state สำหรับการแก้ไข
  const [values, setValues] = useState({
    id: "",
    detail: "",
  });


  //* state สำหรับการค้นหาข้อมูล
  const [search, setSearch] = useState("");
  //* state สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState([]);
  const ITEM_PER_PAGE = 20;

  useEffect(() => {
    loadData();

    getEditors()

  }, [currentPage]);

  //function axios ดึงข้อมูล
  const loadData = async () => {
    await listCasePending(currentPage, ITEM_PER_PAGE);
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
  const handleOnchange = async (e, id) => {
    try {
      let values = {
        id: id,
        status: e,
        closeCaseBy: dataUser.username
      };
      await changeStatusCase(values)
      notiAll();
      loadData();

      // message.success("ทำการเปลี่ยนแปลงสถานะสำเร็จ");

      sweetAlert.fire("แจ้งเตือน", "ทำการเปลี่ยนแปลงสถานะสำเร็จ", "success");
      // toast.success("ทำการเปลี่ยนแปลงสถานะสำเร็จ")
    } catch (error) {
      console.log(error);
    }

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

  const handleOk2 = async () => {

    const id = values.id;
    if (values.detail === '') {
      setTextEmpty(true)
      return
    }
    await changeDetailCase(id, { values })

    swal.fire("แจ้งเตือน", "ทำการแก้ไขรายละเอียดสำเร็จ", "success");
    loadData();
    setValues({ detail: "" });
    setIsModalOpen2(false);
  };
  const handleCancel2 = () => {
    setTextEmpty(false)
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
  const confirmDelete = async (id) => {

    try {
      const responseDelete = await DeleteCase(id);
      //console.log(JSON.stringify(responseDelete)); // แสดงค่าในรูปแบบของ JSON
      sweetAlert.fire("แจ้งเตือน", responseDelete, "success");
      loadData();
    } catch (error) {
      console.log(error);
    }


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
      // console.log("ยืนยันการลบ", result);
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
    setTextEmpty(false)
    setValues({ ...values, [event.target.name]: event.target.value });
  };


  // ตัวแปรสำหรับหาจำนวนของเคสที่รอการแก้ไข
  const pendingCases = resCasePending.filter((item) => item.status === "รอการแก้ไข");
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
  let eveningTime = moment("8:32 PM", "h:mm A");

  // console.log(currentTime);
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
          data={resCasePending}
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
          editor={data}
          textEmpty={textEmpty}
        />

        {resCasePending.length >= 0 ? "" :
          <Pagination
            currentPage={currentPage}
            pageCount={Math.ceil(resCasePending.length / ITEM_PER_PAGE)}
            handlePageClick={handlePageClick}
          />}

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
