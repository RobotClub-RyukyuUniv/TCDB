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
    # 文字列をリスト[辞書]に変換
    data_dict = json.loads(f'[{data}]')
    return data_dict

def encoding_detect(file_path: str):
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        result = chardet.detect(raw_data)
        encoding = result['encoding']
    return encoding

def str_to_list(data: str) -> list:
    # 改行を取り除く
    data = data.replace('\n', '')
    data = data.replace('\r', '')
    return data.split(',')

def edit(data: str, fieldnames: str):
    # データのリスト化
    data_list = str_to_dict(data)
    fieldname_list = str_to_list(fieldnames)

    # 改行文字を削除
    fieldname_list = [field.strip() for field in fieldname_list]

    print("データ:", data_list)
    print('------------------')
    print("フィールド名リスト:", fieldname_list)

    # csvのパス（親ディレクトリから見たパス）
    file_path = os.path.join(parent_dir, 'public/robot_DB_example.csv')
    # ファイルのエンコーディングを自動検出
    encoding = encoding_detect(file_path)

    # csvファイルの書き込み
    with open(file_path, 'w', encoding=encoding, newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldname_list)
        writer.writeheader()
        for row_dict in data_list:
            # 空の辞書をフィルタリング
            if any(row_dict.values()):
                print("書き込む行:", row_dict)
                writer.writerow(row_dict)

    with open(file_path, encoding=encoding) as file_object:
        print(file_object.read())

    return 0