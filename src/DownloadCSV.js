import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './styles.css';

const DownloadCSV = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [newRow, setNewRow] = useState({ 'サークル名': '', '大学': '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/robot_DB_example.csv`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      const parsedData = Papa.parse(text, { header: true });
      setHeaders(parsedData.meta.fields);
      setCsvData(parsedData.data);
    } catch (error) {
      console.error('Error fetching the CSV file:', error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/robot_DB_example.csv`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      const blob = new Blob([text], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'robot_DB_example.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error fetching the CSV file:', error);
    }
  };

  const handleAddRow = () => {
    if (editIndex !== null) {
      const updatedData = [...csvData];
      updatedData[editIndex] = newRow;
      setCsvData(updatedData);
      setEditIndex(null);
    } else {
      setCsvData([...csvData, newRow]);
    }
    setNewRow({ 'サークル名': '', '大学': '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRow({ ...newRow, [name]: value });
  };

  const handleEdit = (index) => {
    setNewRow(csvData[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <button className="btn btn-primary mb-3" onClick={handleDownload}>Download CSV</button>
      <div className="row">
        {csvData.map((row, rowIndex) => (
          <div className="col-md-4 mb-3" key={rowIndex}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{row['サークル名']}</h5>
                <p className="card-text">{row['大学']}</p>
                <button className="btn btn-secondary" onClick={() => handleEdit(rowIndex)}>編集</button>
                {/* 他のデータも表示したい場合はここに追加 */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <h5>新しい行を追加</h5>
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
        <button className="btn btn-success mt-2" onClick={handleAddRow}>
          {editIndex !== null ? '行を更新' : '行を追加'}
        </button>
      </div>
    </div>
  );
};

export default DownloadCSV;