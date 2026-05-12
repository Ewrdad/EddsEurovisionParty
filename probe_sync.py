import requests

urls = [
    "https://api.ewrdad.uk/health",
    "http://api.ewrdad.uk/health",
    "http://api.ewrdad.uk:8080/health",
    "http://api.ewrdad.uk:3000/health",
    "https://api.ewrdad.uk:3000/health",
    "http://localhost:8080/health"
]

for url in urls:
    try:
        print(f"Testing {url}...")
        r = requests.get(url, timeout=5)
        print(f"  Result: {r.status_code}")
    except Exception as e:
        print(f"  Error: {e}")
