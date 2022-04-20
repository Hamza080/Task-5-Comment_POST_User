import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Modal } from "react-bootstrap";
import PostActivity from "./PostActivity";

const PostUser = () => {
  const token = JSON.parse(localStorage.getItem("Token"));
  const id = JSON.parse(localStorage.getItem("id"));
  const [post, setPost] = useState([]);
  const [postId, setPostId] = useState("");
  const [comments, setComments] = useState([]);
  const [show, setShow] = useState("");

  /////for comments on post profile
  const getComments = async () => {
    try {
      const res = await axios.get(
        `https://taskforum.herokuapp.com/api/comment/user/${id}`,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      setComments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  ///for post on profile
  const PostOnProfile = async () => {
    try {
      const res = await axios.get(
        `https://taskforum.herokuapp.com/api/post/user/${id}`,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      setPost(res.data.data);
      getComments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    PostOnProfile();
  }, []);

  ////////for post DailogBox
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    handleClose();
  }, []);
  return (
    <>
      <h1 className="mt-2 text-center">your post here</h1>
      <div className=" container flex-wrap d-flex ms-5 mt-3">
        {post.map((ele) => {
          return (
            <div
              className="card ms-2 mt-5"
              style={{ width: "300px" }}
              onClick={() => {
                handleShow();
                setPostId(ele._id);
              }}
            >
              <div class="card-body">
                <h5 class="card-title">{ele.title}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{ele.category}</h6>
                <h6 class="card-subtitle mb-2 text-muted">
                  {" "}
                  {ele.description}
                </h6>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <hr />
        <h4 className="mt-2 text-center"> Comments on All Posts </h4>
        <hr />
        <div className="d-flex gap-5">
          {comments.map((ele) => {
            return (
              <>
                {
                  <div className="card">
                    <h3 className="card-title">{ele.post.title}</h3>
                    <h6> Your Comments: </h6>
                    <p className="card-text">{ele.comment}</p>
                  </div>
                }
              </>
            );
          })}
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostActivity post={post} postId={postId} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default PostUser;
