import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';

const RememberMeCheckbox = ({ rememberMe, handleRememberMeChange }) => {

    
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={rememberMe}
          onChange={handleRememberMeChange}
          value="remember"
          color="primary"
        />}
      label="Remember me"
    />
  );
};

export default RememberMeCheckbox;
