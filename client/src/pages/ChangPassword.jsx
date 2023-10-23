import { Button, Modal } from "antd";
import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import { resetPassword1 } from "../api/case";
import { useSelector } from "react-redux";

const ChangPassword = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [values, setValues] = useState({
    id: "",
    password: "",
  });
  //model
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id) => {
    // console.log(id);
    setIsModalOpen(true);
    setValues({ ...values, id: id });
  };
  // เมื่อกด ok จะให้ทำการยิง api เพื่อทำการ update รหัสผ่าน
  const handleOk = () => {
    setIsModalOpen(false);
    resetPassword1(user.token, values.id, { values })
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  //function การพิมพ์ โดยรับ id และ password มาจาก e
  const handleChangePassword = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <>
        <Button type="primary" onClick={showModal}>
          Open Modal
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <InputGroup>
            <InputGroup.Text>New password</InputGroup.Text>
            <input
              type="text"
              name="password"
              onChange={handleChangePassword}
              className="form-control"
            />
          </InputGroup>
        </Modal>
      </>
     
    </div>
  );
};

export default ChangPassword;
