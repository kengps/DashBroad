import React, { useEffect, useState, useRef } from "react";
import { Button, Card, Tag, message, Select, Modal, Input, Drawer } from "antd";
import { Box } from "@mui/material";
import { Form, InputGroup } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";
import Button1 from "react-bootstrap/Button";
import { useSearchParams } from "react-router-dom";
import {
    useQueryParams,
    StringParam,
    NumberParam,
    ArrayParam,
    withDefault,
} from 'use-query-params';


const SearchCase = ({ search, setSearch, onClickButton, showDrawer }) => {



 


    const handleSearchChange = (event) => {
        const search = event.target.value;

        if (search) {
            setSearch({ search })
        } else {
            setSearch({})

        }
        // setSearch(inputValue);
        // setQuery(
        //     { filters: [...filters, `${search}`], q: 'bar' },
        //     'push'
        // )

    };


    // const MyFiltersParam = withDefault(ArrayParam, [])
    // const [query, setQuery] = useQueryParams({
    //     x: NumberParam,
    //     q: StringParam,
    //     filters: MyFiltersParam,
    // });
    // const { x: num, q: searchQuery, filters } = query;


    return (
        <Box>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="ค้นหาCase"
                    value={search}
                    onChange={handleSearchChange}
                />
                <Button
                    variant="danger"
                    value="Submit"
                    onClick={onClickButton}
                    className="btn-1"
                >
                    <RxCross2 />
                </Button>
                <Button1
                    variant="success"
                    onClick={showDrawer}
                    style={{ marginLeft: "20px" }}
                >
                    สรุปเคสประจำวัน
                </Button1>
            </InputGroup>
        </Box>
    );
}

export default SearchCase