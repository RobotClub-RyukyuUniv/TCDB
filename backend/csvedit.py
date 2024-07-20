import os
import chardet
import csv
import json

# 現在のスクリプトファイルのディレクトリを取得
current_dir = os.path.dirname(os.path.abspath(__file__))

# 1つ上の階層のディレクトリパスを取得
parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))

def str_to_dict(data: str):
    # ---- データのリスト化 ----
    # 最初の `[` と最後の `]` を取り除く
    if data.startswith('[') and data.endswith(']'):
        data = data[1:-1]
    # 文字列を辞書に変換
    data_dict = json.loads(f'[{data}]')
    return data_dict

def encoding_detect(file_path: str):
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        encoding = result['encoding']
    return encoding

def edit(data: str):

    # データのリスト化
    data_dict = str_to_dict(data)

    # csvのパス（親ディレクトリから見たパス）
    file_path = os.path.join(parent_dir, 'public/robot_DB_example.csv')
    # ファイルのエンコーディングを自動検出
    encoding = encoding_detect(file_path)

    # csvファイルの書き込み
    with open(file_path, 'w', encoding=encoding, newline='') as f:
        fieldnames = data_dict[0].keys()
        writer = csv.writer(f)
        writer.writerow(fieldnames)
        for row in data_dict:
            print(row)
            print(row.values())
            writer.writerow(row.values())

    return 0