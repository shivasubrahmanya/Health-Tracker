import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProfileSetup from "./pages/ProfileSetup";
import Dashboard from "./pages/Dashboard";
import DailyInput from "./pages/DailyInput";
import AiTips from "./pages/AiTips";
import ProfilePage from "./pages/ProfilePage";
import History from "./pages/History";
import Settings from "./pages/Settings";


import NavBar from "./components/NavBar";      // Home navbar
import MainNav from "./components/MainNav";    // Logged-in navbar

function AppWrapper() {
  const location = useLocation();
  const path = location.pathname;

  // Pages that should NOT show MainNav
  const hideMainNav = ["/", "/login", "/signup"];

  return (
    <>
      {/* SHOW HOMEPAGE NAVBAR ONLY ON "/" */}
      {path === "/" && <NavBar />}

      {/* SHOW MAIN NAVBAR ON LOGGED-IN PAGES */}
      {!hideMainNav.includes(path) && <MainNav />}

      <Routes>
        {/* PUBLIC HOME PAGE */}
        <Route path="/" element={<Home />} />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* USER PROFILE SETUP */}
        <Route path="/profile-setup" element={<ProfileSetup />} />

        {/* MAIN APP PAGES */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/daily-input" element={<DailyInput />} />
        <Route path="/ai-tips" element={<AiTips />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* ADD SETTINGS PAGE IF EXISTS */}
        <Route path="/settings" element={<Settings />} />

        {/* FALLBACK → HOME */}
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="footer" style={{ marginTop: "auto" }}>
        <p>© 2025 Health Tracker — All Rights Reserved</p>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}
