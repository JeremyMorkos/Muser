import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import FormStyles from "./Form.module.css";

const LoginForm = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));

    if (!fields.email || !fields.password) {
      setShowModal(true);
      setErrorMessage("Email or password is missing.");
      return;
    }

    try {
      await login(fields);
      navigate("/auth");
    } catch (err) {
      setShowModal(true);
      setErrorMessage("Email or password is incorrect.");
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
      <form onSubmit={handleSubmit} className={FormStyles.registerForm}>
        <h1 className={FormStyles.formTitle}>Login</h1>
        <input
          className={FormStyles.formInput}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          className={FormStyles.formInput}
          type="password"
          name="password"
          placeholder="Password"
        />
        <div className={FormStyles.buttonContainer}>
          <input
            className={FormStyles.formButton}
            type="submit"
            value="Login"
          />
          <button className={FormStyles.goBackButton} onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      </form>
      {showModal && (
        <div className={FormStyles.modalContainer}>
          <div className={FormStyles.modalContent}>
            <p>{errorMessage}</p>
            <button className={FormStyles.modalButton} onClick={closeModal}>
              Go Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default LoginForm;
