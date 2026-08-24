import cv2
import matplotlib.pyplot as plt


class ISpyImage:
    def __init__(self, image_path, template_path="images/letter_h_template.png"):
        self.image = self.to_binary(image_path)
        template = self.to_binary(template_path)

        # Find the largest contour in the template (the letter 'h').
        template_contours = self.find_contours(template)
        self.template_contour = max(
            template_contours,
            key=cv2.contourArea
        )

        # Find all contours in the I-Spy image.
        self.image_contours = self.find_contours(self.image)

        # Find the contour that best matches the template.
        self.letter_contour = self.find_letter_contour()
        self.letter_box = cv2.boundingRect(self.letter_contour)

        # Invert the binary image back to its original polarity.
        self.base_image = cv2.bitwise_not(self.image)

        # Erase the detected letter.
        x, y, w, h = self.letter_box
        cv2.rectangle(
            self.base_image,
            (x, y),
            (x + w, y + h),
            255,
            -1
        )

    @staticmethod
    def to_binary(image_path):
        """Load an image and convert it to an inverted binary image."""
        image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

        if image is None:
            raise FileNotFoundError(
                f"Could not load image: {image_path}"
            )

        _, binary = cv2.threshold(
            image,
            0,
            255,
            cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU
        )

        return binary

    @staticmethod
    def find_contours(image):
        """Find all contours in a binary image."""
        contours, _ = cv2.findContours(
            image,
            cv2.RETR_TREE,
            cv2.CHAIN_APPROX_SIMPLE
        )

        return contours

    def find_letter_contour(self):
        """Find the contour that best matches the template."""
        return min(
            self.image_contours,
            key=lambda contour: cv2.matchShapes(
                self.template_contour,
                contour,
                cv2.CONTOURS_MATCH_I1,
                0
            )
        )

    def plot_contour(self):
        """Display the image with the detected letter highlighted."""
        output = self.image.copy()

        x, y, w, h = self.letter_box
        cv2.rectangle(
            output,
            (x, y),
            (x + w, y + h),
            255,
            2
        )

        plt.figure(figsize=(12, 8))
        plt.imshow(output, cmap="gray")
        plt.axis("off")
        plt.show()

    def replace_letter(self, letter, output_path):
        """Replace the detected letter and save the result."""
        output = self.base_image.copy()

        x, y, w, h = self.letter_box

        # Find a font size that fits inside the bounding box.
        font = cv2.FONT_HERSHEY_SIMPLEX
        thickness = 1
        font_scale = 1.0

        while True:
            (text_w, text_h), baseline = cv2.getTextSize(
                letter,
                font,
                font_scale,
                thickness
            )

            if text_w >= w or text_h + baseline >= h:
                font_scale -= 0.01
                break

            font_scale += 0.01

        # Center the letter inside the bounding box.
        (text_w, text_h), _ = cv2.getTextSize(
            letter,
            font,
            font_scale,
            thickness
        )

        center_x = x + w // 2
        center_y = y + h // 2

        text_x = center_x - text_w // 2
        text_y = center_y + text_h // 2

        cv2.putText(
            output,
            letter,
            (text_x, text_y),
            font,
            font_scale,
            0,
            thickness,
            cv2.LINE_AA
        )

        cv2.imwrite(output_path, output)