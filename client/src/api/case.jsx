import axios from "axios";

export const sendCase = async (value) => {
  console.log("ข้อมูลที่ส่งมา1", value);
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/createcase`,
    value
  );
};
export const listCases2 = async (value) => {
  console.log("ข้อมูลที่ส่งมา1", value);
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/listcase`,
    value
  );
};


export const listCases = async (value,currentPage,ITEM_PER_PAGE) => {
  console.log("ข้อมูลที่ส่งมา2", ITEM_PER_PAGE);
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/listcase`,
    {
      params: {
        page: currentPage,
        limit: ITEM_PER_PAGE,
        value: value,
      },
    }
    
  );
  }


export const changeStatus = async (value) => {
  console.log("ข้อมูลที่ส่งมา3", value);
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/change-status`,
    value
  );
};

export const deleteCase = async (id) => {
  console.log("ข้อมูลที่ส่งมา3", id);
  return await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API}/delete/${id}` );
};




export const resetPassword1 = async (authtoken, id , values) => {
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/user/${id}`,values,

    {
      headers: {
        authtoken,
      },
    }
  );
};

export const changeDetail = async (id,value) => {
  console.log("ข้อมูลที่ส่งมา5", value);
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/change-detail/${id}`,
    value
  );
};
// export const changeDetail = async (id, value) => {
//   console.log("ข้อมูลที่ส่งมา5", value);
//   return await axios.put(
//     `${import.meta.env.VITE_REACT_APP_API}/change-detail/${id}`,
//     { detail: value }
//   );
// };

//*listCases
// params ใน axios.get() ใช้สำหรับกำหนด query parameters ที่จะส่งไปยัง API endpoint ที่เราต้องการเรียกใช้ โดยมีรูปแบบเป็น object ที่ประกอบไปด้วย key-value pairs ของ query parameters ที่ต้องการส่ง ในที่นี้ เรากำหนด params ได้ดังนี้:

// page: เป็น query parameter ที่ส่งหมายเลขหน้า (page number) ไปยัง API endpoint โดยให้ค่าเท่ากับ currentPage ซึ่งเป็นตัวแปร state ที่เก็บค่าหมายเลขหน้าปัจจุบันของตารางข้อมูล
// limit: เป็น query parameter ที่ส่งจำนวนข้อมูลต่อหน้า (page size) ไปยัง API endpoint โดยให้ค่าเท่ากับ ITEM_PER_PAGE ซึ่งเป็นค่าคงที่ที่กำหนดไว้ในโค้ด
// value: เป็น query parameter ที่ส่งค่าของ value ไปยัง API endpoint โดยเราสามารถใช้ค่าที่รับมาจากอาร์กิวเมนต์ value ได้ หากต้องการส่งค่านี้ไปยัง API endpoint
// ดังนั้น การกำหนด params ดังนี้เพื่อให้สามารถส่ง query parameters ไปยัง API endpoint ในรูปแบบของ page, limit, และ value ได้ถูกต้อง และเป็นสิ่งสำคัญที่ใช้ในการดึงข้อมูลจาก API endpoint ที่เราต้องการใช้งาน