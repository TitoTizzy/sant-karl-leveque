from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "assets"


def save_webp(source: Path, widths: list[int]) -> None:
    with Image.open(source) as opened:
        image = opened.convert("RGB")
        for width in sorted(set(widths)):
            if width >= image.width:
                resized = image
                suffix = ""
            else:
                height = round(image.height * width / image.width)
                resized = image.resize((width, height), Image.Resampling.LANCZOS)
                suffix = f"-{width}"
            output = source.with_name(f"{source.stem}{suffix}.webp")
            resized.save(output, "WEBP", quality=82, method=6)


for source in sorted((ASSETS / "photos-4k").glob("*.png")):
    with Image.open(source) as image:
        full_width = image.width
    save_webp(source, [640, 960, full_width])

save_webp(ASSETS / "gardy-maisonneuve.png", [480, 960, 1214])
save_webp(ASSETS / "skl-logo.png", [160, 320, 1024])

icons = ASSETS / "icons"
icons.mkdir(exist_ok=True)
with Image.open(ASSETS / "skl-logo.png") as opened:
    logo = opened.convert("RGBA")
    for size, name in [(32, "favicon-32.png"), (180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png")]:
        icon = logo.copy()
        icon.thumbnail((round(size * 0.9), round(size * 0.9)), Image.Resampling.LANCZOS)
        canvas = Image.new("RGBA", (size, size), "white")
        canvas.alpha_composite(icon, ((size - icon.width) // 2, (size - icon.height) // 2))
        canvas.save(icons / name, optimize=True)
