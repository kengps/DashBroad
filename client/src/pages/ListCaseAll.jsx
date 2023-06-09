import React, { useEffect, useState, useRef } from "react";
import MyForm from "../components/NavbarFormcase/ProblemType";
import { listCases } from "../api/case";
import { Button, Card, Tag, Typography, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import axios from "axios";
import Paginate from "react-paginate";
import moment from "moment/min/moment-with-locales";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";

const ListCaseAll = () => {
  //* Paginate
  const [currentPage, setCurrentPage] = useState([]);
  const ITEM_PER_PAGE = 10;

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_APP_API
        }/listcase?page=${currentPage}&limit=${ITEM_PER_PAGE}`
      );

      setData(response.data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const cardRef = useRef(null);
  const textRef = useRef([]);

  // const handleCopy = (e) => {
  //   e.preventDefault();
  //   const textToCopy = textRef.current.innerText;
  //    navigator.clipboard.writeText(textToCopy);
  //   message.success("Copied to clipboard");

  //   console.log('eee',textRef.current.innerText);
  // };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };
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
              <th scope="col"></th>
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
      
        <Paginate
        
          previousLabel={currentPage > 0 ? '< ก่อนหน้า' : 'หน้าแรก'}
          nextLabel={currentPage === Math.ceil(data.length / ITEM_PER_PAGE) - 1 ? 'สุดท้าย' : 'ถัดไป >'}
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

export default ListCaseAll;
