import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config";

interface ProfileType {
  _id?: string;
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

      const res = await fetch(`${API_BASE_URL}/api/v1/profile/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!res.ok) {
        console.error("Profile Fetch Failed:", res.status, res.statusText);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setProfile(data);
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
      <div className="profile-header-section">
        <h1 className="profile-title">Your Profile</h1>
        <p className="profile-subtitle">Manage your personal health details</p>
      </div>

      <div className="profile-content-grid">

        {/* LEFT COLUMN: IDENTITY CARD */}
        <div className="glass-card identity-card">
          <div className="profile-avatar-large">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div className="identity-info">
            <h2>{profile.name}</h2>
            <p className="email-text">User ID: {profile._id?.substring(0, 8) || "8293..."}</p>
            <span className="profile-badge-lg">{profile.gender}, {profile.age} years</span>
          </div>
          <button className="edit-btn-lg" onClick={handleEdit}>
            Edit Profile
          </button>
        </div>

        {/* RIGHT COLUMN: STATS GRID */}
        <div className="glass-card stats-card-container">
          <h3 className="section-heading">Physical Stats & Goals</h3>

          <div className="detailed-stats-grid">
            <div className="stat-box">
              <span className="stat-icon">⚖️</span>
              <div>
                <span className="stat-label">Weight</span>
                <span className="stat-value">{profile.weight} kg</span>
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-icon">📏</span>
              <div>
                <span className="stat-label">Height</span>
                <span className="stat-value">{profile.height} cm</span>
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-icon">🎯</span>
              <div>
                <span className="stat-label">Goal</span>
                <span className="stat-value">{profile.goal}</span>
              </div>
            </div>

            <div className="stat-box">
              <span className="stat-icon">⚡</span>
              <div>
                <span className="stat-label">Activity</span>
                <span className="stat-value">{profile.activity}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NEW SECTION: ACHIEVEMENTS / BADGES */}
      <div className="glass-card achievements-card">
        <h3 className="section-heading">🏆 Achievements & Badges</h3>
        <div className="badges-grid">
          <div className="badge-item earned">
            <span className="badge-icon">🔥</span>
            <span>3 Day Streak</span>
          </div>
          <div className="badge-item earned">
            <span className="badge-icon">💧</span>
            <span>Hydration King</span>
          </div>
          <div className="badge-item">
            <span className="badge-icon grayscale">🏃</span>
            <span>Step Master</span>
          </div>
          <div className="badge-item">
            <span className="badge-icon grayscale">🦁</span>
            <span>Early Bird</span>
          </div>
          <div className="badge-item">
            <span className="badge-icon grayscale">🥗</span>
            <span>Clean Eater</span>
          </div>
        </div>
      </div>

    </div>
  );
}
