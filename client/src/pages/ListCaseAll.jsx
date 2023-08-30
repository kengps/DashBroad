import React, { useEffect, useState } from "react";
import CaseAll from "../views/allCaseAndPendingCase/CaseAll";
import Pagination from "../views/paginate/Pagination";
import { useStoreCaseAll } from "../service/zustand/storeCase";
import { Col, DatePicker, Row, Space, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/th";
import DatePickerCase from "../views/DatePicker/DatePicker";
import { Box } from "@mui/material";

import * as loadingData from "../../src/assets/Json/loading.json";
import * as successData from "../../src/assets/Json/success.json";
import * as loading3 from "../../src/assets/Json/loading3.json";
import * as loading4 from "../../src/assets/Json/loading4.json";
import * as loading5 from "../../src/assets/Json/loading5.json";


import Lottie from "react-lottie";
import FadeIn from "react-fade-in/lib/FadeIn";
import WaitLoading from "../components/LoadingAndRedirect/WaitLoading";

const { RangePicker } = DatePicker;




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
  const ITEM_PER_PAGE = 10;

  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(false);


  useEffect(() => {

    listCaseAll(currentPages, ITEM_PER_PAGE, selectedDate);
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
    } else {

      setFilteredData(resListCaseAll);
    }
  }, [selectedDate, resListCaseAll]);


  const handlePageClick = ({ selected }) => {
    setCurrentPages(selected);
  };

  const handleDateChange = async (dates) => {
    if (dates && dates.length === 2) {
      const [start, end] = dates;
      setSelectedDate([
        start.format("YYYY-MM-DD HH:mm"),
        end.format("YYYY-MM-DD HH:mm"),
      ]);
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
          <DatePickerCase handleDateChange={handleDateChange} />

        </Col>
      </Row>
      <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", paddingTop: '4px' }}>
        <Row justify={"end"}>
          <Col>
            {loading && (
            //  <Lottie options={defaultOptions} height={500} width={500} />
            <WaitLoading/>
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