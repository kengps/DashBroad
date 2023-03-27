import { Menu } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const navigate = useNavigate()
  return (
    <div className="SideMenu">
      <Menu
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        items={[
          {
            label: "DashBorad",
            key: "/",
          },
          {
            label: "ฟอร์มบันทึกเคส",
            key: "/formcontrol",
          },
          {
            label: "รายการเคสทั้งหมด",
            key: "/listcase",
          },
          {
            label: "รายการเคสที่ยังไม่ได้แก้ไข",
            key: "/listunresolve",
          },
          {
            label: "Customers",
            key: "/listuser",
          },
        ]}
      ></Menu>
    </div>
  );
}

export default SideMenu 