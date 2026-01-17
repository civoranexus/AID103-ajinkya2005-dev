from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "CropGuard AI backend running"}

@app.post("/api/analyze")
async def analyze(image: UploadFile = File(...)):
    # ---- Simulated AI detection ----
    disease = random.choice([
        "Leaf Blight",
        "Powdery Mildew",
        "Bacterial Spot"
    ])

    confidence = round(random.uniform(0.75, 0.95), 2)

    # ---- Severity decision ----
    if confidence >= 0.88:
        severity = "High"
    elif confidence >= 0.82:
        severity = "Medium"
    else:
        severity = "Low"

    # ---- Risk & Action logic ----
    if severity == "High":
        risk_level = "High"
        action_priority = "Immediate"
        recommendation = (
            "Immediate intervention required. "
            "Apply recommended fungicide and isolate affected crop areas."
        )
    elif severity == "Medium":
        risk_level = "Moderate"
        action_priority = "Monitor Closely"
        recommendation = (
            "Preventive treatment advised. "
            "Monitor crop condition over the next few days."
        )
    else:
        risk_level = "Low"
        action_priority = "Routine Monitoring"
        recommendation = (
            "No immediate treatment required. "
            "Continue regular crop monitoring."
        )

    # ---- Explainable AI reasoning ----
    key_risk_factors = [
        "High humidity conditions detected",
        "Crop at early vegetative growth stage",
        "Dense crop spacing increasing moisture retention"
    ]

    decision_explanation = [
        "Visual disease patterns strongly matched trained reference data",
        "Environmental conditions favor disease development",
        "Confidence score crossed risk evaluation threshold"
    ]

    return {
        "analysis": {
            "disease": disease,
            "severity": severity,
            "confidence": confidence,
            "risk_level": risk_level,
            "action_priority": action_priority,
            "recommendation": recommendation,
            "key_risk_factors": key_risk_factors,
            "decision_explanation": decision_explanation,
            "ai_version": "v1.1"
        }
    }
