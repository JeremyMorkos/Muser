import { useAuth } from "../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RegisterForm = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.target));
    try {
      await register(fields);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" name="email" placeholder="Email" />
      <input type="textarea" name="displayName" placeholder="Display Name" />
      <textarea name="bio" placeholder="bio" rows={6}></textarea>
      <input type="password" name="password" placeholder="Password" />
      <input
        type="password"
        name="passwordCheck"
        placeholder="Confirm Password"
      />
      <input type="submit" value="Register" />
    </form>
  );
};

export default RegisterForm;
