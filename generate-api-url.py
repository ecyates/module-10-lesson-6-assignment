import hashlib
# import requests

# Marvel API keys
public_key = "aabb191d939670612b8127796a7d7db8"
private_key = "f27672565e79b26d1da1dae03a92f5ae9e7f84da"
ts = "1"  # Example timestamp

# Generate hash
to_hash = ts + private_key + public_key
hash_value = hashlib.md5(to_hash.encode()).hexdigest()

# API request URL
url = f"https://gateway.marvel.com/v1/public/characters?ts={ts}&apikey={public_key}&hash={hash_value}"

print(url)
# Make the request
# response = requests.get(url)

# # Output response
# if response.status_code == 200:
#     print(response.json())  # Print character data
# else:
#     print(f"Error: {response.status_code} - {response.text}")
