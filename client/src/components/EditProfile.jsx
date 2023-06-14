import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import ProfileStyles from "./Profile.module.css";

const EditProfile = () => {
  const { user, updateUser, setUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [editFields, setEditFields] = useState({ ...user });
  const [activeField, setActiveField] = useState("");

  const handleEditClickOpen = (field) => {
    setShowPopup(true);
    setActiveField(field);
  };

  const handleEditClickClose = () => {
    setShowPopup(false);
    setActiveField("");
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(editFields);
      setUser(editFields, { ...user });
      setShowPopup(false);
      setActiveField("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProfile = (event) => {
    setEditFields({ ...editFields, [event.target.name]: event.target.value });
  };

  const isFieldActive = (field) => {
    return activeField === field;
  };

  return (
    <>
      <span type="button" className={ProfileStyles.profileTitle} onClick={() => setShowPopup(true)}> Update Profile</span>
      {showPopup && (
        <div className={ProfileStyles.modal}>
          <div className={ProfileStyles.modalContent}>
            <form className={ProfileStyles.formWraper} onSubmit={handleEditSubmit}>
            <h2 className={ProfileStyles.formTitle}>
              Details
            </h2>
            <button className={ProfileStyles.modalButtonBack} onClick={handleEditClickClose}>
            X
            </button>
              <div className={ProfileStyles.formGroup}>
                
                {isFieldActive("email") ? (
                  <input
                  className={ProfileStyles.formInput}
                    type="text"
                    name="email"
                    value={editFields.email}
                    onChange={handleChangeProfile}
                    placeholder="Email"
                  />
                ) : (
                  <>
                    <button className={ProfileStyles.formButton} onClick={() => handleEditClickOpen("email")}>Email</button>
                  </>
                )}
              </div>
              <div className={ProfileStyles.formGroup}>
  
                {isFieldActive("displayName") ? (
                  <input
                  className={ProfileStyles.formInput}
                    type="text"
                    name="displayName"
                    value={editFields.displayName}
                    onChange={handleChangeProfile}
                    placeholder="display name"
                  />
                ) : (
                  <>
                   
                    <button className={ProfileStyles.formButton} onClick={() => handleEditClickOpen("displayName")}>Display name</button>
                  </>
                )}
              </div>
              <div className={ProfileStyles.formGroup}>
               
                {isFieldActive("bio") ? (
                  <textarea
                  className={ProfileStyles.formInput}
                    name="bio"
                    value={editFields.bio}
                    onChange={handleChangeProfile}
                    rows={6}
                    placeholder="Bio"
                  ></textarea>
                ) : (
                  <>
                  
                    <button className={ProfileStyles.formButton} onClick={() => handleEditClickOpen("bio")}>Bio</button>
                  </>
                )}
              </div>
              <div className={ProfileStyles.formGroup}>
              
                {isFieldActive("password") ? (
                  <input
                  className={ProfileStyles.formInput}
                    type="password"
                    name="password"
                    value={editFields.password}
                    onChange={handleChangeProfile}
                    placeholder="Password"
                  />
                ) : (
                  <>
                    <button className={ProfileStyles.formButton} onClick={() => handleEditClickOpen("password")}>Password</button>
                  </>
                )}
              </div>
              {editFields.password && (
          <div className={ProfileStyles.formGroup}>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              className={ProfileStyles.formInput}
              value={editFields.confirmPassword}
              onChange={handleChangeProfile}
              placeholder="Confirm Password"
            />
          </div>
        )}
              {isFieldActive("email") ||
              isFieldActive("displayName") ||
              isFieldActive("bio") ||
              isFieldActive("password") ? (
                <div className={ProfileStyles.formGroup}>
                  <input className={ProfileStyles.updateButton} type="submit" value="Update" />
                </div>
              ) : null}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
