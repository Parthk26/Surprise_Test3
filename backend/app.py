from flask import Flask, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

API_URL = "https://api.data.gov.in/resource/8b75d7c2-814b-4eb2-9698-c96d69e5f128"
API_KEY = "579b464db66ec23bdd0000015ee4a1ae8da44114400fbf73fa09a6d5"

@app.route('/get-data')
def get_data():
    params = {
        "api-key": API_KEY,
        "format": "json",
        "limit": 100
    }
    response = requests.get(API_URL, params=params)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)
