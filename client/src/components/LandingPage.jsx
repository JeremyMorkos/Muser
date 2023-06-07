import { useState } from "react";
import { Link } from "react-router-dom";
import LandingStyles from "./Landing.module.css";


const LandingPage = () => {
  return (
    <div className={LandingStyles.landingContainer}>
      <h1 className={LandingStyles.LandingTitle}>Muser</h1>
      <div className={LandingStyles.buttonContainer}>
        <Link to="/register" className={LandingStyles.signupButton}>
          Register
        </Link>
        <Link to="/login" className={LandingStyles.loginButton}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
