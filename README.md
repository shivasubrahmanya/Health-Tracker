# 🥗 AI Health Tracker

A comprehensive, AI-powered health tracking application built with **React 19** and **Node.js**. Monitor your daily health metrics, analyze your diet, and receive personalized AI insights to improve your well-being.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![Node](https://img.shields.io/badge/Node-v18+-339933.svg)

## 🚀 Key Features

### 📊 Modern Dashboard
-   **Health Score (0-100):** Real-time daily score calculated from your steps, water, sleep, and mood.
-   **Visual Progress:** Sleek linear `StatCards` for tracking Steps, Water, and Sleep goals.
-   **Gamification:** Daily streaks and motivational quotes to keep you inspired.
-   **Glassmorphism UI:** A beautiful, modern interface with responsive grid layouts.

### 🍎 Smart Mood & Meals
-   **Food Analysis:** Instant client-side analysis of your meals. Automatically detects **Healthy** vs **Junk** foods based on an extensive keyword library (tailored for Indian cuisine) and provides a verdict (e.g., "✅ Balanced & Healthy" or "⚠️ High Calorie").
-   **Mood Tracking:** Log your emotional state and visualize it alongside your diet.

### 🧠 AI Health Dashboard
-   **Health Risk Assessment:** AI-driven analysis of your potential health risks (Low/Medium/High) with contributing factors.
-   **Sleep Prediction:** Predicts your sleep duration based on your daily activity.
-   **Daily Recommendations:** Personalized tips for Yoga, Hydration, and Activity.
-   **Custom Diet Plan:** A daily meal plan (Breakfast, Lunch, Dinner, Snacks) with calorie estimation.

### 📜 Comprehensive History
-   **Detailed Logs:** View your entire history of health reports.
-   **Interactive Charts:** Visualize trends for Steps, Water, Sleep, Stress, and Mood over time using `Recharts`.
-   **Filtering:** Toggle between different metrics to analyze specific areas of your health.

### 👤 Profile & Badges
-   **Profile Management:** Manage your physical stats (Height, Weight, Goals).
-   **Achievements:** View your earned badges (e.g., "Hydration King", "Step Master") in the profile section.

---

## 🛠️ Tech Stack

-   **Frontend:** React 19, TypeScript, Vite, Recharts, CSS Modules (Glassmorphism).
-   **Backend:** Node.js, Express.js.
-   **Database:** MongoDB, Mongoose.
-   **Authentication:** JWT (JSON Web Tokens).

---

## 📦 Setup & Installation

### Prerequisites
-   Node.js (v18 or higher)
-   MongoDB (Local instance or Atlas URI)

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

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

Start the server:
```bash
npm start
# or for development:
npm run dev
```

### 3. Frontend Setup
In a new terminal window, navigate to the root directory:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Access the app at `http://localhost:5173`.

---

## 🗺️ Roadmap

-   [ ] **Mobile Optimization:** Fully responsive mobile-first design.
-   [ ] **Wearable Sync:** Integration with Google Fit / Apple Health.
-   [ ] **Social Sharing:** Share achievements with friends.
-   [ ] **Advanced LLM:** Deeper integration with Gemini/OpenAI for conversational health advice.

---

*Built for a healthier you.*
