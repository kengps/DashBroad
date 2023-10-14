import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { storeAuth } from "../../service/store/storeZustand";

const LoadingNotLogin = () => {
  const navigate = useNavigate();
  let [count, setCount] = useState(5); //กำหนด 3 = 3 วิ
  // const { user } = storeAuth();

  useEffect(() => {

    // if (!user) {
    //   localStorage.removeItem("token");
    //   localStorage.removeItem("expirationDate");
    // }

    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate("/login");
    return () => clearInterval(interval);
  }, [count]);
  return (
    <div className="redirectLogin">
      <br />
      <br />
      <br />
      <br />
      <br />
      <h1>คุณยังไม่ได้ทำการ Login ระบบกำลังนำคุณไปยังหน้า Login ในอีก...{count}</h1>
    </div>
  );
};

export default LoadingNotLogin;
