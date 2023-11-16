import React, { useRef, useState } from 'react'
//ant Design
import { Button, Col, DatePicker, Row, Space, Typography } from 'antd';
const { RangePicker } = DatePicker;
const { Text, Link } = Typography;


import moment from 'moment'
import { Box } from '@mui/material';

import dayjs from 'dayjs';

const DatePickerCase = ({ handleDateChange ,count}) => {




    const onOk = (value) => {
        console.log('onOk: ', value);
    };

    const onChange = (value, date) => {
        if (date) {
            console.log('Date: ', date);
        } else {
            console.log('Clear');
        }
    };
    const onRangeChange = (dates, dateStrings) => {
        if (dates) {
            console.log('From: ', dates[0], ', to: ', dates[1]);
            console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
        } else {
            console.log('Clear');
        }
    };
    const rangePresets = [
        {
            label: '7 วันหลังสุด',
            value: [dayjs().add(-7, 'd'), dayjs()],
        },
        {
            label: '30 วันหลังสุด',
            value: [dayjs().add(-30, 'd'), dayjs()],
        },
        {
            label: '90 วันหลังสุด',
            value: [dayjs().add(-90, 'd'), dayjs()],
        },
        {
            label: '1 ปีหลังสุด',
            value: [dayjs().add(-365, 'd'), dayjs()],
        },
        {
            label: 'วันนี้',
            value: [dayjs().startOf('day'), dayjs()],
        },
        {
            label: 'เดือนนี้',
            value: [dayjs().startOf('month'), dayjs()],
        },
        {
            label: 'เดือนที่ผ่านมา',
            value: [
                dayjs().subtract(1, 'month').startOf('month'),
                dayjs().subtract(1, 'month').endOf('month'),
            ],
        },
    ];

    return (
        <Row justify={'end'}>

            <Col>
                <Box component="span" sx={{ p: 3, border: '1px grey' }}>

                    <Space direction="vertical">
                        <Text  >ค้นหาตามวันที่ </Text>
                    </Space>
                    <Space direction="vertical" style={{ paddingLeft: '5px' }}>
                        <RangePicker
                            presets={rangePresets}
                            onChange={handleDateChange}
                            placeholder={["วันที่เริ่มต้น", "วันที่สิ้นสุด"]}
                            style={{ marginRight: "8px" }}
                            format="DD-MM-YYYY" // รูปแบบที่จะแสดงใน Input
                        />
                    </Space>
                </Box>
            </Col>
            <p>จำนวน {count}</p>
        </Row>

    )
}

export default DatePickerCase