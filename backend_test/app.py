import os
from flask import Flask, request, jsonify, url_for, render_template
import pandas as pd

app = Flask(__name__, static_folder='.', static_url_path='')

# ルーティング
@app.route("/hello")
def hello_world():
    return "Hello world"

@app.route("/",  methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        print("POSTされたIDは？" + str(request.form['id']))
        print("POSTされたPASSWORDは？" + str(request.form['pwd']))
        return app.send_static_file('index.html')
    else:
        return app.send_static_file('index.html')
    
@app.route("/user/<username>")
def show_user_profile(username):
    return "UserName: " + str(username)

@app.route("/post/<int:post_id>")
def show_post(post_id):
    return "Post" + str(post_id)


if __name__ == '__main__':
    app.run(port=8000, debug=True)