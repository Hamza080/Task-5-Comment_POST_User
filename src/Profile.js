import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import axios from "axios";
import EditName from "./EditName";
import { Modal } from "react-bootstrap";
import PostUser from "./PostUser";

const Profile = () => {
  const [profile, setProfile] = useState("");
  const [show, setShow] = useState("");

  var token = JSON.parse(localStorage.getItem("Token"));
  var id = JSON.parse(localStorage.getItem("id"));

  const userLogIn = async () => {
    try {
      const res = await axios.get(
        `https://taskforum.herokuapp.com/api/users/${id}`,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      setProfile(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userLogIn();
  }, []);

  // for dialogue box
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
      <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand">UserProfile</a>
          <Link Link href="dashboard" variant="body2">
            <Button variant="contained">DashBoard</Button>
          </Link>

          <div className="card">
            <div className="card-header">
              <h6>{profile.name}</h6>
            </div>
            <div className="card-title">
              <h6>{profile.email}</h6>
            </div>
            <button
              class="btn btn-outline-success"
              onClick={() => {
                handleShow();
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditName
            userLogIn={userLogIn}
            handleClose={handleClose}
            profile={profile}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <PostUser />
    </>
  );
};
export default Profile;
