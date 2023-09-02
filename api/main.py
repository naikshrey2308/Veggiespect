from fastapi import FastAPI, UploadFile, File
import uvicorn
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL = tf.keras.models.load_model("./models/1")

CLASS_NAMES = ["Early Blight", "Late Blight", "No Disease"]

@app.get("/ping")
def ping():
    return "Server is listening"

@app.get("/")
def hello():
    return "Hello World!"

def convert_bytes_to_img_array(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)))
    return image

@app.post("/predict")
async def predict(
    file: UploadFile = File(...)
):
    image_array = convert_bytes_to_img_array(await file.read())
    image_array = np.expand_dims(image_array, 0)
    prediction = MODEL.predict(image_array)[0]
    disease = CLASS_NAMES[np.argmax(prediction)]
    confidence = round(np.max(prediction) * 100, 2)
    return dict(
        disease=disease,
        confidence=confidence,
    )
    # return "Shrey Naik"

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)