from flask import Flask, request, render_template, redirect, url_for
import csv

app = Flask(__name__)

@app.route('/')
def index():
    rows = []
    headers = []
    with open('data.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        headers = next(reader)  # ヘッダー行を読み取る
        for row in reader:
            rows.append(row)
    return render_template('index.html', headers=headers, rows=rows)

@app.route('/update', methods=['POST'])
def update_csv():
    circle_name = request.form['circle_name']
    university_name = request.form['university_name']
    prefecture = request.form['prefecture']

    with open('data.csv', 'a', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow([circle_name, university_name, prefecture])

    return redirect(url_for('index'))

@app.route('/search', methods=['GET'])
def search_csv():
    prefecture = request.args.get('prefecture')
    rows = []
    headers = []
    with open('data.csv', 'r', encoding='utf-8') as csvfile:
        reader = csv.reader(csvfile)
        headers = next(reader)  # ヘッダー行を読み取る
        for row in reader:
            if not prefecture or row[2] == prefecture:
                rows.append(row)

    return render_template('index.html', headers=headers, rows=rows)

if __name__ == "__main__":
    app.run(port=8000, debug=True)

