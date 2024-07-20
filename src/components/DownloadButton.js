import React from 'react';
import Papa from 'papaparse';

const DownloadButton = ({ csvData }) => {
    const handleDownload = () => {
        try {
        const csv = Papa.unparse(csvData, { header: true });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'edited_robot_DB_example.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        } catch (error) {
        console.error('Error generating the CSV file:', error);
        }
    };

    return (
        <button className="btn-custom-download mb-3" onClick={handleDownload}>Download CSV</button>
    );
};

export default DownloadButton;