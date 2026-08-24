from ispy_image import ISpyImage
from pathlib import Path

def generate_scramble_images(image_path, word):
    image = ISpyImage(image_path)
    # image.plot_contour()

    for letter in word:
        image.replace_letter(letter, f"images/{word}_{letter}.png")

if __name__ == "main":
    image_path = "images/apple_sheep.png"
    word = "patience"
    generate_scramble_images(image_path, word)