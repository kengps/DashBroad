import React from "react";
import Accordion from "react-bootstrap/Accordion";

import {
  CheckOutlined,
  CloseOutlined,
  UserAddOutlined,
  CloseCircleOutlined,
  SettingOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
export const Index = () => {
  return (
    <div>
      <h1>index</h1>
    </div>
  );
};

export const AccordionUI = () => {
  let biogaming = "(biogaming)";
  let lsm = "(lsm-Pretty)";
  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <QuestionCircleOutlined />
          </Accordion.Header>
          <Accordion.Body>
            <div style={{ fontSize: "8px" }}>
              <p>
                <b>problemType :</b> <i style={{ color: "red" }}>ประเภทปัญหา</i>
              </p>
              <p>
                <b>problemDetail :</b>{" "}
                <i style={{ color: "red" }}>รายละเอียดปัญหา ${biogaming} </i>
              </p>
              <p>
                <b>gameDetail :</b>{" "}
                <i style={{ color: "red" }}>รายละเอียดเกม</i>
              </p>
              <p>
                <b>Platforms :</b> <i style={{ color: "red" }}>แพลตฟอร์ม</i>
              </p>
              <p>
                <b>problemDetailLSM :</b>{" "}
                <i style={{ color: "red" }}>รายละเอียดปัญหา ${lsm}</i>
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
