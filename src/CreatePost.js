import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "@mui/material/Link";

const CreatePost = ({ handleClose, getAllPost }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const createPost = async (e) => {
    e.preventDefault();
    var token = JSON.parse(localStorage.getItem("Token"));
    const userid = JSON.parse(localStorage.getItem("id"));
    const user = {
      user: userid,
      title: title,
      description: description,
      category: category,
    };
    console.log(user, "user");
    try {
      const res = await axios.post(
        "https://taskforum.herokuapp.com/api/post/",
        user,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      setTitle("");
      setDescription("");
      setCategory("");
      getAllPost();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Form>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            name="title"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            name="Description"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-2">
          <Form.Control
            type="text"
            name="category"
            placeholder="Enter category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>

        <Link href="dashboard" variant="body2">
          <Button
            className="mt-3"
            variant="success"
            onClick={(e) => {
              createPost(e);
              handleClose();
            }}
          >
            Post
          </Button>
        </Link>
      </Form>
    </>
  );
};

export default CreatePost;
