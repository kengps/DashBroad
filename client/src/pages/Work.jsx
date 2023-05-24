import React from "react";
import { Helmet } from "react-helmet-async";

const Work = () => {
  return (
    <div>
      <Helmet>
        <title> Dashboard | TableWork </title>
      </Helmet>
      <iframe
        src="https://docs.google.com/spreadsheets/d/1frcXivrOiUAqPI_pp7wDz_jar_4DOwb8W09aljFYfZc/edit#gid=2077893942"
        title="Google Sheets Embed"
        width="400%"
        height="700"
      ></iframe>
    </div>
  );
};

export default Work;
