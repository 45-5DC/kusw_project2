from flask import Flask, request
from flask_cors import CORS
from PIL import Image
from imginput import imginput
import random

app = Flask(__name__)
CORS(app)

@app.route('/')
def init():
    return "<h1>Hello guys ^^<h1>"
@app.route('/detect', methods=['POST'])
def detect():
    img = Image.open(request.files['file'])
    prob = imginput(img)
    random.seed(request.files['file'])
    if prob > 0.5:
        prob -= random.random() / 50
    else:
        prob += random.random() / 50
    return {"result": prob}
