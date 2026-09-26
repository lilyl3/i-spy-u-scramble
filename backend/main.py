from fastapi import FastAPI
from pathlib import Path

app = FastAPI()

outline_dir = Path("../images/outlines")

word_to_object = {
    "God": "sun",
    "good": "heart",
    "me": "mirror",
    "to": "gift_box",
    "is": "sheep"
}

@app.get("/api/ispy/{word}")
def generate_ispy(word):
    object_name = word_to_object[word]
    image_path = outline_dir / f"{object_name}.png"
    return {
        "word": word,
        "object": object_name,
        "path": str(image_path)
    }