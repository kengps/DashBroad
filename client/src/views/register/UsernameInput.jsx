import React from 'react'
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const UsernameInput = ({ inputValue, username }) => {

    return (
        <InputGroup className="border mt-3">
            <InputGroup.Text>Username</InputGroup.Text>
            <Form.Control
                className="form-control input-lg"
                name="username"
                onChange={inputValue("username")}
                value={username}
            />
        </InputGroup>

    )
}

export default UsernameInput