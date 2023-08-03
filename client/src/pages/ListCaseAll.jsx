import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Tag, Typography, message } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import axios from "axios";
import Paginate from "react-paginate";
import moment from "moment/min/moment-with-locales";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";
import CaseAll from "../views/allCaseAndPendingCase/CaseAll";
import Pagination from "../views/paginate/Pagination";

const ListCaseAll = () => {
  //* Paginate
  const [currentPage, setCurrentPage] = useState([]);
  const ITEM_PER_PAGE = 10;

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API
        }/listcase?page=${currentPage + 1}&limit=${ITEM_PER_PAGE}`
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


  const handlePageClick = ({ selected }) => {

    setCurrentPage(selected);
  };

  return (
    <>
      <CaseAll data={data} currentPage={currentPage} ITEM_PER_PAGE={ITEM_PER_PAGE} />
      <Pagination
        currentPage={currentPage}
        pageCount={Math.ceil(data.length / ITEM_PER_PAGE)}
        handlePageClick={handlePageClick}
      />
    </>
  );
};

export default ListCaseAll;



// คอมโพเนนต์ ListCaseAll:
// ListCaseAll เป็นคอมโพเนนต์หลักที่ใช้สำหรับดึงข้อมูลและแสดงข้อมูลทั้งหมด
// คอมโพเนนต์นี้รับผิดชอบในการดึงข้อมูลจาก API และเก็บข้อมูลในสถานะ (state) ซึ่งจะถูกนำไปใช้กับคอมโพเนนต์ CaseAll และ Pagination
// เมื่อมีการเปลี่ยนหน้าใน Pagination คอมโพเนนต์ ListCaseAll จะเรียกใช้ฟังก์ชัน handlePageClick เพื่อเปลี่ยนค่า currentPage และทำการดึงข้อมูลใหม่จาก API ตามหน้าที่ผู้ใช้เลือก