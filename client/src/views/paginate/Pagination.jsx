import React, { useState } from 'react'
import Paginate from "react-paginate";
const Pagination = ({ currentPage, pageCount, handlePageClick }) => {

    // //* Paginate

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <p style={{ paddingRight: "10px", color: "silver", fontWeight: "bold" }} disabled>
                PAGE {currentPage + 1} OF {Math.ceil(pageCount) + " "}

            </p>

            <Paginate
                previousLabel={currentPage > 0 ? "< ก่อนหน้า" : "หน้าแรก"}
                nextLabel={currentPage === pageCount - 1 ? "สุดท้าย" : "ถัดไป >"}
                breakLabel="..."
                pageCount={pageCount}
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
        </div>
    )
}

export default Pagination




// คอมโพเนนต์ Pagination:
// Pagination เป็นคอมโพเนนต์ที่ใช้สร้างหน้าต่างการแสดงผลข้อมูลแบ่งหน้า (Pagination) ซึ่งเป็นตัวเลขหรือลิงก์ที่ช่วยให้ผู้ใช้งานสามารถเปลี่ยนหน้าของข้อมูลได้ง่ายขึ้น
// คอมโพเนนต์นี้รับ Props มาสำหรับค่าปัจจุบันของหน้า (currentPage) และจำนวนหน้าทั้งหมด (pageCount) ที่ต้องการแสดงผล และฟังก์ชันเพื่อจัดการเมื่อผู้ใช้เปลี่ยนหน้า (handlePageClick)
// เมื่อผู้ใช้คลิกเปลี่ยนหน้า คอมโพเนนต์ Pagination จะเรียกใช้ฟังก์ชัน handlePageClick ที่ถูกส่งเข้ามาและส่งค่าหน้าที่ผู้ใช้เลือกไป

