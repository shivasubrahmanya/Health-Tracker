import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
import joblib
import os

# --- CONFIG ---
DATA_PATH = "Sleep_Health_and_Lifestyle_Dataset.csv"
MODEL_DIR = "models"
os.makedirs(MODEL_DIR, exist_ok=True)

def train_sleep_model():
    print("Training Sleep Prediction Model...")
    
    if not os.path.exists(DATA_PATH):
        print(f"❌ Dataset not found at {DATA_PATH}. Skipping.")
        return

    df = pd.read_csv(DATA_PATH)
    
    # Preprocessing (Simplified for example)
    # Target: 'Sleep Duration'
    # Features: 'Physical Activity Level', 'Stress Level', 'Heart Rate', 'Daily Steps'
    
    features = ['Physical Activity Level', 'Stress Level', 'Heart Rate', 'Daily Steps']
    target = 'Sleep Duration'
    
    # Drop rows with missing values
    df = df.dropna(subset=features + [target])
    
    X = df[features]
    y = df[target]
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    score = model.score(X_test, y_test)
    print(f"✅ Sleep Model Accuracy (R2): {score:.2f}")
    
    # Save
    joblib.dump(model, os.path.join(MODEL_DIR, "sleep_model.pkl"))
    print("💾 Saved sleep_model.pkl")

def train_risk_model():
    print("Training Risk Anomaly Model...")
    # This would typically be an IsolationForest or AutoEncoder
    # For now, we'll skip detailed implementation until dataset is present
    pass

if __name__ == "__main__":
    train_sleep_model()
    train_risk_model()
