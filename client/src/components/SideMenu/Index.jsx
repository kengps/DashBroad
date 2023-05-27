import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Link, useNavigate } from "react-router-dom";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { deepOrange, deepPurple } from "@mui/material/colors";

import { BiUser, AiOutlineSetting,RiLockPasswordLine } from "react-icons/all";
import { NavDropdown, InputGroup } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import swal  from 'sweetalert2'
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  BugOutlined,
  SyncOutlined,
  HomeOutlined,
  DashboardOutlined,
  FormOutlined,
  UnorderedListOutlined,
  LoadingOutlined,
  UserOutlined,
  EditOutlined,
  TeamOutlined,
  TableOutlined,
  AreaChartOutlined,
  BellFilled,
  MailOutlined,
  LogoutOutlined,
  LoginOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import AppHeader from "../AppHeader/Index";
import { useState, useEffect } from "react";
import { Badge, Modal, Input, Space } from "antd";
import { listCases } from "../../api/case";
import { resetPassword } from "../../api/user";

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

  // console.log(user.username);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (menuKey) => {
    setSelectedMenu(menuKey);
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
    console.log(values);
    resetPassword(user.token, values.id, { values })
      .then((res) => {
        swal.fire("แจ้งเตือน", "ทำการเปลี่ยนรหัสผ่านสำเร็จ", "success");
        setValues("");
        console.log("ง/ง", res);
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

  //style
  const navDropdownItemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  };
  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
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
            variant="h4"
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
            {user && (
              <NavDropdown
                title={
                  <Tooltip title={user.username}>
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {/*                 
                <Avatar alt={user.username.slice(0,1).toUpperCase()} src="a" /> */}
                      <Avatar sx={{ bgcolor: deepOrange[500] }}>
                        {user.username.slice(0, 1).toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                }
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  style={navDropdownItemStyle}
                  onClick={() => showModal(user?.id)}
                >
                  <RiLockPasswordLine />
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
              key: "/dashboard/app",
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
                    count={data.filter((data) => data._id).length}
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
                    count={
                      data.filter((data) => data.status === "รอการแก้ไข").length
                    }
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
              icon: <QueryStatsIcon />,
            },
            {
              label: "สมาชิกทั้งหมด",
              key: "/dashboard/listuser",
              icon: <WidgetsOutlinedIcon />,
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
            onChange={handleChangePassword}
          />
        </InputGroup>
      </Modal>
    </Box>
  );
}

// import { Menu, Tag, Avatar, Badge, Space, Switch } from "antd";
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   BugOutlined,
//   SyncOutlined,
//   HomeOutlined,
//   DashboardOutlined,
//   FormOutlined,
//   UnorderedListOutlined,
//   LoadingOutlined,
//   UserOutlined,
//   EditOutlined,
//   TeamOutlined,
//   TableOutlined,
//   AreaChartOutlined,
// } from "@ant-design/icons";
// import { listCases } from "../../api/case";
// import QueryStatsIcon from "@mui/icons-material/QueryStats";
// import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
// import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
// import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
// import DynamicFormIcon from "@mui/icons-material/DynamicForm";

// const SideMenu = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   const loadData = () => {
//     listCases()
//       .then((res) => {
//         //console.log("ทดสอบนะ", res.data);

//         setData(res.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   // useEffect(() => {
//   //   // ตรวจจับการเปลี่ยนแปลงของข้อมูล
//   //   const interval = setInterval(() => {
//   //     loadData();
//   //   }, 1000);

//   //   // clear interval เมื่อ Component ถูก unmount
//   //   return () => clearInterval(interval);
//   // }, [data]);

//   // const handleAddData = () => {

//   //   loadData();
//   // };

//   //change theme
//   const [theme, setTheme] = useState("light");
//   const changeTheme = (value) => {
//     setTheme(value ? "dark" : "light");
//   };

//   return (
//     <div className="SideMenu">
//       <Switch
//         checked={theme === "dark"}
//         onChange={changeTheme}
//         checkedChildren="Dark"
//         unCheckedChildren="Light"
//       />
//       <br />
//       <br />
//       <Menu
//         theme={theme}
//         mode="inline"
//         onClick={(item) => {
//           //item.key
//           navigate(item.key);
//         }}
//         items={[
//           {
//             label: "Dashboard",
//             key: "/dashboard/app",
//             icon: <QueryStatsIcon />,
//           },
//           {
//             label: "หน้าการทำงาน",
//             key: "homework",
//             icon: <WidgetsOutlinedIcon />,
//             children: [
//               {
//                 label: "ฟอร์มบันทึกเคส",
//                 key: "/dashboard/formcontrol",
//                 icon: <DynamicFormIcon />,
//                 // handleAddData: handleAddData()
//               },
//               {
//                 label: (
//                   <span>
//                     รายการเคสทั้งหมด{" "}
//                     <Badge
//                       count={data.filter((data) => data._id).length}
//                       style={{
//                         backgroundColor: "#52BE80",
//                         fontWeight: "bold",
//                         animation: "blinking 1s infinite",
//                       }}
//                     />
//                   </span>
//                 ),
//                 key: "/dashboard/listcase",
//                 icon: <FormatListBulletedOutlinedIcon />,
//               },
//               {
//                 label: (
//                   <span>
//                     รายการเคสที่รอการแก้ไข{" "}
//                     <Badge
//                       count={
//                         data.filter((data) => data.status === "รอการแก้ไข")
//                           .length
//                       }
//                       style={{
//                         backgroundColor: "#E74C3C ",
//                         fontWeight: "bold",
//                         animation: "blinking 1s infinite",
//                       }}
//                     />
//                   </span>
//                 ),
//                 key: "/dashboard/listunresolve",
//                 icon: <PendingActionsOutlinedIcon />,
//                 // badge: <Badge count={data.filter((data) => data.status === 'รอการแก้ไข').length} />
//               },
//             ],
//           },

//           {
//             label: "Customers",
//             key: "user",
//             icon: <UserOutlined />,
//             children: [
//               {
//                 label: "ตารางวันทำงาน",
//                 key: "/dashboard/work",
//                 icon: <TableOutlined />,
//               },
//               {
//                 label: "สมาชิกทั้งหมด",
//                 key: "/dashboard/listuser",
//                 icon: <TeamOutlined />,
//               },
//             ],
//           },
//         ]}

//         // ส่งฟังก์ชัน handleAddData ไปยัง FormControl component
//       ></Menu>
//     </div>
//   );
// };

// export default SideMenu;
