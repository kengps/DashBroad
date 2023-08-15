import axios from "axios";


export const createDetail = async (value) => {
  console.log("ข้อมูลที่ส่งมา1", value);
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/detail-case`,
    value
  );
};

export const listDetailCase = async (value) => {
  console.log("ข้อมูลที่ส่งมา มีไหม", value);
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/listdetail2`,
    value
  );
};
