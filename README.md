# Health Tracker

A comprehensive health tracking application built with React and Node.js. Track your daily health metrics, mood, and meals, and get AI-powered insights to improve your well-being.

## 🚀 Status
**Current Version:** 1.0.0
**Status:** Active Development

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 19 (Vite)
- **Language:** TypeScript
- **Styling:** CSS Modules / Vanilla CSS
- **Visualization:** Recharts
- **Routing:** React Router v7

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)

## ✨ Features Implemented

### 1. User Authentication
- Secure **Login** and **Sign Up** functionality.
- JWT-based authentication for secure session management.

### 2. Dashboard
- **Visual Analytics:** Real-time health data visualization using Recharts.
  - *Stat Rings:* Quick circular progress views of daily goals.
  - *Summary Bar Charts:* Weekly overview of health metrics.
  - *Weekly Line Charts:* Trend analysis over time.
- **Summary Cards:** Quick access to key daily metrics (Water, Sleep, Steps).

### 3. Daily Tracking
- **Daily Input:** Intuitive interface to log your daily stats.
- **Mood & Meals:** dedicated cards to track your emotional state and nutritional intake with the `MoodMealsCard`.

### 4. Smart Insights
- **AI Tips:** Personalized health recommendations based on your logs.
- **Diet Tips:** specialized AI-driven dietary advice (`AIDietTips`).

### 5. Profile Management
- **Profile Page:** Manage user details and settings.
- **Profile Setup:** Guided flow for initial user configuration.

## 📦 Setup & Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (Local instance or Atlas URI)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Health-Tracker-main
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory with your configuration:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

Start the server:
```bash
npm start
# or for development with nodemon:
npm run dev
```

### 3. Frontend Setup
In a new terminal window, navigate to the root directory (if not already there) and install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:5173`.

## 🗺️ Roadmap / Future Plans

This project is constantly evolving. Here is what is planned for future updates:

- [ ] **Mobile Optimization:** Enhance the responsive design for a seamless mobile experience.
- [ ] **Advanced AI Analytics:** Deeper integration with LLMs for detailed weekly health reports and anomaly detection.
- [ ] **Social Features:** Friends, leaderboards, and community challenges.
- [ ] **Wearable Integration:** Sync data from Fitbit, Apple Health, or Google Fit.
- [ ] **Dark Mode:** Full system-wide dark mode support.
- [ ] **Export Data:** Ability to export health reports as PDF/CSV.

---
*Built with ❤️ by Shiva*
