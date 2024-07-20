import os
from flask import Flask, request, jsonify, url_for, render_template
from flask_cors import CORS
import pandas as pd

app = Flask(__name__, static_folder='../public/', static_url_path='')
CORS(app)  # CORSを有効にする

# ルーティング
@app.route("/hello")
def hello_world():
    return "Hello world"

@app.route("/save",  methods=['POST'])
def save_data():
    data = request.json.get('data')
    # データを保存する処理をここに追加
    print(data)
    return jsonify({'message': 'データが保存されました'}), 200  #成功したら200を送る。

@app.route("/user/<username>")
def show_user_profile(username):
    return "UserName: " + str(username)

@app.route("/post/<int:post_id>")
def show_post(post_id):
    return "Post" + str(post_id)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)