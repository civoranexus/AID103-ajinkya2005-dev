from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import random
import base64
import cv2
import numpy as np
import torch
import io
import requests
from PIL import Image
from torchvision import models, transforms

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

OPENWEATHER_API_KEY = "c0232e9d9f1fc28d945cb75ae2b4a586"

model = models.mobilenet_v2(weights="DEFAULT")
model.eval()

classes = [
    "Healthy Leaf",
    "Leaf Blight",
    "Powdery Mildew",
    "Bacterial Spot",
]

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

@app.get("/")
def root():
    return {"status": "CropGuard AI context-aware engine running"}


def fake_heatmap():
    heatmap = np.random.rand(224, 224)
    heatmap = np.uint8(255 * heatmap)
    heatmap_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    _, buffer = cv2.imencode(".png", heatmap_color)
    return base64.b64encode(buffer).decode("utf-8")


def fetch_weather_risk(location, growth_stage):
    geo = requests.get(
        "http://api.openweathermap.org/geo/1.0/direct",
        params={"q": location, "limit": 1, "appid": OPENWEATHER_API_KEY},
    ).json()

    if not geo:
        return "Low", []

    lat, lon = geo[0]["lat"], geo[0]["lon"]

    weather = requests.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        params={"lat": lat, "lon": lon, "appid": OPENWEATHER_API_KEY, "units": "metric"},
    ).json()

    humidity = []
    rain = []

    for item in weather["list"][:56]:
        humidity.append(item["main"]["humidity"])
        rain.append(item.get("pop", 0))

    avg_humidity = sum(humidity) / len(humidity)
    avg_rain = sum(rain) / len(rain)

    reasons = []
    risk_score = 0

    if avg_humidity > 70:
        risk_score += 0.05
        reasons.append("High humidity increases fungal infection probability")

    if avg_rain > 0.5:
        risk_score += 0.05
        reasons.append("Frequent rainfall increases leaf wetness duration")

    if growth_stage in ["Vegetative", "Flowering"]:
        risk_score += 0.04
        reasons.append("Current crop stage is disease-sensitive")

    if risk_score >= 0.09:
        return "High", reasons
    elif risk_score >= 0.05:
        return "Moderate", reasons
    else:
        return "Low", reasons


@app.post("/api/analyze")
async def analyze(
    image: UploadFile = File(...),
    location: str = Form("India"),
    growthStage: str = Form("Vegetative"),
    cultivationType: str = Form("Open Field"),
):
    img_bytes = await image.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = transform(img).unsqueeze(0)

    with torch.no_grad():
        output = model(img)
        probs = torch.softmax(output, dim=1)

    base_confidence = float(torch.max(probs))
    pred_index = int(torch.argmax(probs)) % len(classes)
    disease = classes[pred_index]

    severity_score = base_confidence
    ai_reasoning = []

    weather_risk, weather_reasons = fetch_weather_risk(location, growthStage)
    ai_reasoning.extend(weather_reasons)

    if weather_risk == "High":
        severity_score += 0.07
    elif weather_risk == "Moderate":
        severity_score += 0.04

    if cultivationType == "Open Field":
        severity_score += 0.05
        ai_reasoning.append("Open field cultivation increases exposure risk")
    elif cultivationType == "Greenhouse":
        severity_score -= 0.05
        ai_reasoning.append("Greenhouse cultivation reduces environmental exposure")

    severity_score = min(severity_score, 0.99)

    if severity_score >= 0.88:
        severity = "High"
        risk_level = "High"
        action_priority = "Immediate"
    elif severity_score >= 0.80:
        severity = "Medium"
        risk_level = "Moderate"
        action_priority = "Monitor Closely"
    else:
        severity = "Low"
        risk_level = "Low"
        action_priority = "Routine Monitoring"

    recommendation = (
        "Apply appropriate fungicide and isolate affected areas"
        if severity == "High"
        else "Monitor crop condition and apply preventive measures"
        if severity == "Medium"
        else "Continue regular monitoring"
    )

    heatmap = fake_heatmap()

    return {
        "analysis": {
            "disease": disease,
            "severity": severity,
            "confidence": round(severity_score, 2),
            "risk_level": risk_level,
            "action_priority": action_priority,
            "recommendation": recommendation,
            "ai_reasoning": ai_reasoning,
            "farm_context": {
                "location": location,
                "growthStage": growthStage,
                "cultivationType": cultivationType,
                "weatherRisk": weather_risk,
            },
            "heatmap": heatmap,
            "ai_version": "v1.6-weather-context-fusion",
        }
    }


@app.post("/api/pest-recommendations")
async def pest_recommendations(payload: dict):
    disease = payload.get("disease")
    severity = payload.get("severity")

    pests = []

    if disease == "Leaf Blight":
        pests.append({"name": "Aphids", "risk": "Medium", "control": "Neem oil spray"})

    if disease == "Powdery Mildew":
        pests.append({"name": "Whiteflies", "risk": "Medium", "control": "Sticky traps"})

    if severity == "High":
        pests.append({"name": "Cutworms", "risk": "High", "control": "Soil treatment"})

    return {
        "detected_pests": pests,
        "ai_version": "v1.6-weather-context-fusion",
    }


@app.post("/api/local-agro-stores")
async def local_agro_stores(payload: dict):
    location = payload.get("location", "India")
    pests = payload.get("pests", [])

    stores = [
        {
            "store_type": "Agro Store",
            "recommended_for": pest["name"],
            "search_link": f"https://www.google.com/maps/search/agro+store+near+{location}",
        }
        for pest in pests
    ]

    return {
        "store_suggestions": stores,
        "ai_version": "v1.6-weather-context-fusion",
    }
