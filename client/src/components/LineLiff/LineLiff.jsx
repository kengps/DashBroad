import liff from '@line/liff'
import React, { useEffect, useState } from 'react'
import { loginLine } from '../../api/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

//antd
import { Space, Spin } from 'antd';

const LineLiff = () => {
    //redux
    const dispatch = useDispatch();
    const redirect = useNavigate();

    //state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData()
    }, [])


    const loadData = async () => {

        try {
            await liff.init({ liffId: `${import.meta.env.VITE_LIFF_ID}` })
            if (liff.isLoggedIn) {
                await getData()
            }
        } catch (error) {
            console.log(error);
        }


    }
    //todo: การตรวจสอบ Role
    const levelRole = (role) => {
        if (role === "admin" || role === "dev" || role === "user") {
            redirect("/dashboard");
        } else {
            redirect("/login");
        }
    };
    const getData = async () => {
        try {
            const getProfile = await liff.getProfile();
            console.log('picture', getProfile);
            await loginLine(getProfile).then((res) => {

                dispatch({
                    type: "LOGIN",
                    payload: {
                        token: res.data.token,
                        username: res.data.payLoad.user.username,
                        role: res.data.payLoad.user.role,
                        id: res.data.payLoad.user.id,
                    },
                });
                //TODO: ทำการบันทึกลง Storage ที่ฝั่ง client
                // ตั้งค่า timeout เพื่อลบ localStorage เมื่อ JWT หมดอายุ
                const expirationTime = 12 * 60 * 60 * 1000; // 12 ชั่วโมง (เป็นตัวอย่าง)
                //const expirationTime = 60 * 1000; // 12 ชั่วโมง (เป็นตัวอย่าง)
                const expirationDate = new Date().getTime() + expirationTime;
                const one = Number(1)
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("expirationDate", expirationDate);
                localStorage.setItem('isOnline', one);
                localStorage.setItem('loginLine', true);

                levelRole(res.data.payLoad.user.role);
            })
        } catch (error) {

            console.log(error);
        }

    }

    return loading ?
        <Space
            direction="vertical"
            style={{
                width: '100%',
                height: '100vh',  // ให้ Space มีความสูงเท่ากับ viewport height
                justifyContent: 'center', // จัดการแนวนอนตรงกลาง
                alignItems: 'center', // จัดการแนวตั้งตรงกลาง
            }}
        >
            <Space>

                <Spin tip="Loading" size="large" />
            </Space>
        </Space>
        : null
}

export default LineLiff