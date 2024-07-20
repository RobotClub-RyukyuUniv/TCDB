import os
import chardet
import csv
import json

# 現在のスクリプトファイルのディレクトリを取得
current_dir = os.path.dirname(os.path.abspath(__file__))

# 1つ上の階層のディレクトリパスを取得
parent_dir = os.path.abspath(os.path.join(current_dir, os.pardir))

def edit(data: str):

    # ---- データのリスト化 ----
    # 最初の `[` と最後の `]` を取り除く
    if data.startswith('[') and data.endswith(']'):
        data = data[1:-1]
    print(data)

    # 文字列をリストに変換
    data_list = json.loads(f'[{data}]')

    print(data_list)


    # ---- csvファイルの読み込み ----
    file_path = os.path.join(parent_dir, 'public/robot_DB_example.csv')
    # ファイルのエンコーディングを自動検出
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        encoding = result['encoding']
    
    
    # ---- csvファイルの書き込み ----
    # ファイルに書き込む
    with open(file_path, 'w', encoding=encoding, newline='') as f:
        fieldnames = data_list[0].keys()
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(data_list)
    
    print(f"Data written to {file_path}")
    return 0