import axios from "axios";

export const login = async (value) => {

  return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/login`, value);
};
export const loginLine = async (value) => {

  return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/login-line`, value);
};


export const loginFacebook = async (value) => {
console.log("➡️  file: auth.jsx:14  value:", value)

  return await axios.post(`${import.meta.env.VITE_REACT_APP_API}/login-facebook`, value);
}; 
export const currentUser = async (authtoken) =>

  await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );




  export const currentAdmin = async (authtoken) =>

  await axios.post(
    `${import.meta.env.VITE_REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
