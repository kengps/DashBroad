import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import { SiMicrosoftexcel } from "react-icons/all";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

export default function MenuExport({ onClick }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 1000);
  };

  return (
    <div>
      <Tooltip title="Delete" placement="top" arrow>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          color="secondary"
          style={{ padding: "1px", height: "1px", width: "1px" }}
          size="small"
        >
          <MoreVertIcon />
        </Button>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => {
            onClick();
            handleClose();
          }}
        >
          <IconButton aria-label="more" id="long-button" aria-haspopup="true">
            <SiMicrosoftexcel />
          </IconButton>
          Export To Excel
        </MenuItem>
      </Menu>
    </div>
  );
}
