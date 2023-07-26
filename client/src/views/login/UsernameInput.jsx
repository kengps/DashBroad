import React from "react";
import { TextField } from "@mui/material";

const UsernameInput = ({ handleChange }) => {
    
  return (
    <TextField name="username" label="Username" onChange={handleChange} />
  );
};

export default UsernameInput;
