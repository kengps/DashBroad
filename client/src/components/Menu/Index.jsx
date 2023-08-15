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
                <b>Type :</b> <i style={{ color: "red" }}>ประเภท</i>
              </p>
              <p>
                <b>Campgame :</b>{" "}
                <i style={{ color: "red" }}>ชื่อค่ายเกม </i>
              </p>
              <p>
                <b>Platforms :</b>{" "}
                <i style={{ color: "red" }}>แพลตฟอร์ม</i>
              </p>
              <p>
                <b>name :</b> <i style={{ color: "red" }}>ชื่อของประเภท</i>
              </p>
              <p>
                <b>Detail :</b>{" "}
                <i style={{ color: "red" }}>รายละเอียด</i>
              </p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};
