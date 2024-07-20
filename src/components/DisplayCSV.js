import React from 'react';
import './styles.css';

const DisplayCSV = ({ csvData, handleEdit, handleDelete }) => {
    return (
        <div className="d-flex flex-wrap">
        {csvData.map((row, rowIndex) => (
            <div className="col-md-4 mb-3" key={rowIndex}>
                <div className="card">
                    <div className="card-body">
                    <h5 className="card-title">{row['サークル名']}</h5>
                <p className="card-text">{row['大学']}</p>
                <button className="btn-normal" onClick={() => handleEdit(rowIndex)}>編集</button>
                <button className="btn-normal" onClick={() => handleDelete(rowIndex)}>削除</button>
                    </div>
                </div>
            </div>
        ))}
        </div>
    );
};

export default DisplayCSV;