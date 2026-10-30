#!/usr/bin/env python3
import os
from PIL import Image, ImageDraw

PUBLIC_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public")
os.makedirs(PUBLIC_DIR, exist_ok=True)

SVG_CONTENT = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#180405"/>
      <stop offset="100%" stop-color="#0a0203"/>
    </linearGradient>
    <linearGradient id="teslaRed" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF3B30"/>
      <stop offset="100%" stop-color="#E82127"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="24" fill="url(#bg)"/>
  <rect x="2" y="2" width="96" height="96" rx="22" fill="none" stroke="#E82127" stroke-width="1.5" stroke-opacity="0.4"/>
  <path d="M50 25 C62 25 72 28 78 32 C75 35 70 36 67 36 C63 34 57 32 50 32 C43 32 37 34 33 36 C30 36 25 35 22 32 C28 28 38 25 50 25 Z" fill="url(#teslaRed)"/>
  <path d="M47 38 L53 38 L52 75 L48 75 Z" fill="url(#teslaRed)"/>
</svg>'''

with open(os.path.join(PUBLIC_DIR, "favicon.svg"), "w", encoding="utf-8") as f:
    f.write(SVG_CONTENT)

def create_icon(size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    corner = int(size * 0.22)
    draw.rounded_rectangle([0, 0, size, size], radius=corner, fill=(24, 4, 5, 255))
    draw.rounded_rectangle([2, 2, size-2, size-2], radius=corner, outline=(232, 33, 39, 100), width=int(max(1, size*0.015)))
    
    # Stylized T
    tx = size * 0.5
    ty = size * 0.32
    tw = size * 0.55
    th = size * 0.12
    draw.rounded_rectangle([tx - tw/2, ty, tx + tw/2, ty + th], radius=int(size*0.03), fill=(232, 33, 39, 255))
    draw.rounded_rectangle([tx - size*0.05, ty, tx + size*0.05, ty + size*0.42], radius=int(size*0.02), fill=(232, 33, 39, 255))
    return img

create_icon(180).save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG")
create_icon(192).save(os.path.join(PUBLIC_DIR, "icon-192.png"), "PNG")
create_icon(512).save(os.path.join(PUBLIC_DIR, "icon-512.png"), "PNG")
create_icon(32).save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO")

og = Image.new("RGBA", (1200, 630), (24, 4, 5, 255))
og_draw = ImageDraw.Draw(og)
for i in range(1200):
    og_draw.line([(i, 0), (i, 630)], fill=(232, 33, 39, int(30 * (1 - i/1200))))
create_icon(240)
og.paste(create_icon(240), (850, 195))
og.convert("RGB").save(os.path.join(PUBLIC_DIR, "og-image.png"), "PNG")
print("✓ Tesla assets generated")
