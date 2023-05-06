import React, { useState } from "react";
import { Menu, Switch } from "antd";

const themeChange = ({ theme, changeTheme }) => {
  return (
    <div className={` ${theme}`}>
      <Switch
        checked={theme === "dark"}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
    </div>
  );
};

export default themeChange;
