import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";



const AdminRoute = ({ element }) => {
    const { user } = useSelector((state) => ({ ...state }));
    const dispatch = useDispatch();
    const redirect = useNavigate();

    const handleLogin = () => {

        dispatch({
            type: "LOGOUT",
            payload: null,
        });
    }


    if (user.role !== "admin") {
        // หากไม่ใช่ admin ให้เปลี่ยนเส้นทางไปยังหน้าอื่น (เช่นหน้า Dashboard)
        handleLogin();
        return <Navigate to="/page-user" />;
    }

    return element;
};

export default AdminRoute;
