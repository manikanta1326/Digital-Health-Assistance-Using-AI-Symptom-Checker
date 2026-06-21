import { useState } from "react";
import "../styles/profile.css";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  const updateProfile = () => {
    const updatedUser = {
      ...user,
      name,
      email,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("Profile Updated");
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>👤 User Profile</h1>

        <label>Name</label>
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <label>Email</label>
        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button onClick={updateProfile}>
          Update Profile
        </button>
      </div>
    </div>
  );
}

export default Profile;