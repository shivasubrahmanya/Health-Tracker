from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import numpy as np
import joblib
import os

app = FastAPI(title="Health Tracker ML Service")

# --- DATA STRUCTURES ---
class HealthMetrics(BaseModel):
    sleep: float
    steps: int
    water: float
    stress: int
    mood: int
    caffeine: float = 0.0
    screen_time: float = 0.0

# --- ROUTES ---

@app.get("/")
def health_check():
    """Heartbeat endpoint to verify service is running."""
    return {"status": "online", "service": "ml-service"}

@app.post("/predict/sleep")
def predict_sleep(data: HealthMetrics):
    """
    Predicts sleep quality/hours based on daily activities.
    Uses the trained 'sleep_model.pkl' if available, else heuristic fallback.
    """
    try:
        # Load model (lazy loading or global loading prefers global but this works for demo)
        model_path = os.path.join("models", "sleep_model.pkl")
        if os.path.exists(model_path):
            model = joblib.load(model_path)
            
            # Prepare features: ['Physical Activity Level', 'Stress Level', 'Heart Rate', 'Daily Steps']
            # We need to derive these from input 'data'
            # 'Physical Activity Level' -> approx from steps (0-100)
            phy_activity = min(data.steps / 150, 100) 
            # 'Heart Rate' -> approx from stress. Base 70 + (stress*3)
            heart_rate = 70 + (data.stress * 3)
            
            features = pd.DataFrame([{
                'Physical Activity Level': phy_activity,
                'Stress Level': data.stress,
                'Heart Rate': heart_rate,
                'Daily Steps': data.steps
            }])
            
            prediction = model.predict(features)[0]
            
            return {
                "predicted_sleep_hours": round(prediction, 1),
                "factors": {
                    "model_used": "RandomForestRegressor",
                    "confidence": "high"
                },
                "model_version": "trained_v1"
            }
        
        else:
            # Fallback if no model found
            predicted_sleep = 8.0
            if data.stress > 7:
                predicted_sleep -= 1.0
            if data.steps > 8000:
                predicted_sleep += 0.5
            if data.caffeine > 200: # mg
                predicted_sleep -= 0.5
                
            return {
                "predicted_sleep_hours": round(predicted_sleep, 1),
                "factors": {
                    "stress_impact": "high" if data.stress > 7 else "normal",
                    "activity_impact": "positive" if data.steps > 8000 else "neutral"
                },
                "model_version": "heuristic_fallback"
            }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/calc/risk")
def calculate_risk(data: HealthMetrics):
    """
    Calculates a composite Health Risk Score (0-100).
    Lower is better. 0 = Perfect Health, 100 = Critical Risk.
    """
    # 1. Normalize metrics to risk factors (0-1)
    # Stress: 0-10 -> map to 0-1
    risk_stress = data.stress / 10.0
    
    # Sleep: <7 or >9 is risky. Ideal is 7-9.
    # Deviation from 8.
    sleep_gap = abs(data.sleep - 8)
    risk_sleep = min(sleep_gap / 4.0, 1.0) # Cap risk at 1.0
    
    # Steps: Target 10k. Risk increases as steps decrease.
    risk_sedentary = 1.0 - min(data.steps / 10000.0, 1.0)
    
    # Mood: 1(Sad)-5(Happy). Risk is inverse of mood.
    risk_mood = (5 - data.mood) / 4.0
    
    # Weights for the composite score
    # Stress: 30%, Sleep: 30%, Sedentary: 20%, Mood: 20%
    composite_score = (
        (risk_stress * 35) + 
        (risk_sleep * 30) + 
        (risk_sedentary * 20) + 
        (risk_mood * 15)
    )
    
    return {
        "risk_score": round(composite_score, 1), # 0 to 100
        "risk_level": "Low" if composite_score < 30 else "Moderate" if composite_score < 60 else "High",
        "breakdown": {
            "stress_contribution": round(risk_stress * 35, 1),
            "sleep_contribution": round(risk_sleep * 30, 1)
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
