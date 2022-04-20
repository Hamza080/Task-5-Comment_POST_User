import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import EditComment from "./EditComment";
import CommentsOnPost from "./CommentsOnPost";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

const AllComments = ({ dashBoard, postId, getAllPost }) => {
  var token = JSON.parse(localStorage.getItem("Token"));
  const userId = JSON.parse(localStorage.getItem("id"));
  const [allComments, setAllComments] = useState([]);
  const [commentAdd, setCommentAdd] = useState("");
  const [editId, setEditId] = useState("");
  const [show, setShow] = useState("");
  const [commentShow, setCommentShow] = useState("");
  const [showMoreComment, setShowMoreComment] = useState(3);

  useEffect(() => {
    getAllComments();
  }, []);

  ///// All Comments on one Post
  const getAllComments = async () => {
    var token = JSON.parse(localStorage.getItem("Token"));
    try {
      const res = await axios.get(
        `https://taskforum.herokuapp.com/api/comment/post/${postId}`,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      setAllComments(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  //edit Id
  function fun(id) {
    setEditId(id);
  }

  ///// for ADD Comment Post///
  const addComment = async () => {
    const commentData = {
      user: userId,
      post: postId,
      comment: commentAdd,
    };
    try {
      const res = await axios.post(
        "https://taskforum.herokuapp.com/api/comment/",
        commentData,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      setCommentAdd("");
      getAllComments();
    } catch (err) {
      console.log(err);
    }
  };

  /////for Delete comments
  const DeleteComment = async (id) => {
    try {
      axios.delete(`https://taskforum.herokuapp.com/api/comment/${id}`, {
        headers: { Authorization: `Bearar ${token}` },
      });
      getAllComments();
    } catch (err) {
      console.log(err);
    }
  };

  // for Show all Comments dialogue box
  const handleComments = () => {
    setCommentShow(true);
  };
  const handleAllComments = () => {
    setCommentShow(false);
  };
  useEffect(() => {
    handleAllComments();
  }, []);

  // for Edit Comment dialogue box
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
      <Card variant="outlined" mt={0}>
        <h5>Comments:</h5>
        {allComments
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, showMoreComment)
          .map((ele, index) => {
            return (
              <>
                <React.Fragment>
                  <CardContent mt={0}>
                    <Typography>
                      {" "}
                      {index + 1}:{ele.comment}
                    </Typography>
                    {ele.user._id == userId ? (
                      <>
                        <DropdownButton
                          variant="success"
                          title="Select Option"
                          style={{ marginLeft: "200px", marginTop: "-30px" }}
                        >
                          <Dropdown.Item
                            href="#/action-1"
                            onClick={() => {
                              handleShow();
                              fun(ele._id);
                            }}
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="#/action-2"
                            onClick={() => {
                              DeleteComment(ele._id);
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </DropdownButton>
                      </>
                    ) : (
                      ""
                    )}
                  </CardContent>
                </React.Fragment>
              </>
            );
          })}
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Add Comment"
            color="secondary"
            focused
            type="text"
            value={commentAdd}
            onChange={(e) => setCommentAdd(e.target.value)}
          />
        </Box>

        <Card variant="outlined">
          <React.Fragment>
            <CardContent>
              <Button
                variant="contained"
                size="medium"
                onClick={addComment}
                startIcon={<AddIcon />}
              >
                Add Comment
              </Button>
              <Button
                variant="outlined"
                size="medium"
                onClick={handleComments}
                startIcon={<SearchIcon />}
              >
                All Comments
              </Button>
            </CardContent>
          </React.Fragment>
        </Card>

        {/* /////Update Comments */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header>
            <Modal.Title>Edit Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditComment
              editId={editId}
              getAllComments={getAllComments}
              handleClose={handleClose}
              setCommentAdd={setCommentAdd}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Model for Show All Comments */}
        <Modal show={commentShow} onHide={handleAllComments}>
          <Modal.Header>
            <Modal.Title>All Comments</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CommentsOnPost allComments={allComments} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleAllComments}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </>
  );
};

export default AllComments;
