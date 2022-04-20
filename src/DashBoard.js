import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Modal, DropdownButton, Dropdown } from "react-bootstrap";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import CreatePost from "./CreatePost";
import UpdatePost from "./UpdatePost";
import AllComments from "./AllComments";

const DashBoard = () => {
  const { State } = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [dashBoard, setDashBoard] = useState([]);
  const [show, setShow] = useState("");
  const [updateShow, setUpdateShow] = useState("");
  const [sendUserId, setSendUserId] = useState("");
  var token = JSON.parse(localStorage.getItem("Token"));
  const userId = JSON.parse(localStorage.getItem("id"));

  /// Delete Alll Posts
  const DeletePost = async (id) => {
    try {
      const res = await axios.delete(
        `https://taskforum.herokuapp.com/api/post/${id}`,
        {
          headers: { Authorization: `Bearar ${token}` },
        }
      );
      getAllPost();
    } catch (err) {
      console.error(err);
    }
  };

  //// get ALL Posts
  const getAllPost = async () => {
    try {
      const res = await axios.get("https://taskforum.herokuapp.com/api/post/", {
        headers: { Authorization: `Bearar ${token}` },
      });
      setDashBoard(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  // for Update Posts dialogue box
  const handlePost = () => {
    setUpdateShow(true);
  };
  const handleDashboard = () => {
    setUpdateShow(false);
  };
  useEffect(() => {
    handleDashboard();
  }, []);

  // for craeate posts dialogue box
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    handleClose();
  }, []);

  //clear local storage
  const clearData = () => {
    window.localStorage.clear();
  };

  ////Edit Post
  const editPost = (ItemId) => {
    console.log(ItemId, "hanza new");
    setSendUserId(ItemId);
  };

  // for dash board Header
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link href="profile" variant="body2">
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      </Link>

      <MenuItem onClick={handleMenuClose}>Setting</MenuItem>

      <Link href="/" variant="body2">
        <MenuItem onClick={() => clearData()}>Log Out</MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              // sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              CloudTek
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}
        {renderMenu}
      </Box>
      <Box sx={{ "& button": { m: 1 } }}>
        <Button
          variant="contained"
          size="medium"
          onClick={() => handleShow()}
          startIcon={<EditIcon />}
        >
          Create Post
        </Button>
      </Box>
      {/* <div style={{display:"flex" ,flexWrap:"wrap"}}> */}
      <Grid sx={{ flexGrow: 1 }} xl={4}>
        <Grid item xs={12}>
          <Grid container xl={3}>
            {dashBoard.map((ele, index) => {
              return (
                <div style={{ padding: "15px" }}>
                  <Card>
                    <React.Fragment>
                      <CardContent>
                        <Typography color="text.secondary">
                          {" "}
                          {index + 1}:{ele.title}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 14 }}
                          color="text.secondary"
                          gutterBottom
                        ></Typography>
                        <Typography variant="h5" component="div">
                          {ele.category}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                          {ele.description}
                        </Typography>

                        {userId == ele.user._id ? (
                          <DropdownButton
                          variant="success"
                            title="Select Button"
                            style={{ marginLeft: "200px", marginTop: "-40px" }}
                          >
                            <Dropdown.Item
                              href="#/action-1"
                              onClick={() => {
                                handlePost();
                                editPost(ele._id);
                              }}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              href="#/action-2"
                              onClick={() => {
                                DeletePost(ele._id);
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                          </DropdownButton>
                        ) : (
                          ""
                        )}
                        {/* {userId == ele.user._id ? (
                          <Button
                            variant="contained"
                            onClick={() => {
                              handlePost();
                              editPost(ele._id);
                            }}
                            startIcon={<EditIcon />}
                          >
                            Update
                          </Button>
                        ) : (
                          ""
                        )}

                        {userId == ele.user._id ? (
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              DeletePost(ele._id);
                            }}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        ) : (
                          ""
                        )} */}
                      </CardContent>

                      <AllComments
                        dashBoard={dashBoard}
                        postId={ele._id}
                        getAllPost={getAllPost}
                      />
                    </React.Fragment>
                  </Card>
                  {/* <br></br> */}
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
      {/* </div> */}
      {/* //////////Create Pst///// */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePost handleClose={handleClose} getAllPost={getAllPost} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      {/* //////////Update Post//// */}
      <Modal show={updateShow} onHide={handleDashboard}>
        <Modal.Header>
          <Modal.Title>Update Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdatePost
            sendUserId={sendUserId}
            handleDashboard={handleDashboard}
            getAllPost={getAllPost}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDashboard}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DashBoard;
