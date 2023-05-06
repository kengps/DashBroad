import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_REACT_APP_API}/listcase`
      );
      setData(response.data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, fetchData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;