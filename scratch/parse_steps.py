import os
import re

steps_dir = r"C:\Users\91984\.gemini\antigravity\brain\42292265-af84-4ab8-9ca2-aed408f05a21\.system_generated\steps"

for folder in os.listdir(steps_dir):
    folder_path = os.path.join(steps_dir, folder)
    if os.path.isdir(folder_path):
        file_path = os.path.join(folder_path, "content.md")
        if os.path.exists(file_path):
            with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                content = f.read()
                og_image = re.search(r'<meta property="og:image" content="([^"]+)"', content)
                url_match = re.search(r'Source: (https?://\S+)', content)
                img_src = re.search(r'<img src="([^"]+i\.ibb\.co[^"]+)"', content)
                
                source_url = url_match.group(1) if url_match else "Unknown"
                og_url = og_image.group(1) if og_image else "Not found"
                direct_url = img_src.group(1) if img_src else "Not found"
                
                print(f"Source: {source_url}")
                print(f"  OG: {og_url}")
                print(f"  Direct: {direct_url}")
                print("-" * 50)
