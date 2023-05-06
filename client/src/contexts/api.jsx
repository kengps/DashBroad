import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

const ListCaseContext = createContext();

const ListCaseProvider = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_API
          }/listcase`
        );

        setData(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();
  }, []);

  return (
    <ListCaseContext.Provider value={{ data }}>
      {children}
    </ListCaseContext.Provider>
  );
};

export { ListCaseContext, ListCaseProvider };
