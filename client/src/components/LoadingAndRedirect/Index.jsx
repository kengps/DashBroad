import React from "react";
import LoadingNotLogin from "./LoadingNotLogin";
import { useSelector } from "react-redux";

const IndexRouter = ({ children }) => {
  const { user } = useSelector((state) => ({ ...state }));
  return user && user.token ? children : <LoadingNotLogin />;
};

export default IndexRouter;
