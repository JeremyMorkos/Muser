import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormStyles from "./Form.module.css";
// import '../index.css'

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    const isAnyFieldEmpty = Object.values(fields).some((value) => value === "");
    if (isAnyFieldEmpty) {
      setShowModal(true);
      return;
    }

    try {
      await register(fields);
      navigate("/auth");
    } catch (err) {
      console.log(err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleGoBack = () => {
    navigate("/landing");
  };


  return (
    <>
      <form onSubmit={handleRegister} className={FormStyles.registerForm}>
        <h1 className={FormStyles.formTitle}>Register</h1>
        <input
          className={FormStyles.formInput}
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className={FormStyles.formInput}
          type="text"
          name="displayName"
          placeholder="Display Name"
        />
        <textarea
          className={FormStyles.formTextarea}
          name="bio"
          placeholder="bio"
          rows={6}
        ></textarea>
        <input
          className={FormStyles.formInput}
          type="password"
          name="password"
          placeholder="Password"
        />
        <input
          className={FormStyles.formInput}
          type="password"
          name="passwordCheck"
          placeholder="Confirm Password"
        />
          <div className={FormStyles.buttonContainer}>
          <input className={FormStyles.formButton} type="submit" value="Register" />
          <button className={FormStyles.goBackButton} onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </form>
      {showModal && (
        <div className={FormStyles.modalContainer}>
          <div className={FormStyles.modalContent}>
            <p>Please fill out all the fields.</p>
            <button className={FormStyles.modalButton} onClick={closeModal}>
              Go Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
