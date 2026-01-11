from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

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
    return {
        "analysis": {
            "disease": "Leaf Blight",
            "severity": "High",
            "confidence": 0.88,
            "recommendation": "Apply fungicide immediately and avoid excess irrigation"
        }
    }
