import React, { useEffect, useState, useRef } from "react";
import CaseAll from "../views/allCaseAndPendingCase/CaseAll";
import Pagination from "../views/paginate/Pagination";
import { useStoreCaseAll } from "../service/zustand/storeCase";

const ListCaseAll = () => {

  //*zustand 

  const { listCaseAll, resListCaseAll } = useStoreCaseAll()
  //* Paginate
  const { setCurrentPages, currentPages } = useStoreCaseAll();

  const ITEM_PER_PAGE = 10;


  useEffect(() => {
    listCaseAll(currentPages, ITEM_PER_PAGE)
  }, [currentPages, listCaseAll]);


  const handlePageClick = ({ selected }) => {

    setCurrentPages(selected);
  };

  return (
    <>
      <CaseAll data={resListCaseAll} currentPage={currentPages} ITEM_PER_PAGE={ITEM_PER_PAGE} />
      <Pagination
        currentPage={currentPages}
        pageCount={Math.ceil(resListCaseAll.length / ITEM_PER_PAGE)}
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