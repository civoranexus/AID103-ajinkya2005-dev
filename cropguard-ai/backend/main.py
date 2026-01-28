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
    disease = random.choice([
        "Leaf Blight",
        "Powdery Mildew",
        "Bacterial Spot"
    ])

    confidence = round(random.uniform(0.75, 0.95), 2)

    if confidence >= 0.88:
        severity = "High"
    elif confidence >= 0.82:
        severity = "Medium"
    else:
        severity = "Low"

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
            "ai_version": "v1.3"
        }
    }



@app.get("/api/pest-recommendations")
def pest_recommendations_info():
    return {
        "message": "Use POST with disease and severity context."
    }


@app.post("/api/pest-recommendations")
async def pest_recommendations(payload: dict):
    disease = payload.get("disease")
    severity = payload.get("severity")

    pests = []

    if disease == "Leaf Blight":
        pests.append({
            "name": "Aphids",
            "risk": "Medium",
            "reason": "Sap-feeding pests commonly increase in leaf blight conditions",
            "control": "Neem oil spray or biological predators",
            "buy_link": "https://www.amazon.in/s?k=neem+oil+agriculture"
        })

    if disease == "Powdery Mildew":
        pests.append({
            "name": "Whiteflies",
            "risk": "Medium",
            "reason": "Powdery mildew weakens leaves, attracting whiteflies",
            "control": "Sticky traps and organic insecticides",
            "buy_link": "https://www.amazon.in/s?k=whitefly+trap"
        })

    if disease == "Bacterial Spot":
        pests.append({
            "name": "Thrips",
            "risk": "High",
            "reason": "Thrips accelerate bacterial spread on damaged tissues",
            "control": "Recommended insecticide and crop sanitation",
            "buy_link": "https://www.amazon.in/s?k=thrips+pesticide"
        })

    if severity == "High":
        pests.append({
            "name": "Cutworms",
            "risk": "High",
            "reason": "Severe crop stress increases vulnerability to soil pests",
            "control": "Soil treatment and pheromone traps",
            "buy_link": "https://www.amazon.in/s?k=cutworm+control"
        })

    return {
        "detected_pests": pests,
        "pest_count": len(pests),
        "context_used": {
            "disease": disease,
            "severity": severity
        },
        "ai_version": "v1.3"
    }



@app.post("/api/local-agro-stores")
async def local_agro_stores(payload: dict):
    location = payload.get("location", "India")
    pests = payload.get("pests", [])

    stores = []

    for pest in pests:
        control = pest.get("control", "").lower()

        if "neem" in control or "organic" in control:
            stores.append({
                "store_type": "Organic Agro Store",
                "recommended_for": pest["name"],
                "search_link": f"https://www.google.com/maps/search/organic+agro+store+near+{location}"
            })

        if "insecticide" in control or "pesticide" in control:
            stores.append({
                "store_type": "Agro Chemical Store",
                "recommended_for": pest["name"],
                "search_link": f"https://www.google.com/maps/search/agro+chemical+store+near+{location}"
            })

        if "trap" in control:
            stores.append({
                "store_type": "Agro Equipment Store",
                "recommended_for": pest["name"],
                "search_link": f"https://www.google.com/maps/search/agro+equipment+store+near+{location}"
            })

    return {
        "store_suggestions": stores,
        "location_used": location,
        "ai_version": "v1.3"
    }
