import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const EditName = ({ userLogIn, handleClose, profile }) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("Token")));
  const id = JSON.parse(localStorage.getItem("id"));
  const [updateName, setUpdateName] = useState(profile.name);

  const updateUser = async () => {
    const user = { name: updateName };
    try {
      const res = await axios.put(
        `https://taskforum.herokuapp.com/api/users/${id}`,
        user,
        { headers: { Authorization: `Bearar ${token}` } }
      );
      userLogIn();
      setUpdateName("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            name="updateName"
            placeholder="Enter Name"
            value={updateName}
            onChange={(e) => setUpdateName(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          className="mt-3"
          variant="success"
          onClick={() => {
            updateUser();
            handleClose();
          }}
        >
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditName;
