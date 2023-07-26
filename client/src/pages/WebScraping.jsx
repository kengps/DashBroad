import React, { useEffect } from "react";
import Work from "./Work";
import { useStore } from "../service/zustand/storeCase";


import Form from 'react-bootstrap/Form';


function DataCase() {

  const fetchData = useStore((state) => state.fetchData);
  const data = useStore((state) => state.cases);

  useEffect(() => {
    fetchData();
  }, []);

  const newDataType = data.map((item) => { return item.data.type.types })
  // const newDataType2 = data.map(({ data: { type: { types } } }) => types);

  // //todo (3) ['problemType', 'campgame', 'Platforms']และไม่เอาค่าว่าง
  const typeProb = ([...new Set(newDataType)]).filter(Boolean);

  const problemType = data.filter((item) => typeProb[0].includes(item.data.type.types));

  const campGame = data.filter((item) => typeProb[1].includes(item.data.type.types));

  const platforms = data.filter((item) => typeProb[2].includes(item.data.type.types));

  //ข้อมูลก้อนที่ 1 รายละเอียดปัญหาของ biogaming
  const problemTypeName = problemType.map((item) => { return item.data.type.name })

  const NewProblemTypeName = ([...new Set(problemTypeName)]).filter(Boolean);


  const problemTypeDetail = problemType.map((item) => { return item.data.detail.name })

  //ข้อมูลก้อนที่ 2 รายละเอียดของค่ายเกม
  const campGameDetail = campGame.map((item) => { return item.data.detail.name })


  // const filteredData = data.filter((item) => {
  //   const allowTypes = ["problemDetail" , "gameDetail"];
  //   return allowTypes.includes(item.type);
  // });



  return (
    <>
      <h1>around here...</h1>;
      <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        {NewProblemTypeName.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </Form.Select>

      {NewProblemTypeName[0] ? <h1>5555</h1> : <h1>66666</h1>}


    </>
  );

}
function ListCase() {

  const data = useStore((state) => state.cases);

  return (
    <>
      <h1>333333</h1>
    </>
  )
}

function CampGame() {
  const data = useStore((state) => state.cases);
  const newDataType = data.map((item) => { return item.data.type.types })
  const typeProb = ([...new Set(newDataType)]).filter(Boolean);
  const campGame = data.filter((item) => typeProb[1].includes(item.data.type.types));
  const campGameDetail = campGame.map((item) => { return item.data.detail.name })

  const NewCampGameDetail = ([...new Set(campGameDetail)]).filter(Boolean);

  console.log('===================campGame=================');
  console.log(typeProb);
  console.log('====================================');
  return (<>
    <h1>CampGame</h1>
    <Form.Select aria-label="Default select example">
        <option>Open this select menu</option>
        {NewCampGameDetail.map((item, index) => (
          <option key={index}>{item}</option>
        ))}
      </Form.Select>
  </>)
}

function Platforms() {
  return (<>
    <h1>Platforms</h1>
  </>)
}


const WebScraping = () => {
  return (
    <div style={{ paddingTop: "75px" }}>
      <h1>WebScrapinsg</h1>
      <DataCase />
      <ListCase />
      <CampGame/>
      <Platforms/>
    </div>
  );
};

export default WebScraping;

