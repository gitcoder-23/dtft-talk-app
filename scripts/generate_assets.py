import os
import math
from PIL import Image, ImageDraw, ImageFont

os.makedirs('assets/images', exist_ok=True)

def create_dtft_talk_icon(size=1024, is_foreground=False):
    # Create image with transparent or white background
    if is_foreground:
        img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    else:
        img = Image.new('RGBA', (size, size), (240, 248, 255, 255))
    draw = ImageDraw.Draw(img)

    center_x = size // 2
    center_y = size // 2 - (size * 0.05 if not is_foreground else 0)
    bubble_radius = int(size * 0.32)

    # Draw 4 quadrants of the speech bubble
    # Quadrants: Top-Left (Blue), Top-Right (Red), Bottom-Left (Yellow), Bottom-Right (Green)
    box = [center_x - bubble_radius, center_y - bubble_radius, center_x + bubble_radius, center_y + bubble_radius]
    
    # Top-Left: #0084FF
    draw.pieslice(box, 180, 270, fill=(0, 132, 255, 255))
    # Top-Right: #FF3B30
    draw.pieslice(box, 270, 360, fill=(255, 59, 48, 255))
    # Bottom-Right: #00C853
    draw.pieslice(box, 0, 90, fill=(0, 200, 83, 255))
    # Bottom-Left: #FFB300
    draw.pieslice(box, 90, 180, fill=(255, 179, 0, 255))

    # Draw speech bubble tail pointing to bottom-left
    tail_points = [
        (center_x - int(bubble_radius * 0.7), center_y + int(bubble_radius * 0.5)),
        (center_x - int(bubble_radius * 1.05), center_y + int(bubble_radius * 1.1)),
        (center_x - int(bubble_radius * 0.3), center_y + int(bubble_radius * 0.85))
    ]
    draw.polygon(tail_points, fill=(255, 179, 0, 255))

    # Inner white speech smile / bubble
    inner_radius = int(bubble_radius * 0.68)
    inner_box = [center_x - inner_radius, center_y - inner_radius, center_x + inner_radius, center_y + inner_radius]
    draw.ellipse(inner_box, fill=(255, 255, 255, 255))

    # Inner microphone or smile in navy
    mic_width = int(size * 0.08)
    mic_height = int(size * 0.14)
    mic_top = center_y - int(mic_height * 0.6)
    mic_box = [center_x - mic_width // 2, mic_top, center_x + mic_width // 2, mic_top + mic_height]
    draw.rounded_rectangle(mic_box, radius=mic_width // 2, fill=(10, 37, 64, 255))

    # Arc under mic
    arc_radius = int(mic_width * 0.9)
    arc_box = [center_x - arc_radius, mic_top + int(mic_height * 0.35), center_x + arc_radius, mic_top + int(mic_height * 1.15)]
    draw.arc(arc_box, 0, 180, fill=(10, 37, 64, 255), width=int(size * 0.015))

    # Stand line
    draw.line([(center_x, mic_top + int(mic_height * 1.15)), (center_x, mic_top + int(mic_height * 1.35))], fill=(10, 37, 64, 255), width=int(size * 0.015))
    # Base
    draw.line([(center_x - int(size * 0.04), mic_top + int(mic_height * 1.35)), (center_x + int(size * 0.04), mic_top + int(mic_height * 1.35))], fill=(10, 37, 64, 255), width=int(size * 0.015))

    return img

# Generate icons
icon = create_dtft_talk_icon(1024, is_foreground=False)
icon.save('assets/icon.png', 'PNG')

adaptive_fg = create_dtft_talk_icon(1024, is_foreground=True)
adaptive_fg.save('assets/android-icon-foreground.png', 'PNG')

# Background for android
bg = Image.new('RGBA', (1024, 1024), (230, 244, 254, 255))
bg.save('assets/android-icon-background.png', 'PNG')

# Splash icon
splash = create_dtft_talk_icon(1024, is_foreground=False)
splash.save('assets/splash-icon.png', 'PNG')

# Favicon
favicon = create_dtft_talk_icon(64, is_foreground=False)
favicon.save('assets/favicon.png', 'PNG')

print("Base app icons generated successfully.")

# Create student avatar
avatar = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
adraw = ImageDraw.Draw(avatar)
# Circular gradient background
adraw.ellipse([8, 8, 248, 248], fill=(0, 132, 255, 255))
# Face & hoodie illustration
adraw.ellipse([24, 24, 232, 232], fill=(230, 244, 255, 255))
# Hoodie shoulders
adraw.ellipse([30, 140, 226, 280], fill=(24, 119, 242, 255))
# Face
adraw.ellipse([70, 55, 186, 175], fill=(255, 218, 185, 255))
# Hair
adraw.ellipse([65, 40, 191, 110], fill=(40, 30, 25, 255))
# Smile
adraw.arc([105, 125, 151, 155], 0, 180, fill=(200, 50, 50, 255), width=4)
# Eyes
adraw.ellipse([95, 95, 107, 112], fill=(40, 30, 25, 255))
adraw.ellipse([149, 95, 161, 112], fill=(40, 30, 25, 255))
avatar.save('assets/images/student_avatar.png', 'PNG')

# Create instructor avatar (Ananya Ma'am)
inst = Image.new('RGBA', (256, 256), (0, 0, 0, 0))
idraw = ImageDraw.Draw(inst)
idraw.ellipse([8, 8, 248, 248], fill=(255, 235, 238, 255))
idraw.ellipse([20, 20, 236, 236], fill=(255, 245, 247, 255))
# Blazer
idraw.ellipse([25, 135, 231, 280], fill=(40, 53, 64, 255))
idraw.polygon([(110, 140), (128, 185), (146, 140)], fill=(255, 255, 255, 255))
# Face
idraw.ellipse([75, 55, 181, 170], fill=(253, 215, 188, 255))
# Long Hair
idraw.ellipse([60, 40, 196, 130], fill=(35, 25, 20, 255))
idraw.rectangle([60, 85, 85, 190], fill=(35, 25, 20, 255))
idraw.rectangle([171, 85, 196, 190], fill=(35, 25, 20, 255))
# Smile
idraw.arc([108, 128, 148, 152], 0, 180, fill=(210, 60, 60, 255), width=4)
# Eyes
idraw.ellipse([98, 98, 108, 112], fill=(40, 30, 25, 255))
idraw.ellipse([148, 98, 158, 112], fill=(40, 30, 25, 255))
inst.save('assets/images/instructor_avatar.png', 'PNG')

print("All avatar assets generated successfully.")
