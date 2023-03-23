import React, { useState } from "react";
import Button from "react-bootstrap/Button";
//import Form from 'react-bootstrap/Form'
import { Form, InputGroup } from "react-bootstrap";

import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
} from "mdb-react-ui-kit";
const LoginComponent = () => {
  return (
    <>
      <Form className="mt-3">
        <div className="mt-3">
          <InputGroup className="mt-3">
            <InputGroup.Text
              className=""
              style={{
                color: "blue",
                fontSize: "25px",
                fontFamily: "Times New Roman",
                backgroundColor: "lightblue",
              }}
            >
              username
            </InputGroup.Text>
            <Form.Control placeholder="input"></Form.Control>
          </InputGroup>
        </div>

        <div className="mt-3">
          <InputGroup className="mt-3">
            <InputGroup.Text
              className=""
              style={{
                color: "blue",
                fontSize: "25px",
                fontFamily: "Times New Roman",
                backgroundColor: "lightblue",
              }}
            >
              username
            </InputGroup.Text>
            <Form.Control placeholder="input"></Form.Control>
          </InputGroup>
        </div>

        <div className="mt-3">
          <InputGroup className="mt-3">
            <InputGroup.Text
              className=""
              style={{
                color: "blue",
                fontSize: "25px",
                fontFamily: "Times New Roman",
                backgroundColor: "lightblue",
              }}
            >
              username
            </InputGroup.Text>
            <Form.Control placeholder="input"></Form.Control>
          </InputGroup>
        </div>

        <div className="mt-3">
          <InputGroup className="mt-3">
            <InputGroup.Text
              className=""
              style={{
                color: "blue",
                fontSize: "25px",
                fontFamily: "Times New Roman",
                backgroundColor: "lightblue",
              }}
            >
              username
            </InputGroup.Text>
            <Form.Control placeholder="input"></Form.Control>
          </InputGroup>
        </div>
      </Form>

      <div class="container">
  <div class="row">
    <div class="col-9">.col-9</div>
    <div class="col-4">.col-4<br/>Since 9 + 4 = 13 &gt; 12, this 4-column-wide div gets wrapped onto a new line as one contiguous unit.</div>
    <div class="col-6">.col-6<br/>Subsequent columns continue along the new line.</div>
  </div>
</div>
    </>
  );
};

export default LoginComponent;
