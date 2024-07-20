import React, { useState } from 'react';

const DownloadCSV = () => {
  const [csvData, setCsvData] = useState('');

  const handleDownload = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/robot_DB_example.csv`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const text = await response.text();
      setCsvData(text);

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
    <div>
      <button onClick={handleDownload}>Download CSV</button>
      <pre>{csvData}</pre>
    </div>
  );
};

export default DownloadCSV;
