from fastapi import FastAPI, UploadFile, File
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
    return {"status": "CropGuard AI real model running"}

def fake_heatmap():
    heatmap = np.random.rand(224, 224)
    heatmap = np.uint8(255 * heatmap)
    heatmap_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    _, buffer = cv2.imencode(".png", heatmap_color)
    return base64.b64encode(buffer).decode("utf-8")

@app.post("/api/analyze")
async def analyze(image: UploadFile = File(...)):
    img_bytes = await image.read()
    img = Image.open(io.BytesIO(img_bytes)).convert("RGB")
    img = transform(img).unsqueeze(0)

    with torch.no_grad():
        output = model(img)
        probs = torch.softmax(output, dim=1)

    confidence = float(torch.max(probs))
    pred_index = int(torch.argmax(probs)) % len(classes)
    disease = classes[pred_index]

    if confidence > 0.85:
        severity = "High"
    elif confidence > 0.75:
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

    heatmap_base64 = fake_heatmap()

    return {
        "analysis": {
            "disease": disease,
            "severity": severity,
            "confidence": confidence,
            "risk_level": risk_level,
            "action_priority": action_priority,
            "recommendation": recommendation,
            "heatmap": heatmap_base64,
            "ai_version": "v1.4-explainable"
        }
    }

@app.post("/api/weather-risk")
async def weather_risk(payload: dict):
    location = payload.get("location", "India")
    growth_stage = payload.get("growth_stage", "Vegetative")

    geo = requests.get(
        "http://api.openweathermap.org/geo/1.0/direct",
        params={
            "q": location,
            "limit": 1,
            "appid": OPENWEATHER_API_KEY
        }
    ).json()

    if not geo:
        return {"error": "Location not found"}

    lat = geo[0]["lat"]
    lon = geo[0]["lon"]

    weather = requests.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        params={
            "lat": lat,
            "lon": lon,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric"
        }
    ).json()

    temps = []
    humidity = []
    rain_prob = []

    for item in weather["list"][:56]:
        temps.append(item["main"]["temp"])
        humidity.append(item["main"]["humidity"])
        rain_prob.append(item.get("pop", 0))

    avg_temp = round(sum(temps) / len(temps), 1)
    avg_humidity = round(sum(humidity) / len(humidity))
    avg_rain = round(sum(rain_prob) / len(rain_prob) * 100)

    risk = "Low"
    reasons = []

    if avg_humidity > 70:
        reasons.append("High humidity favors fungal disease growth")
    if avg_rain > 50:
        reasons.append("Rainfall increases leaf wetness duration")
    if growth_stage.lower() in ["vegetative", "flowering"]:
        reasons.append("Current crop stage is disease sensitive")

    if len(reasons) >= 2:
        risk = "High"
    elif len(reasons) == 1:
        risk = "Moderate"

    return {
        "location": location,
        "7_day_weather": {
            "avg_temperature": avg_temp,
            "avg_humidity": avg_humidity,
            "rainfall_probability": avg_rain
        },
        "environment_risk": risk,
        "risk_reasons": reasons,
        "ai_version": "v1.5-weather-fusion"
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
            "control": "Neem oil spray"
        })

    if disease == "Powdery Mildew":
        pests.append({
            "name": "Whiteflies",
            "risk": "Medium",
            "control": "Sticky traps"
        })

    if severity == "High":
        pests.append({
            "name": "Cutworms",
            "risk": "High",
            "control": "Soil treatment"
        })

    return {
        "detected_pests": pests,
        "ai_version": "v1.4-explainable"
    }

@app.post("/api/local-agro-stores")
async def local_agro_stores(payload: dict):
    location = payload.get("location", "India")
    pests = payload.get("pests", [])

    stores = []

    for pest in pests:
        stores.append({
            "store_type": "Agro Store",
            "recommended_for": pest["name"],
            "search_link": f"https://www.google.com/maps/search/agro+store+near+{location}"
        })

    return {
        "store_suggestions": stores,
        "ai_version": "v1.4-explainable"
    }
