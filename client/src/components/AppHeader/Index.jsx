import { Badge, Space, Typography, Image, Button, Menu, Modal } from "antd";
import React, { useEffect, useState } from "react";
import {
  BellFilled,
  MailOutlined,
  LogoutOutlined,
  LoginOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUser } from "../Services/authorize";
import { NavDropdown, InputGroup } from "react-bootstrap";
import { BiUser, AiOutlineSetting } from "react-icons/all";
import { listUser, resetPassword } from "../../api/user";
import swal  from 'sweetalert2'
const AppHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => ({ ...state }));
  //ดึง user มาเพื่อทำการเปลี่ยนข้อมูล
//  const {userId} = user.id


  const [valueUser, setValueUser] = useState([]);

  useEffect(() => {
    listUser()
      .then((res) => {
        console.log(res.data);
       
        setValueUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log('ดู user ', valueUser);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  //style
  const navDropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  //modal changePassword
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const showModal = (id) => {
    setIsModalOpen(true);
    console.log("id", id);
    setValues({ ...values, id: id });
  };

  const handleOk = () => {
    setIsModalOpen(false);
    //
    
    resetPassword(user.token, values.id, { values })
    .then((res) => {
      swal.fire('แจ้งเตือน','ทำการเปลี่ยนรหัสผ่านสำเร็จ', 'success')
      setValues('')
    
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="AppHeader">
      <Image src="" alt="" />
      <Typography.Title level={2}>DashBoard Support Case</Typography.Title>
      <Space>

        {user && (
          <NavDropdown
            title={
              <>
                <AccountCircleIcon /> {user.username}
              </>
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item
              style={navDropdownItemStyle}
              onClick={() => showModal(user?.id)}
            >
              <AiOutlineSetting />
              เปลี่ยนรหัสผ่าน
            </NavDropdown.Item>

            <NavDropdown.Divider />
            <NavDropdown.Item
              onClick={handleLogout}
              style={navDropdownItemStyle}
            >
              {" "}
              <LogoutOutlined /> ออกจากระบบ
            </NavDropdown.Item>
          </NavDropdown>
        )}
      </Space>
      <Modal
        title="เปลี่ยนรหัสผ่าน"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputGroup>
          <InputGroup.Text>รหัสผ่านใหม่นะ</InputGroup.Text>
          <input
            type="text"
            name="password"
            onChange={handleChangePassword}
            className="form-control"
          />
        </InputGroup>
      </Modal>
    </div>
  );
};

export default AppHeader;
