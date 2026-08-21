# -*- coding: utf-8 -*-
"""앱 아이콘 생성 — 금색 그라데이션 + Y&K 각인"""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")

def font(sz):
    for p in [r"C:\Windows\Fonts\malgunbd.ttf", r"C:\Windows\Fonts\segoeuib.ttf", r"C:\Windows\Fonts\arialbd.ttf"]:
        if os.path.exists(p):
            try: return ImageFont.truetype(p, sz)
            except Exception: pass
    return ImageFont.load_default()

def make(size, pad_ratio=0.0, name="icon.png"):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    pad = int(size * pad_ratio)
    box = (pad, pad, size - pad, size - pad)
    r = int((size - 2 * pad) * 0.22)
    # 배경(짙은 남색)
    d.rounded_rectangle(box, radius=r, fill=(13, 17, 23, 255))
    # 금색 대각 그라데이션 테두리 느낌
    inner = (pad + int(size*0.055), pad + int(size*0.055), size - pad - int(size*0.055), size - pad - int(size*0.055))
    n = 120
    grad = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grad)
    for i in range(n):
        t = i / (n - 1)
        c = (int(240 - 62*t), int(212 - 47*t), int(149 - 51*t), 255)
        gd.line([(0, int(size*t)), (size, int(size*t) - size)], fill=c, width=int(size/n) + 3)
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle(inner, radius=int(r*0.8), fill=255)
    img.paste(grad, (0, 0), mask)
    # 글자
    f = font(int(size * 0.30))
    txt = "Y&K"
    bb = d.textbbox((0, 0), txt, font=f)
    d.text(((size - (bb[2]-bb[0]))/2 - bb[0], (size - (bb[3]-bb[1]))/2 - bb[1] - size*0.02),
           txt, font=f, fill=(32, 23, 10, 255))
    img.save(os.path.join(OUT, name))
    print("saved", name)

make(192, 0.00, "icon-192.png")
make(512, 0.00, "icon-512.png")
make(512, 0.11, "icon-maskable.png")
