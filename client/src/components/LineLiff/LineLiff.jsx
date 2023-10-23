import liff from '@line/liff'
import React, { useEffect, useState } from 'react'
import { loginLine } from '../../api/auth'
import { useDispatch } from 'react-redux'
import { useNavigate, Navigate } from 'react-router-dom'



import * as loadingData from '../../assets/Json/loadings.json'
import * as successData from '../../assets/Json/success.json'
import * as airData from '../../assets/Json/airport.json'
//antd
import { Space, Spin } from 'antd';



import FadeIn from "react-fade-in";
import Lottie from "react-lottie";
import Lottie2 from "react-lottie";
import WaitLoading from '../LoadingAndRedirect/WaitLoading'
import { storeAuth } from '../../service/store/storeZustand'







const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: successData.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

const LineLiff = () => {
    //redux

    const dispatch = useDispatch();
    const redirect = useNavigate();

    


    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {

        try {
            await liff.init({ liffId: `${import.meta.env.VITE_LIFF_ID}` })

            if (liff.isLoggedIn) {
                await getData()
                setLoading(true);
                setTimeout(() => {
                    setSuccess(true);
                }, 1000);

            }
        } catch (error) {
            console.log(error);
        }


    }
    //todo: การตรวจสอบ Role
    const levelRole = (role) => {
        if (role === "admin" || role === "dev") {

            redirect("/dashboard");

        } else if (role === "user") {

            redirect("/page-user");
            setTimeout(() => {
                localStorage.clear()
            }, 2000);
        } else {
            redirect("/login");
        }
    };
    const getData = async () => {
        try {
            const getProfile = await liff.getProfile();
            console.log("🚀  file: LineLiff.jsx:98  getProfile:", getProfile)

            await loginLine(getProfile).then((res) => {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        token: res.data.token,
                        username: res.data.payLoad.user.username,
                        role: res.data.payLoad.user.role,
                        id: res.data.payLoad.user.id,
                        picture: res.data.payLoad.user.picture,
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

    return <div className="App" style={{
        width: '100%',
        height: '100vh',  // ให้ Space มีความสูงเท่ากับ viewport height
        justifyContent: 'center', // จัดการแนวนอนตรงกลาง
        alignItems: 'center', // จัดการแนวตั้งตรงกลาง
    }}>
        <WaitLoading />
    </div>
}

export default LineLiff