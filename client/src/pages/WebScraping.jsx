import React, { useEffect, useState } from "react";
import * as loadingData from "../../src/assets/Json/loading.json";
import * as successData from "../../src/assets/Json/success.json";
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

function WebScraping() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);



  const fetchAndSetData = async () => {
    const randomTime = Math.floor(Math.random() * 1000) + 2000; // 2-5 seconds in milliseconds
    await new Promise(resolve => setTimeout(resolve, randomTime));

    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
    }, 1000);

  };


  useEffect(() => {
    fetchAndSetData();
  }, []);



  return (
    <div className="App" style={{
      width: '100%',
      height: '100vh',  // ให้ Space มีความสูงเท่ากับ viewport height
      justifyContent: 'center', // จัดการแนวนอนตรงกลาง
      alignItems: 'center', // จัดการแนวตั้งตรงกลาง
    }}>
      <header className="App-header">
        {!success ? (
          <FadeIn>
            <div style={{ display: "flex" }}>
              <h1>fetching</h1>
              {!loading ? (
                <Lottie options={defaultOptions} height={140} width={140} />
              ) : (
                <Lottie options={defaultOptions2} height={140} width={140} />
              )}
            </div>
          </FadeIn>
        ) : (
          <iframe
            src="https://docs.google.com/spreadsheets/d/1frcXivrOiUAqPI_pp7wDz_jar_4DOwb8W09aljFYfZc/edit#gid=2077893942"
            title="Google Sheets Embed"
            width="400%"
            height="700"
          />
        )}
      </header>
    </div>
  );
}

export default WebScraping;

