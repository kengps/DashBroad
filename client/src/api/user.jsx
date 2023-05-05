import axios from "axios";

export const listUser = async (value) => {
 
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/list-user`,
    value
  );
};

export const resetPassword = async (authtoken, id , values) => {
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/user/${id}`,values,

    {
      headers: {
        authtoken,
      },
    }
  );
};