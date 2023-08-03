import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Tag, Typography, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";

import moment from "moment/min/moment-with-locales";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";

const CaseAll = ({ data, currentPage, ITEM_PER_PAGE }) => {


    const textRef = useRef([]);
    return (
        <div className="mt-5">
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Helmet>
                    <title> Dashboard | CaseAll </title>
                </Helmet>
                <table className="table table-striped ">
                    <thead className="">
                        <tr className="table-secondary ">
                            <th scope="col">CodeCase</th>
                            <th scope="col">ผู้แจ้งปัญหา</th>
                            <th scope="col">ประเภทปัญหา</th>
                            <th scope="col">รายละเอียด</th>
                            <th scope="col">ค่ายเกม</th>
                            <th scope="col">ผู้ลงเคส</th>
                            <th scope="col">ผู้แก้ไข</th>
                            <th scope="col">เวลาสร้างเคส</th>
                            <th scope="col">สถานะ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data
                            .reverse((a, b) => b.id - a.id)
                            .slice(
                                currentPage * ITEM_PER_PAGE,
                                (currentPage + 1) * ITEM_PER_PAGE
                            )
                            .map((data, index) => (
                                <tr key={index}>
                                    <th scope="row">{data.caseId}</th>
                                    <td>{data.reporter}</td>
                                    <td>{data.problemDetail}</td>
                                    <td style={{ wordWrap: "break-word", maxWidth: "30ch" }}>
                                        {data.detail}
                                    </td>
                                    <td>{data.campgame}</td>
                                    <td>{data.recorder}</td>
                                    <td>{data.editors}</td>
                                    <td>
                                        {moment(data.createdAt).locale("th").format("lll")} น.
                                    </td>

                                    <td>{data.status}</td>
                                    <td>
                                        <Card
                                            ref={textRef}
                                            style={{
                                                background: "#f0f0f0",
                                                border: "1px solid gray",
                                            }}
                                        >
                                            <div style={{ fontSize: "8px" }}>
                                                <p className="d-block m-0">
                                                    <strong>เคส:</strong> {data.caseId}
                                                </p>
                                                <p className="d-block m-0">
                                                    <strong>ผู้แจ้งปัญหา: </strong>
                                                    {data.reporter}
                                                </p>
                                                <p className="d-block m-0">
                                                    <strong>ประเภทปัญหา: </strong>
                                                    {data.problemDetail}
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
                                                    {data.recorder}
                                                </p>
                                                <p className="d-block m-0">
                                                    <strong> ผู้แก้ไข: </strong>
                                                    {data.editors}
                                                </p>
                                            </div>
                                        </Card>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              paddingRight: "10px",
              color: "silver",
              fontWeight: "bold",
            }}
            disabled
          >
            PAGE {currentPage + 1} OF{" "}
            {Math.ceil(data.length / ITEM_PER_PAGE) + " "}{" "}
          </p>

          <Paginate
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

            // renderPage={({ page, onClick, isActive }) => (
            //   <button
            //     key={page}
            //     onClick={onClick}
            //     className={isActive ? "active" : ""}
            //   >
            //     {isActive ? `page ${page} of ${Math.ceil(data.length / ITEM_PER_PAGE)}` : page}
            //   </button>
            // )}
          />
        </div> */}
            </Box>
        </div>
    )
}

export default CaseAll



// คอมโพเนนต์ CaseAll:
// CaseAll เป็นคอมโพเนนต์ที่ใช้แสดงข้อมูลที่ดึงมาจาก API และแบ่งหน้าตามค่าปัจจุบันของหน้า (currentPage) ที่เปลี่ยนไปทุกครั้งที่ผู้ใช้กดเปลี่ยนหน้า
// คอมโพเนนต์นี้รับ Props มาสำหรับข้อมูล (data) ที่จะแสดง ค่าปัจจุบันของหน้า (currentPage) และจำนวนรายการที่แสดงในหนึ่งหน้า (ITEM_PER_PAGE)
// เมื่อข้อมูลถูกส่งมาแล้ว คอมโพเนนต์ CaseAll จะแสดงผลข้อมูลที่อยู่ในหน้าปัจจุบัน และแสดงหน้า Pagination เพื่อให้ผู้ใช้เปลี่ยนหน้าได้
