import cv2
import matplotlib.pyplot as plt

from pathlib import Path

class ISpyImage:
    def __init__(self, path, outline_dir="images/outlines"):
        self.path = Path(path)
        self.outline_path = f"{outline_dir}/{self.path.name}"

    def write_outline(self):
        image = cv2.imread(str(self.path))

        if image is None:
            raise FileNotFoundError(self.path)

        binary = ISpyImage.to_outline(image)

        cv2.imwrite(self.outline_path, binary)

    @staticmethod
    def to_outline(image):
        """Convert a colored image to black outlines on a white background."""

        if len(image.shape) == 3:
            image = cv2.cvtColor(
                image,
                cv2.COLOR_BGR2GRAY
            )

        _, binary = cv2.threshold(
            image,
            0,
            255,
            cv2.THRESH_BINARY + cv2.THRESH_OTSU
        )

        return binary