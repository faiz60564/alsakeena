"""Export the exact original PNGs embedded in approved SVG containers."""
import base64
from pathlib import Path
import xml.etree.ElementTree as ET

brand = Path(__file__).resolve().parent
destination = brand / "exports"
destination.mkdir(exist_ok=True)
for name in ("alsakeena-full-logo", "alsakeena-instagram-profile"):
    root = ET.parse(brand / "approved" / (name + ".svg")).getroot()
    image = root.find("{http://www.w3.org/2000/svg}image")
    if image is None:
        raise ValueError("Missing embedded image: " + name)
    uri = image.get("{http://www.w3.org/1999/xlink}href", "")
    if not uri.startswith("data:image/png;base64,"):
        raise ValueError("Expected original PNG: " + name)
    target = destination / (name + ".png")
    target.write_bytes(base64.b64decode(uri.split(",", 1)[1], validate=True))
    print("Exported", target.name)
