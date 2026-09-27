import cv2
from pathlib import Path


class ISpyImage:
    def __init__(self, image_path, outline_dir="../images/outlines"):
        self.path = Path(image_path)
        self.outline_path = Path(outline_dir) / self.path.name

    def write_outline(self):
        image = cv2.imread(str(self.path))

        if image is None:
            raise FileNotFoundError(self.path)

        binary = self.to_outline(image)

        self.outline_path.parent.mkdir(parents=True, exist_ok=True)
        cv2.imwrite(str(self.outline_path), binary)

    @staticmethod
    def to_outline(image):
        """Keep dark/black pixels and make everything else white."""

        if len(image.shape) == 3:
            image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

        # Pixels darker than 50 become black.
        # Everything else becomes white.
        _, binary = cv2.threshold(
            image,
            50,
            255,
            cv2.THRESH_BINARY
        )

        return binary


for file_path in Path("../images/color").iterdir():
    if file_path.is_file():
        outliner = ISpyImage(file_path)
        outliner.write_outline()
