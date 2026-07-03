import fitz
import pytesseract

from PIL import Image


pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_content(pdf_path):

    doc = fitz.open(pdf_path)

    full_text = ""

    for page in doc:

        # Direct text extraction
        text = page.get_text("text").strip()

        if len(text) > 50:
            full_text += text + "\n"
            continue

        # OCR fallback
        pix = page.get_pixmap(
            matrix=fitz.Matrix(3, 3),
            alpha=False
        )

        img = Image.frombytes(
            "RGB",
            [pix.width, pix.height],
            pix.samples
        )

        ocr_text = pytesseract.image_to_string(
            img
        )

        full_text += ocr_text + "\n"

    doc.close()

    return full_text