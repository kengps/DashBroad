import React, { useState } from 'react';

function WebScraping() {
  const [usercode, setUsercode] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // นำ usercode ไปใช้ในการทำ web scraping
    const url = `https://css.biosupport.cc/be/v1/bet_search/index/XikLwoBA18lynKejOHK8sxMPhF5DJbSemNvRDmn.w4pm1rLYaVIm1O4tG00t?is_outstanding=1&is_outstanding__usercode=${usercode}`;
    // ทำการดึงข้อมูลโดยใช้ URL ที่สร้างขึ้น
    fetchData(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Usercode:
        <input type="text" value={usercode} onChange={(event) => setUsercode(event.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default WebScraping;