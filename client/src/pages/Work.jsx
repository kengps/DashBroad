import React from "react";
import { Helmet } from "react-helmet-async";
import DataLoader from "../contexts/DataLoader";

const Work = () => {


  const dataCase = (value) => {

   
    const userCount = value.filter((item) => item.caseId
 )
    console.log('====================================');
    console.log(userCount);
    console.log('====================================');
    return (

      <> 
        {userCount.map((item) => (<h1>
            {item.caseId}
        </h1>))}
      </>
    )
  }

  return (
    <>
      <DataLoader children={dataCase} />
    </>
    // <div>
    //   <Helmet>
    //     <title> Dashboard | TableWork </title>
    //   </Helmet>
    //   <iframe
    //     src="https://docs.google.com/spreadsheets/d/1frcXivrOiUAqPI_pp7wDz_jar_4DOwb8W09aljFYfZc/edit#gid=2077893942"
    //     title="Google Sheets Embed"
    //     width="400%"
    //     height="700"
    //   ></iframe>
    // </div>
  );
};

export default Work;
