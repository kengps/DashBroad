import { Typography, Space } from 'antd'
import { GithubOutlined,WhatsAppOutlined } from "@ant-design/icons";
import React from 'react'

const AppFooter = () => {
  //style
  const navDropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "2px",
  };
  return (
    <div className='AppFooter' >
      <Typography.Link style={navDropdownItemStyle} href='tel:0811212121'><WhatsAppOutlined />+66811212121 </Typography.Link>
      <Typography.Text >© 2023 Copyright: By 1212312121</Typography.Text>

      <Typography.Link style={navDropdownItemStyle} href='https://github.com/kengps' target='_blank'><GithubOutlined /> Github</Typography.Link>


    </div>
  )
}

export default AppFooter