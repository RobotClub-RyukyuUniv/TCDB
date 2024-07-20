from flask import Flask, request, jsonify, send_file
import pandas as pd
import os

app = Flask(__name__)

CSV_FILE_PATH = 'data.csv'

@app.route('/api/csv', methods=['GET'])
def get_csv():
    if os.path.exists(CSV_FILE_PATH):
        return send_file(CSV_FILE_PATH, as_attachment=True, mimetype='text/csv')
    else:
        return jsonify({'error': 'File not found'}), 404

@app.route('/api/csv', methods=['POST'])
def add_row():
    new_row = request.json
    df = pd.read_csv(CSV_FILE_PATH)
    df = df.append(new_row, ignore_index=True)
    df.to_csv(CSV_FILE_PATH, index=False)
    return jsonify(new_row), 201

@app.route('/api/csv/<int:index>', methods=['PUT'])
def edit_row(index):
    updated_row = request.json
    df = pd.read_csv(CSV_FILE_PATH)
    if 0 <= index < len(df):
        df.iloc[index] = updated_row
        df.to_csv(CSV_FILE_PATH, index=False)
        return jsonify(updated_row), 200
    else:
        return jsonify({'error': 'Index out of range'}), 400

if __name__ == '__main__':
    app.run(debug=True)