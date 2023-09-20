import React, { useEffect, useState } from "react";
import * as loadingData from "../../../src/assets/Json/loading.json";
import * as successData from "../../../src/assets/Json/success.json";
import * as loading6 from "../../../src/assets/Json/loading6.json";
import FadeIn from "react-fade-in";
import Lottie from "react-lottie";


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
const defaultOptions3 = {
    loop: true,
    autoplay: true,
    animationData: loading6.default,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

function WaitLoading() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);



    const fetchAndSetData = async () => {
        const randomTime = Math.floor(Math.random() * 1000)  // 2-5 seconds in milliseconds
        await new Promise(resolve => setTimeout(resolve, randomTime));

        setLoading(true);
        setTimeout(() => {
            setSuccess(true);
        }, 3000);

    };


    useEffect(() => {
        fetchAndSetData();
    }, []);



    return (
        <div className="App" style={{
            width: '100%',
            height: '50vh',  // ให้ Space มีความสูงเท่ากับ viewport height
            justifyContent: 'center', // จัดการแนวนอนตรงกลาง
            alignItems: 'center', // จัดการแนวตั้งตรงกลาง
        }}>
            <header className="App-header">
                {!success ? (
                    <FadeIn>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <h1>loading</h1>

                            {!loading ? (
                                <Lottie options={defaultOptions} height={140} width={140} />
                            ) : (
                                <Lottie options={defaultOptions2} height={140} width={140} />
                            )}
                        </div>
                    </FadeIn>
                ) : (
                    null
                )}
            </header>
        </div>
    );
}

export default WaitLoading;

