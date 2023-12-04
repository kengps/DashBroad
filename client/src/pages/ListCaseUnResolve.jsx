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
import { useSearchParams } from "react-router-dom";
import axios from "axios";
// import Pagination from "react-paginate";
import { io } from 'socket.io-client';
import { getUpdatesChat } from "../common/Telegram/sendAndReply";





const ListCaseUnResolve = () => {

  const [offset, setOffset] = useState(732838985);
  const [lastUpdateId, setLastUpdateId] = useState(null);

  useEffect(() => {
    // Listen for updates from backend through socket
    const socket = io('http://localhost:5000');
    socket.on('updateFromTelegram', (data) => {
      // Handle updates from backend
      console.log('Update received from backend:', data);
    });

    const intervalId = setInterval(() => getUpdatesChat(offset, lastUpdateId, setOffset, setLastUpdateId ,socket), 1000);

    return () => clearInterval(intervalId);
  }, [offset]);


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


  //* สำหรับการค้นหาข้อมูล โดยสร้าง  state จาก useSearchParams 

  const [search, setSearch] = useSearchParams();

  // สร้างตัวแปรมารับค่า จาก search.get แล้วส่งไปยัง Component CasePending SearchCase
  const searchTerm = search.get('search') || '';
  // console.log("🚀  file: ListCaseUnResolve.jsx:61  searchTerm:", searchTerm)


  //* state สำหรับ Pagination
  const [currentPage, setCurrentPage] = useState([]);
  const ITEM_PER_PAGE = 20;

  useEffect(() => {

    // const socketIo = () => {
    //   const socket = io('http://localhost:5000');
    //   console.log("🚀  file: ListCaseUnResolve.jsx:25  socket:", socket.on('hello', (msg) => {
    //     console.log("🚀  file: ListCaseUnResolve.jsx:80  msg:", msg)

    //   }))
    // }
    // socketIo();
    loadData();
    getEditors()



  }, [currentPage]);

  //function axios ดึงข้อมูล
  const loadData = async () => {
    await listCasePending(currentPage, ITEM_PER_PAGE);
  };

  const textRef = useRef([]);
  //function  handleCopy สำหรับการ copy โดยหลังผ่านไป 3 วิ จะให้ทำการปิด sweetAlert


  const token = '6700000221:AAFxM4FjxfSAa29nsVLT6HuJT6asEghHgwk'
  const chatid = import.meta.env.VITE_TELEGRAM_CHATID_GROUB.split(',').map((id) => id.trim());
  const textToCopy = `${textRef.current.innerText}`;
  const sendTelegram = () => {
    chatid.map(async (chatid) => {
      return axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: chatid,
        text: textToCopy,
      });
    });
  }

  const handleSendMessage = async (e) => {

    const chatid = import.meta.env.VITE_TELEGRAM_CHATID_GROUB.split(',').map((id) => id.trim());
    e.preventDefault();

    const textToCopy = `${textRef.current.innerText}`;
    const textSendTg = encodeURIComponent(textRef.current.innerText);

    // navigator.clipboard.writeText(textToCopy);
    // //toast.success("Copied to clipboard");


    // ใช้ Promise.all เพื่อรอให้ทุก sendMessage เสร็จสิ้น

    // const sendMessagePromises = chatid.map(async (chatid) => {
    //   return axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`, {
    //     chat_id: chatid,
    //     text: textToCopy,
    //   });
    // });
    await chatid.map(async (chatid) => {
      return axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: chatid,
        text: textToCopy,
      });
    });
    sweetAlert.fire({
      title: "แจ้งเตือน",
      text: "ส่งเคสสำเร็จ",
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



  const closeCaseByBot = () => {

  }

  const handleOnchange = async (e, id, caseId) => {

    const text = `${caseId} ปิดเคสเรียบร้อยแล้ว ✅`
    try {
      let values = {
        id: id,
        status: e,
        closeCaseBy: dataUser.payLoad.user.username
      };

      await changeStatusCase(values)
      notiAll();
      loadData();

      await chatid.map(async (chatid) => {
        return axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`, {
          chat_id: chatid,
          text: text,
        });
      });
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
    console.log("🚀  file: ListCaseUnResolve.jsx:271  id:", id)
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
  const handleCopy2 = async (e) => {

    e.preventDefault();
    const textToCopy = textRef.current.innerText;


    // วิธีที่ 1: ใช้ API navigator.clipboard.writeText()
    const chatid = import.meta.env.VITE_TELEGRAM_CHATID_GROUB.split(',').map((id) => id.trim());
    await chatid.map(async (chatid) => {
      return axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: chatid,
        text: textToCopy,
      });
    });
    sweetAlert.fire({
      title: "แจ้งเตือน",
      text: "ส่งสรุปเคสระหว่างกะสำเร็จ",
      icon: "success",
      didClose: () => {
        setIsModalOpen(false);
      },
    });
    setTimeout(() => {
      sweetAlert.close();
      setOpen(false);
    }, 1000);
    // navigator.clipboard
    //   .writeText(textToCopy)
    //   .then(() => {
    //     //toast.success("Copied to clipboard");
    //     sweetAlert.fire({
    //       title: "แจ้งเตือน",
    //       text: "Copied to clipboard",
    //       icon: "success",
    //       didClose: () => {
    //         setIsModalOpen(false);
    //       },
    //     });
    //     setTimeout(() => {
    //       sweetAlert.close();
    //     }, 1000);
    //   })
    //   .catch((error) => {
    //     console.log("Error copying to clipboard:", error);
    //     //toast.error("Failed to copy to clipboard");
    //     sweetAlert.fire({
    //       title: "แจ้งเตือน",
    //       text: "Failed to copy to clipboard",
    //       icon: "error",
    //     });
    //   });
  };

  // Drawer สำหรับ copy สรุปเคสประจำวัน
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  let currentTime = moment().locale('th').utcOffset("+07:00").format("LT");
  let eveningTime = moment("20:32 PM", "h:mm A").locale('th');


  const handleSendPhoto = async (e, file) => {

    const textToCopy = textRef.current.innerText;
    const base_url = `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendPhoto`

    const chatid = import.meta.env.VITE_TELEGRAM_CHATID_GROUB.split(',').map((id) => id.trim());



    await Promise.all(chatid.map(async (id) => {
      const response = await axios.post(base_url, {
        chat_id: id,
        photo: `${import.meta.env.VITE_REACT_APP_IMG}/${file}`,
        caption: textToCopy

      });

      // console.log(response.data.result);
    }));



    sweetAlert.fire({
      title: "แจ้งเตือน",
      text: "ส่งเคสสำเร็จ",
      icon: "success",
      didClose: () => {
        setIsModalOpen(false);
      },
    });
    setTimeout(() => {
      sweetAlert.close();
    }, 1000);

  }
  //closeCaseByBot


  // const [offset, setOffset] = useState(732838985);
  // console.log("🚀  file: ListCaseUnResolve.jsx:410  offset:", offset)
  // const [lastUpdateId, setLastUpdateId] = useState(null);

  const getUpdates = async () => {
    try {
      const base_url = "https://api.telegram.org/bot6447136137:AAH--dlGcGoJfU7q4bwaRzRKYVuln2mmoNs/getUpdates";

      const response = await axios.get(base_url, { params: { offset } });
      const result = response.data;


      if (result.ok) {
        const updates = result.result;

        updates.forEach(update => {

          console.log("🚀  file: ListCaseUnResolve.jsx:440  update:", update)
          const message = update.message;
          const chatId = message.chat.id;
          const messageId = message.message_id;
          const updateId = update.update_id;

          console.log("updateId:", updateId, "lastUpdateId:", lastUpdateId);
          if (updateId > lastUpdateId) {
            setLastUpdateId(updateId);
          }

          if (message.text.includes('แก้ไขรายการ')) {
            sendReplyMessage(chatId, messageId);
            console.log(message.text, "มีคำนี้");
          } else {
            console.log(message.text, "ไม่มีคำนี้");
          }
        });

        // อัปเดต offset โดยใช้ update_id ของข้อมูลล่าสุด
        if (updates.length > 0) {
          const latestUpdateId = updates[updates.length - 1].update_id;
          console.log("🚀  file: ListCaseUnResolve.jsx:446  latestUpdateId:", latestUpdateId)
          setOffset(latestUpdateId + 1);
          socket.emit('telegramUpdate', { updates });
        }
      }
    } catch (error) {
      console.log('ไม่มีแชทใหม่');
    }
  };

  //send reply
  const sendReplyMessage = async (chatid, message_id) => {
    console.log("🚀  file: ListCaseUnResolve.jsx:410  message_id:", message_id)

    await axios.post(`https://api.telegram.org/bot6447136137:AAH--dlGcGoJfU7q4bwaRzRKYVuln2mmoNs/sendMessage`, {
      chat_id: chatid,
      text: "BOT : ขอบคุณครับ",
      reply_to_message_id: message_id,
    })
  }

  /* The above code is using the `useEffect` hook in React to set up an interval that calls the
  `getUpdates` function every 1000 milliseconds (1 second). The interval is started when the
  component is mounted or when the `offset` variable changes. The `useEffect` hook also returns a
  cleanup function that clears the interval when the component is unmounted or when the `offset`
  variable changes. */

  // useEffect(() => {
  //   // Listen for updates from backend through socket
  //   const socket = io('http://localhost:5000');
  //   socket.on('updateFromTelegram', (data) => {
  //     // Handle updates from backend
  //     console.log('Update received from backend:', data);
  //   });

  //   const intervalId = setInterval(getUpdates, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //     socket.disconnect();
  //   };
  // }, [offset]);


  //
  // func สำหรับ copy สรุปเคส
  const handleCopyText = async (e) => {
    // const textCheck = "แก้ไขรายการและปรับยอดให้แล้วนะครับ"
    // const findText = "แก้ไขรายการ"
    // if (textCheck.indexOf(findText) !== -1) {
    //   findText.length !== 0 ? console.log(findText, "indexOf true") : console.log(findText, "กรุณากรอกข้อมูล");
    // } else {
    //   console.log(findText, "indexOf false");

    // }
    // if (textCheck.includes(findText)) {
    //   findText.length !== 0 ? console.log(findText, "includes true") : console.log(findText, "กรุณากรอกข้อมูล");
    // } else {
    //   console.log(findText, "includes false");
    // }


    const base_url = "https://api.telegram.org/bot6447136137:AAH--dlGcGoJfU7q4bwaRzRKYVuln2mmoNs/getUpdates"

    const parameters = {
      "offset": "782380398"
    }
    console.log("🚀  file: ListCaseUnResolve.jsx:452  offset:", offset)
    await axios.get(base_url, parameters).then((response => {
      console.log("🚀  file: ListCaseUnResolve.jsx:452  response:", response)


      const result = response.data;

      if (result.ok) {
        result.result.forEach(update => {
          console.log("🚀  file: ListCaseUnResolve.jsx:461  update:", update)
          const message = update.message;
          const chatid = message.chat.id
          const message_id = message.message_id
          console.log("🚀  file: ListCaseUnResolve.jsx:414  message:", message)
          if (message.text.includes('แก้ไขรายการ')) {
            sendReplyMessage(chatid, message_id);
            console.log(message.text, "มีคำนี้")
          } else {
            console.log(message.text, "ไม่มีคำนี้")

          }
          // setOffset(update.update_id + 1)
          // if (message && ["test", "hello"].includes(message.text.toLowerCase())) {
          //   console.log("ขอบคุณครับ")

          //   // sendReply(message.chat.id, "ขอบคุณครับ");
          // }
          // if (message && ["แก้ไขเรียบร้อยแล้ว", "hello"].includes(message.text.toLowerCase())) {
          //   sendReply(message.chat.id, "ขอบคุณครับ");
          // } else if (message && ["hi", "hello"].includes(message.text.toLowerCase())) {
          //   sendReply(message.chat.id, "ขอบคุณครับผม");
          // }

          // // Update the offset to avoid processing the same message again
          // setOffset(update.update_id + 1);
        });
      }

    })).catch(err => console.log(err))



    e.preventDefault();
    const textToCopy = textRef.current.innerText;
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


  // console.log(currentTime);
  return (
    <div className="mt-5">
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Helmet>
          <title> Dashboard | CaseUnResolve </title>
        </Helmet>

        <SearchCase
          search={searchTerm}
          setSearch={setSearch}
          onClickButton={onClickButton}
          showDrawer={showDrawer}
        />

        <CasePending
          handleCopyText={handleCopyText}
          handleSendPhoto={handleSendPhoto}
          data={resCasePending}
          search={searchTerm}
          currentPage={currentPage}
          ITEM_PER_PAGE={ITEM_PER_PAGE}
          statusCase={statusCase}
          handleOnchange={handleOnchange}
          handleSendMessage={handleSendMessage}
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
