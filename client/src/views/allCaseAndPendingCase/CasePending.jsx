import React, { useEffect, useState, useRef } from "react";

import { Button, Card, Tag, message, Select, Modal, Input, Drawer } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import Table from 'react-bootstrap/Table';
import { InputGroup } from "react-bootstrap";

import moment from "moment/min/moment-with-locales";
import { useQueryParam, NumberParam, StringParam } from 'use-query-params';


const { TextArea } = Input;

const CasePending = ({ data,
  search,
  currentPage,
  ITEM_PER_PAGE,
  statusCase,
  handleOnchange,
  handleCopy,
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

  open, setSearch, setSelectedCase }) => {


    const [foo, setFoo] = useQueryParam('foo', StringParam);



  const targetDate = moment(); // 24 ตุลาคม 2023

  const formattedDate = targetDate.locale('th').format('lll');



  const currentTime1 = moment();
  const isMorning = currentTime1.isBetween(moment('08:35', 'HH:mm'), moment('20:35', 'HH:mm'));

  const timeOfDay = isMorning ? '(กะเช้า)' : '(กะดึก)';


  //const apiData = "รบกวนตรวจสอบยูสเชอร์ Kfc1s81659336487293 ค่ายเกม Evoplay transactionID : 5314578960 Project ID: 8587 ลูกค้าขอดูรายละเอียดการเล่นยอดนี้หน่อยครับ";

  // ใช้การแบ่งข้อมูลด้วยเครื่องหมาย ":" และช่องว่างเป็นตัวแบ่ง

    
  // const apiData = selectedCase.detail
  // const parts = apiData.split(/[:\s]/);


  // // ลบส่วนข้อมูลที่ว่างเปล่าออก
  // const filteredParts = parts.filter(part => part.trim() !== "");

  // // จัดรูปแบบข้อมูลใหม่โดยให้แต่ละส่วนเป็นคู่ key-value
  // let formattedData = "";
  // let key = "";
  // for (const part of filteredParts) {
  //   if (!key) {
  //     key = part;
  //   } else {
  //     const value = part === "undefined" ? "" : part; // แทนค่า "undefined" ด้วยค่าว่าง
  //     formattedData += `${key} : ${value}\n`;
  //     key = "";
  //   }
  // }

  // console.log('wfh',formattedData);



    // const mapdata = data.map((item) => item.detail)
    // console.log("🚀  file: CasePending.jsx:92  mapdata:", mapdata)


  return (


    <div >

      <Table className="table table-striped ">
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
                          <p className="d-block m-0">
                            "<strong>{"[เคส]: "}</strong> {selectedCase.caseId}
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
                            {selectedCase.detail}
                          </p>
                          <p className="d-block m-0 font-weight-bold">
                            <strong>{"[ค่ายเกม]: "}</strong> {selectedCase.campgame.length === 0 ? <> - </> : <>{selectedCase.campgame}</>}
                          </p>
                          <p className="d-block m-0">
                            <strong> {"[ผู้ลงเคส]: "}</strong>
                            {selectedCase.recorder}
                          </p>
                          <p className="d-block m-0">
                            <strong> {"[ผู้แก้ไข]: "} </strong>
                            {selectedCase.editors.length !== 0 ? selectedCase.editors : "@pr0jectsp"} "
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
                    {textEmpty && (<span style={{ color: 'red' }}>กรุณากรอกรายละเอียด</span>)}
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


                {isMorning ? <p>🌞 สรุปเคสค้างวันที่ {formattedDate} {timeOfDay} 🌞</p> : <p>🌜 สรุปเคสค้างวันที่ {formattedDate}  {timeOfDay} 🌛</p>}
              </p>
              <p>
                <p>
                  {pendingCasesCount === 0
                    ? "- ไม่มีรายการค้าง"
                    : ` เคสค้างจำนวน ${pendingCasesCount} รายการ`}
                  <p>
                    {pendingCases.map((item, index) => (
                      <p key={index}>
                        {index + 1}. {item.caseId} -{" "}
                        {item.status === "รอการแก้ไข"
                          ? "กำลังดำเนินการ"
                          : "รอการตรวจสอบ"}
                      </p>
                    ))}
                  </p>
                </p>
              </p>
              {/* <div style={{ textAlign: 'center' }}>
                <p>𝔹𝕀𝕆𝔾𝔸𝕄𝕀ℕ𝔾</p>
              </div> */}
              <Button onClick={handleCopy2} className="btn-primary float-end">
                <CopyOutlined />
              </Button>
            </Card>
          </Drawer>
        </tbody>
      </Table>

    </div>
  )
}

export default CasePending