import { useAuth } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormStyles from "./Form.module.css";

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //form function to register a user - check to see if the form fields are valid and entered. 
  const handleRegister = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    const isAnyFieldEmpty = Object.values(fields).some((value) => value === "");
    if (isAnyFieldEmpty) {
      setShowModal(true);
      setErrorMessage("Please fill out all fields of the form");
      return;
    }
    try {
      await register(fields);
      navigate("/profile");
    } catch (err) {
      debugger;
      setShowModal(true);
      setErrorMessage(err.message);
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
          <input
            className={FormStyles.formButton}
            type="submit"
            value="Register"
          />
          <button className={FormStyles.goBackButton} onClick={handleGoBack}>
            Back
          </button>
        </div>
      </form>
      {showModal && (
        <div className={FormStyles.modalContainer}>
          <div className={FormStyles.modalContent}>
            <p>{errorMessage}</p>
            <button className={FormStyles.modalButton} onClick={closeModal}>
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
