import axios from "axios";
import React from "react";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const EditComment = ({
  editId,
  getAllComments,
  handleClose,
  setCommentAdd,
}) => {
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("Token")));
  const [updateComment, setUpdateComment] = useState("");

  const CommentEdit = async () => {
    const user = { comment: updateComment };
    try {
      const res = await axios.put(
        `https://taskforum.herokuapp.com/api/comment/${editId}`,
        user,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      getAllComments();
      setCommentAdd();
      setUpdateComment("");
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
            name="updateComment"
            placeholder="Enter Comment"
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
            required
          />
        </Form.Group>
        <Button
          className="mt-3"
          variant="success"
          onClick={() => {
            CommentEdit();
            handleClose();
          }}
        >
          Update
        </Button>
      </Form>
    </>
  );
};

export default EditComment;
