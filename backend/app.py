from flask import Flask, request, jsonify
from flask_cors import CORS
import os, requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

PINATA_API_KEY = os.getenv("PINATA_API_KEY")
PINATA_SECRET_API_KEY = os.getenv("PINATA_SECRET_API_KEY")
PIN_JSON_URL = "https://api.pinata.cloud/pinning/pinJSONToIPFS"
PIN_FILE_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"

def upload_json_to_pinata(content: dict):
    headers = {
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_SECRET_API_KEY,
        "Content-Type": "application/json"
    }
    response = requests.post(PIN_JSON_URL, json={"pinataContent": content}, headers=headers)
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
            return f"✅ Uploaded! CID: {cid} <br>View: <a href='https://tan-patient-shark-433.mypinata.cloud/ipfs/{cid}' target='_blank'>View on IPFS</a>"
        except Exception as e:
            return f"❌ Error: {e}"

    return '''
        <h2>Upload a Message to Pinata (IPFS)</h2>
        <form method="post">
            <textarea name="message" rows="4" cols="50"></textarea><br>
            <button type="submit">Upload</button>
        </form>
    '''

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    headers = {
        "pinata_api_key": PINATA_API_KEY,
        "pinata_secret_api_key": PINATA_SECRET_API_KEY
    }

    response = requests.post(
        PIN_FILE_URL,
        files={"file": (file.filename, file.stream, file.content_type)},
        headers=headers
    )

    if response.status_code == 200:
        cid = response.json()["IpfsHash"]
        return jsonify({"cid": cid})
    else:
        return jsonify({"error": response.text}), 500

if __name__ == "__main__":
    app.run(debug=True)
