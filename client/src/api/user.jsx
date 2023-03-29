import axios from "axios";

export const listUser = async (value) => {
  console.log("ข้อมูลที่ส่งมา", value);
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/list-user`,
    value
  );
};
