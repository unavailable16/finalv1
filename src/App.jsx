import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./Component/Main_Page/Navbar";
import Main from "./Component/Main_Page/Main";
import About from "./Component/About/About.jsx";
import NvidiaPages from "./Component/nvidia/Nv";
import AmdPages from "./Component/amd/Amd";
import NvPage from "./Component/nvidia/NvPage";
import IntelPages from "./Component/intel/Intel.jsx";
import IntelPage from "./Component/intel/IntelPage";
import AmdPage from "./Component/amd/AmdPage";
import Create from "./Component/Create/Create.jsx";
import Search from "./Component/Search/Search.jsx";
import Login from "./Component/Login/Login.jsx";
import Signup from "./Component/Login/Signup.jsx";
import { AuthProvider, useAuth } from "./Component/AuthContext.jsx";

import AOS from "aos";
import "aos/dist/aos.css";
import "./App.css";

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Router>
        <Nav className="awok" />
        <Routes>
          <Route path="home" element={<PrivateRoute component={<Main />} />} />
          <Route path="about" element={<PrivateRoute component={<About />} />} />
          <Route path="amd" element={<PrivateRoute component={<AmdPages />} />} />
          <Route path="amd/:id" element={<PrivateRoute component={<AmdPage />} />} />
          <Route path="nvd" element={<PrivateRoute component={<NvidiaPages />} />} />
          <Route path="nvidia/:id" element={<PrivateRoute component={<NvPage />} />} />
          <Route path="intel" element={<PrivateRoute component={<IntelPages />} />} />
          <Route path="intel/:id" element={<PrivateRoute component={<IntelPage />} />} />
          <Route path="create" element={<PrivateRoute component={<Create />} />} />
          <Route path="search" element={<PrivateRoute component={<Search />} />} />
          <Route index element={<Login />} />
          <Route path="sign" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

const PrivateRoute = ({ component }) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? component : <Navigate to="/login" />;
};

export default App;
