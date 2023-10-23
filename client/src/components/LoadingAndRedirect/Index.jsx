import React, { useState } from "react";
import LoadingNotLogin from "./LoadingNotLogin";
import { useSelector } from "react-redux";
import { storeAuth } from "../../service/store/storeZustand";

const IndexRouter = ({ children }) => {


    //const { user } = useSelector((state) => ({ ...state }));

  const { isAuthenticated, user } = storeAuth();



  // if(!user.token) {
  //    setTimeout(() => {
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("expirationDate");
  //    },2000)
  //   }
  //  console.log("➡️  file: Index.jsx:12  user: >", user.token)
  //console.log("➡️  file: Index.jsx:10  isAuthenticated: > ", isAuthenticated)

  const [ok, setOk] = useState(false);

  return user && user.token ? children : <LoadingNotLogin />;
};

export default IndexRouter;



// import React, { useState } from "react";
// import LoadingNotLogin from "./LoadingNotLogin";
// import { useSelector } from "react-redux";
// import { storeAuth } from "../../service/store/storeZustand";

// const IndexRouter = ({ children }) => {


//   //  const { user } = useSelector((state) => ({ ...state }));

//   const { isAuthenticated, user } = storeAuth();
  
//   const username = user.payLoad.user.username
//   const token = user.token
  
//   console.log("➡️  file: Index.jsx:14  username:", username)
//   console.log("➡️  file: Index.jsx:16  token:", token)

//   console.log("➡️  file: Index.jsx:12  user: >", user)
//   console.log("➡️  file: Index.jsx:10  isAuthenticated: > ", isAuthenticated)

//   const [ok, setOk] = useState(false);

//   return username && token ? children : <LoadingNotLogin />;
// };

// export default IndexRouter;
