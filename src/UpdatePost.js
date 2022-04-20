import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const UpdatePost = ({ handleDashboard, sendUserId, getAllPost }) => {
  const id = sendUserId;
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("Token")));
  const [updateTitle, setUpdateTitle] = useState("");

  const updateTask = async () => {
    console.log(id, "hdghjj");
    const Post = { title: updateTitle };
    try {
      const res = await axios.put(
        `https://taskforum.herokuapp.com/api/post/${id}`,
        Post,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      getAllPost();
      setUpdateTitle("");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Form>
        <Form.Group classTitle="mt-2">
          <Form.Control
            type="text"
            title="updateTitle"
            placeholder="Enter Title"
            value={updateTitle}
            onChange={(e) => setUpdateTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          classTitle="mt-3"
          variant="success"
          onClick={() => {
            updateTask();
            handleDashboard();
          }}
        >
          Update
        </Button>
      </Form>
    </>
  );
};

export default UpdatePost;
