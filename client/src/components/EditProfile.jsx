import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";

const EditProfile = () => {
  const { user, updateUser, setUser } = useAuth();
  const [showPopup, setShowPopup] = useState(false);
  const [fields, setFields] = useState({
    ...user,
  });

  const handleEditClickOpen = () => {
    setShowPopup(true);

  };

  const handleEditClickClose = () => {
    setShowPopup(false);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    updateUser(fields);
  };

  const handleChangeProfile = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

 
  console.log(user);
  return (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={handleEditClickOpen}>Edit Profile</button>
        <button onClick={handleEditClickClose}>Close</button>
        {showPopup && (
          <div className="popup-window">
            <h2>Edit Profile</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                type="text"
                name="email"
                value={fields.email}
                onChange={handleChangeProfile}
                placeholder="Email"
              />
              <input
                type="text"
                name="displayName"
                value={fields.displayName}
                onChange={handleChangeProfile}
                placeholder="Display Name"
              />
              <textarea
                name="bio"
                value={fields.bio}
                onChange={handleChangeProfile}
                placeholder="Bio"
                rows={6}
              ></textarea>
              <input
                type="password"
                name="password"
                value={fields.password}
                onChange={handleChangeProfile}
                placeholder="Password"
              />
              <input
                type="password"
                name="passwordCheck"
                value={fields.passwordCheck}
                onChange={handleChangeProfile}
                placeholder="Confirm Password"
              />
              <input type="submit" value="Save" />
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
