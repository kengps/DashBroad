import { Box } from "@mui/material";
import { Col, DatePicker, Row } from "antd";
import moment from "moment";
import "moment/locale/th";
import React, { useEffect, useState } from "react";
import { useStoreCaseAll } from "../service/zustand/storeCase";
import DatePickerCase from "../views/DatePicker/DatePicker";
import CaseAll from "../views/allCaseAndPendingCase/CaseAll";
import Pagination from "../views/paginate/Pagination";

import * as loading4 from "../../src/assets/Json/loading4.json";
import * as successData from "../../src/assets/Json/success.json";


import WaitLoading from "../components/LoadingAndRedirect/WaitLoading";

const { RangePicker } = DatePicker;

import { useSearchParams } from "react-router-dom";



const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loading4.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const defaultOptions2 = {
  loop: true,
  autoplay: true,
  animationData: successData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};

const ListCaseAll = () => {



  const { listCaseAll, resListCaseAll } = useStoreCaseAll(); // เพิ่ม isLoading จาก useStoreCaseAll
  const { setCurrentPages, currentPages } = useStoreCaseAll();
  const ITEM_PER_PAGE = 20;


  const [searchParams, setSearchParams] = useSearchParams();
  const [pagesParams, setPagesParams] = useSearchParams();


  // สร้างตัวแปรมารับค่า จาก search.get แล้วส่งไปยัง Component CasePending SearchCase




  const [selectedDate, setSelectedDate] = useState(null);



  const [filteredData, setFilteredData] = useState([]);
  const dataTotal = filteredData.length

  const [loading, setLoading] = useState(false);

  const [count, setCount] = useState(dataTotal);


  useEffect(() => {

    listCaseAll(currentPages, ITEM_PER_PAGE, selectedDate);

    setPagesParams({ page: currentPages + 1, limit: ITEM_PER_PAGE })
  }, [currentPages, listCaseAll, selectedDate]);


  useEffect(() => {

    if (selectedDate) {

      const filtered = resListCaseAll.filter(
        (data) =>
          moment(data.createdAt).isBetween(
            moment(selectedDate[0]),
            moment(selectedDate[1]).endOf("day")
          )
      );


      setFilteredData(filtered);
      setCount(filteredData.length)

    } else {

      setFilteredData(resListCaseAll);
      setCount(filteredData.length)
    }
  }, [selectedDate, resListCaseAll]);


  const handlePageClick = ({ selected }) => {


    setCurrentPages(selected);

  };

  const handleDateChange = async (dates) => {



    if (dates && dates.length === 2) {
      const [start, end] = dates;

      setSelectedDate([
        start.format("YYYY-MM-DD"),
        end.format("YYYY-MM-DD"),
      ]);

      setSearchParams({
        startDate: start.format("DD-MM-YYYY"),
        endDate: end.format("DD-MM-YYYY"),
      });

      setLoading(true); // เริ่มแสดง Spin หลังจากมีการเลือกวันที่

      setTimeout(async () => {
        await listCaseAll(currentPages, ITEM_PER_PAGE, [
          start.format("YYYY-MM-DD"),
          end.format("YYYY-MM-DD"),
        ]);
        setLoading(false);
      }, 1500)

    } else {
      setSelectedDate(null);
      setSearchParams({});
      setLoading(true); // ไม่ต้องแสดง Spin ในกรณีไม่มีการเลือกวันที่
      setTimeout(() => {
        setLoading(false); // ไม่ต้องแสดง Spin ในกรณีไม่มีการเลือกวันที่
      }, 1500);
      setFilteredData(resListCaseAll);
    }
  };

  return (
    <div>
      <Row justify={"start"} style={{ marginTop: "6rem" }}>

        <Col>
          <DatePickerCase handleDateChange={handleDateChange} count={count} />

        </Col>
      </Row>
      <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", paddingTop: '4px' }}>
        <Row justify={"end"}>
          <Col>
            {loading && (
              //  <Lottie options={defaultOptions} height={500} width={500} />
              <WaitLoading />
            )}
          </Col>
        </Row>
        {!loading && (
          <CaseAll
            data={filteredData}
            currentPage={currentPages}
            ITEM_PER_PAGE={ITEM_PER_PAGE}
          />
        )}
      </Box>

      {!loading && (<Pagination
        currentPage={currentPages}
        pageCount={Math.ceil(filteredData.length / ITEM_PER_PAGE)}
        handlePageClick={handlePageClick}
      />)}
    </div>
  );
};

export default ListCaseAll;




// คอมโพเนนต์ ListCaseAll:
// ListCaseAll เป็นคอมโพเนนต์หลักที่ใช้สำหรับดึงข้อมูลและแสดงข้อมูลทั้งหมด
// คอมโพเนนต์นี้รับผิดชอบในการดึงข้อมูลจาก API และเก็บข้อมูลในสถานะ (state) ซึ่งจะถูกนำไปใช้กับคอมโพเนนต์ CaseAll และ Pagination
// เมื่อมีการเปลี่ยนหน้าใน Pagination คอมโพเนนต์ ListCaseAll จะเรียกใช้ฟังก์ชัน handlePageClick เพื่อเปลี่ยนค่า currentPage และทำการดึงข้อมูลใหม่จาก API ตามหน้าที่ผู้ใช้เลือก