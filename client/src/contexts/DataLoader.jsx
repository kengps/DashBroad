import React, { useState, useEffect } from "react";
import { listUser } from "../api/user";

const DataLoader = ({ children }) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listUser()
      .then((res) => {
        console.log(res);
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <>{children(value)}</>;
};

export default DataLoader;
