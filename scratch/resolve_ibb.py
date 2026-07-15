import urllib.request
import re

urls = [
    "https://ibb.co/Cp7180gW",
    "https://ibb.co/Cs95Lg8Z",
    "https://ibb.co/gZ0wVhgD",
    "https://ibb.co/kgK289J5",
    "https://ibb.co/cXMdqwD0",
    "https://ibb.co/zhTtX5GN"
]

for url in urls:
    req = urllib.request.Request(
        url, 
        headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    )
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            # Look for og:image meta tag
            match = re.search(r'<meta property="og:image" content="([^"]+)"', html)
            if match:
                print(f"{url} -> {match.group(1)}")
            else:
                # Fallback to standard img tag pattern
                match2 = re.search(r'<img src="([^"]+i\.ibb\.co[^"]+)"', html)
                if match2:
                    print(f"{url} -> {match2.group(1)}")
                else:
                    print(f"{url} -> NOT FOUND")
    except Exception as e:
        print(f"Error for {url}: {e}")
