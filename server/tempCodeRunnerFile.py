from flask import Flask, request, jsonify
from flask_cors import CORS
import utils

app = Flask(__name__)
CORS(app)  # This will allow all origins by default

@app.route('/get_location_names', methods=['GET'])
def get_location_names():
    response = jsonify({
        'locations': utils.get_location_names()
    })
    return response

@app.route('/predict_home_price', methods=['POST'])
def predict_home_price():
    data = request.get_json()  # Handle JSON data
    total_sqft = float(data['total_sqft'])
    location = data['location']
    bhk = int(data['bhk'])
    bath = int(data['bath'])

    response = jsonify({
        'estimated_price': utils.estimate_price(location, total_sqft, bhk, bath)
    })
    return response

if __name__ == '__main__':
    utils.load_artifacts()
    app.run(debug=True)
