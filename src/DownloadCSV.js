import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import Axios from 'axios'; // Axiosをインポート
import './styles.css';

const DownloadCSV = () => {
  const [csvData, setCsvData] = useState([]); // CSVデータを格納するステート
  const [newRow, setNewRow] = useState({ 'サークル名': '', '大学': '' }); // 新しい行のデータを格納するステート
  const [editIndex, setEditIndex] = useState(null); // 編集中の行のインデックスを格納するステート
  const [searchQuery, setSearchQuery] = useState(''); // 検索クエリを格納するステート

  useEffect(() => {
    fetchData(); // コンポーネントがマウントされたときにデータをフェッチ
  }, []);

  const fetchData = async () => {
    try {
      // CSVファイルをフェッチ
      const response = await fetch(`${process.env.PUBLIC_URL}/robot_DB_example.csv`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // テキストとしてレスポンスを取得
      const text = await response.text();
      // CSVデータをパース
      const parsedData = Papa.parse(text, { header: true });
      // ヘッダーとデータをステートにセット
      setCsvData(parsedData.data);
    } catch (error) {
      console.error('Error fetching the CSV file:', error);
    }
  };

  const handleDownload = () => {
    try {
      // 編集されたデータをCSV形式に変換
      const csv = Papa.unparse(csvData, { header: true });
      // Blobオブジェクトを作成
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      // BlobオブジェクトのURLを生成
      const url = URL.createObjectURL(blob);
      // ダウンロードリンクを作成
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'edited_robot_DB_example.csv');
      // リンクをドキュメントに追加してクリックイベントをトリガー
      document.body.appendChild(link);
      link.click();
      // リンクをドキュメントから削除
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating the CSV file:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await Axios.post('http://127.0.0.1:5000/save', {
        data: JSON.stringify(csvData)
      });
      if (response.status === 200) {
        alert('データが保存されました');
      } else {
        alert('データの保存に失敗しました');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('データの保存中にエラーが発生しました');
    }
  };

  const handleAddRow = () => {
    if (editIndex !== null) {
      // 編集モードの場合、既存の行を更新
      const updatedData = [...csvData];
      updatedData[editIndex] = newRow;
      setCsvData(updatedData);
      setEditIndex(null); // 編集モードを解除
    } else {
      // 新しい行を追加
      setCsvData([...csvData, newRow]);
    }
    // 新しい行のデータをリセット
    setNewRow({ 'サークル名': '', '大学': '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 入力フィールドの変更をステートに反映
    setNewRow({ ...newRow, [name]: value });
  };

  const handleEdit = (index) => {
    // 編集モードに切り替え、編集する行のデータをセット
    if (editIndex === index) {
      // 同じ行を再度クリックした場合、編集モードを解除
      setNewRow({ 'サークル名': '', '大学': '' });
      setEditIndex(null);
    } else {
      // 編集モードに切り替え、編集する行のデータをセット
      setNewRow(csvData[index]);
      setEditIndex(index);
    }
  };

  const handleDelete = (index) => {
    // 指定された行を削除
    setCsvData(csvData.filter((_, i) => i !== index));
  };

  return (
    <div className="container">

      <div className="add-edit-form">
        <h5>新しいサークルを追加または編集</h5>
        <div className="form-group">
          <label>サークル名</label>
          <input
            type="text"
            className="form-control"
            name="サークル名"
            value={newRow['サークル名']}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>大学</label>
          <input
            type="text"
            className="form-control"
            name="大学"
            value={newRow['大学']}
            onChange={handleInputChange}
          />
        </div>
        <button className="btn-normal" onClick={handleAddRow}>
          {editIndex !== null ? '行を更新' : '行を追加'}
        </button>
      </div>

      <button className="btn-custom-download mb-3" onClick={handleDownload}>Download CSV</button>
      <button className="btn-custom-save mb-3" onClick={handleSave}>保存</button>


      <div className="row">
        {csvData.map((row, rowIndex) => (
          <div className="col-md-4 mb-3" key={rowIndex}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{row['サークル名']}</h5>
                <p className="card-text">{row['大学']}</p>
                <button className="btn-normal" onClick={() => handleEdit(rowIndex)}>編集</button>
                <button className="btn-normal" onClick={() => handleDelete(rowIndex)}>削除</button>
                {/* 他のデータも表示したい場合はここに追加 */}
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
  );
};

export default DownloadCSV;