import pandas as pd
import numpy as np
import random

def generate_mock_data(rows=500):
    print(f"Generating {rows} rows of mock sleep data...")
    
    data = []
    for _ in range(rows):
        # Simulate realistic correlations
        steps = random.randint(2000, 15000)
        stress = random.randint(1, 10) # 1-10
        heart_rate = random.randint(60, 90) + (stress * 1.5)
        
        # Base sleep
        sleep = 7.5
        
        # Adjust based on factors
        if steps > 8000: sleep += 0.5
        if steps > 12000: sleep += 0.2
        if stress > 5: sleep -= 0.8
        if stress > 8: sleep -= 1.0
        
        # Random noise
        sleep += random.uniform(-0.5, 0.5)
        
        # Clamp
        sleep = max(4.0, min(10.0, sleep))
        
        data.append({
            "Person ID": _,
            "Gender": random.choice(["Male", "Female"]),
            "Age": random.randint(20, 60),
            "Occupation": "Mock Engineer",
            "Sleep Duration": round(sleep, 1),
            "Quality of Sleep": random.randint(4, 9),
            "Physical Activity Level": random.randint(30, 90),
            "Stress Level": stress,
            "BMI Category": "Normal",
            "Blood Pressure": "120/80",
            "Heart Rate": int(heart_rate),
            "Daily Steps": steps,
            "Sleep Disorder": "None"
        })
        
    df = pd.DataFrame(data)
    df.to_csv("Sleep_Health_and_Lifestyle_Dataset.csv", index=False)
    print("✅ Created Sleep_Health_and_Lifestyle_Dataset.csv")

if __name__ == "__main__":
    generate_mock_data()
