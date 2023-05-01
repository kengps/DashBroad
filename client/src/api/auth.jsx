import axios from "axios";

export const login = async (value) => {
    console.log("ข้อมูลที่ส่งมา3", value);
    return await axios.post(
      `${import.meta.env.VITE_REACT_APP_API}/login`,value );
  };
  
  
  