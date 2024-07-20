import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './styles.css';

const DownloadCSV = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

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