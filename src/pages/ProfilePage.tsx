import { useEffect, useState } from "react";

interface ProfileType {
  name: string;
  age: string;
  weight: string;
  height: string;
  gender: string;
  goal: string;
  activity: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileType | null>(null);

 useEffect(() => {
  const loadProfile = () => {
    const saved = localStorage.getItem("userProfile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  };

  loadProfile();
}, []);


  const handleEdit = () => {
    window.location.href = "/edit-profile";
  };

  if (!profile) {
    return (
      <div className="profile-view-container">
        <h2>No profile found</h2>
        <button className="edit-btn" onClick={handleEdit}>
          Create Profile
        </button>
      </div>
    );
  }

  return (
    <div className="profile-view-container">
      <h1 className="profile-view-title">Your Profile</h1>
      <p className="profile-view-subtitle">Review your details</p>

      <div className="profile-view-card">
        <div className="row"><span className="label">Name:</span> <span className="value">{profile.name}</span></div>
        <div className="row"><span className="label">Age:</span> <span className="value">{profile.age}</span></div>
        <div className="row"><span className="label">Gender:</span> <span className="value">{profile.gender}</span></div>
        <div className="row"><span className="label">Weight:</span> <span className="value">{profile.weight} kg</span></div>
        <div className="row"><span className="label">Height:</span> <span className="value">{profile.height} cm</span></div>
        <div className="row"><span className="label">Goal:</span> <span className="value">{profile.goal}</span></div>
        <div className="row"><span className="label">Activity:</span> <span className="value">{profile.activity}</span></div>

        <button className="edit-btn" onClick={handleEdit}>Edit Profile</button>
      </div>
    </div>
  );
}
