import React, { useState, useEffect } from "react";
import { listUser } from "../api/user";
import {listCases2 } from '../api/case'


const DataLoader = ({ children }) => {
  const [value, setValue] = useState([]);

  
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCases2()
      .then((res) => {
        // console.log('มีอะไรไหม',res.data);
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <>{children(value)}</>;
};

export default DataLoader;
