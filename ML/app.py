from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(
    title="CYBERNERB Machine Learning Service"
)

model = joblib.load("model.pkl")


class PerformanceData(BaseModel):
    score: float
    wrong_decisions: int
    hints_used: int
    completion_time: float


@app.get("/")
def health_check():
    return {
        "status": "online",
        "service": "CYBERNERB ML Service"
    }


@app.post("/predict")
def predict_difficulty(data: PerformanceData):

    features = np.array([[
        data.score,
        data.wrong_decisions,
        data.hints_used,
        data.completion_time
    ]])

    prediction = model.predict(features)[0]

    probabilities = model.predict_proba(features)[0]

    confidence = float(max(probabilities))

    return {
        "recommendedDifficulty": prediction,
        "confidence": round(confidence, 3)
    }