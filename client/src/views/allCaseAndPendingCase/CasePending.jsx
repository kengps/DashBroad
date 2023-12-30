import React, { useEffect, useState, useRef } from "react";

import { Button, Card, Tag, message, Select, Modal, Input, Drawer, Avatar, Space, Image } from "antd";
import { CopyOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import Table from 'react-bootstrap/Table';
import { InputGroup } from "react-bootstrap";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import moment from "moment/min/moment-with-locales";
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';
import { MdDoNotDisturb } from "react-icons/md";
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import ImageIcon from '@mui/icons-material/Image';
import TextField from '@mui/material/TextField';
import PictureInput from "../picture/PictureInput";
import EditFromCase from "../FromEdit/EditFromCase";

const { TextArea } = Input;


const CasePending = ({ data,
  search,
  currentPage,
  ITEM_PER_PAGE,
  statusCase,
  handleOnchange,
  handleSendMessage,
  showModal,
  handleOk,
  handleCancel,
  showModal2,
  handleOk2,
  handleCancel2,
  handleChangeDetail,
  handleClick,
  selectedCase,
  isModalOpen,
  isModalOpen2,
  textRef,
  pendingCasesCount,
  pendingCases,
  currentTime,
  eveningTime,
  handleCopy2,
  showDrawer,
  onClose,
  textEmpty,
  handleSendPhoto,
  open, setSearch, setSelectedCase
  , handleCopyText,
  notiBot,
  onChangeCheckBox,
  notDetail
}) => {


  const [userProfileImage, setUserProfileImage] = useState({});



  const base64String = "aW1nLTJjMjE3MDdjLWNkZjAtNDc0ZS04MzNmLWQyMWNlYmU5YTY0NS5wbmc=";
  const binaryString = atob(base64String);
  const blob = new Blob([binaryString], { type: "image/png" });
  const imageUrl = URL.createObjectURL(blob);

  // console.log("🚀  file: CasePending.jsx:52  imageUrl:", imageUrl)
  // // console.log("🚀  file: CasePending.jsx:48  fileData:", fileData)
  const imgPic = data.map((item) => { return item.file })


  const dddd = imgPic.map((item) => item?.data?.data).filter(Boolean);

  // ตรวจสอบว่า dddd มีข้อมูลหรือไม่ก่อนที่จะแสดงผล

  useEffect(() => {

    if (dddd.length > 0) {
      // ทำสิ่งที่คุณต้องการกับ dddd
      const bufferData = dddd[0] || [];


      const fileName = String.fromCharCode(...bufferData);
      setUserProfileImage(fileName)

    } else {
      console.log("dddd is empty or undefined");
    }
  }, [])


  //const imageUrl2 = `data:${data.file.contentType};base64, ${data.file.data.$binary.base64}`;

  // const bufferData =  dddd[0] || [];
  // console.log("🚀  file: CasePending.jsx:76  bufferData:", bufferData)

  // const fileName = String.fromCharCode(...bufferData);
  // console.log('fileName',fileName);

  // const [imageSrc, setImageSrc] = useState(null);

  // useEffect(() => {
  //   // สร้าง Blob จากข้อมูลที่อยู่ใน file.data.data
  //   const blob = new Blob([Uint8Array.from(bufferData)], { type: fileName});

  //   // สร้าง Blob URL
  //   const blobUrl = URL.createObjectURL(blob);
  //   console.log("🚀  file: CasePending.jsx:79  blobUrl:", blobUrl)

  //   // ให้ Blob URL เป็น source ของรูปภาพ
  //   setImageSrc(blobUrl);

  //   // ควรลบ Blob URL เมื่อไม่ใช้งาน
  //   return () => URL.revokeObjectURL(blobUrl);
  // }, []); // ต้องมี dependency เป็นไปตามที่คุณใช้ใน useEffect

  // const imageUrl2 = `data:${imgPic[65].contentType};base64, ${fileName}`;

  // console.log("🚀  file: CasePending.jsx:73  imageUrl2:", imageUrl2)
  // console.log("🚀  file: CasePending.jsx:60  imageUrl2:", imageUrl2)

  //console.log('ทดสอบ',`${import.meta.env.VITE_REACT_APP_IMG}/${imageUrl2}`);
  const targetDate = moment(); // 24 ตุลาคม 2023



  const formattedDate = targetDate.locale('th').format('ll เวลา LTS');


  const currentTime1 = moment();
  const isMorning = currentTime1.isBetween(moment('08:35', 'HH:mm'), moment('20:35', 'HH:mm'));

  const timeOfDay = isMorning ? '(กะเช้า)' : '(กะดึก)';




  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const now = new Date();
  //     const hours = now.getHours();
  //     console.log("🚀  file: CasePending.jsx:65  hours:", hours)
  //     const minutes = now.getMinutes();

  //     // ตรวจสอบว่าเป็นเวลา 13:00 หรือ 18:00 หรือไม่
  //     if ((hours === 13 && minutes === 37) || (hours === 13 && minutes === 39)) {
  //       // เรียก handleCopy ในกรณีที่ตรงเวลาที่กำหนด
  //       console.log('====================================');
  //       console.log(minutes);
  //       console.log('====================================');
  //       handleCopy2()
  //     }
  //   }, 60000); // ตรวจสอบทุก 1 นาที

  //   return () => clearInterval(intervalId);
  // }, [])
  const [values, setValues] = useState({

    file: "",

  });

  const inputValue = (name) => (e) => {
    console.log('d', e.target.files);
    console.log('d', e.target.name);
    if (e.target.name === 'file') {
      if (e.target.files.length === 0) {
        setImageURLs("");
      } else {
        setValues({ ...values, [name]: e.target.files[0] });
        setImages([...e.target.files]);
      }

    } else {
      setValues({ ...values, [name]: e.target.value });

      setIsButtonDisabled(false)

    }


  };

  //preview img
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);



  return (


    <div >

      <Table className="table table-striped ">
        <thead>
          {/* <img src={`${import.meta.env.VITE_REACT_APP_IMG}/${userProfileImage}`} alt="รูปภาพ" /> */}
          <tr className="table-secondary" style={{ fontSize: "16px" }}>
            <th scope="col">CodeCase</th>
            <th scope="col">ผู้แจ้งปัญหา</th>
            <th scope="col">ประเภท</th>
            <th scope="col">รายละเอียด</th>
            <th scope="col">รูปภาพ</th>
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
                  {/* {dangerouslysetInnerHTML = {{__html: data.detail}}} */}
                  <div dangerouslySetInnerHTML={{ __html: data.detail }} />
                </td>
                <td>

                  <Space direction="vertical" size={16}>
                    <Space direction="horizontal" size={16}>
                      {data.file ? (
                        <Image
                          width={100}
                          src={`${import.meta.env.VITE_REACT_APP_IMG}/${data.file}`}
                        />
                      ) : (
                        <>
                          <Image
                            preview={false}
                            width={70}
                            src={`${import.meta.env.BASE_URL}noImg2.png`}
                          />

                        </>
                      )}
                    </Space>
                  </Space>

                </td>
                <td>{data.campgame.length === 0 ? <Tag color="volcano"><i>ไม่ระบุ</i></Tag> : <>{data.campgame}</>}</td>
                <td>{data.recorder}</td>


                <td>{data.editors.length !== 0 ? data.editors : "@pr0jectsp"}</td>



                <td>
                  {moment(data.createdAt).locale("th").format("l LT")} น.
                </td>
                <td>
                  <Select
                    style={{ width: "100%" }}
                    value={data.status}
                    onChange={(e) => handleOnchange(e, data._id, data.caseId, data.messageId)}
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
                    ส่งเคส
                  </Button>


                  <Button
                    className="me-1 btn-change"
                    onClick={() => showModal2(data._id, data.file)}
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
                    title="Send Case"
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
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
                          {selectedCase.file && (
                            <>
                              <Avatar size={64}
                                icon={<img src={`${import.meta.env.VITE_REACT_APP_IMG}/${selectedCase.file}`} />}
                              />
                            </>
                          )}

                          <p className="d-block m-0">
                            <strong>{"[เคส]: "}</strong> {selectedCase.caseId}
                          </p>
                          <p className="d-block m-0">
                            <strong>{"[ผู้แจ้งปัญหา]:"} </strong>
                            {selectedCase.reporter}
                          </p>
                          <p className="d-block m-0">
                            <strong>{"[ประเภทปัญหา]: "} </strong>
                            {selectedCase.problemDetail}
                          </p>
                          <p
                            className="d-block m-0"
                            style={{
                              wordWrap: "break-word",
                              maxWidth: "30ch",
                            }}
                          >
                            <strong>{"[รายละเอียด]: "}</strong>
                            <br />
                            <div dangerouslySetInnerHTML={{ __html: selectedCase.detail }} />

                          </p>
                          <p className="d-block m-0 font-weight-bold">
                            {selectedCase.campgame && (
                              <>
                                <strong> {"[ค่ายเกม]: "}</strong>
                                {selectedCase.campgame}
                              </>
                            )}
                            {/* <strong>{"[ค่ายเกม]: "}</strong> {selectedCase.campgame.length === 0 ? <> - </> : <>{selectedCase.campgame}</>} */}
                          </p>
                          <p className="d-block m-0">
                            <strong> {"[ผู้ลงเคส]: "}</strong>
                            {selectedCase.recorder.split('@')[0]}
                          </p>
                          <p className="d-block m-0">
                            <strong> {"[ผู้แก้ไข]: "} </strong>
                            {selectedCase.editors.length !== 0 ? selectedCase.editors : "@pr0jectsp"}
                          </p>
                        </div>

                        <Button
                          color=""
                          onClick={(e) => handleCopyText(e)}
                          className="float-end btn-copy"
                          style={{ marginLeft: "2px" }}



                        >
                          <CopyOutlined />

                        </Button>

                        {selectedCase.file
                          ? <Button
                            onClick={(e) => handleSendPhoto(e, selectedCase.file, selectedCase._id)}
                            className="btn-primary float-end"
                            style={{ marginRight: "2px" }}
                          >
                            <ImageIcon />

                          </Button>
                          :
                          <Button
                            onClick={(e) => {
                              handleSendMessage(e, selectedCase.file, selectedCase._id)
                              notiBot(e, selectedCase._id)
                            }}
                            className="btn-primary float-end"
                            style={{ marginRight: "2px" }}
                          >
                            <FormatColorTextIcon />

                          </Button>}

                        {/* <Button
                          onClick={(e) => handleCopy(e, selectedCase.file)}
                          className="btn-primary float-end"
                        >
                          <SendOutlinedIcon />

                        </Button> */}


                      </Card>
                    )}
                  </Modal>
                  <Modal
                    encType="multipart/form-data"
                    title="แก้ไขรายละเอียด"
                    open={isModalOpen2}
                    onOk={handleOk2}
                    onCancel={handleCancel2}

                  >
                    <EditFromCase handleChangeDetail={handleChangeDetail} handleOk2={handleOk2} textEmpty={textEmpty} onChangeCheckBox={onChangeCheckBox} data={data} notDetail={notDetail} />

                  </Modal>
                </td>
              </tr>
            ))}
          <Drawer
            title="Basic Drawer"
            placement="right"
            onClose={onClose}
            open={open}
          >
            <Card ref={textRef}>

              <p>


                {isMorning ? <p>🌞 เคสค้างประจำวันที่ {formattedDate} {timeOfDay} 🌞</p> : <p>🌜 สรุปเคสค้างวันที่ {formattedDate}  {timeOfDay} 🌛</p>}
              </p>
              <p>
                <p>
                  <br />
                  {pendingCasesCount === 0
                    ? "- ไม่มีรายการค้าง"
                    : ` เคสค้างจำนวน ${pendingCasesCount} รายการ`}
                  <p>
                    {pendingCases.map((item, index) => (
                      <p key={index}>
                        {index + 1}. {item.caseId} -{" "}
                        {item.status}
                      </p>
                    ))}
                  </p>
                </p>
                \
              </p>
              {/* <p>ส่งเคสโดย...{user}</p> */}
              {/* <div style={{ textAlign: 'center' }}>
                <p>𝔹𝕀𝕆𝔾𝔸𝕄𝕀ℕ𝔾</p>
              </div> */}
              <Button onClick={handleCopy2} className="btn-primary float-end">
                <SendOutlinedIcon />
              </Button>
            </Card>
          </Drawer>
        </tbody>
      </Table>

    </div>
  )
}

export default CasePending