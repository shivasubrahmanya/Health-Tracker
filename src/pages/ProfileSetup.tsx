import { useState } from "react";
import { API_BASE_URL } from "../config";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileType>({
    name: "",
    age: "",
    weight: "",
    height: "",
    gender: "",
    goal: "",
    activity: ""
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      navigate("/login");
      return;
    }

    const res = await fetch(`${API_BASE_URL}/api/v1/profile/setup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Error saving profile");
      return;
    }

    alert("Profile Updated Successfully!");

    // redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">Profile Setup</h1>

      <form className="profile-card" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Name</label>
          <input name="name" value={profile.name} onChange={handleChange} />
        </div>

        <div className="two-column">
          <div className="input-group">
            <label>Age</label>
            <input name="age" type="number" value={profile.age} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Gender</label>
            <select name="gender" value={profile.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="two-column">
          <div className="input-group">
            <label>Weight (kg)</label>
            <input name="weight" type="number" value={profile.weight} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Height (cm)</label>
            <input name="height" type="number" value={profile.height} onChange={handleChange} />
          </div>
        </div>

        <div className="input-group">
          <label>Goal</label>
          <select name="goal" value={profile.goal} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Build Muscle">Build Muscle</option>
            <option value="Reduce Stress">Reduce Stress</option>
            <option value="Improve Sleep">Improve Sleep</option>
          </select>
        </div>

        <div className="input-group">
          <label>Activity Level</label>
          <select name="activity" value={profile.activity} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Sedentary">Sedentary</option>
            <option value="Light Activity">Light Activity</option>
            <option value="Moderate Activity">Moderate Activity</option>
            <option value="Highly Active">Highly Active</option>
          </select>
        </div>

        <button className="save-btn" type="submit">
          Save & Continue
        </button>
      </form>
    </div>
  );
}

export default ProfileSetup;
