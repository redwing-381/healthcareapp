from flask import Flask, request
from flask_cors import CORS
import os, requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins


PINATA_API_KEY = os.getenv("PINATA_API_KEY")
PINATA_SECRET_API_KEY = os.getenv("PINATA_SECRET_API_KEY")

PIN_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS"

def upload_json_to_pinata(content: dict):
    headers = {
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_SECRET_API_KEY,
        "Content-Type": "application/json"
    }

    payload = {
        "pinataContent": content
    }

    response = requests.post(PIN_JSON_URL, json=payload, headers=headers)
    if response.status_code == 200:
        return response.json()["IpfsHash"]
    else:
        raise Exception(f"Failed to upload: {response.text}")

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        user_message = request.form.get("message")
        try:
            cid = upload_json_to_pinata({"message": user_message})
            return f"✅ Uploaded! CID: {cid} <br>View: <a href='https://gateway.pinata.cloud/ipfs/{cid}' target='_blank'>IPFS Link</a>"
        except Exception as e:
            return f"❌ Error: {e}"

    return '''
        <h2>Upload a Message to Pinata (IPFS)</h2>
        <form method="post">
            <textarea name="message" rows="4" cols="50"></textarea><br>
            <button type="submit">Upload</button>
        </form>
    '''


if __name__ == "__main__":
    app.run(debug=True)
