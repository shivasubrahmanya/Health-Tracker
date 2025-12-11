import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

/* ---------------------------
   TYPE FOR PROFILE DATA
---------------------------- */
interface ProfileType {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  goal: string;
  activity: string;
}

function ProfileSetup() {
  /* ---------------------------
      STATE WITH TYPE
  ---------------------------- */
  const [profile, setProfile] = useState<ProfileType>({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    goal: "",
    activity: ""
  });

  /* ---------------------------
      HANDLE INPUT CHANGE
  ---------------------------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  /* ---------------------------
      HANDLE FORM SUBMIT
  ---------------------------- */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Profile Updated Successfully!");
    console.log("Profile Data:", profile);
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile</h1>
      <p className="profile-subtitle">Update your personal health information</p>

      <form className="profile-card" onSubmit={handleSubmit}>
        {/* NAME */}
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={profile.name}
            onChange={handleChange}
          />
        </div>

        {/* TWO COLUMN: AGE + GENDER */}
        <div className="two-column">
          <div className="input-group">
            <label>Age</label>
            <input
              type="number"
              name="age"
              placeholder="e.g., 20"
              value={profile.age}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* TWO COLUMN: WEIGHT + HEIGHT */}
        <div className="two-column">
          <div className="input-group">
            <label>Weight (kg)</label>
            <input
              type="number"
              name="weight"
              placeholder="e.g., 65"
              value={profile.weight}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Height (cm)</label>
            <input
              type="number"
              name="height"
              placeholder="e.g., 170"
              value={profile.height}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* GOAL */}
        <div className="input-group">
          <label>Health Goal</label>
          <select
            name="goal"
            value={profile.goal}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Build Muscle">Build Muscle</option>
            <option value="Reduce Stress">Reduce Stress</option>
            <option value="Improve Sleep">Improve Sleep</option>
          </select>
        </div>

        {/* ACTIVITY */}
        <div className="input-group">
          <label>Activity Level</label>
          <select
            name="activity"
            value={profile.activity}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Light Activity">Light Activity</option>
            <option value="Moderate Activity">Moderate Activity</option>
            <option value="Highly Active">Highly Active</option>
          </select>
        </div>

        {/* SAVE BUTTON */}
        <button className="save-btn" type="submit">
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup;
