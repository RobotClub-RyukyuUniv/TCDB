import csvedit as cve
from flask import Flask, request, jsonify, url_for, render_template
from flask_cors import CORS
import pandas as pd

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)  # CORSを有効にする


# ルーティング
@app.route("/hello")
def hello_world():
    return "Hello world"

@app.route("/save",  methods=['POST'])
def save_data():
    data = request.json.get('data')  #データを取得する
    print(data)
    cve.edit(data)   # csvファイルを編集する
    
    return jsonify({'message': 'データが保存されました'}), 200  #成功したら200を送る。


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)