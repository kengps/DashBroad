import React from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { BiHide, BiShow } from "react-icons/bi";
const PasswordInput = ({ showPassword, password, inputValue, toggleShowPassword, confirmpass }) => {
    return (
        <>
            <InputGroup className="mt-3">
                <InputGroup.Text>Password</InputGroup.Text>
                <Form.Control
                    className="form-control input-lg"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={inputValue("password")}
                />

                <Button variant="secondary" onClick={toggleShowPassword}>
                    {showPassword ? <BiShow /> : <BiHide />}
                </Button>
            </InputGroup>



            <InputGroup className="mt-3">
                <InputGroup.Text>Confirm Password</InputGroup.Text>
                <Form.Control
                    className="form-control input-lg"
                    name="confirmpass"
                    type={showPassword ? "text" : "password"}
                    onChange={inputValue("confirmpass")}
                    value={confirmpass}
                />

                <Button variant="secondary" onClick={toggleShowPassword}>
                    {showPassword ? <BiShow /> : <BiHide />}
                </Button>
            </InputGroup>
        </>
    )
}

export default PasswordInput