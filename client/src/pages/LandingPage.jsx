import { useState } from "react";
import { Link } from "react-router-dom";
import LandingStyles from "../components/Logo/Landing.module.css";
import Logo from "../components/Logo/Logo";


const LandingPage = () => {
  document.title = "Muser";
  return (
    <div className={LandingStyles.landingContainer}>
           <img src="../public/images/muser-logo.png" alt="logo" className={LandingStyles.Logo}
      />
      <div className={LandingStyles.titleWrapper}>
      <h1 className={LandingStyles.LandingTitle}>Muser</h1>
      </div>
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
