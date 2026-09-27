from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pathlib import Path

outline_dir = Path("../images/outlines")

word_to_object = {
"God": "sun",
"good": "heart",
"me": "mirror",
"to": "gift_box",
"is": "sheep",
}

class ISpyRequest(BaseModel):
    sentence: str

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount(
    "/images",
    StaticFiles(directory=outline_dir),
    name="images",
)

@app.post("/api/ispy")
def generate_ispy(request: ISpyRequest):
    response = []

    for word in request.sentence.split(" "):
        response.append({
            "word": word,
            "imageURL": f"http://localhost:8000/images/{word_to_object[word]}.png",
        })

    return response