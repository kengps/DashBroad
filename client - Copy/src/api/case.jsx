import axios from "axios";

export const sendCase = async (value) => {
  console.log("ข้อมูลที่ส่งมา", value);
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/createcase`,
    value
  );
};


export const listCases = async (value) => {
  console.log("ข้อมูลที่ส่งมา", value);
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/listcase`,
    value
  );
};
