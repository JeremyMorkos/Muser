import { useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";
import ProfileStyles from "./Profile.module.css";
import Auth from "./Auth";

const EditProfile = () => {
  const { user, updateUser, setUser } = useAuth();
  const [editFields, setEditFields] = useState({ ...user });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  

  // form function to update the user on submit
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(editFields);
      setUser(editFields, { ...user });
      showSuccessMessage();
    } catch (error) {
      console.log(error);
    }
  };

  //update the fields from the form values. 
  const handleChangeProfile = (event) => {
    setEditFields({ ...editFields, [event.target.name]: event.target.value });
  };

  // open message when update is successful
  const showSuccessMessage = () => {
    setShowSuccessModal(true);
    setSuccessMessage("Update Successful");
  };

  return (
    <div className={ProfileStyles.profileContainer}>
      <h2 className={ProfileStyles.titleContainer}>Profile</h2>
      <Auth />
      <form className={ProfileStyles.formWraper} onSubmit={handleEditSubmit}>
        <div className={ProfileStyles.formGroup}>
          <input
            className={ProfileStyles.formInput}
            type="text"
            name="email"
            value={editFields.email}
            onChange={handleChangeProfile}
            placeholder="Email"
          />
        </div>
        <div className={ProfileStyles.formGroup}>
          <input
            className={ProfileStyles.formInput}
            type="text"
            name="displayName"
            value={editFields.displayName}
            onChange={handleChangeProfile}
            placeholder="Display name"
          />
        </div>
        <div className={ProfileStyles.formGroup}>
          <textarea
            className={ProfileStyles.formTextarea}
            name="bio"
            value={editFields.bio}
            onChange={handleChangeProfile}
            rows={6}
            placeholder="Bio"
          ></textarea>
        </div>
        <div className={ProfileStyles.formGroup}>
          <input
            className={ProfileStyles.formInput}
            type="password"
            name="password"
            value={editFields.password}
            onChange={handleChangeProfile}
            placeholder="Password"
          />
        </div>
        <div className={ProfileStyles.formGroup}>
          <input
            type="password"
            name="confirmPassword"
            className={ProfileStyles.formInput}
            value={editFields.confirmPassword}
            onChange={handleChangeProfile}
            placeholder="Confirm Password"
          />
        </div>
        <div className={ProfileStyles.formGroup}>
          <input
            className={ProfileStyles.updateButton}
            type="submit"
            value="Update"
          />
        </div>
      </form>
      {showSuccessModal && (
        <div className={ProfileStyles.modalSuccess}>
          <div className={ProfileStyles.modalContentSuccess}>
            <p>{successMessage}</p>
            <button className={ProfileStyles.successBtn} onClick={() => setShowSuccessModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
