import React, { useState } from "react";
import LoadingNotLogin from "./LoadingNotLogin";
import { useSelector } from "react-redux";

const IndexRouter = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  console.log('IndexRouter',user);
  const [ok , setOk] = useState(false);
  return user && user.token ? children : <LoadingNotLogin />;
};

export default IndexRouter;
