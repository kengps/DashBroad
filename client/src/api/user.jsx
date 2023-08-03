import axios from "axios";

export const listUser = async (value) => {
  return await axios.get(
    `${import.meta.env.VITE_REACT_APP_API}/list-user`,
    value
  );
};

export const resetPassword = async (authtoken, id, values) => {
  
  return await axios.put(
    `${import.meta.env.VITE_REACT_APP_API}/user/${id}`,
    values,

    {
      headers: {
        authtoken,
      },
    }
  );
};

export const deleteUser = async (id) => {
  console.log("ข้อมูลที่ส่งมา3", id);
  return await axios.delete(
    `${import.meta.env.VITE_REACT_APP_API}/delete-user/${id}`
  );
};

export const changStatus = async (authtoken, value) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/change-user`,
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
};


export const changRole = async (authtoken, value) => {
  return await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/change-role-user`,
    value,
    {
      headers: {
        authtoken,
      },
    }
  );
};
