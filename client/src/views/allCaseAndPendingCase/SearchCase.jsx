import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Tag, message, Select, Modal, Input, Drawer } from "antd";
import { Box } from "@mui/material";
import { Form, InputGroup } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Button1 from "react-bootstrap/Button";
const SearchCase = ({ search, setSearch, onClickButton, showDrawer }) => {



    return (
        <Box>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="ค้นหาCase"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
                <Button variant="danger" value="Submit" onClick={onClickButton} className="btn-1">
                    <RxCross2 />
                </Button>
                <Button1 variant="success" onClick={showDrawer} style={{ marginLeft: "20px" }}>
                    สรุปเคสประจำวัน
                </Button1>
            </InputGroup>
        </Box>
    );
}

export default SearchCase