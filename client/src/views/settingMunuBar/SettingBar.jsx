import React from 'react'

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import SettingsIcon from '@mui/icons-material/Settings';
import { Link, useNavigate } from "react-router-dom";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
const SettingBar = ({ handleClick, open2 }) => {


    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="การจัดการ" />
                {open2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}
                        component={Link}
                        to="/dashboard/list-editor"
                    >
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="ตั้งค่าผู้แก้ไข" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} component={Link}
                        to="/dashboard/create-type">
                        <ListItemIcon>
                            <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="ตั้งค่าประเภทปัญหา" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    )
}

export default SettingBar