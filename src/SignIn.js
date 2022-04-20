import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // useEffect(() => {}, [token]);

  const handelChange = async (e) => {
    e.preventDefault();
    const newUser = {
      email: loginEmail,
      password: loginPassword,
    };
    try {
      const res = await axios.post(
        "https://taskforum.herokuapp.com/api/auth/signIn",
        newUser,
        {
          headers: {
            authorization: "Bearer YOUR_JWT_TOKEN_HERE",
          },
        }
      );
      localStorage.setItem("Token", JSON.stringify(res.data.token));
      localStorage.setItem("id", JSON.stringify(res.data.id));
      setToken(res.data.token);
      setData(res.data);
      if (token) {
        navigate("dashboard");
      }
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  };
  return (
    <>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            CloudTek
          </a>
        </div>
      </nav>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handelChange} noValidate sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              // required
              fullWidth
              label="Enter Your Email"
              autoComplete="email"
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
              }}
            />
            <TextField
              variant="outlined"
              // required
              fullWidth
              label="Password"
              type="password"
              value={loginPassword}
              autoComplete="current-password"
              onChange={(e) => {
                setLoginPassword(e.target.value);
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item>
                <Link href="signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </>
  );
};

export default SignIn;
