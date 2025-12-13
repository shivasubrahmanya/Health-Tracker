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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/login";
        return;
      }

      const res = await fetch("http://localhost:5000/api/v1/profile/me", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.ok) setProfile(data);

      setLoading(false);
    };

    loadProfile();
  }, []);

  const handleEdit = () => {
    window.location.href = "/profile-setup";
  };

  if (loading) return <h2>Loading...</h2>;

  if (!profile) return (
    <div>
      <h2>No profile yet</h2>
      <button onClick={handleEdit}>Create Profile</button>
    </div>
  );

  return (
    <div className="profile-view-container">
      <h1>Your Profile</h1>

      <div className="profile-view-card">

  <div className="profile-item">
    <span className="label">Name</span>
    <span className="value">{profile.name}</span>
  </div>

  <div className="profile-item">
    <span className="label">Age</span>
    <span className="value">{profile.age}</span>
  </div>

  <div className="profile-item">
    <span className="label">Gender</span>
    <span className="value">{profile.gender}</span>
  </div>

  <div className="profile-item">
    <span className="label">Weight</span>
    <span className="value">{profile.weight} kg</span>
  </div>

  <div className="profile-item">
    <span className="label">Height</span>
    <span className="value">{profile.height} cm</span>
  </div>

  <div className="profile-item">
    <span className="label">Goal</span>
    <span className="value">{profile.goal}</span>
  </div>

  <div className="profile-item">
    <span className="label">Activity Level</span>
    <span className="value">{profile.activity}</span>
  </div>

  <button onClick={handleEdit}>Edit Profile</button>

</div>

    </div>
  );
}
