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

  const [offset, setOffset] = useState(null);
  const [lastUpdateId, setLastUpdateId] = useState(null);
  const [messageId, setMessageId] = useState('');
  const [notDetail, setNotDetail] = useState(false)

  useEffect(() => {
    // Listen for updates from backend through socket
    const socket = io('http://localhost:5000');
    socket.on('updateFromTelegram', (data) => {
      // Handle updates from backend
      console.log('Update received from backend:', data);
    });

    const intervalId = setInterval(() => getUpdatesChat(offset, lastUpdateId, setOffset, setLastUpdateId, socket), 1000);

    return () => clearInterval(intervalId);
  }, [offset]);


  const { user } = useSelector((state) => ({ ...state }))
  const dataUser = storeAuth((state) => state.user)


  const { listCasePending, changeStatusCase, changeDetailCase, DeleteCase, updateMessageId } = useStoreCase()
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
    file: ""
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

  const handleSendMessage = async (e, file, id) => {
    try {


      const chatid = import.meta.env.VITE_TELEGRAM_CHATID_GROUB.split(',').map((id) => id.trim());
      e.preventDefault();

      const textToCopy = `${textRef.current.innerText}`;
      const textSendTg = encodeURIComponent(textRef.current.innerText);

      await chatid.map(async (chatid) => {
        return axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`, {
          chat_id: chatid,
          text: textToCopy,
        }).then((res) => {

          const messageId = res.data.result.message_id

          const value = {
            id: id,
            messageId: messageId
          }
          updateMessageId(value)


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
    } catch (error) {
      console.log("🚀  file: ListCaseUnResolve.jsx:169  error:", error)

    }

  };

  //func สำหรับการแก้ไข สถานะ โดยมีการกำหนดตัวแปร  statusCase เพื่อทำการนำไปลูป
  const statusCase = ["รอการแก้ไข", "แก้ไขสำเร็จ"];


  const handleOnchange = async (e, id, caseId, messageId) => {

    const user = dataUser.payLoad.user.username

    let messageIds, _id;

    messageId.forEach(item => {

      // ดึงค่า messageId และ _id ออกมา
      messageIds = item.messageId;
      _id = item._id;
    });


    try {
      let values = {
        id: id,
        status: e,
      };

      await changeStatusCase(values)
      notiAll();
      loadData();


      const text = `[${user.split('@')[0].toUpperCase()}] : ${caseId} ปิดเคสเรียบร้อยแล้ว ขอบคุณครับผม 🙏`

      await chatid.map(async (chatid) => {
        return axios.post(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendMessage`, {
          chat_id: chatid,
          text: text,
          reply_to_message_id: messageIds

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
    if (notDetail) {
      setTextEmpty(false);
    } else if (values.detail === '') {
      setTextEmpty(true);
      return;
    }

    const formData = new FormData();
    const id = values.id;

    for (let key in values) {
      formData.append(key, values[key]);
    }

    try {
      const res = await changeDetailCase(id, formData)
      console.log("🚀  file: ListCaseUnResolve.jsx:274  res:", res)

      if (res) {
        swal.fire('แจ้งเตือน', 'ทำการแก้ไขรายละเอียดสำเร็จ', 'success');
        setValues(Object.fromEntries(Object.keys(values).map((key) => [key, ''])));
        setIsModalOpen2(false);
        loadData();
      }


    } catch (error) {
      console.error('Error changing detail:', error.message);
    }
  };

  // const handleOk2 = async () => {

  //   if (notDetail) {
  //     setTextEmpty(false)
  //   } else if (values.detail === '') {
  //     setTextEmpty(true)
  //     return
  //   }


  //   const formData = new FormData();

  //   const id = values.id;
  //   for (let key in values) {

  //     formData.append(key, values[key]);
  //   }
  //   console.log("🚀  file: ListCaseUnResolve.jsx:264  formData:", formData)
  //   try {

  //     await changeDetailCase(id, formData);

  //     swal.fire("แจ้งเตือน", "ทำการแก้ไขรายละเอียดสำเร็จ", "success");
  //     setValues(Object.fromEntries(Object.keys(values).map(key => [key, ""])));
  //     setIsModalOpen2(false);
  //     loadData();

  //   } catch (error) {
  //     console.error('Error changing detail:', error.message);
  //   }
  // };

  const handleCancel2 = () => {
    setValues("");
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
    event.preventDefault()

    if (event.currentTarget.name === 'file') {
      const file = event.currentTarget.files[0];
      setValues({ ...values, [event.currentTarget.name]: file });
    } else {
      setValues({ ...values, [event.currentTarget.name]: event.currentTarget.value });
    }
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
    e.preventDefault()

    const textToCopy = textRef.current.innerText;
    const base_url = `https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_TOKEN}/sendPhoto`

    const chatid = import.meta.env.VITE_TELEGRAM_CHATID_GROUB.split(',').map((id) => id.trim());

    if (file) {
      console.log('ไฟล์ชื่อ', file);
    }

    await Promise.all(chatid.map(async (id) => {
      await axios.post(base_url, {
        chat_id: id,
        photo: `${import.meta.env.VITE_REACT_APP_IMG}/${file}`,
        caption: textToCopy

      }).then((res) => {
        const messageId = res.data.result.message_id
        console.log("🚀  file: ListCaseUnResolve.jsx:145  messageId:", messageId)
        const value = {
          id: id,
          messageId: messageId
        }
        updateMessageId(value)

      }).catch(err => console.log(err));

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

          const message = update.message;
          const chatId = message.chat.id;
          const messageId = message.message_id;
          const updateId = update.update_id;


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

  const onChangeCheckBox = (e) => {

    if (e.target.checked === true) {

      setNotDetail(true)
    } else {
      setNotDetail(false)
    }
  }

  const notiBot = (e, id,) => {
    // console.log("🚀  file: ListCaseUnResolve.jsx:525  id:", id)

    // console.log('messageId', messageId);

  }
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
          notiBot={notiBot}
          onChangeCheckBox={onChangeCheckBox}
          notDetail={notDetail}
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
