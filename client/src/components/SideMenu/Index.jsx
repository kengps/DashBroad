import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridOnIcon from "@mui/icons-material/GridOn";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuIcon from "@mui/icons-material/Menu";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import MuiAppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { deepOrange } from "@mui/material/colors";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";

import { InputGroup, NavDropdown } from "react-bootstrap";
import { RiLockPasswordLine } from "react-icons/all";

import {
  LogoutOutlined
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert2";

import { Badge, Input, Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { listCases } from "../../api/case";
import { notiDetail, notiMD5 } from "../../common/utils/Notification";
import { useStore } from "../../service/zustand/storeCase";


import '../../CSS/Responsive.css';
import SettingBar from "../../views/settingMunuBar/settingBar";
import { storeAuth } from "../../service/store/storeZustand";
const drawerWidth = 240;


const openedMixin = (theme) => ({
  backgroundColor: "#F2F4F4",

  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  backgroundColor: "#F2F4F4",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#F2F4F4",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",

  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function MiniDrawer() {
  const { user } = useSelector((state) => ({ ...state }));





  const { updateUserInfo, logout, fetchUserInfo, login } = storeAuth()



  const dataUser = storeAuth((state) => state.user)
 



  //zustand
  const { resetPasswords, dataResetpassword } = useStore()

  const isLoginLine = localStorage.getItem("loginLine");

  console.log(isLoginLine);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  // const [dataChange, setDataChange] = useState("");
  const [noti, setNoti] = useState({});

  useEffect(() => {


    setNoti(notiDetail());
    setInterval(() => {
      let nmd5 = notiMD5();
      if (localStorage.noti !== nmd5) {
        localStorage.noti = nmd5;
        setNoti(notiDetail());
      }
    }, 1000);
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

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState("");

  const [isDataFilled, setDataFilled] = useState(false);

  const [password, setPassword] = useState("");


  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);


  //settingBar
  const [open2, setOpen2] = React.useState(false);
  const handleClick = (e) => {
    setOpen2(!open2);

    if (!open) {
      setOpen(true)
      setOpen2(true);
    }
  };



  const handleDrawerOpen = () => {
    setOpen(true);

  };

  const handleDrawerClose = () => {
    setOpen(false);

    setOpen2(false);

  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menuKey) => {
    setSelectedMenu(menuKey);
  };

  //* modal changePassword
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  const showModal = (id) => {
    setIsModalOpen(true);

    setValues({ ...values, id: id });
  };

  //todo modal สำหรับการกด reset รหัสผ่าน หากมีการกด OK จะทำการเรียก API จาก func resetPassword
  const handleOk = async () => {

    if (values.password === '') {
      setIsPasswordEmpty(true);
      return;
    }
    

    await resetPasswords(dataUser.token, values.id, { values })

    setValues({ password: "" })

    const result = await swal.fire("แจ้งเตือน", "ทำการเปลี่ยนรหัสผ่านสำเร็จ", "success")


    if (result.isConfirmed || result.dismiss) {
      setIsModalOpen(false)
    }



    // setTimeout(() => {
    //   setIsModalOpen(false)
    // }, 2000);

    //* โดยจะส่ง token และ id เข้าไป



    // resetPassword(user.token, values.id, { values })
    //   .then((res) => {
    //     setValues({ password: "" });
    //     swal.fire("แจ้งเตือน", "ทำการเปลี่ยนรหัสผ่านสำเร็จ", "success");
    //     // console.log("ง/ง", res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });g
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsPasswordEmpty(false);
    setValues({ password: "" })
  };
  const handleChangePassword = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value });
    setPassword(e.target.value);
    setIsPasswordEmpty(false);
    console.log(e.target.name);
    console.log(e.target.value);


  };

  //* style
  const navDropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };

  //todo func สำหรับกดปุ่มออกจากระบบ
  const handleLogout = () => {

    // dispatch({
    //   type: "LOGOUT",
    //   payload: null,
    // });
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar position="fixed" open={open} sx={{ backgroundColor: "" }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Typography
            className="Typography1"
            // variant="h4"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {selectedMenu ? selectedMenu : "Support Case Biogaming"}
          </Typography>
          {/* โปรไฟล์ */}
          <Box>
            {/* {dataUser && (
              <>
                <Button>{dataUser.payLoad.user.username}</Button>
              </>
            )} */}
            {dataUser && (
              <NavDropdown
                title={
                  <Tooltip title={dataUser.payLoad.user.username} placement="left" arrow>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {/*                 
                <Avatar alt={user.username.slice(0,1).toUpperCase()} src="a" /> */}
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>
                        {dataUser.payLoad.user.username.slice(0, 1).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                }
                id="basic-nav-dropdown"
              >
                {!isLoginLine && (<NavDropdown.Item
                  style={navDropdownItemStyle}
                  onClick={() => showModal(user?.id)}
                >

                  <RiLockPasswordLine />
                  เปลี่ยนรหัสผ่าน
                </NavDropdown.Item>
                )}

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
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          {/* //! ทำโปรไฟล์ */}

          <IconButton
            onClick={handleDrawerClose}
            style={{ backgroundColor: "white" }}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <Divider />
        <List>
          {[
            {
              label: "แดชบอร์ด",
              key: `/dashboard/app`,
              icon: <QueryStatsIcon />,
            },
            {
              label: "ฟอร์มบันทึกเคส",
              key: "/dashboard/formcontrol",
              icon: <WidgetsOutlinedIcon />,
            },
            {
              label: (
                <span>
                  รายการเคสทั้งหมด{" "}
                  <Badge
                    count={noti.notiAllCaseCount}
                    style={{
                      backgroundColor: "#52BE80",
                      fontWeight: "bold",
                      animation: "blinking 1s infinite",
                    }}
                  />
                </span>
              ),
              key: "/dashboard/listcase",
              icon: <FormatListBulletedOutlinedIcon />,
            },
            {
              label: (
                <span>
                  รายการเคสรอแก้ไข{" "}
                  <Badge
                    count={noti.notiWaitCaseCount}
                    style={{
                      backgroundColor: "#E74C3C ",
                      fontWeight: "bold",
                      animation: "blinking 1s infinite",
                    }}
                  />
                </span>
              ),
              key: "/dashboard/listunresolve",
              icon: <PendingActionsOutlinedIcon />,
              // badge: <Badge count={data.filter((data) => data.status === 'รอการแก้ไข').length} />
            },
          ].map(({ label, key, icon }) => (
            <ListItem key={key} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleMenuClick(label)}
                component={Link}
                to={key} // เปลี่ยนเป็น URL ที่ต้องการไปหน้านั้น
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {[
            {
              label: "ตารางวันทำงาน",
              key: "/dashboard/work",
              icon: <GridOnIcon />,
            },
            {
              label: "ตารางวันทำงาน",
              key: "/dashboard/outstanding",
              icon: <GridOnIcon />,
            },

            {
              label: "สมาชิกทั้งหมด",
              key: "/dashboard/listuser",
              icon: <GroupsIcon />,
            },
          ].map(({ label, key, icon }) => (
            <ListItem key={key} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => handleMenuClick(label)}
                component={Link}
                to={key} // เปลี่ยนเป็น URL ที่ต้องการไปหน้านั้น
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <SettingBar handleClick={handleClick} open2={open2} />
      </Drawer>

      <Modal
        title="เปลี่ยนรหัสผ่าน"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <InputGroup>
          {/* <Input
            type="text"
            name="password"
            onChange={handleChangePassword}
            className="form-control"
          /> */}
          <Input.Password
            addonBefore="รหัสผ่านใหม่"
            placeholder="new password"
            name="password"
            value={values.password}
            onChange={handleChangePassword}
          />
        </InputGroup>
        {isPasswordEmpty && (
          <span style={{ color: "red" }}>กรุณากรอกรหัสผ่าน</span>
        )}
      </Modal>
    </Box>
  );
}

