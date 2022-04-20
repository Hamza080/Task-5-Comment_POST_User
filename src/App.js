import React,{useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import DashBoard from "./DashBoard";
import Home from "./Home";
import Profile from "./Profile";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')|| "");
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/" element={<Home />}>  </Route>
            <Route path="/dashboard" element={<DashBoard />}> </Route>
            <Route path="/profile" element={<Profile />}> </Route>
  
      </Routes>
    </BrowserRouter>
  );
};
export default App;


