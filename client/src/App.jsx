import { useState } from "react";
import { Routes, Route, Link, NavLink, useParams } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoutes from "./components/PrivateRoutes";
import HomePage from "./pages/HomePage";


function App() {

  return (
    <>
      <nav>
        {/* <NavLink to="/">Home </NavLink> */}
        <NavLink to="/login">Login </NavLink>
        <NavLink to="/register">Register </NavLink>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoutes redirectTo="/login" />}>
          <Route path="/" element={<HomePage/>}/>
      
        </Route>
      </Routes>
    </>
  );
}

export default App;