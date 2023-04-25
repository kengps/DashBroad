import { Menu, Tag ,Avatar, Badge, Space } from 'antd'
import React, { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {BugOutlined  ,SyncOutlined ,HomeOutlined , DashboardOutlined , FormOutlined ,UnorderedListOutlined ,LoadingOutlined ,UserOutlined ,EditOutlined ,TeamOutlined} from '@ant-design/icons'
import { listCases } from '../../api/case'



const SideMenu = () => {
  const navigate = useNavigate()

  const [data, setData] = useState([]);



  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    listCases()
      .then((res) => {
        //console.log("ทดสอบนะ", res.data);

        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="SideMenu">
      <Menu
      mode='inline'
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        items={[
          {
            label: "Dashboard",
            key: "/",
            icon: <DashboardOutlined />
          },
          {
            label: "หน้าการทำงาน",
            key: "homework", 
            icon: <HomeOutlined /> ,
            children:[{
              label: "ฟอร์มบันทึกเคส",
              key: "/formcontrol",
              icon: <FormOutlined />
            },
            {
              label: "รายการเคสทั้งหมด",
              key: "/listcase",
              icon: <UnorderedListOutlined />
            },
            {
              label: (
                <span>
                  รายการเคสที่รอการแก้ไข{' '}
                  <Badge
                    
                    count={data.filter((data) => data.status === 'รอการแก้ไข').length}
                    style={{ backgroundColor: 'red', fontWeight: 'bold', animation: 'blinking 1s infinite'}}
                  />
                </span>
            ),
              key: "/listunresolve",
              icon:<BugOutlined />,
              // badge: <Badge count={data.filter((data) => data.status === 'รอการแก้ไข').length} />

              
            },
            ]
          },
         
          {
            label: "Customers",
            key: "user",
            icon:<UserOutlined />,
              children:[
                {
                  label: "แก้ไขรหัสผ่าน",
                  key: "/reset-password",
                  icon:<EditOutlined />
                },
                {
                  label: "สมาชิกทั้งหมด",
                  key: "/listuser",
                  icon:<TeamOutlined />
                }
              ]
          },
        ]}
      ></Menu>
      
    </div>
  );
}

export default SideMenu 